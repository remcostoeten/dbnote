import * as React from "react"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

import { MainNavItem } from "types"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { useLockBody } from "@/hooks/use-lock-body"
import { Icons } from "@/components/icons"

import LogoIconOnly from "./LogoIconOnly"

interface MobileNavProps {
  items: MainNavItem[]
  children?: React.ReactNode
}

const textVariants = {
  full: {
    opacity: 1,
  },
  hide: (custom: number) => ({
    clipPath: `polygon(0% 0%, ${100 - custom}% 0%, ${
      100 - custom
    }% 100%, 0% 100%)`,
    transition: { ease: [0.16, 1, 0.3, 1], duration: custom * 0.05 }, // Using Bezier
  }),
}

export function MobileNav({ items, children }: MobileNavProps) {
  useLockBody()
  const [isHovered, setHovered] = useState(false)
  const siteName = "remcostoeten"

  return (
    <div
      className={cn(
        "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden"
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <Link href="/" className="flex items-center space-x-2">
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <LogoIconOnly />
            <motion.span
              custom={siteName.length * 10} // This is the percentage by which we reduce the width of the text for each letter
              variants={textVariants}
              initial="full"
              animate={isHovered ? "full" : "hide"}
            >
              {siteName}
            </motion.span>
          </div>
        </Link>
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  )
}
