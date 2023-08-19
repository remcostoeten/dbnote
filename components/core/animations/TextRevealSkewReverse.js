"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"

import AnimatedText from "./AnimatedText"

export default function TextRevealSkewReverse() {
  const [replay, setReplay] = useState(true)
  const placeholderText = [
    { type: "heading1", text: "Framer Motion" },
    {
      type: "heading2",
      text: "Animating responsive text!",
    },
  ]

  const container = {
    hidden: {
      // Change 'visible' to 'hidden'
      transition: {
        staggerChildren: 0.025,
      },
    },
    visible: {
      transition: {
        staggerChildren: 0.025,
      },
    },
  }

  const hiddenItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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
          return (
            <motion.div
              key={index}
              variants={hiddenItem} // Use the new hiddenItem variant
            >
              <AnimatedText {...item} />
            </motion.div>
          )
        })}
      </div>
      <button onClick={handleReplay}>
        Replay <span>⟲</span>
      </button>
    </motion.div>
  )
}
