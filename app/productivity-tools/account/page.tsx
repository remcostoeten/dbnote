"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getAuth, updateProfile } from "firebase/auth"

import { toast } from "@/components/ui/use-toast"
import ChangeUsername from "@/components/account/ChangeUsername"

export default function UpdateNamePage() {
  const [name, setName] = useState("")
  const router = useRouter()
  const auth = getAuth()

  const handleForm = async (event: React.FormEvent) => {
    event.preventDefault()

    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: name,
      })

      toast({
        title: "Name updated!",
      })

      const updatedUser = getAuth().currentUser
      if (updatedUser) {
        setName(updatedUser.displayName || "")
      }
    }
  }

  const username = name || auth.currentUser?.displayName || ""

  return (
    <div className="flex min-h-screen flex-col ">
      <div className="max-w-3xl">
        <div className="grid items-start gap-8">
          <div className="flex flex-col gap-2 px-2">
            <div className="grid gap-1">
              <h1 className="font-heading text-3xl md:text-4xl">
                <ChangeUsername
                  buttontext="Update"
                  title="Update Name"
                  label="Name"
                />
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
