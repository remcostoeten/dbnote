"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib"
import { Select, SelectValue } from "@radix-ui/react-select"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore"

import { auth, db } from "@/lib/firebase"
import { categories } from "@/lib/selectArrays"
import { Note } from "@/lib/types"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

import { MyDrawer } from "../../components/Drawer"
import PostIntro from "../../components/ui-dashboard/PostIntro"

export default function Dashboard() {
  const [title, setTitle] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [notes, setNotes] = useState<Note[]>([])
  const [label, setLabel] = useState<string[]>([])
  const [status, setStatus] = useState<string[]>([])
  const [priority, setPriority] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [editModeMap, setEditModeMap] = useState<{ [key: string]: boolean }>({})
  const user = auth?.currentUser

  const fetchNotes = async () => {
    const notesCollection = collection(db, "notes")
    const snapshot = await getDocs(notesCollection)
    const notesData = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Note[]
    setNotes(notesData)
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchNotes()
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const toggleEditMode = (id: string | number) => {
    setEditModeMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleEdit = async (data: Note) => {
    try {
      await updateDoc(doc(db, "datas", data.id), {
        title: data.title,
        content: data.content,
      })

      toggleEditMode(data.id)

      toast({
        title: "data updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Couldn't update data.",
        variant: "destructive",
      })
      console.error(error)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) {
      return
    }

    try {
      const newNote: Note = {
        title,
        userId: user.uid,
        content,
        category,
        createdAt: serverTimestamp(),
        id: "",
        status: status.join(", "),
        label: label.join(", "),
        priority: priority.join(", "),
        subject: "",
        task: "",
      }

      const docRef = await addDoc(collection(db, "notes"), newNote)
      newNote.id = docRef.id

      setNotes((prevNotes: Note[]) => [newNote, ...prevNotes])
      setCategory("")
      setTitle("")
      setContent("")
      setStatus([])
      setPriority([])
      setLabel([])
      toast({
        title: "Note created successfully.",
        description: `In the category ${category} with title ${title}`,
      })
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `Your sign-in request failed. Please try again. ${error}`,
        variant: "destructive",
      })
      console.error(error)
    }
  }
  const handleRemove = async (userId: string) => {
    try {
      await deleteDoc(doc(db, "notes", userId))
      toast({
        title: "Note deleted successfully.",
      })
    } catch (error) {
      toast({
        title: "Couldn't delete note.",
        variant: "destructive",
      })
      console.error(error)
    }
  }
  const form = (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Status"
        value={status.join(", ")}
        onChange={(e) => setStatus([e.target.value])}
      />

      <Input
        type="text"
        placeholder="Priority"
        value={priority.join(", ")}
        onChange={(e) => setPriority([e.target.value])}
      />

      <Input
        type="text"
        placeholder="Label"
        value={label.join(", ")}
        onChange={(e) => setLabel([e.target.value])}
      />
      <Select onValueChange={setCategory} value={category}>
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />{" "}
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.name}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Textarea
        placeholder="Note content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button
        onClick={(e) => {
          e.preventDefault()
          handleSubmit(e as any)
        }}
        className="inline-flex w-fit"
      >
        New post
      </Button>
    </form>
  )

  return (
    <>
      <div className="max-w-3xl">
        <div className="grid items-start gap-8">
          <PostIntro title="Posts" text="Create and manage posts." />
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Status"
              value={status.join(", ")}
              onChange={(e) => setStatus([e.target.value])}
            />

            <Input
              type="text"
              placeholder="Priority"
              value={priority.join(", ")}
              onChange={(e) => setPriority([e.target.value])}
            />

            <Input
              type="text"
              placeholder="Label"
              value={label.join(", ")}
              onChange={(e) => setLabel([e.target.value])}
            />
            <Select onValueChange={setCategory} value={category}>
              <SelectTrigger>
                <SelectValue placeholder="Select a verified email to display" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Textarea
              placeholder="Note content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button
              onClick={(e) => {
                e.preventDefault()
                handleSubmit(e as any)
              }}
              className="inline-flex w-fit"
            >
              New post
            </Button>
            <MyDrawer content={form} />
          </form>

          <div className="pb-2 ">
            {notes.map((note) => (
              <div
                key={note.id}
                className="divide-y divide-border rounded-md border"
              >
                <div className="flex  flex-col content-center gap-2 px-8 py-4">
                  {editModeMap[note.userId] ? (
                    <>
                      <Input
                        type="text"
                        value={note.title}
                        onChange={(e) =>
                          setNotes((prevNotes) =>
                            prevNotes.map((prevNote) =>
                              prevNote.userId === note.userId
                                ? { ...prevNote, title: e.target.value }
                                : prevNote
                            )
                          )
                        }
                      />
                      <Textarea
                        value={note.content}
                        onChange={(e) =>
                          setNotes((prevNotes) =>
                            prevNotes.map((prevNote) =>
                              prevNote.userId === note.userId
                                ? { ...prevNote, content: e.target.value }
                                : prevNote
                            )
                          )
                        }
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleEdit(note)}
                          className={cn(
                            buttonVariants({
                              size: "sm",
                              width: "w-fit",
                            })
                          )}
                        >
                          Save
                        </Button>
                        <Button
                          onClick={() => toggleEditMode(note.userId)}
                          className={cn(
                            buttonVariants({
                              width: "w-fit",
                            })
                          )}
                        >
                          Cancel
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="flex flex-col font-semibold hover:underline">
                        {note.title}
                        <small>{note.category}</small>
                        <p>{note.content}</p>{" "}
                      </span>
                      <div>
                        <p className="text-sm text-muted-foreground"></p>{" "}
                      </div>
                      <span onClick={() => handleRemove(note.userId)}>
                        Delete
                      </span>
                      <Button
                        onClick={() => toggleEditMode(note.userId)}
                        className={cn(
                          buttonVariants({
                            size: "sm",
                          })
                        )}
                      >
                        Edit
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <form>
          <div className="m-w-[1280px] mx-auto grid w-full gap-10">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center space-x-10">
                <p className="text-sm text-muted-foreground">dddd </p>
              </div>
              <Button
                type="submit"
                className={buttonVariants({ variant: "ghost" })}
              >
                Save
              </Button>
            </div>
          </div>
        </form>
        {notes.map((note) => (
          <label key={note.id} className="flex items-center gap-2">
            <input type="checkbox" value={note.title} />
            {note.title}
          </label>
        ))}
      </div>
    </>
  )
}
