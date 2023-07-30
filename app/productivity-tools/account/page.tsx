"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { getAuth, updateProfile } from "firebase/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

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

      // Update the username in this component without refreshing
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
                Update Your Name
              </h1>
              <p className="text-lg text-muted-foreground">
                Your current display name is {username}, if you do not like that
                one you can change it here. Free of charge. 🥳
              </p>
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <form className="mt-4 space-y-2" onSubmit={handleForm}>
                    <Label htmlFor="name">New display name</Label>
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
                      Update Name
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
