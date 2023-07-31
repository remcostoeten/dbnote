'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function Greeting() {
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const signOut = async () => {
    const auth = getAuth();
    await auth.signOut();
    setUserEmail("User");
    setIsLoggedIn(false);
    toast({
      title: "Goodbye " + userEmail,
    });
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(stripDomainFromEmail(user.email) || "User");
        setIsLoggedIn(true);
        setUsername(user.displayName || "User");
      } else {
        setUserEmail("");
        setIsLoggedIn(false);
        setUsername("User");
      }
    });

    return () => unsubscribe();
  }, []);

  function stripDomainFromEmail(email) {
    if (email && email.includes("@")) {
      return email.split("@")[0];
    }
    return email;
  }

  return (
    <div className="text-left">
      {isLoggedIn ? (
        <>
          <div className="border-1  pb-4 mb-3.5 space-betwee flex flex items-center  gap-2 border-b mb-4">
   
          <h1 className="flex flex-1 text-2xl font-semibold tracking-tight">

              Hello, {username}!
            </h1>
            <Button
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  color: "primary",
                  size: "sm",
                })
              )}
              onClick={signOut}
            >
              Sign Out
            </Button>
          </div>
        </>
      ) : (
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">
            You are not authenticated!
          </h2>
          <Link
            className={cn(
              buttonVariants({
                variant: "ghost",
                color: "primary",
                size: "sm",
              })
            )}
            href="/login"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
}
