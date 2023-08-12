"use client"

import React, { useEffect, useState } from "react"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { PlusSquare } from "lucide-react"
import ReactQuill from "react-quill"
import { Drawer } from "vaul"

import "react-quill/dist/quill.snow.css"

import { auth, db } from "@/lib/firebase"
import { Thought } from "@/lib/types"
import { toast } from "@/components/ui/use-toast"

interface NewThoughtProps {
  content?: string
}

export function NewThought({ content }: NewThoughtProps) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [date, setDate] = useState<Date | null>(null)
  const [description, setDescription] = useState("")
  const [subject, setSubject] = useState("")
  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [loading, setLoading] = useState(false)
  const user = auth?.currentUser
  const [markdownContent, setMarkdownContent] = useState("")

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("user", user)
      }
      setLoading(false)
    })
    return (): void => unsubscribe()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) {
      return
    }

    try {
      const newThought: Thought = {
        title,
        userId: user.uid,
        description: markdownContent,
        createdAt: serverTimestamp(),
        id: "",
        subject: subject,
        selectedDate: date,
      }

      const docRef = await addDoc(collection(db, "thoughts"), newThought)
      newThought.id = docRef.id

      setThoughts((prevThoughts: Thought[]) => [newThought, ...prevThoughts])
      setDescription("")
      setTitle("")
      setDate(null)
      setSubject("")
      setMarkdownContent("")
      toast({
        title: "Thought created successfully.",
        description: `with title ${title}`,
      })
      console.log("Document written with ID: ", docRef.id)
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `Your sign-in request failed. Please try again. ${error}`,
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setOpen(false)
    }
  }

  const subjectOptions = [
    { name: "Personal", value: "personal" },
    { name: "Work", value: "work" },
    { name: "Other", value: "other" },
  ]

  const form = (
    <form className="flex flex-col gap-2 py-6" onSubmit={handleSubmit}>
      <input
        type="text"
        className="wysiwyg-input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select onChange={(e) => setSubject(e.target.value)} value={subject}>
        <select>
          <select placeholder="Select a verified email to display" />
        </select>
        <select>
          {subjectOptions.map((subject) => (
            <select key={subject.name} value={subject.name}>
              {subject.name}
            </select>
          ))}
        </select>
      </select>

      <ReactQuill
        placeholder="Thought content"
        value={markdownContent}
        className="h-[200px] sm:h-[400px]"
        onChange={setMarkdownContent}
      />
    </form>
  )

  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild onClick={() => setOpen(true)}>
        <PlusSquare className="font-2xl w-[40px]" />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed  bottom-0 shadow-lg bg-[#0a0a0a] p-12 left-0 right-0 mt-24 flex h-[75vh] flex-col rounded-t-[10px] rounded-2xl">
          <div className="flex-1 rounded-t-[10px] [text-[#5D5C63] font-notes] p-4">
            <div className="mx-auto  w-4/12">
              <Drawer.Title className="mb-4 font-medium text-4xl font-serif">
                Add whatever is on your mind.
              </Drawer.Title>
              {form}
              <Drawer.Trigger onClick={() => setOpen(false)}>
                <span>Close</span>
              </Drawer.Trigger>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
