"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { getAuth } from "firebase/auth"
import { useSelectedLayoutSegment } from "next/navigation"
import { MainNavItem } from "types"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"
import LogoIconOnly from "./LogoIconOnly"
import { toast } from "@/components/ui/use-toast"

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
}

export function MainNav({ items, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)
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

  return (
    <div className="flex w-full gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <LogoIconOnly />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden w-full gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </Link>
          ))}
          <span className="flex-end flex w-full items-center justify-end">
            {isLoggedIn ? (
              <button className="cursor-pointer" onClick={signOut}>
                Logout
              </button>
            ) : (
              <Link href="https://github.com/remcostoeten" target="_blank">
                Github
              </Link>
            )}
          </span>
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.logo />}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  )
}
