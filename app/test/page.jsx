"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
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
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

import ProtectedRoute from "../../wmw"

const Dashboard = () => {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [content, setContent] = useState("")
  const [berichten, setberichten] = useState([])
  const [loading, setLoading] = useState(true)
  const [editModeMap, setEditModeMap] = useState({})
  const [hiddenCategories, setHiddenCategories] = useState([])
  const [showFilters, setShowFilters] = useState(true) // Toggle to show/hide filters
  const handleFilter = () => {
    setShowFilters((prevShowFilters) => !prevShowFilters)
  }
  const username = auth.currentUser
  const user = auth.currentUser
  const fetchberichten = async () => {
    const berichtenCollection = collection(db, "berichten")
    const snapshot = await getDocs(berichtenCollection)
    const berichten = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
    setberichten(berichten)
  }

  useEffect(() => {
    fetchberichten()
  }, [])

  const categories = [
    { id: "1", name: "Pleio" },
    { id: "2", name: "Softhouse" },
    { id: "3", name: "Prive" },
  ]

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchberichten(user)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newbericht = {
        title,
        userId: user.uid,
        content,
        createdAt: serverTimestamp(),
      }

      await addDoc(collection(db, "berichten"), newbericht)

      setberichten((prevberichten) => [newbericht, ...prevberichten])

      setTitle("")
      setContent("")
      toast({
        title: "bericht created successfully.",
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
      await deleteDoc(doc(db, "berichten", id))
      setberichten((prevberichten) =>
        prevberichten.filter((bericht) => bericht.id !== id)
      )

      toast({
        title: "bericht removed successfully.",
      })
    } catch (error) {
      toast({
        title: "Couldn't remove bericht.",
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

  const handleEdit = async (bericht) => {
    try {
      await updateDoc(doc(db, "berichten", bericht.id), {
        title: bericht.title,
        content: bericht.content,
      })

      toggleEditMode(bericht.id)

      toast({
        title: "bericht updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Couldn't update bericht.",
        variant: "destructive",
      })
      console.error(error)
    }
  }

  return (
    <>
      <div className="mx-auto w-3/6 mt-4 max-w-3xl">
        <div className="grid items-start gap-8">
          {showFilters && (
            <div className="flex flex-col gap-2 px-2">
              <div className="grid gap-1">
                <h1 className="font-heading text-3xl md:text-4xl">Posts</h1>
                <p className="text-lg text-muted-foreground">Create data</p>
              </div>
              <form className="flex gap-2 flex-col" onSubmit={handleSubmit}>
                <Input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <Textarea
                  placeholder="bericht content"
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
          )}
          <div>
            {berichten.map((bericht) => (
              <div
                key={bericht.id}
                className="divide-y divide-border rounded-md border"
              >
                <div className="flex items-center justify-between p-4 content-center">
                  {editModeMap[bericht.id] ? (
                    <>
                      <Input
                        type="text"
                        value={bericht.title}
                        onChange={(e) =>
                          setberichten((prevberichten) =>
                            prevberichten.map((prevbericht) =>
                              prevbericht.id === bericht.id
                                ? { ...prevbericht, title: e.target.value }
                                : prevbericht
                            )
                          )
                        }
                      />
                      <Textarea
                        value={bericht.content}
                        onChange={(e) =>
                          setberichten((prevberichten) =>
                            prevberichten.map((prevbericht) =>
                              prevbericht.id === bericht.id
                                ? { ...prevbericht, content: e.target.value }
                                : prevbericht
                            )
                          )
                        }
                      />
                      <Button
                        onClick={() => handleEdit(bericht)}
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
                        onClick={() => toggleEditMode(bericht.id)}
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
                        {bericht.title}
                        <small>{bericht.category}</small>
                      </a>
                      <p>{bericht.content}</p>{" "}
                      <div>
                        <p className="text-sm text-muted-foreground"></p>{" "}
                      </div>
                      <span onClick={() => handleRemove(bericht.id)}>
                        Delete
                      </span>
                      <Button
                        onClick={() => toggleEditMode(bericht.id)}
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
                className={cn(
                  buttonVariants({
                    variant: "primary",
                    color: "primary",
                    size: "md",
                  })
                )}
                onClick={handleFilter} // Add the handleFilter function to the onClick event
                type="button" // Change the type to "button" to prevent form submission
              >
                Filter
              </Button>
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
        </form>{" "}
        {berichten.map((bericht) => (
          <label key={bericht.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              value={bericht.title}
              onChange={handleCategoryToggle}
              checked={!hiddenCategories.includes(bericht.title)}
            />
            {bericht.title}
          </label>
        ))}
      </div>
    </>
  )
}

export default ProtectedRoute(Dashboard)
