import { title } from "process"
import { useEffect, useState } from "react"
import { cn } from "@/lib"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import {
  BellIcon,
  CheckIcon,
  MixerHorizontalIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover"
import { Separator } from "@radix-ui/react-select"
import { Switch } from "@radix-ui/react-switch"
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore"
import { motion } from "framer-motion"
import { Button } from "react-day-picker"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"

import { auth, db } from "@/lib/firebase"
import { Thought } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { DataTableViewOptions } from "@/components/ui/data-table-view-options"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import TrashIcon from "@/components/icons/TrashIcon"

import { GlowButton } from "./../../../components/buttons/CustomButtons"
import { type } from "./../../../types/index.d"
import { useThoughtContext } from "./ThoughtContext"
import ThoughtDetail from "./ThoughtSingle"

export default function ThoughtCard() {
  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [selectedThought, setSelectedThought] = useState<Thought | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedLabel, setSelectedLabel] = useState<string>("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const labelOptions = useThoughtContext()
  const [selectedValues, setSelectedValues] = useState(new Set())

  const [filterValue, setFilterValue] = useState([])

  const updateFilterValue = (values) => {
    setFilterValue(values)
  }
  const fetchThoughts = () => {
    const thoughtsCollection = collection(db, "thoughts")
    let q = query(thoughtsCollection, orderBy("selectedDate", sortOrder))

    if (selectedLabel) {
      q = query(
        thoughtsCollection,
        where("label", "==", selectedLabel),
        orderBy("selectedDate", sortOrder)
      )
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const thoughtsData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Thought[]
      setThoughts(thoughtsData)
    })

    return unsubscribe
  }

  useEffect(() => {
    const unsubscribe = fetchThoughts()
    return () => unsubscribe()
  }, [selectedLabel, sortOrder])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchThoughts()
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleRemove = (thoughtId: string) => {
    setThoughts((prev) => prev.filter((t) => t.id !== thoughtId))

    if (selectedThought && selectedThought.id === thoughtId) {
      setSelectedThought(null)
    }

    setTimeout(async () => {
      try {
        await deleteDoc(doc(db, "thoughts", thoughtId))
        toast({
          title: "Note deleted successfully.",
        })
      } catch (error) {
        toast({
          title: "Couldn't delete note.",
          variant: "destructive",
        })
        console.error(error)
      }
    }, 500)
  }

  const handleRemoveAll = async () => {
    try {
      const thoughtsCollection = collection(db, "thoughts")
      const snapshot = await getDocs(thoughtsCollection)

      const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref))

      await Promise.all(deletePromises)

      toast({
        title: "All notes deleted successfully.",
      })
    } catch (error) {
      toast({
        title: "Couldn't delete notes.",
        variant: "destructive",
      })
      console.error(error)
    }
  }

  const handleSelect = (thoughtId: string) => {
    console.log(`Note with id ${thoughtId} clicked`)
    const selected = thoughts.find((t) => t.id === thoughtId)
    setSelectedThought(selected || null)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <motion.input
            initial={{ opacity: 0, y: 40, x: 10 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            placeholder="Filter Thoughts..."
            className="border h-[50px] border-[#27272a] bg-transparent pl-4 placeholder:[#fafafa] placeholder:text-[#fafafa] text-[#fafafa] px-3"
          ></motion.input>
        </div>

        <div className="flex items-center gap-4">
          <motion.select
            initial={{ opacity: 0, y: 20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="border cursor-hover border-[#27272a] text-[#fafafa] border-input hover:bg-accent hover:text-accent-foreground px-3 rounded-md note-btn ml-auto hidden h-[100%] lg:flex"
            value={selectedLabel}
            onChange={(e) => setSelectedLabel(e.target.value)}
          >
            <option value="">All Labels</option>
            {labelOptions.map((label) => (
              <motion.option
                initial={{ opacity: 0, y: 20, x: 20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                key={label}
                value={label}
              >
                {label}
              </motion.option>
            ))}
          </motion.select>
          <motion.select
            initial={{ opacity: 0, y: 20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="border cursor-hover border-[#27272a]  text-[#fafafa] border-input hover:bg-accent hover:text-accent-foreground px-3 rounded-md note-btn ml-auto hidden h-[100%] lg:flex"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          >
            <motion.option
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              value="asc"
            >
              Ascending
            </motion.option>
            <motion.option
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              value="desc"
            >
              Descending
            </motion.option>
          </motion.select>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.75, duration: 0.5 }}
          >
            <DataTableViewOptions />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            onClick={handleRemoveAll}
            className=" z-20  ml-4"
          >
            <TrashIcon />
          </motion.p>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-1/4">
          {thoughts.map((thought, index) => (
            <motion.div
              key={thought.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
              className={`icon-card border flex flex-col mb-4 justify-between rounded-md break-words p-6 ${
                selectedThought && selectedThought.id === thought.id
                  ? "active"
                  : ""
              }`}
              onClick={() => handleSelect(thought.id)}
            >
              <div className="top sidebar-notes flex-col flex align-middle gap-4">
                <div className="flex gap-2 w-full">
                  <div className="flex items-center absolute right-2 bottom-2">
                    <span className="bg-black border  text-notes-secondary py-2 px-6 rounded-full text-xs">
                      {thought.label}
                    </span>
                  </div>
                  <div className="flex gap-4 align-middle items-center flex-1">
                    <div className="rounded-xl w-14 h-14 align-middle items-center justify-center mr-2 flex flex-col text-center border">
                      <span className="font-notes text-xs text-[#5D5C63] uppercase">
                        {thought.selectedDate
                          ? thought.selectedDate
                              .toDate()
                              .toLocaleString("en-US", {
                                weekday: "short",
                              })
                          : "N/A"}
                      </span>

                      <span className="text-notes -translate-y-.5 text-lg font-notes-bold uppercase">
                        {thought.selectedDate
                          ? thought.selectedDate.toDate().getDate()
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex flex-col items">
                      <span className="text-[#EDEDEE] text-lg font-notes-bold font-notes">
                        {thought.title}
                      </span>
                      <span className="text-[#5D5C63] font-notes">
                        {thought.createdAt
                          ? thought.createdAt
                              .toDate()
                              .toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                  <ContextMenu>
                    <ContextMenuTrigger>...</ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem>Edit</ContextMenuItem>
                      <ContextMenuItem>
                        <span onClick={() => handleRemove(thought.id)}>
                          Delete
                        </span>
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                </div>
                <ReactMarkdown
                  className="text-[#5D5C63] font-notes"
                  rehypePlugins={[rehypeRaw]}
                >
                  {thought.description
                    ? thought.description.length > 40
                      ? thought.description.slice(0, 40) + "..."
                      : thought.description
                    : ""}
                </ReactMarkdown>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="w-3/4">
          <ThoughtDetail thought={selectedThought} />
        </div>
      </div>
    </div>
  )
}
