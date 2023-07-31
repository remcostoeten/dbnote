"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import router from "next/navigation"
import { Select, SelectValue } from "@radix-ui/react-select"
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
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export default function Dashboard() {
  const [desc, setDesc] = useState("")
  const [merk, setMerk] = useState("")
  const [naam, setNaam] = useState("")
  const [vapes, setVapes] = useState([])
  const [loading, setLoading] = useState(true)
  const [editModeMap, setEditModeMap] = useState({})
  const [hiddenCategories, setHiddenCategories] = useState([])
  const username = auth.currentUser
  const user = auth.currentUser

  const fetchNotes = async () => {
    const vapesCollection = collection(db, "vapes")
    const snapshot = await getDocs(vapesCollection)
    const vapes = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setVapes(vapes)
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchNotes()
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      return
    }

    try {
      const newNote = {
        naam,
        userId: user.uid,
        desc,
        createdAt: serverTimestamp(),
      }

      await addDoc(collection(db, "vapes"), newNote)

      setVapes((prevNotes) => [newNote, ...prevNotes])

      setNaam("")
      setMerk("")
      setDesc("")
      toast({
        naam: "Vape created successfully.",
      })
    } catch (error) {
      toast({
        naam: "Something went wrong.",
        description: `Your sign-in request failed. Please try again. ${error}`,
        variant: "destructive",
      })
      console.error(error)
    }
  }

  const handleRemove = async (id) => {
    try {
      await deleteDoc(doc(db, "vapes", id))
      setVapes((prevNotes) => prevNotes.filter((vape) => vape.userId !== id))

      toast({
        naam: "Note removed successfully.",
      })
    } catch (error) {
      toast({
        naam: "Couldn't remove vape.",
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

  const handleEdit = async (vape) => {
    try {
      await updateDoc(doc(db, "vapes", vape.userId), {
        naam: vape.naam,
        desc: vape.desc,
      })

      toggleEditMode(vape.userId)

      toast({
        naam: "Note updated successfully.",
      })
    } catch (error) {
      toast({
        naam: "Couldn't update vape.",
        variant: "destructive",
      })
      console.error(error)
    }
  }

  return (
    <>
      <div className="max-w-3xl">
        <div className="grid items-start gap-8">
            <div className="grid gap-1">
              <h1 className="font-heading text-3xl md:text-4xl">Vapes</h1>
              <p className="text-lg text-muted-foreground">Beste vapes </p>
            </div>
            <form className="flex gap-2 flex-col" onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Naam"
                value={naam}
                onChange={(e) => setNaam(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Merk"
                value={merk}
                onChange={(e) => setMerk(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Beschrijving"
                value={desc}
                onChange={(e) => setNaam(e.target.value)}
              />

              <Textarea
                placeholder="Note desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <Button onClick={handleSubmit} className="inline-flex w-fit">
                New post
              </Button>
            </form>
      

          <div className="pb-2 ">
            {vapes.map((vape) => (
              <div
                key={vape.userId}
                className="divide-y divide-border rounded-md border"
              >
                <div className="flex  py-4 px-8 desc-center  gap-2">
                  {editModeMap[vape.userId] ? (
                    <>
                      <Input
                        type="text"
                        value={vape.naam}
                        onChange={(e) =>
                          setVapes((prevNotes) =>
                            prevNotes.map((prevNote) =>
                              prevNote.userId === vape.userId
                                ? { ...prevNote, naam: e.target.value }
                                : prevNote
                            )
                          )
                        }
                      />
                      <Textarea
                        value={vape.desc}
                        onChange={(e) =>
                          setVapes((prevNotes) =>
                            prevNotes.map((prevNote) =>
                              prevNote.userId === vape.userId
                                ? { ...prevNote, desc: e.target.value }
                                : prevNote
                            )
                          )
                        }
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleEdit(vape)}
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
                          onClick={() => toggleEditMode(vape.userId)}
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
                      <span className="font-semibold hover:underline flex flex-col">
                        {vape.naam}
                        <p>{vape.desc}</p>{" "}
                      </span>
                      <div>
                        <p className="text-sm text-muted-foreground"></p>{" "}
                      </div>
                      <span onClick={() => handleRemove(vape.userId)}>
                        Delete
                      </span>
                      <Button
                        onClick={() => toggleEditMode(vape.userId)}
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
                <p className="text-sm text-muted-foreground">dddd </p>
              </div>
              <Button type="button">Filter</Button>
              <Button
                type="submit"
                className={buttonVariants({ variant: "ghost" })}
              >
                Save
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
        {vapes.map((vape) => (
          <label key={vape.userId} className="flex items-center gap-2">
            <input type="checkbox" value={vape.naam} />
            {vape.naam}
          </label>
        ))}
      </div>
    </>
  )
}
