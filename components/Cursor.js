"use client"

import { useEffect, useState } from "react"

import { useCursor } from "@/lib/CursorContext"
import { set } from "date-fns"

export default function Cursor() {
  const { cursorSize, setCursorSize } = useCursor()
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [linkHovered, setLinkHovered] = useState(false)
  const [showHand, setShowHand] = useState(false)
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const onMouseOver = (e) => {
      if (e.target.getAttribute("cursorIncreaseSize") === "true") {
        setLinkHovered(true)
        setCursorSize("60px")
      }

      if (e.target.getAttribute("showHand") === "true") {
        setShowHand(true)
      }

      if (e.target.getAttribute("hideCircel") === "true") {
        setCursorSize("0px")
      }
    }

    const onMouseOut = (e) => {
      if (e.target.getAttribute("cursorIncreaseSize") === "true") {
        setLinkHovered(false)
        setCursorSize("20px")
      }

      if (e.target.getAttribute("showHand") === "true") {
        setShowHand(false)
      }

      if (e.target.getAttribute("hideCircel") === "true") {
        setCursorSize("0")
      }
    }

    const onMouseDown = (e) => {
      setClicked(true)
    }

    const onMouseUp = (e) => {
      setClicked(false)
    }

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseover", onMouseOver)
    document.addEventListener("mouseout", onMouseOut)
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mouseup", onMouseUp)

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseover", onMouseOver)
      document.removeEventListener("mouseout", onMouseOut)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
    }
  }, [setCursorSize])

  return (
    <div
      className={`cursor ${linkHovered ? "cursor-link-hovered" : ""} ${
        clicked ? "cursor-clicked" : ""
      }`}
      style={{
        position: "fixed",
        transform: `translate3d(${position.x - (linkHovered ? 0 : 0)}px, ${
          position.y - (linkHovered ? 0 : 0)
        }px, 0)`,
        left: linkHovered ? -20 : 0,
        top: linkHovered ? -20 : 0,
        width: linkHovered ? 100 : 25,
        height: linkHovered ? 100 : 25,
        backgroundColor: showHand ? "transparent" : "white",
        willChange: "transform",
        transitionTimingFunction: "cubic-bezier(.33,.28,0,1.14)",
        zIndex: 10,
        transition:
          "width 0.2s cubic-bezier(.33,.28,0,1.14), height 0.2s cubic-bezier(.33,.28,0,1.14), background-color 0.2s cubic-bezier(.33,.28,0,1.14)",
        zIndex: 1000,

        borderRadius: "50%",
        mixBlendMode: showHand ? "normal" : "difference",
        pointerEvents: "none",
      }}
    >
      <div className="cursor-circle-bg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="38"
          version="1.1"
          viewBox="0 0 356.534 356.534"
          xmlSpace="preserve"
          style={{
            opacity: showHand ? 1 : 0,
            transition: "scale 1s cubic-bezier(.33,.98,0,0.84), opacity 0.5s",
            scale: showHand ? 1 : 0,
            rotate: -25,
          }}
        >
          <path
            fill="#31b970"
            d="M165.03 182.948a12.002 12.002 0 018.559 8.559l30.537 116.279L321.592 34.942 48.749 152.409l116.281 30.539z"
          ></path>
          <path
            fill="#31b970"
            d="M353.02 3.515A12 12 0 00339.79.979L7.254 144.143a12.001 12.001 0 001.697 22.628l143.203 37.609 37.609 143.202a12 12 0 0022.627 1.696L355.555 16.746a11.999 11.999 0 00-2.535-13.231zM204.126 307.786l-30.537-116.279a12.002 12.002 0 00-8.559-8.559L48.749 152.409 321.592 34.942 204.126 307.786z"
          ></path>
        </svg>
      </div>
    </div>
  )
}
