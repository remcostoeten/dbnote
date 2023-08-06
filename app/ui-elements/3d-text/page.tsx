"use client"

import { MouseEvent, useEffect, useRef } from "react"

import Text3d from "@/components/Text3d"
import PageSetting from "@/components/ui-dashboard/PageSetting"

export default function Home() {
  const plane = useRef(null);
  const maxRotate = 45

  useEffect(() => {
    document.body.classList.add("d-perspective")
    return () => {
      document.body.classList.remove("d-perspective")
    }
  }, [])

  const manageMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const x = e.clientX / window.innerWidth
    const y = e.clientY / window.innerHeight
    const perspective = window.innerWidth * 4
    const rotateX = maxRotate * x - maxRotate / 2
    const rotateY = (maxRotate * y - maxRotate / 2) * -1
    if (plane.current) {
      plane.current.style.transform = `perspective(${perspective}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg)`
    }
  }

  const changeColorToggle = () => {
    document.body.classList.toggle("d-perspective--color")
  }

  return (
    <>
      <PageSetting
        title="Page Settings"
        description="Configure your settings"
        settings={[
          {
            id: "necessary",
            title: "Necessary Cookies",
            description:
              "These cookies are essential for the website to function.",
            defaultChecked: true,
            onToggle: (isChecked) => {
              console.log("Necessary Cookies toggled:", isChecked)
            },
          },
        ]}
      />
      <div className="perspective-text">
        <div
          onMouseMove={(e) => {
            manageMouseMove(e)
          }}
          className="perspective-text__inner "
        >
          <div ref={plane} className="flex flex-col gap-8 perspective-text__wrapper">

            <Text3d primary={"Hover me"} secondary={"Woooooo"} />
            <Text3d primary={"Also me!"} secondary={"Boooooooo"} />
            <Text3d primary={"Usecase?"} secondary={"I don't know"} />
            <Text3d primary={"But cool"} secondary={"I suppose"} />
          </div>
        </div>
      </div>
    </>
  )
}
