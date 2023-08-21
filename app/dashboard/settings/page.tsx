"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getAuth, onAuthStateChanged } from "firebase/auth"

import { auth } from "@/lib/firebase"
import ChangeUsername from "@/components/account/ChangeUsername"

export default function page() {
  const [userEmail, setUserEmail] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const router = useRouter()
  const name = username || getAuth().currentUser?.displayName || ""
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email || "User")
        setIsLoggedIn(true)
        setUsername(user.displayName || "User")
      } else {
        setUserEmail("")
        setIsLoggedIn(false)
        setUsername("User")
      }
    })
    return unsubscribe
  }, [])

  if (name) {
    return (
      <div className="flex min-h-screen flex-col ">
        <div className="max-w-3xl">
          <div className="grid items-start gap-2">
            You should update your name! And if you like you can set a profile
            picture too!
            <div className="grid gap-1">
              <ChangeUsername
                buttontext="Update"
                label="Name"
                title={undefined}
              />
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="flex min-h-screen flex-col ">
        <div className="max-w-3xl">
          <div className="grid items-start gap-2">
            Hey mr/ms. {name}! Welcome to your personal account page. Here you
            can update your name and profile picture and find some other
            settings!
            <div className="grid gap-1">
              <ChangeUsername
                buttontext="Update"
                label="Name"
                title={undefined}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
