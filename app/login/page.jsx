"use client"

import React, { useEffect, useState } from "react"
import { Metadata } from "next"
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

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import Google from "@/components/Google"
import LogoIconOnly from "@/components/LogoIconOnly"
import { Icons } from "@/components/icons"

Checkbox

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [rememberEmail, setRememberEmail] = useState(false)
  const router = useRouter()
  const auth = getAuth()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      if (user) {
        router.push("/dashboard/my-account")
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
      router.push("/dashboard/my-account")
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
    <>
      {user ? (
        router.push("/dashboard/my-account")
      ) : (
        <div className="container flex h-[75vh] flex-col items-center justify-center">
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
                  <div className="items-top mt-2 mb-2 flex space-x-2">
                    <Input
                      type="checkbox"
                      className="peer h-4 w-4 text-primary-black bg-black focus:ring-primary-black"
                      checked={rememberEmail}
                      onChange={(e) => setRememberEmail(e.target.checked)}
                      id="terms1"
                    />

                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms1"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember email
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleClick}
                  className={cn(buttonVariants())}
                  disabled={isLoading}
                >
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
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <Google className="mr-2 h-4 w-4" />
                  Google
                </>
              )}
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
      )}
    </>
  )
}
