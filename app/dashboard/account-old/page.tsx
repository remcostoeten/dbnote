// "use client"
"use client"
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const

type AccountFormValues = {
  name: string;
  dob: Date;
  language: string;
}

const defaultValues: Partial<AccountFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
}

export function AccountForm() {
  const form = useForm<AccountFormValues>({
    defaultValues,
  })

  function onSubmit(data: AccountFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              {/* Rest of the code */}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Language</FormLabel>
              {/* Rest of the code */}
            </FormItem>
          )}
        />
        <Button type="submit">Update account</Button>
      </form>
    </Form>
  )
}

// import { Separator } from "@/components/ui/separator"
// import { AccountForm } from "./account-form"

// export default function SettingsAccountPage() {
//   return (
//     <div className="space-y-6">
//       <div>
//         <h3 className="text-lg font-medium">Account</h3>
//         <p className="text-sm text-muted-foreground">
//           Update your account settings. Set your preferred language and
//           timezone.
//         </p>
//       </div>
//       <Separator />
//       <AccountForm />
//     </div>
//   )
// }

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { getAuth, updateProfile } from "firebase/auth"

// import { toast } from "@/components/ui/use-toast"
// import ChangeUsername from "@/components/account/ChangeUsername"
// import DeleteAccount from "@/components/ui-dashboard/DeleteAccount"

// export default function UpdateNamePage() {
//   const [name, setName] = useState("")
//   const router = useRouter()
//   const auth = getAuth()

//   const handleForm = async (event: React.FormEvent) => {
//     event.preventDefault()

//     if (auth.currentUser) {
//       await updateProfile(auth.currentUser, {
//         displayName: name,
//       })

//       toast({
//         title: "Name updated!",
//       })

//       const updatedUser = getAuth().currentUser
//       if (updatedUser) {
//         setName(updatedUser.displayName || "")
//       }
//     }
//   }

//   const username = name || auth.currentUser?.displayName || ""

//   return (
//     <div className="flex min-h-screen flex-col ">
//       <div className="max-w-3xl">
//         <div className="grid items-start gap-8">
//           <div className="grid gap-1">
//             <ChangeUsername
//               buttontext="Update"
//               title="Update Name"
//               label="Name"
//             />
//             <DeleteAccount />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
