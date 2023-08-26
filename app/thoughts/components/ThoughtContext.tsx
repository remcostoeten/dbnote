'use client';
import React, { createContext, useContext, useState } from "react"

export const ThoughtContext = createContext<string[]>([])

export function ThoughtProvider({ children }: { children: React.ReactNode }) {
  const labelOptions = ["Label 1", "Label 2", "Label 3"]

  return (
    <ThoughtContext.Provider value={labelOptions}>
      {children}
    </ThoughtContext.Provider>
  )
}

export function useThoughtContext() {
  return useContext(ThoughtContext)
}
