"use client"

import React, { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"

import { auth, db } from "@/lib/firebase"
import { Thought } from "@/lib/types"

import ThoughtCard from "./ThoughtCard"

export default function ThoughtList() {
  const [thoughts, setThoughts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchThoughts = async () => {
    const thoughtsCollection = collection(db, "thoughts")
    const snapshot = await getDocs(thoughtsCollection)
    const thoughtsData = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Thought[]
    setThoughts(thoughtsData as any)
  }

  useEffect(() => {
    fetchThoughts()
  }, [])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchThoughts()
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <div>
      {thoughts.map((thought: Thought) => (
        <ThoughtCard key={thought.id} />
      ))}
    </div>
  )
}
