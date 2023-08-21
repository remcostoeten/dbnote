"use client"

import { useEffect, useState } from "react"
import { Select, SelectValue } from "@radix-ui/react-select"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore"

import { auth, db } from "@/lib/firebase"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

export default function Dashboard() {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [content, setContent] = useState("")
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [editModeMap, setEditModeMap] = useState({})
  const password = process.env.NEXT_PUBLIC_PASSWORD
  const [enteredPassword, setEnteredPassword] = useState("")
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false)
  const fetchmessages = async () => {
    const messagesCollection = collection(db, "messages")
    const snapshot = await getDocs(messagesCollection)
    const messages = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setMessages(messages)
  }

  const user = auth.currentUser

  useEffect(() => {
    fetchmessages()
  }, [])

  const categories = [
    { id: "1", name: "Pleio" },
    { id: "2", name: "Softhouse" },
    { id: "3", name: "Prive" },
  ]

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchmessages()
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleSubmit = async () => {
    if (!user) {
      return
    }

    try {
      const newMessage = {
        title,
        userId: user.uid,
        content,
        category,
        createdAt: serverTimestamp(),
      }

      await addDoc(collection(db, "messages"), newMessage)

      setMessages((prevMessage) => [newMessage, ...prevMessage])

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
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message.userId !== id)
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
      await updateDoc(doc(db, "messages", message.userId), {
        title: message.title,
        content: message.content,
      })

      toggleEditMode(message.userId)

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

  const handlePasswordSubmit = () => {
    if (enteredPassword === password) {
      setIsPasswordCorrect(true)
      toast({
        title: "Correct password.",
      })
    } else {
      toast({
        title: "Wrong password.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="max-w-3xl">
      {enteredPassword === password ? (
        <div className="grid items-start gap-8">
          <div className="grid gap-1">
            <h1 className="font-heading text-3xl md:text-4xl">messages</h1>
            <p className="text-lg text-muted-foreground">
              Create and manage messages.
            </p>
          </div>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
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
                  <SelectItem value={category.name}>{category.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Textarea
              placeholder="message content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button onClick={handleSubmit} className="inline-flex w-fit">
              New message
            </Button>
          </form>

          <div className="pb-2 ">
            {messages.map((message) => (
              <div
                key={message.userId}
                className="divide-y divide-border rounded-md border"
              >
                <div className="flex  flex-col content-center gap-2 px-8 py-4">
                  {editModeMap[message.userId] ? (
                    <>
                      <Input
                        type="text"
                        value={message.title}
                        onChange={(e) =>
                          setMessages((prevMessages) =>
                            prevMessages.map((prevMessage) =>
                              prevMessage.userId === message.userId
                                ? { ...prevMessage, title: e.target.value }
                                : prevMessage
                            )
                          )
                        }
                      />
                      <Textarea
                        value={message.content}
                        onChange={(e) =>
                          setMessages((prevMessages) =>
                            prevMessages.map((prevMessage) =>
                              prevMessage.userId === message.userId
                                ? { ...prevMessage, content: e.target.value }
                                : prevMessage
                            )
                          )
                        }
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleEdit(message)}
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
                          onClick={() => toggleEditMode(message.userId)}
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
                      <a className="flex flex-col font-semibold hover:underline">
                        {message.title}
                        <small>{message.category}</small>
                      </a>
                      <p>{message.content}</p>{" "}
                      <div>
                        <p className="text-sm text-muted-foreground"></p>{" "}
                      </div>
                      <span onClick={() => handleRemove(message.userId)}>
                        Delete
                      </span>
                      <Button
                        onClick={() => toggleEditMode(message.userId)}
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
      ) : (
        <div>
          <Input
            type="password"
            placeholder="Enter the password"
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
          />
          <Button onClick={handlePasswordSubmit}>Submit</Button>
        </div>
      )}
    </div>
  )
}
