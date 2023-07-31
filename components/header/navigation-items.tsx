'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { MainNavItem } from "types";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { MobileNav } from "@/components/mobile-nav";
import { FirebaseApp } from "firebase/app";
import LogoIconOnly from "../LogoIconOnly";
import { getAuth } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { motion } from "framer-motion";
interface MainNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

export function MainNav({ items, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfilePicture, setUserProfilePicture] = useState<string | null>(null); // State to hold the user's profile picture

  const signOut = async () => {
    // ... (existing signOut code)
  };

  // Function to fetch the user's profile picture
  const fetchUserProfilePicture = async () => {
    if (auth.currentUser) {
      const photoURL = auth.currentUser.photoURL;
      setUserProfilePicture(photoURL);
    }
  };

  useEffect(() => {
    // Fetch the user's profile picture when the component mounts
    fetchUserProfilePicture();
  }, []);

  useEffect(() => {
    async function checkLoggedInStatus() {
      const user = auth.currentUser;
      if (user) {
        setUserEmail(stripDomainFromEmail(user.email) || "User");
        setIsLoggedIn(true);
      } else {
        setUserEmail("");
        setIsLoggedIn(false);
      }
    }

    checkLoggedInStatus();
  }, []);

  return (
    <div className="flex w-full gap-6 md:gap-10">
      <span className="hidden items-center space-x-2 md:flex">
        <LogoIconOnly />
        <motion.span initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </motion.span>
      </span>
      {items?.length ? (
        <>
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="hidden  gap-6 md:flex"
          >
            {items?.map((item, index) => (
              <Link
                key={index}
                href={item.disabled ? "#" : item.href}
                className={cn(
                  "flex w-fit items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                  item.href.startsWith(`/${segment}`)
                    ? "text-foreground"
                    : "text-foreground/60",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                {item.title}
              </Link>
            ))}
          </motion.nav>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-end flex-1 flex w-max items-center justify-end"
          >
            {userProfilePicture && (
              <motion.img
                src={userProfilePicture}
                alt="Profile Picture"
                className="w-10 h-10 rounded-full object-cover"
              />
            )}

            {isLoggedIn ? (
              <motion.button
                className="cursor-pointer"
                onClick={signOut}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            ) : (
              <Link href="https://github.com/remcostoeten" target="_blank">
                <motion.a
                  className="cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Github
                </motion.a>
              </Link>
            )}
          </motion.span>
        </>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {/* Rest of the code */}
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  );
}
