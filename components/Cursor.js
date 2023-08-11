"use client"

import { useEffect, useState } from "react"

import { useCursor } from "@/lib/CursorContext"

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
        setCursorSize("20px")
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
    <>
      <div
        className="trailer"
        style={{
          width: "20px",
          height: "20px",
          backgroundColor: "white",
          position: "fixed",
          zIndex: 9999,

          transform: `translate3d(${position.x ? 0 : 0}px, ${
            position.y - (linkHovered ? 0 : 0)
          }px, 0)`,
        }}
      ></div>

      {/* <svg
        width="25"
        height="25"
        viewBox="0 0 511.997 511.997"
        style={{
          transition: "scale 1s cubic-bezier(.33,.98,0,0.84), opacity 0.5s",
          position: "fixed",
          zIndex: 9999,
          pointerEvents: "none",
          transform: `translate3d(${position.x - (linkHovered ? 0 : 0)}px, ${
            position.y - (linkHovered ? 0 : 0)
          }px, 0)`,
        }}
      >
        <path
          fill="#31b970"
          d="M79.441 465.149L93.243 15.04 432.554 311.109 225.245 317.635z"
        ></path>
        <path
          fill="#31b970"
          d="M442.443 299.778L103.132 3.708A15.046 15.046 0 0087.23 1.253a15.044 15.044 0 00-9.02 13.324L64.409 464.686a15.04 15.04 0 0025.73 11.034l100.716-101.896 56.337 129.144c2.468 5.655 7.994 9.03 13.793 9.03 2.008 0 4.049-.405 6.007-1.257l71.403-31.148c7.613-3.321 11.092-12.185 7.771-19.8l-35.485-81.344c-3.321-7.615-12.188-11.094-19.8-7.771-7.613 3.321-11.092 12.187-7.771 19.8l29.472 67.558-43.831 19.12-55.126-126.368 18.099-18.311 201.306-6.336a15.038 15.038 0 009.413-26.363zm-207.486 2.504l-55.764-127.83c-3.321-7.612-12.184-11.092-19.8-7.771-7.613 3.321-11.092 12.187-7.771 19.8l55.764 127.83L95.647 427.359l11.656-380.09L393.83 297.283l-158.873 4.999z"
        ></path>
      </svg> */}
    </>
  )
}
