"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { NavigationMenu } from "@radix-ui/react-navigation-menu"
import { onAuthStateChanged } from "firebase/auth"

import { MainNavItem } from "types"
import { siteConfig } from "@/config/site"
import { auth } from "@/lib/firebase"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"

import LogoIconOnly from "../LogoIconOnly"

import { motion } from "framer-motion"
import { GlowButton, WeakGlowButton } from "../buttons/CustomButtons"
import Megamenu from "../Megamenu"

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

  if (!items) {
    return null
  }

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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <Link href="/" className="hidden items-center space-x-2 md:flex">
          <LogoIconOnly />
          <span className="hidden font-bold sm:inline-block">
            {siteConfig.name}
          </span>
        </Link>
      </motion.div>
      {items?.length ? (
        <>
          <nav className="hidden items-center gap-6 md:flex">
            {items?.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
              >
                <Link
                  href={item.done ? item.href : item.href} // Disable link if "done" is false
                  className={cn(
                    "flex w-fit items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                    "text-white ",
                    item.done === false && "cursor-not-allowed opacity-80" // Add "disabled" class if "done" is false
                  )}
                >
                  {item.title}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
            </motion.div>
          </nav>
          <Megamenu />
          <span className="flex-end flex w-max flex-1 items-center justify-end">
            {userProfilePicture && (
              <motion.img
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (items?.length + 2), duration: 0.5 }}
                src={userProfilePicture}
                alt="Profile Picture"
                className="h-10 w-10 rounded-full object-cover"
              />
            )}

            {isLoggedIn ? (
              <>
                <motion.span
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 * (items?.length + 3),
                    duration: 0.5,
                  }}
                  onClick={signOut}
                >
                  <GlowButton text="Sign Out" link="#" />
                </motion.span>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (items?.length + 3), duration: 0.5 }}
              >
                <WeakGlowButton text=" Login" link="/login" />
              </motion.div>
            )}
          </span>
        </>
      ) : null}

      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * (items?.length + 4), duration: 0.5 }}
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
  );
}
