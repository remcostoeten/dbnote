"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { priorities, statuses } from "@/components/data"

interface DataTableToolbarProps<TData> {
  table?: any
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return <></>
}
