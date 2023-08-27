import { Metadata } from "next"
import Image from "next/image"
import { collection, getDocs } from "firebase/firestore"
import { z } from "zod"

import { db } from "@/lib/firebase"
import { columns } from "@/components/data-tables/columns"
import { DataTable } from "@/components/data-tables/data-table"
import { taskSchema } from "@/components/data-tables/data/schema"
import { UserNav } from "@/components/data-tables/user-nav"

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker built using Tanstack Table.",
}

async function getTasks() {
  const querySnapshot = await getDocs(collection(db, "notes"))
  const tasks = []
  querySnapshot.forEach((doc) => {
    const taskData = doc.data() as any
  })

  return z.array(taskSchema).parse(tasks)
}

export default async function TaskPage() {
  const tasks = await getTasks()

  return (
    <>
      <div className="todos  h-full flex-1 flex-col space-y-8 p-8 flex">
        <div className="flex items-center flex-col gap-2 md:flex-row justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Todos for my self!
            </h2>
            <p className="text-muted-foreground">
              Just some tasks I want to do for this site.
            </p>
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}
