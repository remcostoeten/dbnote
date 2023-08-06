"use client"

import Link from "next/link"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function CustomMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Ui showcase</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Various UI elements</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="ui-elements/buttons">Buttons</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/ui-elements/scroller">Infinite scroller</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/ui-elements/3d-text">3d text</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
