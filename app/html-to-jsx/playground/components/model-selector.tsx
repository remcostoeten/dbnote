"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { PopoverProps } from "@radix-ui/react-popover"
import { is } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { useMutationObserver } from "@/hooks/use-mutation-observer"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
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

interface ModelSelectorProps extends PopoverProps {
  types: readonly ModelType[]
  models: Model[]
}

export function ModelSelector({ models, types, ...props }: ModelSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedModel, setSelectedModel] = React.useState<Model>(models[0])
  const [peekedModel, setPeekedModel] = React.useState<Model>(models[0])
  const { isTypescript, setIsTypescript } = React.useContext(AppContext)
  const { isClientComponent, setIsClientComponent } =
    React.useContext(AppContext)
  const { wrapInFunctionComponent, setWrapInFunctionComponent } =
    React.useContext(AppContext)

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
      </div>{" "}
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
      </div>{" "}
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
