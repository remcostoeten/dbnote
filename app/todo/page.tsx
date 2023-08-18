import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"

import { UserNav } from "@/components/data-tables/user-nav"
import { taskSchema } from "@/components/data-tables/data/schema"
import { db } from "@/lib/firebase"
import { getDocs, collection } from "firebase/firestore"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "@/components/columns"
export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker built using Tanstack Table.",
}

async function getTasks() {
  const querySnapshot = await getDocs(collection(db, "tasks"))
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
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="todos hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Todos for my self!
            </h2>
            <p className="text-muted-foreground">
              Just some tasks I want to do for this site.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable data={tasks as unknown[]} columns={[]} />
      </div>
    </>
  )
}
