"use client"

import React, { useContext, useState } from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { PopoverProps } from "@radix-ui/react-popover"
import { is } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { useMutationObserver } from "@/hooks/use-mutation-observer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import TypescriptIcon from "@/components/icons/TypescriptIcon"

import { Model, ModelType } from "../data/models"
import { AppContext } from "./../AppContext"

function ModelSelector({ models, types, ...props }) {
  const [open, setOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState(models[0])
  const [peekedModel, setPeekedModel] = useState(models[0])
  const {
    isTypescript,
    setIsTypescript,
    isClientComponent,
    setIsClientComponent,
    wrapInFunctionComponent,
    setWrapInFunctionComponent,
  } = useContext(AppContext as any)

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between space-x-2 w-full">
        <Label htmlFor="typescript" className="flex flex-col space-y-1">
          <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col space-y-1 ">
            Typescript
          </span>
        </Label>
        <Switch
          id="typescript"
          checked={isTypescript}
          onCheckedChange={(isChecked) => {
            setIsTypescript(isChecked)
          }}
        />
      </div>
      <div className="flex items-center justify-between space-x-2 w-full">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="fc" className="flex flex-col space-y-1">
            <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col space-y-1 ">
              Functional component
            </span>
          </Label>
          <Switch
            id="fc"
            checked={wrapInFunctionComponent}
            onCheckedChange={(isChecked) => {
              setWrapInFunctionComponent(isChecked)
            }}
          />
        </div>
      </div>
      <div className="flex items-center justify-between space-x-2 w-full">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="client" className="flex flex-col space-y-1">
            <span className="font-normal leading-snug ">
              Prefix with 'use client'
            </span>
          </Label>
          <Switch
            id="client"
            checked={isClientComponent}
            onCheckedChange={(isChecked) => {
              setIsClientComponent(isChecked)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ModelSelector
