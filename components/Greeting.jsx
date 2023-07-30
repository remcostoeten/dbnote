"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { getAuth } from "firebase/auth"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export default function Greeting() {
  const [userEmail, setUserEmail] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")

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
        setUsername(user.displayName || "User")
      } else {
        setUserEmail("")
        setIsLoggedIn(false)
        setUsername("User")
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
          <div className="border-1 space-between mb-4 flex flex items-center  gap-2 border-b px-2 pb-4">
            <h2 className="flex flex-1 text-2xl font-semibold tracking-tight">
              Hello, {username}!
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
