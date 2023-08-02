'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { getAuth } from "firebase/auth";

import { MainNavItem } from "types";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { MobileNav } from "@/components/mobile-nav";

import LogoIconOnly from "../LogoIconOnly";
import { auth } from "@/lib/firebase";

interface MainNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

export function MainNav({ items, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfilePicture, setUserProfilePicture] = useState<string | null>(null);

  const signOut = async () => {
  };

  const fetchUserProfilePicture = async () => {
    if (auth.currentUser) {
      const photoURL = auth.currentUser.photoURL;
      setUserProfilePicture(photoURL);
    }
  };

  useEffect(() => {
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
                  item.href.startsWith(`/${segment}`)
                    ? "text-foreground"
                    : "text-foreground/60",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                {item.title}
              </Link>
            ))}
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
              <button className="cursor-pointer" onClick={signOut}>
                Logout
              </button>
            ) : (
              <Link href="https://github.com/remcostoeten" target="_blank">
                Github
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
  );
}
function stripDomainFromEmail(email: string | null): React.SetStateAction<string> {
  throw new Error("Function not implemented.");
}
