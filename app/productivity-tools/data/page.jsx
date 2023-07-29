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
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [editModeMap, setEditModeMap] = useState({})
  const [hiddenCategories, setHiddenCategories] = useState([])
  const [showFilters, setShowFilters] = useState(true) // Toggle to show/hide filters
  const handleFilter = () => {
    setShowFilters((prevShowFilters) => !prevShowFilters)
  }
  const username = auth.currentUser
  const user = auth.currentUser
  const fetchmessages = async () => {
    const messagesCollection = collection(db, "messages")
    const snapshot = await getDocs(messagesCollection)
    const messages = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setMessages(messages)
  }

  useEffect(() => {
    fetchmessages()
  }, [])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchmessages(user)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // const fetchmessages = async (user) => {
  //   if (user && user.uid) {
  //     try {
  //       let messagesQuery = query(
  //         collection(db, "messages"),
  //         where("userId", "==", user.uid),
  //         orderBy("createdAt", "desc")
  //       )

  //       const visibleCategories = categories
  //         .filter((category) => !hiddenCategories.includes(category.name))
  //         .map((category) => category.name)

  //       if (visibleCategories.length > 0) {
  //         messagesQuery = query(
  //           collection(db, "messages"),
  //           where("userId", "==", user.uid),
  //           where("category", "in", visibleCategories),
  //           orderBy("createdAt", "desc")
  //         )
  //       }

  //       const snapshot = await getDocs(messagesQuery)
  //       const fetchedmessages = snapshot.docs.map((doc) => {
  //         const data = doc.data()
  //         return {
  //           id: doc.id,
  //           ...data,
  //           createdAt: data.createdAt ? new Date(data.createdAt) : null,
  //         }
  //       })
  //       setMessages(fetchedmessages)
  //     } catch (error) {
  //       console.log("Error fetching messages:", error)
  //     }
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newmessage = {
        title,
        userId: user.uid,
        content,
        category,
        createdAt: serverTimestamp(),
      }

      await addDoc(collection(db, "messages"), newmessage)

      setMessages((prevmessages) => [newmessage, ...prevmessages])

      setCategory("")
      setTitle("")
      setContent("")
      toast({
        title: "message created successfully.",
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
      await deleteDoc(doc(db, "messages", id))
      setMessages((prevmessages) =>
        prevmessages.filter((message) => message.id !== id)
      )

      toast({
        title: "message removed successfully.",
      })
    } catch (error) {
      toast({
        title: "Couldn't remove message.",
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

  const handleEdit = async (message) => {
    try {
      await updateDoc(doc(db, "messages", message.id), {
        title: message.title,
        content: message.content,
      })

      toggleEditMode(message.id)

      toast({
        title: "message updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Couldn't update message.",
        variant: "destructive",
      })
      console.error(error)
    }
  }

  const handleCategoryToggle = (e) => {
    const categoryName = e.target.value
    setHiddenCategories((prevHiddenCategories) => {
      if (prevHiddenCategories.includes(categoryName)) {
        return prevHiddenCategories.filter(
          (category) => category !== categoryName
        )
      } else {
        return [...prevHiddenCategories, categoryName]
      }
    })
    fetchmessages(user)
  }

  const DataSkeleton = () => {
    return (
      <div className="skeleton-container">
        <div className="skeleton-data-item"></div>
        <div className="skeleton-data-item"></div>
        <div className="skeleton-data-item"></div>
      </div>
    )
  }

  return (
    <>
      <div className="max-w-3xl">
        <div className="grid items-start gap-8">
          {showFilters && (
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

                <Textarea
                  placeholder="message content"
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
            {messages.map((message) => (
              <div
                key={message.id}
                className="divide-y divide-border rounded-md border"
              >
                {" "}
                <span onClick={() => handleRemove(message.id)}>Delete</span>
                <div className="flex items-center justify-between p-4 content-center">
                  {editModeMap[message.id] ? (
                    <>
                      <Input
                        type="text"
                        value={message.title}
                        onChange={(e) =>
                          setMessages((prevmessages) =>
                            prevmessages.map((prevmessage) =>
                              prevmessage.id === message.id
                                ? { ...prevmessage, title: e.target.value }
                                : prevmessage
                            )
                          )
                        }
                      />
                      <Textarea
                        value={message.content}
                        onChange={(e) =>
                          setMessages((prevmessages) =>
                            prevmessages.map((prevmessage) =>
                              prevmessage.id === message.id
                                ? { ...prevmessage, content: e.target.value }
                                : prevmessage
                            )
                          )
                        }
                      />
                      <Button
                        onClick={() => handleEdit(message)}
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
                        onClick={() => toggleEditMode(message.id)}
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
                        {message.title}
                        <small>{message.category}</small>
                      </a>
                      <p>{message.content}</p>{" "}
                      <div>
                        <p className="text-sm text-muted-foreground"></p>{" "}
                      </div>
                      <span onClick={() => handleRemove(message.id)}>
                        Delete
                      </span>
                      <Button
                        onClick={() => toggleEditMode(message.id)}
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
        {messages.map((message) => (
          <label key={message.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              value={message.title}
              onChange={handleCategoryToggle}
              checked={!hiddenCategories.includes(message.title)}
            />
            {message.title}
          </label>
        ))}
      </div>
    </>
  )
}
