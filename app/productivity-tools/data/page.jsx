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
  const [datas, setdatas] = useState([])
  const [loading, setLoading] = useState(true)
  const [editModeMap, setEditModeMap] = useState({})
  const [hiddenCategories, setHiddenCategories] = useState([])
  const [showFilters, setShowFilters] = useState(true) // Toggle to show/hide filters
  const handleFilter = () => {
    setShowFilters((prevShowFilters) => !prevShowFilters)
  }
  const username = auth.currentUser
  const user = auth.currentUser
  const fetchdatas = async () => {
    const datasCollection = collection(db, "datas")
    const snapshot = await getDocs(datasCollection)
    const datas = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setdatas(datas)
  }

  useEffect(() => {
    fetchdatas()
  }, [])

  const DataSkeleton = () => {
    return (
      <div className="skeleton-container">
        <div className="skeleton-data-item"></div>
        <div className="skeleton-data-item"></div>
        <div className="skeleton-data-item"></div>
      </div>
    )
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchdatas(user)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // const fetchdatas = async (user) => {
  //   if (user && user.uid) {
  //     try {
  //       let datasQuery = query(
  //         collection(db, "datas"),
  //         where("userId", "==", user.uid),
  //         orderBy("createdAt", "desc")
  //       )

  //       const visibleCategories = categories
  //         .filter((category) => !hiddenCategories.includes(category.name))
  //         .map((category) => category.name)

  //       if (visibleCategories.length > 0) {
  //         datasQuery = query(
  //           collection(db, "datas"),
  //           where("userId", "==", user.uid),
  //           where("category", "in", visibleCategories),
  //           orderBy("createdAt", "desc")
  //         )
  //       }

  //       const snapshot = await getDocs(datasQuery)
  //       const fetcheddatas = snapshot.docs.map((doc) => {
  //         const data = doc.data()
  //         return {
  //           id: doc.id,
  //           ...data,
  //           createdAt: data.createdAt ? new Date(data.createdAt) : null,
  //         }
  //       })
  //       setdatas(fetcheddatas)
  //     } catch (error) {
  //       console.log("Error fetching datas:", error)
  //     }
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newdata = {
        title,
        userId: user.uid,
        content,
        category,
        createdAt: serverTimestamp(),
      }

      await addDoc(collection(db, "datas"), newdata)

      setdatas((prevdatas) => [newdata, ...prevdatas])

      setCategory("")
      setTitle("")
      setContent("")
      toast({
        title: "data created successfully.",
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
      await deleteDoc(doc(db, "datas", id))
      setdatas((prevdatas) => prevdatas.filter((data) => data.id !== id))

      toast({
        title: "data removed successfully.",
      })
    } catch (error) {
      toast({
        title: "Couldn't remove data.",
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

  const handleEdit = async (data) => {
    try {
      await updateDoc(doc(db, "datas", data.id), {
        title: data.title,
        content: data.content,
      })

      toggleEditMode(data.id)

      toast({
        title: "data updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Couldn't update data.",
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
    fetchdatas(user)
  }

  return (
    <>
      <div className="max-w-3xl">
        {loading ? ( // Show the skeleton when loading is true
          <DataSkeleton />
        ) : (
          <div className="grid items-start gap-8">
            {/* Actual data rendering */}
            {datas.map((data) => (
              <div
                key={data.id}
                className="divide-y divide-border rounded-md border"
              >
                <div className="flex items-center justify-between p-4 content-center">
                  {editModeMap[data.id] ? (
                    <>
                      <Input
                        type="text"
                        value={data.title}
                        onChange={(e) =>
                          setdatas((prevdatas) =>
                            prevdatas.map((prevdata) =>
                              prevdata.id === data.id
                                ? { ...prevdata, title: e.target.value }
                                : prevdata
                            )
                          )
                        }
                      />
                      <Textarea
                        value={data.content}
                        onChange={(e) =>
                          setdatas((prevdatas) =>
                            prevdatas.map((prevdata) =>
                              prevdata.id === data.id
                                ? { ...prevdata, content: e.target.value }
                                : prevdata
                            )
                          )
                        }
                      />
                      <Button
                        onClick={() => handleEdit(data)}
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
                        onClick={() => toggleEditMode(data.id)}
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
                        {data.title}
                        <small>{data.category}</small>
                      </a>
                      <p>{data.content}</p>{" "}
                      <div>
                        <p className="text-sm text-muted-foreground"></p>{" "}
                      </div>
                      <span onClick={() => handleRemove(data.id)}>Delete</span>
                      <Button
                        onClick={() => toggleEditMode(data.id)}
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
        )}
      </div>
    </>
  )
}
