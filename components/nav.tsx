"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"; // Import the useState and useEffect hooks
import { getAuth } from "firebase/auth"; // Import the getAuth function from Firebase

import { SidebarNavItem } from "types"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface DashboardNavProps {
  items: SidebarNavItem[]
}

export function DashboardNav({ items }: DashboardNavProps) {
  const path = usePathname()

  // State variables to hold the user's profile picture and username
  const [userProfilePicture, setUserProfilePicture] = useState(null);
  const [username, setUsername] = useState("");

  // Fetch the user's profile picture and name when the component mounts
  useEffect(() => {
    const auth = getAuth();
    if (auth.currentUser) {
      setUserProfilePicture(auth.currentUser.photoURL as any);
      setUsername(auth.currentUser.displayName || "");
    }
  }, []);

  if (!items?.length) {
    return null
  }

  return (
    <nav className="grid items-start gap-2">
      <div className="flex items-center gap-4 font-semibold font-2xl mb-4">
        {userProfilePicture && (
          <img
            src={userProfilePicture}
            alt="Profile Picture"
            className="w-12 h-12 rounded-full object-cover"
          />
        )}

        {username && (
          <span className="text-xl font-medium">{username}</span>
        )}
      </div>
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"]
        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path === item.href ? "bg-accent" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        )
      })}
    </nav>
  )
}
