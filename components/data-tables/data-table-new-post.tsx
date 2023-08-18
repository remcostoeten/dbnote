import * as React from "react"
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import { Column } from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { Post } from "@/lib/types"
import { setPriority } from "os"
import { auth, db } from "@/lib/firebase"
import { Task } from "../data-schema"
import { toast } from "../ui/use-toast"
import { handleSubmit } from "@/app/api/submitData"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { stat } from "fs"
import { motion } from "framer-motion"

interface DataTableNewPost<TData, TValue> {
  column?: Column<TData, TValue>
  titlee?: string
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
}

export function DataTableNewPost<TData, TValue>({
  column,
  titlee,
  options,
}: DataTableNewPost<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues()
  const selectedValues = new Set(column?.getFilterValue() as string[])
  const [task, setTask] = React.useState("")
  const [priority, setPriority] = React.useState("")
  const [status, setStatus] = React.useState("")
  const [label, setLabel] = React.useState("")
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [createdAt, setCreatedAt] = React.useState("")
  const [posts, setPosts] = React.useState<Post[]>([])
  const user = auth?.currentUser

  const addPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) {
      return
    }

    try {
      const newPost: Post = {
        task,
        priority,
        status,
        label,
        title,
        description,
        createdAt: serverTimestamp(),
        id: "",
      }
      const docRef = await addDoc(collection(db, "posts"), newPost)
      newPost.id = docRef.id

      setPosts([...posts, newPost])
      setTask("")
      setPriority("")
      setStatus("")
      setLabel("")
      setTitle("")
      setDescription("")
      setCreatedAt("")
      toast({
        title: "Task created sucessfully",
        description: "With the title " + title,
      })
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
      })
      console.log(error.message)
    }
  }

  const form = (
    <motion.form
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.9 }}
      onSubmit={addPost}
      className="flex flex-col gap-2"
    >
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />

      <Input
        type="text"
        placeholder="Priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      />

      <Input
        type="text"
        placeholder="Label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <Textarea
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Button
        onClick={(e) => {
          e.preventDefault()
          addPost(e as any)
        }}
        className="inline-flex w-fit"
      >
        New post
      </Button>
    </motion.form>
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex h-8 items-center justify-center border-dashed align-middle"
        >
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          New task
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="" align="start">
        {form}
      </PopoverContent>
    </Popover>
  )
}
