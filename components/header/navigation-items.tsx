"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { onAuthStateChanged } from "firebase/auth"
import { motion } from "framer-motion"

import { MainNavItem } from "types"
import { auth } from "@/lib/firebase"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"

import LogoIconOnly from "../LogoIconOnly"
import Megamenu from "../Megamenu"
import { WeakGlowButton } from "../buttons/CustomButtons"

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
  hidecircel?: string
}

export function MainNav({ items, children }: MainNavProps) {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)
  const [userEmail, setUserEmail] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userProfilePicture, setUserProfilePicture] = useState<string | null>(
    null
  )

  if (!items) {
    return null
  }

  const signOut = async () => {
    await auth.signOut()
    setIsLoggedIn(false)
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
    <div className="cursor-hover">
      <div className="flex w-full gap-6 md:gap-10  items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="cursor-hover"
        >
          <Link
            href="/"
            className="cursor-hover hidden items-center space-x-2 md:flex"
          >
            <LogoIconOnly />
          </Link>
        </motion.div>
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
          >
            {item.target === "_blank" ? (
              <a
                href={item.href}
                className={cn(
                  "flex cursor-hover w-fit items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                  "text-white ",
                  item.done === false && "cursor-not-allowed opacity-80"
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.title}
              </a>
            ) : (
              <Link
                href={item.done ? item.href : item.href}
                className={cn(
                  "flex w-fit items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                  "text-white ",
                  item.done === false && "cursor-not-allowed opacity-80"
                )}
              >
                {item.title}
              </Link>
            )}
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * (items.length + 1), duration: 0.5 }}
        >
          <Megamenu />
        </motion.div>

        <span className="flex-end flex w-max flex-1 items-center justify-end">
          {userProfilePicture && (
            <motion.img
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (items.length + 2), duration: 0.5 }}
              src={userProfilePicture}
              alt="Profile Picture"
              className="h-10 w-10 rounded-full object-cover"
            />
          )}

          {isLoggedIn ? (
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (items.length + 3), duration: 0.5 }}
              onClick={signOut}
              data-type="cursor"
              className="cursor-hover"
            >
              <WeakGlowButton text="Sign Out" link="#" />
            </motion.span>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (items.length + 3), duration: 0.5 }}
            >
              <WeakGlowButton text="Login" link="/login" />
            </motion.div>
          )}
        </span>
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * (items.length + 4), duration: 0.5 }}
          className="flex items-center space-x-2 md:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <Icons.close /> : <LogoIconOnly />}
          <span className="font-bold">Menu</span>
        </motion.button>
        {showMobileMenu && items && (
          <MobileNav items={items}>{children}</MobileNav>
        )}
      </div>
    </div>
  )
}
