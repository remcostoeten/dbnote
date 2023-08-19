"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"

import AnimatedText from "./AnimatedText"
import "./styles.scss"
import PageSetting from "@/components/ui-dashboard/PageSetting"

export default function App() {
  const [replay, setReplay] = useState(true)
  // Placeholder text data, as if from API
  const placeholderText = [
    { type: "heading1", text: "Framer Motion" },
    {
      type: "heading2",
      text: "Animating responsive text!",
    },
  ]

  const container = {
    visible: {
      transition: {
        staggerChildren: 0.025,
      },
    },
  }

  // Quick and dirt for the example
  const handleReplay = () => {
    setReplay(!replay)
    setTimeout(() => {
      setReplay(true)
    }, 600)
  }

  return (
    <>
      {" "}
      <PageSetting
        settings={[
          {
            title: "Replay animation",
            defaultChecked: false,
            onToggle: (_isChecked) => {
              handleReplay()
            },
          },
        ]}
        description={""}
      />
      <motion.div
        className="reveal-animation"
        initial="hidden"
        animate={replay ? "visible" : "hidden"}
        variants={container}
      >
        <div className="container">
          {placeholderText.map((item, index) => {
            return <AnimatedText {...item} key={index} />
          })}
        </div>
      </motion.div>
    </>
  )
}
