"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { onAuthStateChanged } from "firebase/auth"

import { MainNavItem } from "types"
import { siteConfig } from "@/config/site"
import { auth } from "@/lib/firebase"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"

import LogoIconOnly from "../LogoIconOnly"
import CustomMenu from "./custom-menu"

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
  hidecircel?: string
}

export function MainNav({ items, children }: MainNavProps) {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)
  const [userEmail, setUserEmail] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userProfilePicture, setUserProfilePicture] = useState<string | null>(
    null
  )

  const signOut = async () => {
    await auth.signOut()
    setIsLoggedIn(false)
    setUserEmail("")
    toast({
      title: "Goodbye " + userEmail,
    })
  }

  const deleteAccount = async () => {
    if (auth.currentUser) {
      try {
        await auth.currentUser.delete()
        setIsLoggedIn(false)
        setUserEmail("")
        toast({
          title: "Your account has been deleted",
        })
      } catch (error) {
        toast({
          title:
            "An error occurred while deleting your account. You may need to sign in again.",
        })
      }
    }
  }

  const fetchUserProfilePicture = async () => {
    if (auth.currentUser) {
      const photoURL = auth.currentUser.photoURL
      setUserProfilePicture(photoURL)
    }
  }

  useEffect(() => {
    fetchUserProfilePicture()
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(stripDomainFromEmail(user.email) || "User")
        setIsLoggedIn(true)
      } else {
        setUserEmail("")
        setIsLoggedIn(false)
      }
    })

    return () => unsubscribe()
  }, [])

  function stripDomainFromEmail(email: string | null): string {
    if (email && email.includes("@")) {
      return email.split("@")[0]
    }
    return email || ""
  }

  return (
    <div className="flex w-full gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <LogoIconOnly />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <>
          <nav className="hidden  gap-6 md:flex">
            {items?.map((item, index) => (
              <Link
                key={index}
                href={item.disabled ? "#" : item.href}
                className={cn(
                  "flex w-fit items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                  "text-foreground/60",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                {item.title}
              </Link>
            ))}
            <CustomMenu />
          </nav>
          <span className="flex-end flex-1 flex w-max items-center justify-end">
            {userProfilePicture && (
              <img
                src={userProfilePicture}
                alt="Profile Picture"
                className="w-10 h-10 rounded-full object-cover"
              />
            )}

            {isLoggedIn ? (
              <>
                <span
                  aria-label="Sign out"
                  className="h-button signout font-semibold"
                  data-text="Sign out"
                  onClick={signOut}
                >
                  <span>B</span>
                  <span>y</span>
                  <span>e</span>
                  <span>b</span>
                  <span>y</span>
                  <span>e</span>
                  <span>!</span>
                </span>
              </>
            ) : (
              <Link
                aria-label="Register"
                className="h-button font-semibold "
                data-text="Login"
                href="/login"
              >
                <span>R</span>
                <span>e</span>
                <span>g</span>
                <span>i</span>
                <span>s</span>
                <span>t</span>
                <span>e</span>
                <span>r</span>
              </Link>
            )}
          </span>
        </>
      ) : null}

      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <LogoIconOnly />}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  )
}
