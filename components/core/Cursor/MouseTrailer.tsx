"use client"

import React, { useEffect, useRef, useState } from "react"

import { toast } from "@/components/ui/use-toast"
import styles from "@/styles/modules/cursor.module.scss"

import GreenCursor from "./GreenCursor"

const Trailer: React.FC = () => {
  const trailer = useRef<HTMLDivElement>(null)
  const trailerIcon = useRef<HTMLSpanElement>(null)
  const [showSVG, setShowSVG] = useState(true)
  const [showCircle, setShowCircle] = useState(true)
  const [useClientCursor, setUseClientCursor] = useState(true)
  const [isTop2, setIsTop2] = useState(false)

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

  useEffect(() => {
    const handleScroll = () => {
      setIsTop2(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const interactable = e.target as HTMLElement
      const interacting = interactable.classList.contains("cursor-hover")
      const x = e.clientX - (trailer.current?.offsetWidth || 0) / 2
      const y = e.clientY - (trailer.current?.offsetHeight || 0) / 2

      if (useClientCursor && trailer.current) {
        const scaleValue = interacting && !showSVG ? 8 : 1
        const keyframes = {
          transform: `translate(${x}px, ${y}px) scale(${scaleValue})`,
        }
        if (y < 160 && useClientCursor) {
          setShowSVG(true)
          setShowCircle(false)
        } else {
          setShowSVG(false)
          setShowCircle(true)
          trailer.current.animate([keyframes], {
            duration: 1000,
            fill: "forwards",
          })
        }
      }

      if (trailer.current) {
        trailer.current.dataset.type = interacting
          ? interactable.dataset.type || ""
          : ""
      }

      setShowSVG(interacting && interactable.dataset.type === "showsvg")

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
    document.body.classList.toggle("no-cursor", showSVG)
    setShowCircle(!showSVG)
  }, [showSVG])

  const getTrailerClass = (type: string) => {
    switch (type) {
      case "cursor":
        return "fa-solid fa-play hand"
      default:
        return "fa-solid fa-arrow-up-right"
    }
  }

  useEffect(() => {
    document.body.classList.toggle("cursor-pointer", useClientCursor)
  }, [useClientCursor])

  const handleInputChange = () => {
    setUseClientCursor((prevState) => !prevState)
  }

  return (
    <>
      <div className="gap-2 m-2 p-2 w-full flex">
        <label className="switch flex items-center relative w-max cursor-pointer select-none">
          <input
            type="checkbox"
            onChange={handleInputChange}
            checked={useClientCursor}
            className="appearance-none transition-colors cursor-pointer w-14 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 bg-pink"
          />
          <span className="w-7 h-7 right-7 absolute rounded-full transform transition-transform bg-white pointer-events-none"></span>{" "}
        </label>
        <span className="">Turn {useClientCursor ? "off" : "on"} cursor</span>
      </div>

      <div
        ref={trailer}
        id={styles.trailer}
        className={`cursor${isTop2 ? " top-2" : ""}`}
      >
        {showCircle && !showSVG && <div className="cursor-trailer"></div>}
        <i id={styles.trailerIcon} className="fa-solid fa-arrow-up-right">
          {showSVG && useClientCursor && <GreenCursor />}
        </i>
      </div>
    </>
  )
}

export default Trailer
