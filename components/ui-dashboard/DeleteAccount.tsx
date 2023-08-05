"use client"

import React, { useState } from "react"

import { auth } from "@/lib/firebase"

import { Button } from "../ui/button"
import { toast } from "../ui/use-toast"

export default function DeleteAccount() {
  const [userEmail, setUserEmail] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
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
  return (
    <>
      <Button className="cursor-pointer" onClick={deleteAccount}>
        Delete Account
      </Button>
    </>
  )
}
