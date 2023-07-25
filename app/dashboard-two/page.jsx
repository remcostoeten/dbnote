"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import router from "next/navigation"
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
  const [filteredNotes, setFilteredNotes] = useState([])

  const username = auth.currentUser
  const user = auth.currentUser

  const categories = [
    { id: "1", name: "Pleio" },
    { id: "2", name: "Softhouse" },
    { id: "3", name: "Prive" },
  ]

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchNotes(user, category) // Fetch notes with the selected category
      } else {
        router.push("/login")
      }
      setLoading(false) // Set loading to false after auth state has been checked
    })

    return () => unsubscribe()
  }, [category])

  const fetchNotes = async (user) => {
    if (user && user.uid) {
      try {
        const notesQuery = query(
          collection(db, "notes"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        )

        const snapshot = await getDocs(notesQuery)
        const fetchedNotes = snapshot.docs.map((doc) => {
          const data = doc.data()
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt ? new Date(data.createdAt) : null,
          }
        })

        setNotes(fetchedNotes) // Store all notes in state
        setFilteredNotes(fetchedNotes) // Initialize filtered notes with all notes
      } catch (error) {
        console.log("Error fetching notes:", error)
      }
    }
  }

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value

    // Filter notes based on the selected category
    const filtered = notes.filter((note) => {
      if (selectedCategory === "") {
        return true // Show all notes when the "All" option is selected
      } else {
        return note.category === selectedCategory
      }
    })

    setCategory(selectedCategory)
    setFilteredNotes(filtered)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
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

  const handleFilter = () => {
    fetchNotes(user, category)
  }

  return (
    <>
      <div className="mx-auto w-3/6 mt-4 max-w-3xl">
        <div className="grid items-start gap-8">
          <div className="flex flex-col gap-2 px-2">
            <div className="grid gap-1">
              <h1 className="font-heading text-3xl md:text-4xl">Posts</h1>
              <p className="text-lg text-muted-foreground">
                Create and manage posts.
              </p>
            </div>
            Welcome {username?.email}
            <form className="flex gap-2 flex-col" onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <select value={category} onChange={handleCategoryChange}>
                <option value="">All</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              <Textarea
                placeholder="Note content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              <Button
                className={cn(
                  buttonVariants({
                    variant: "primary",
                    color: "primary",
                    size: "md",
                  })
                )}
                onClick={handleSubmit}
                type="submit"
              >
                New post
              </Button>
            </form>
          </div>
          <div>
            {/* Display the filtered notes instead of all notes */}
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="divide-y divide-border rounded-md border"
              >
                <div className="flex items-center justify-between p-4 content-center">
                  {editModeMap[note.id] ? (
                    <>
                      <Input
                        type="text"
                        value={note.title}
                        onChange={(e) =>
                          setNotes((prevNotes) =>
                            prevNotes.map((prevNote) =>
                              prevNote.id === note.id
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
                              prevNote.id === note.id
                                ? { ...prevNote, content: e.target.value }
                                : prevNote
                            )
                          )
                        }
                      />
                      <Button
                        onClick={() => handleEdit(note)}
                        className={cn(
                          buttonVariants({
                            variant: "primary",
                            color: "success",
                            size: "sm",
                          })
                        )}
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => toggleEditMode(note.id)}
                        className={cn(
                          buttonVariants({
                            variant: "primary",
                            color: "danger",
                            size: "sm",
                          })
                        )}
                      >
                        Cancel
                      </Button>
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
                      <span onClick={() => handleRemove(note.id)}>Delete</span>
                      <Button
                        onClick={() => toggleEditMode(note.id)}
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
                <Link
                  href="/dashboard-two"
                  className={cn(buttonVariants({ variant: "ghost" }))}
                >
                  <>
                    <Icons.chevronLeft className="mr-2 h-4 w-4" />
                    Back
                  </>
                </Link>
                <p className="text-sm text-muted-foreground">dddd </p>
              </div>
              <Button
                type="submit"
                className={cn(
                  buttonVariants({
                    variant: "primary",
                    color: "success",
                    size: "md",
                  })
                )}
              >
                <span>Save</span>
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
        </form>
      </div>
    </>
  )
}
