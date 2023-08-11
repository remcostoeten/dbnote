"use client"

import React from "react"

import NotesIcon from "@/components/icons/NotesIcon"

import { NewThought } from "./NewThought"
import ThoughtCard from "./ThoughtCard"

export default function AllThoughts() {
  return (
    <>
      <div className="flex w-4/12  flex-col px-4 py-6  ">
        <div className="flex w-full ">
          <div className="flex gap-1 w-full">
            <NotesIcon />
            <span className="pl-3 text-xl text-notes font-notes">
              All thoughts
            </span>
          </div>
          <NewThought content={undefined} />
        </div>
        <div className="seperator-notes"></div>
        <div className="flex flex-col gap-4 py-4">
          <ThoughtCard />
        </div>
      </div>
    </>
  )
}
