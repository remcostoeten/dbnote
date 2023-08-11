import React from "react"
import { Drawer } from "vaul"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export default function ThoughtCard() {
  const title = "This is a title"
  const paragraph =
    "Add a payment method so that we can process the charge. This transaction is non-refundable. This domain registration will auto-renew for $18.99 for the second year."

  return (
    <>
      <div className="p-6 font-notes mt-8 mb-8 bg-[#212028] border-card rounded-2xl border-zinc-800 border">
        <div className="top flex-col flex align-middle gap-4">
          <div className="flex gap-2 w-full">
            <div className="flex gap-4 align-middle items-center flex-1">
              <div className="rounded-xl w-14 h-14 align-middle items-center justify-center bg-[#2E2D35] mr-2 flex flex-col text-center">
                <span className="font-notes text-xs text-[#5D5C63] uppercase">
                  Tue
                </span>
                <span className="text-notes -translate-y-.5 text-lg font-notes-bold uppercase">
                  25
                </span>
              </div>
              <div className="flex flex-col items">
                <span className="text-[#EDEDEE] text-lg font-notes-bold font-notes">
                  {title.slice(0, 25)}
                </span>
                <span className="text-[#5D5C63] font-notes">20:36</span>
              </div>
            </div>
            <ContextMenu>
              <ContextMenuTrigger>. . . </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Edit</ContextMenuItem>
                <ContextMenuItem>Delete</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>
          <p className="text-[#5D5C63] font-notes ">{paragraph.slice(0, 40)}</p>
        </div>
      </div>
    </>
  )
}
// https://dribbble.com/shots/20675942-Blank-Roadmap
// https://dribbble.com/shots/20709368-datadock-web-design-visuals-app
