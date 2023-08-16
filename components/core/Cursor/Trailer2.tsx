"use client"

import { useEffect, useState } from "react"
import type { AppProps } from "next/app"

export default function Trailer2() {
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })
  const [isHoveringSvg, setIsHoveringSvg] = useState<boolean>(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const svgElements = document.querySelectorAll(".svg-hover")

    const handleMouseEnter = () => setIsHoveringSvg(true)
    const handleMouseLeave = () => setIsHoveringSvg(false)

    svgElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter)
      element.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      svgElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter)
        element.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  const circleStyles = {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: "blue",
    position: "absolute",
    top: position.y + "px",
    left: position.x + "px",
    transform: "translate(-50%, -50%)",
    transition: isHoveringSvg ? "opacity 0.3s" : "none",
    opacity: isHoveringSvg ? 0 : 1,
  }

  const svgStyles = {
    position: "absolute",
    top: position.y + "px",
    left: position.x + "px",
    transform: "translate(-50%, -50%)",
    transition: isHoveringSvg ? "opacity 0.3s" : "none",
    opacity: isHoveringSvg ? 1 : 0,
  }
  return (
    <div>
      <div style={circleStyles}></div>
      <svg
        style={svgStyles}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17l-1-1h-2v-3H7v-2h1V7H7V5h1V4h2v1l1 1v8h2v2h-2v2h2.5v2H11zm5.5-2H15v-1h2v-2h-2v-.5H15V13h2.5v-.5H15V11h1.5V9H15V7.5h1V6h-3v1h1v1.5h-1v3h1.5v3H13v1.5h1V17z" />
      </svg>
    </div>
  )
}
