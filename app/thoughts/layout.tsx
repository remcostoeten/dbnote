"use client"

import { useEffect, useState } from "react"
import { User } from "firebase/auth"

import { AuthProvider } from "@/lib/AuthContext"
import { auth } from "@/lib/firebase"
import withAuth from "@/lib/withAuth"
import { SiteFooter } from "@/components/site-footer"

import { SidebarNav } from "./../ui-elements/forms/components/sidebar-nav"
import AllNotes from "./components/AllThoughts"
import AllThoughts from "./components/AllThoughts"
import Draw from "./components/Draw"
import { ThoughtProvider } from "./components/ThoughtContext"
import { ThoughtsAside } from "./components/ThoughtsAside."

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/examples/forms",
  },
  {
    title: "Account",
    href: "/examples/forms/account",
  },
  {
    title: "Appearance",
    href: "/examples/forms/appearance",
  },
  {
    title: "Notifications",
    href: "/examples/forms/notifications",
  },
  {
    title: "Display",
    href: "/examples/forms/display",
  },
]

interface RootLayoutProps {
  children: React.ReactNode
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <ThoughtProvider>
        <div className="flex relative container  flex-col">
          {/* <ThoughtsAside /> */}
          {/* {/* <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 flex-col lg:max-w-2xl">{children}dd</div> */}
        </div>
        <div className="flex-1 flex-col lg:max-w-2xl">{children}dd</div>
      </ThoughtProvider>
    </>
  )
}
export default withAuth(RootLayout)
