"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import router from "next/navigation"
import { Select, SelectValue } from "@radix-ui/react-select"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore"

import { auth, db } from "@/lib/firebase"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

export default function Dashboard() {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [content, setContent] = useState("")
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [editModeMap, setEditModeMap] = useState({})
  const [hiddenCategories, setHiddenCategories] = useState([])
  const username = auth.currentUser
  const user = auth.currentUser

  const fetchNotes = async () => {
    const notesCollection = collection(db, "notes")
    const snapshot = await getDocs(notesCollection)
    const notes = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setNotes(notes)
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const categories = [
    { id: "1", name: "Pleio" },
    { id: "2", name: "Softhouse" },
    { id: "3", name: "Prive" },
  ]

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchNotes()
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      return
    }

    try {
      const newNote = {
        title,
        userId: user.uid,
        content,
        category,
        createdAt: serverTimestamp(),
      }

      await addDoc(collection(db, "notes"), newNote)

      setNotes((prevNotes) => [newNote, ...prevNotes])

      setCategory("")
      setTitle("")
      setContent("")
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

  const handleRemove = async (id) => {
    try {
      await deleteDoc(doc(db, "notes", id))
      setNotes((prevNotes) => prevNotes.filter((note) => note.userId !== id))

      toast({
        title: "Note removed successfully.",
      })
    } catch (error) {
      toast({
        title: "Couldn't remove note.",
        variant: "destructive",
      })
      console.error(error)
    }
  }

  const toggleEditMode = (id) => {
    setEditModeMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleEdit = async (note) => {
    try {
      await updateDoc(doc(db, "notes", note.userId), {
        title: note.title,
        content: note.content,
      })

      toggleEditMode(note.userId)

      toast({
        title: "Note updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Couldn't update note.",
        variant: "destructive",
      })
      console.error(error)
    }
  }

  return (
    <>
      <div className="max-w-3xl">
        <div className="grid items-start gap-8">
          <div className="flex flex-col gap-2 px-2">
            <div className="grid gap-1">
              <h1 className="font-heading text-3xl md:text-4xl">Posts</h1>
              <p className="text-lg text-muted-foreground">
                Create and manage posts.
              </p>
            </div>
            <form className="flex gap-2 flex-col" onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Select onValueChange={setCategory} defaultValue={category}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a verified email to display" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem value={category.name}>
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
              <Button onClick={handleSubmit} className="inline-flex w-fit">
                New post
              </Button>
            </form>
          </div>

          <div className="pb-2 ">
            {notes.map((note) => (
              <div
                key={note.userId}
                className="divide-y divide-border rounded-md border"
              >
                <div className="flex  py-4 px-8 content-center flex-col gap-2">
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
                              variant: "primary",
                              color: "success",
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
                              variant: "primary",
                              color: "danger",
                              size: "sm",
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
                      <a className="font-semibold hover:underline flex flex-col">
                        {note.title}
                        <small>{note.category}</small>
                      </a>
                      <p>{note.content}</p>{" "}
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
                            variant: "primary",
                            color: "info",
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
          <div className="grid w-full gap-10 mx-auto m-w-[1280px]">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center space-x-10">
                <p className="text-sm text-muted-foreground">dddd </p>
              </div>
              <Button type="button">Filter</Button>
              <Button
                type="submit"
                className={buttonVariants({ variant: "ghost" })}
              >
                Save
              </Button>
            </div>
            <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
              <div id="editor" className="min-h-[500px]" />
              <p className="text-sm text-gray-500">
                Use{" "}
                <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
                  Tab
                </kbd>{" "}
                to open the command menu.
              </p>
            </div>
          </div>
        </form>{" "}
        {notes.map((note) => (
          <label key={note.userId} className="flex items-center gap-2">
            <input type="checkbox" value={note.title} />
            {note.title}
          </label>
        ))}
      </div>
    </>
  )
}
