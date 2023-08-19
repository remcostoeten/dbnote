"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"

import AnimatedCharacters from "./AnimatedText"

export default function TextRevealSkew() {
  const [replay, setReplay] = useState(true)
  ;("use client")
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

  const handleReplay = () => {
    setReplay(!replay)
    setTimeout(() => {
      setReplay(true)
    }, 600)
  }

  return (
    <motion.div
      className="App"
      initial="hidden"
      animate={replay ? "visible" : "hidden"}
      variants={container}
    >
      <div className="container">
        {placeholderText.map((item, index) => {
          return <AnimatedCharacters {...item} key={index} />
        })}
      </div>
      <button onClick={handleReplay}>
        Replay <span>⟲</span>
      </button>
    </motion.div>
  )
}
