"use client"

import React, { useEffect, useState } from "react"
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore"
import ReactMarkdown from "react-markdown"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import rehypeRaw from "rehype-raw"

import { auth, db } from "@/lib/firebase"
import { Thought } from "@/lib/types"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { toast } from "@/components/ui/use-toast"

import { useThoughtContext } from "./ThoughtContext"
import ThoughtDetail from "./ThoughtSingle"

export default function ThoughtCard() {
  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [selectedThought, setSelectedThought] = useState<Thought | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedLabel, setSelectedLabel] = useState<string>("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const labelOptions = useThoughtContext()
  console.log("Selected Label:", selectedLabel)

  const fetchThoughts = () => {
    const thoughtsCollection = collection(db, "thoughts")
    let q = query(thoughtsCollection, orderBy("selectedDate", sortOrder))

    if (selectedLabel) {
      q = query(
        thoughtsCollection,
        where("label", "==", selectedLabel),
        orderBy("selectedDate", sortOrder)
      )
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const thoughtsData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Thought[]
      setThoughts(thoughtsData)
    })

    return unsubscribe
  }

  useEffect(() => {
    const unsubscribe = fetchThoughts()
    return () => unsubscribe()
  }, [selectedLabel, sortOrder])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchThoughts()
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleRemove = (thoughtId: string) => {
    setThoughts((prev) => prev.filter((t) => t.id !== thoughtId))

    if (selectedThought && selectedThought.id === thoughtId) {
      setSelectedThought(null)
    }

    setTimeout(async () => {
      try {
        await deleteDoc(doc(db, "thoughts", thoughtId))
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
    }, 500)
  }

  const handleRemoveAll = async () => {
    try {
      const thoughtsCollection = collection(db, "thoughts")
      const snapshot = await getDocs(thoughtsCollection)

      const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref))

      await Promise.all(deletePromises)

      toast({
        title: "All notes deleted successfully.",
      })
    } catch (error) {
      toast({
        title: "Couldn't delete notes.",
        variant: "destructive",
      })
      console.error(error)
    }
  }

  const handleSelect = (thoughtId: string) => {
    console.log(`Note with id ${thoughtId} clicked`)
    const selected = thoughts.find((t) => t.id === thoughtId)
    setSelectedThought(selected || null)
  }

  return (
    <div className="flex gap-4">
      <div className="w-1/4">
        <span
          className="absolute break-word right-4 bottom-4"
          onClick={handleRemoveAll}
        >
          rm - rf all thoughts
        </span>
        <TransitionGroup>
          <select
            value={selectedLabel}
            onChange={(e) => setSelectedLabel(e.target.value)}
          >
            <option value="">All Labels</option>
            {labelOptions.map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          {thoughts.map((thought) => (
            <CSSTransition key={thought.id} timeout={500} classNames="fade">
              <div
                className={`icon-card border flex flex-col mb-4 justify-between rounded-md break-words p-6 ${
                  selectedThought && selectedThought.id === thought.id
                    ? "active"
                    : ""
                }`}
                onClick={() => handleSelect(thought.id)}
              >
                <div className="top sidebar-notes flex-col flex align-middle gap-4">
                  <div className="flex gap-2 w-full">
                    <div className="flex items-center absolute right-2 bottom-2">
                      <span className="bg-black border  text-notes-secondary py-2 px-6 rounded-full text-xs">
                        {thought.label}
                      </span>
                    </div>{" "}
                    <div className="flex gap-4 align-middle items-center flex-1">
                      <div className="rounded-xl w-14 h-14 align-middle items-center justify-center mr-2 flex flex-col text-center border">
                        <span className="font-notes text-xs text-[#5D5C63] uppercase">
                          {thought.selectedDate
                            ? thought.selectedDate
                                .toDate()
                                .toLocaleString("en-US", {
                                  weekday: "short",
                                })
                            : "N/A"}
                        </span>

                        <span className="text-notes -translate-y-.5 text-lg font-notes-bold uppercase">
                          {thought.selectedDate
                            ? thought.selectedDate.toDate().getDate()
                            : "N/A"}
                        </span>
                      </div>
                      <div className="flex flex-col items">
                        <span className="text-[#EDEDEE] text-lg font-notes-bold font-notes">
                          {thought.title}
                        </span>
                        <span className="text-[#5D5C63] font-notes">
                          {thought.createdAt
                            ? thought.createdAt
                                .toDate()
                                .toLocaleTimeString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                    <ContextMenu>
                      <ContextMenuTrigger>...</ContextMenuTrigger>
                      <ContextMenuContent>
                        <ContextMenuItem>Edit</ContextMenuItem>
                        <ContextMenuItem>
                          <span onClick={() => handleRemove(thought.id)}>
                            Delete
                          </span>
                        </ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                  </div>
                  <ReactMarkdown
                    className="text-[#5D5C63] font-notes"
                    rehypePlugins={[rehypeRaw]}
                  >
                    {thought.description
                      ? thought.description.length > 40
                        ? thought.description.slice(0, 40) + "..."
                        : thought.description
                      : ""}
                  </ReactMarkdown>
                </div>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <div className="w-3/4">
        <ThoughtDetail thought={selectedThought} />
      </div>
    </div>
  )
}
