import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"

import { columns } from "@/components/data-tables/columns"
import { DataTable } from "@/components/data-tables/data-table"
import { UserNav } from "@/components/data-tables/user-nav"
import { taskSchema } from "@/components/data-tables/data/schema"
import { db } from "@/lib/firebase"
import { getDocs, collection } from "firebase/firestore"

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}

async function getTasks() {
  const querySnapshot = await getDocs(collection(db, "tasks"))
  const tasks = []
  querySnapshot.forEach((doc) => {
    tasks.push(doc.data())
  })

  return z.array(taskSchema).parse(tasks)
}

// async function getTasks() {
//   const data = await fs.readFile(
//     path.join(process.cwd(), "components/data-tables/data/tasks.json")
//   )

//   const tasks = JSON.parse(data.toString())

//   return z.array(taskSchema).parse(tasks)
// }

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
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}
