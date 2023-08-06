"use client"

import { useEffect, useRef } from "react"

import Text3d from "@/components/Text3d"

export default function Home() {
  const plane = useRef(null)
  const maxRotate = 45

  useEffect(() => {
    document.body.classList.add("d-perspective")
    return () => {
      document.body.classList.remove("d-perspective")
    }
  }, [])

  const manageMouseMove = (e) => {
    const x = e.clientX / window.innerWidth
    const y = e.clientY / window.innerHeight
    const perspective = window.innerWidth * 4
    const rotateX = maxRotate * x - maxRotate / 2
    const rotateY = (maxRotate * y - maxRotate / 2) * -1
    plane.current.style.transform = `perspective(${perspective}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg)`
  }

  return (
    <div className="text-wrapper">
      <div
        onMouseMove={(e) => {
          manageMouseMove(e)
        }}
        className="text-container"
      >
        <div ref={plane} className="text-wrapper">
          <Text3d primary={"Turning"} secondary={"Turning"} />
          <Text3d primary={"Space"} secondary={"Space"} />
          <Text3d primary={"Into"} secondary={"Into"} />
          <Text3d primary={"Shapes"} secondary={"Shapes"} />
        </div>
      </div>
    </div>
  )
}
