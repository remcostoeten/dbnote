"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Router from "next/router"
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth"

import { auth } from "@/lib/firebase"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import LogoIconOnly from "@/components/LogoIconOnly"
import { Icons } from "@/components/icons"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [rememberEmail, setRememberEmail] = useState(false)
  const user = auth.currentUser

  useEffect(() => {
    if (typeof window !== "undefined") {
      setEmail(localStorage.getItem("email") || "")
      setRememberEmail(!!localStorage.getItem("email"))
    }
  }, [])

  const handleClick = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    // Set persistence to Local (default setting)
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // Once persistence is set, sign in the user
        return signInWithEmailAndPassword(auth, email, password)
      })
      .then((userCredential) => {
        toast({
          title: "Login successful.",
          description: "You have successfully signed in.",
        })
        setTimeout(() => {
          Router.push("/dashboard-two")
        }, 1500)

        const user = userCredential.user
        console.log(`User ${user.email} logged in.`)
        if (rememberEmail) {
          localStorage.setItem("email", email)
        } else {
          localStorage.removeItem("email")
        }
      })
      .catch((error) => {
        console.error(error)
        toast({
          title: "Something went wrong.",
          description: "Your sign in request failed. Please try again.",
          variant: "destructive",
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <form>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="checkbox"
            checked={rememberEmail}
            onChange={(e) => setRememberEmail(e.target.checked)}
          />
          <label>Remember Email</label>
        </div>
        <button onClick={handleClick} disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Sign In with Email
        </button>
        <Link href="/dashboard-two/">dw</Link>
        Welcome {user?.email}
      </div>
    </form>
  )
}
