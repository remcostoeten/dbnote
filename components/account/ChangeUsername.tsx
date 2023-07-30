"use client"
import { useState } from "react"
import { getAuth, updateProfile } from "firebase/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function ChangeUsername(buttontext, title, label) {
  const [name, setName] = useState("")
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

      document.dispatchEvent(new CustomEvent("userUpdated"))
    }
  }

  const username = name || auth.currentUser?.displayName || ""

  return (
    <>
      <h1 className="font-heading text-3xl md:text-4xl">{title}</h1>
      <div className="-space-y-px rounded-md shadow-sm">
        <form className="mt-4 space-y-2" onSubmit={handleForm}>
          <Label htmlFor="name">{label}</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            placeholder={username}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            type="submit"
            className="inline-flex h-9 max-w-fit items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            {buttontext}
          </Button>
        </form>
      </div>
    </>
  )
}
