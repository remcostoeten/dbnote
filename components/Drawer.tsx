"use client"

import { useEffect, useState } from "react"
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
import { Drawer } from "vaul"

import { auth, db } from "@/lib/firebase"
import { Thought } from "@/lib/types"
import { toast } from "@/components/ui/use-toast"

export function MyDrawer({ content }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [loading, setLoading] = useState(false)
  const user = auth?.currentUser

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("user", user)
        // fetchThoughts()
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
        description,
        createdAt: serverTimestamp(),
        userId: user.uid,
        userName: user.displayName,
        id: "",
      }

      const docRef = await addDoc(collection(db, "thoughts"), newThought)
      newThought.id = docRef.id

      setThoughts([newThought, ...thoughts])
      setTitle("")
      setDescription("")
      setOpen(false)
      toast({ title: "Success!", description: "Your thought was added!" })
    } catch (error) {
      toast({ title: "Error!", description: error.message })
      console.log(error)
    }
  }

  const form = (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow-sm focus:ring-zinc-500 focus:border-zinc-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>

        <div className="mt-1">
          <textarea
            id="description"
            name="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow-sm focus:ring-zinc-500 focus:border-zinc-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="mr-4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-zinc-500 border border-transparent rounded-md shadow-sm hover:bg-zinc-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        >
          Submit
        </button>
      </div>
    </form>
  )

  return (
    <Drawer.Root dismissible={false} open={open}>
      <Drawer.Trigger asChild onClick={() => setOpen(true)}>
        <button>Open Drawer</button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0">
          <div className="p-4 bg-white rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
            <div className="max-w-md mx-auto">
              {content}
              <Drawer.Title className="font-medium mb-4">
                Unstyled drawer for React.
              </Drawer.Title>
              <p className="text-zinc-600 mb-2">
                This component can be used as a replacement for a Dialog on
                mobile and tablet devices.
              </p>
              <p className="text-zinc-600 mb-6">
                It uses{" "}
                <a
                  href="https://www.radix-ui.com/docs/primitives/components/dialog"
                  className="underline"
                  target="_blank"
                >
                  Radix's Dialog primitive
                </a>{" "}
                under the hood and is inspired by{" "}
                <a
                  href="https://twitter.com/devongovett/status/1674470185783402496"
                  className="underline"
                  target="_blank"
                >
                  this tweet.
                </a>
              </p>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md mb-6 w-full bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                Click to close
              </button>
            </div>
          </div>
          <div className="p-4 bg-zinc-100 border-t border-zinc-200 mt-auto">
            <div className="flex gap-6 justify-end max-w-md mx-auto">
              <a
                className="text-xs text-zinc-600 flex items-center gap-0.25"
                href="https://github.com/emilkowalski/vaul"
                target="_blank"
              >
                GitHub
                <svg
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="16"
                  aria-hidden="true"
                  className="w-3 h-3 ml-1"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14L21 3"></path>
                </svg>
              </a>
              <a
                className="text-xs text-zinc-600 flex items-center gap-0.25"
                href="https://twitter.com/emilkowalski_"
                target="_blank"
              >
                Twitter
                <svg
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="16"
                  aria-hidden="true"
                  className="w-3 h-3 ml-1"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14L21 3"></path>
                </svg>
              </a>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
