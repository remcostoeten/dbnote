"use client"

import React, { useEffect, useRef, useState } from "react"
import { Checkbox } from "@radix-ui/react-checkbox"
import { Switch } from "@radix-ui/react-switch"

import { toast } from "@/components/ui/use-toast"
import PageSetting from "@/components/ui-dashboard/PageSetting"
import styles from "@/styles/modules/cursor.module.scss"

const Trailer: React.FC = () => {
  const trailer = useRef<HTMLDivElement>(null)
  const trailerIcon = useRef<HTMLSpanElement>(null)
  const [showSVG, setShowSVG] = useState(false)
  const [showCircle, setShowCircle] = useState(true)
  const [useClientCursor, setUseClientCursor] = useState(true)

  useEffect(() => {
    const storedValue = localStorage.getItem("useClientCursor")
    setUseClientCursor(storedValue ? JSON.parse(storedValue) : true)
  }, [])

  useEffect(() => {
    localStorage.setItem("useClientCursor", JSON.stringify(useClientCursor))
    toast({
      title: `Cursor ${useClientCursor ? "enabled" : "disabled"}`,
    })
  }, [useClientCursor])

  const getTrailerClass = (type: string) => {
    switch (type) {
      case "cursor":
        return "fa-solid fa-play hand"
      default:
        return "fa-solid fa-arrow-up-right"
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const interactable = e.target as HTMLElement
      const interacting = interactable.classList.contains("cursor-hover")

      const x = e.clientX - (trailer.current?.offsetWidth || 0) / 2
      const y = e.clientY - (trailer.current?.offsetHeight || 0) / 2

      if (useClientCursor && trailer.current) {
        const keyframes = {
          transform: `translate(${x}px, ${y}px) scale(${interacting ? 8 : 1})`,
        }

        trailer.current.animate(keyframes, {
          duration: 1000,
          fill: "forwards",
        })
      }

      if (trailer.current) {
        trailer.current.dataset.type = interacting
          ? interactable.dataset.type || ""
          : ""
      }

      if (interacting && interactable.dataset.type === "showsvg") {
        setShowSVG(true)
      } else {
        setShowSVG(false)
      }

      if (interacting && trailerIcon.current) {
        trailerIcon.current.className = getTrailerClass(
          interactable.dataset.type || ""
        )
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [useClientCursor])

  useEffect(() => {
    if (showSVG === true) {
      console.log("showing svg")
      setTimeout(() => {
        setShowCircle(false)
      }, 1000)
    } else {
      setShowCircle(true)
    }
  }, [showSVG])

  return (
    <>
      <div className="gap-2 m-2 p-2 w-full flex">
        <label className="switch flex items-center relative w-max cursor-pointer select-none">
          <input
            type="checkbox"
            onChange={() => setUseClientCursor(!useClientCursor)}
            checked={useClientCursor}
            className="appearance-none transition-colors cursor-pointer w-14 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 bg-pink"
          />
          <span className="w-7 h-7 right-7 absolute rounded-full transform transition-transform bg-white" />
        </label>
        <span className="">Turn {useClientCursor ? "off" : "on"} cursor</span>
      </div>

      <div
        ref={trailer}
        id={styles.trailer}
        className={useClientCursor ? "cursor" : ""}
      >
        {showCircle && !showSVG && <div className="cursor-trailer"></div>}
        <i id={styles.trailerIcon} className="fa-solid fa-arrow-up-right">
          {showSVG && (
            <svg
              width="25"
              height="25"
              viewBox="0 0 511.997 511.997"
              className="customSvg absolute"
            >
              <path
                fill="#31b970"
                d="M79.441 465.149L93.243 15.04 432.554 311.109 225.245 317.635z"
              ></path>
              <path
                fill="#31b970"
                d="M442.443 299.778L103.132 3.708A15.046 15.046 0 0087.23 1.253a15.044 15.044 0 00-9.02 13.324L64.409 464.686a15.04 15.04 0 0025.73 11.034l100.716-101.896 56.337 129.144c2.468 5.655 7.994 9.03 13.793 9.03 2.008 0 4.049-.405 6.007-1.257l71.403-31.148c7.613-3.321 11.092-12.185 7.771-19.8l-35.485-81.344c-3.321-7.615-12.188-11.094-19.8-7.771-7.613 3.321-11.092 12.187-7.771 19.8l29.472 67.558-43.831 19.12-55.126-126.368 18.099-18.311 201.306-6.336a15.038 15.038 0 009.413-26.363zm-207.486 2.504l-55.764-127.83c-3.321-7.612-12.184-11.092-19.8-7.771-7.613 3.321-11.092 12.187-7.771 19.8l55.764 127.83L95.647 427.359l11.656-380.09L393.83 297.283l-158.873 4.999z"
              ></path>
            </svg>
          )}
        </i>
      </div>
    </>
  )
}

export default Trailer
