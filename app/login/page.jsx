"use client"

import React, { useState } from "react"
import { Metadata } from "next"
import Link from "next/link"
import { Router, useRouter, useSearchParams } from "next/navigation"
import { Label } from "@radix-ui/react-label"
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth"
import { auth } from "@/lib/firebase"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import LogoIconOnly from "@/components/LogoIconOnly"
import { Icons } from "@/components/icons"
import Google from "@/components/Google"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  const signInWithGoogle = () => {
    const auth = getAuth()
    const provider = new GoogleAuthProvider()

    setIsGoogleLoading(true) // Set loading state while the sign-in process is ongoing

    signInWithPopup(auth, provider)
      .then((userCredential) => {
        // Google sign-in successful
        const user = userCredential.user
        console.log(`User ${user.displayName} logged in with Google.`)

        toast({
          title: "Google login successful.",
          description: `Welcome, ${user.displayName}!`,
        })

        router.push("/productivity-tools")
      })
      .catch((error) => {
        // Handle any errors that occur during the Google sign-in process
        console.error(error)

        toast({
          title: "Google login failed.",
          description: "Failed to sign in with Google. Please try again.",
          variant: "destructive",
        })
      })
      .finally(() => {
        setIsGoogleLoading(false) // Reset loading state
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
        router.push("/productivity-tools")

        const user = userCredential.user
        console.log(`User ${user.email} logged in.`)
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
    <>
      <div className="container flex h-screen flex-col items-center justify-center">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-4 top-4 md:left-8 md:top-8"
          )}
        >
          <>
            <Icons.chevronLeft className="mr-2 h-4 w-4" />
            Back
          </>
        </Link>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <div className="loginlogo">
              <LogoIconOnly />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and password to sign in to your account
            </p>
          </div>

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
              </div>
              <button
                onClick={handleClick}
                className={cn(buttonVariants())}
                disabled={isLoading}
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign In with Email
              </button>
            </div>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <button
            type="button"
            className={cn(buttonVariants({ variant: "outline" }))}
            onClick={signInWithGoogle}
            disabled={isLoading || isGoogleLoading}
          >
            {isGoogleLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Google className="mr-2 h-4 w-4" />
            )}{" "}
            Google
          </button>

          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link
              href="/register"
              className="hover:text-brand underline underline-offset-4"
            >
              Don&apos;t have an account? Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
