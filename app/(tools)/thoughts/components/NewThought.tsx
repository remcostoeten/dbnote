"use client"

import React, { useEffect, useState } from "react"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { Calendar, PlusSquare } from "lucide-react"
import ReactQuill from "react-quill"
import { Drawer } from "vaul"

import "react-quill/dist/quill.snow.css"
import { CalendarIcon } from "@radix-ui/react-icons"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover"
import { format } from "date-fns"
import { motion } from "framer-motion"

import { auth, db } from "@/lib/firebase"
import { Thought } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { ProminentGlowButton } from "@/components/buttons/CustomButtons"
import NotesIcon from "@/components/icons/NotesIcon"

import { useThoughtContext } from "./ThoughtContext"

interface NewThoughtProps {
  content?: string
}

export function NewThought({ content }: NewThoughtProps) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [date, setDate] = useState<Date | null>(null)
  const [description, setDescription] = useState("")
  const [subject, setSubject] = useState("")
  const [label, setLabel] = useState("") // Added label state
  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [loading, setLoading] = useState(false)
  const user = auth?.currentUser
  const [markdownContent, setMarkdownContent] = useState("")
  const labelOptions = useThoughtContext()

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
        subject,
        selectedDate: date,
        label, // Added label
      }

      const docRef = await addDoc(collection(db, "thoughts"), newThought)
      newThought.id = docRef.id

      setThoughts((prevThoughts: Thought[]) => [newThought, ...prevThoughts])
      setDescription("")
      setTitle("")
      setDate(null)
      setSubject("")
      setLabel("")
      setMarkdownContent("")
      toast({
        title: "Thought created successfully.",
        description: `with title ${title}`,
      })
      // console.log("Document written with ID: ", docRef.id)
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

  const form = (
    <form className="flex flex-col gap-2 py-6" onSubmit={handleSubmit}>
      <motion.input
        initial={{ opacity: 0, y: 150 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        type="text"
        className="wysiwyg-input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <motion.div
        initial={{ opacity: 0, y: 150 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex justify-between"
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button className="border-color-[#212028] flex items-center border bg-[#0a0a0a] text-[#ededee] hover:bg-[212020]">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              onSelect={(selectedDate) => setDate(selectedDate as any)}
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button className="border-color-[#212028] flex items-center border bg-[#0a0a0a] text-[#ededee] hover:bg-[212020]">
              <span>Select a label</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            {labelOptions.map((label, index) => (
              <motion.option
                key={label}
                initial={{ opacity: 0, y: 150 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: index * 0.1 + 0, duration: 0.5 }}
                className="bg-red-400 z-max"
                value={label}
              >
                {label}
              </motion.option>
            ))}
          </PopoverContent>
        </Popover>
      </motion.div>
      <motion.input
        initial={{ opacity: 0, y: 150 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        type="text"
        className="wysiwyg-input"
        placeholder="Label"
        value={label}
        onChange={(e) => setLabel(e.target.value)} // add the label input
      />
      <motion.div
        initial={{ opacity: 0, y: 150 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <ReactQuill
          placeholder="Thought content"
          value={markdownContent}
          className="min-h-20vh"
          onChange={setMarkdownContent}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 150 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex items-center gap-2"
      >
        <motion.div
          className="cursor-hover"
          initial={{ opacity: 0, y: 150 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <ProminentGlowButton text="New post" link={undefined} />
        </motion.div>
      </motion.div>
    </form>
  )

  return (
    <>
      <motion.div
        className="flex gap-1 w-full cursor-hover"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <motion.span
          initial={{ opacity: 0, y: 15, scale: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <NotesIcon />
        </motion.span>
        <span className="pl-3 text-xl text-notes font-notes">All thoughts</span>
      </motion.div>
      <Drawer.Root shouldScaleBackground>
        <Drawer.Trigger asChild onClick={() => setOpen(true)}>
          <motion.span
            initial={{ opacity: 0, y: 15, scale: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.55, duration: 0.5 }}
          >
            <PlusSquare className="font-2xl w-[40px]" />
          </motion.span>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="fixed bottom-0 shadow-lg bg-[#0a0a0a] p-12 left-0 right-0 mt-24 flex h-[75vh] flex-col rounded-t-[10px] rounded-2xl">
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
    </>
  )
}
