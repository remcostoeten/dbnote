"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getAuth } from "firebase/auth"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

export default function Greeting() {
  const [userEmail, setUserEmail] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const signOut = async () => {
    const auth = getAuth()
    await auth.signOut()
    setUserEmail("User")
    setIsLoggedIn(false)
    toast({
      title: "bye bye" + userEmail,
    })
  }

  useEffect(() => {
    async function checkLoggedInStatus() {
      const auth = getAuth()
      const user = auth.currentUser

      if (user) {
        setUserEmail(stripDomainFromEmail(user.email) || "User")
        setIsLoggedIn(true)
      } else {
        setUserEmail("")
        setIsLoggedIn(false)
      }
    }

    checkLoggedInStatus()
  }, [])

  function stripDomainFromEmail(email) {
    if (email && email.includes("@")) {
      return email.split("@")[0]
    }
    return email
  }

  return (
    <div className="text-left">
      {isLoggedIn ? (
        <>
          <div className="px-2 gap-2 border-b border-1  pb-2 mb-2 flex space-between">
            <h2 className="text-2xl flex flex-1 font-semibold tracking-tight">
              Hello, {userEmail}!
            </h2>
            <Button
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  color: "primary",
                  size: "sm",
                })
              )}
              onClick={signOut}
            >
              Sign Out
            </Button>
          </div>
        </>
      ) : (
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">
            You are not authenticated!
          </h2>
          <Link
            className={cn(
              buttonVariants({
                variant: "ghost",
                color: "primary",
                size: "sm",
              })
            )}
            href="/login"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  )
}
