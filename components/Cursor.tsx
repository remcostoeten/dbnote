"use client"

import React, { useEffect, useRef } from "react"

interface CursorProps {
  interacting?: boolean
}

const Cursor: React.FC<CursorProps> = ({ interacting }) => {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      className={`cursor ${interacting ? "interacting" : ""}`}
      ref={cursorRef}
    ></div>
  )
}

export default Cursor
