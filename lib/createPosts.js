"use client"

import { toast } from "@/components/ui/use-toast"
import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { useState } from "react"

import React from "react"

export default function createPosts() {
  const [notes, setNotes] = useState([])

  const handleRemove = async (id) => {
    try {
      await deleteDoc(doc(db, "notes", id))
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id))

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
}
