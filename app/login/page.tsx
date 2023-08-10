"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import Google from "@/components/Google"
import LogoIconOnly from "@/components/LogoIconOnly"
import { Icons } from "@/components/icons"
import { BlobButton } from "@/components/buttons/CustomButtons"
import { GlowButton } from './../../components/buttons/CustomButtons';
import router from "next/router"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [rememberEmail, setRememberEmail] = useState(false)
  const auth = getAuth()
  const [user, setUser] = useState(null)
  const router = useRouter()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user as any)
      if (user) {
        router.push("/dashboard/settings")
      }
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setEmail(localStorage.getItem("email") || "")
      setRememberEmail(!!localStorage.getItem("email"))
    }
  }, [])

  useEffect(() => {
    if (user) {
      router.push("/dashboard/settings")
    }
  }, [user])

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()

    setIsGoogleLoading(true)

    signInWithPopup(auth, provider)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(`User ${user.displayName} logged in with Google.`)

        toast({
          title: "Google login successful.",
          description: `Welcome, ${user.displayName}!`,
        })

        router.push("/dashboard")
      })
      .catch((error) => {
        console.error(error)

        toast({
          title: "Google login failed.",
          description: "Failed to sign in with Google. Please try again.",
          variant: "destructive",
        })
      })
      .finally(() => {
        setIsGoogleLoading(false)
      })
  }

  const handleClick = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password)
      })
      .then((userCredential) => {
        toast({
          title: "Login successful.",
          description: "You have successfully signed in.",
        })
        router.push("/dashboard")

        const user = userCredential.user
        console.log(`User ${user.email} logged in.`)

        if (rememberEmail) {
          localStorage.setItem("email", email)
          console.log("remember email")
        } else {
          localStorage.removeItem("email")
        }
      })
  }

  return (
    <div className="container relative flex h-screen -translate-y-36 flex-col items-center justify-center">
      <Link href="/">
        <motion.div
          className="absolute left-0 top-4 flex items-center pl-8 align-middle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
        >
          <Icons.chevronLeft className="translate-y-1px mr-2 h-4 w-4" />
          <motion.div
            className="flex items-center   pr-2"
            whileHover={{ x: 2, filter: "blur(.2px)" }}
          >
            <span className="pl-4 font-extralight">go back</span>
          </motion.div>
        </motion.div>
      </Link>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="mx-auto">
            <LogoIconOnly />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and password to sign in to your account
          </p>
        </div>

        <form onSubmit={handleClick}>
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

              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                placeholder="Password"
                type="password"
                autoCapitalize="none"
                autoComplete="current-password"
                autoCorrect="off"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />

              <div className="mb-2 mt-2 flex items-center">
                <input
                  type="checkbox"
                  className="translate-y-0.5"
                  checked={rememberEmail}
                  onChange={() => setRememberEmail(!rememberEmail)}
                />
                <Label className="ml-2">Remember email</Label>
              </div>
            </div>

            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In with Email"
              )}
            </button>

          </div>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <GlowButton
          text=" Google"
          className="w-full text-center mx-auto flex justify-center"
          onClick={signInWithGoogle}
          disabled={isLoading || isGoogleLoading}
        >
          {isGoogleLoading ? (
            <>
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              Signing In...
            </>
          ) : (
            <>
              <div className="flex align-center items-center justify-center">
                <Google />
              </div>
            </>
          )}
        </GlowButton>

        <p className="px-8 text-center text-sm text-muted-foreground mx-auto">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div >
  )
}
