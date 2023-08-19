"use client"

import React from "react"
import { motion } from "framer-motion"

import AnimatedTextCharacter from "./AnimateText"

// Assuming both components are in the same directory

const AnimatedTextWord = ({ text, direction }) => {
  const words = text.split(" ")

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", fontSize: "2rem" }}
    >
      {words.map((word, index) => (
        <div style={{ marginRight: "5px" }} key={index}>
          <AnimatedTextCharacter text={word} />
        </div>
      ))}
    </motion.div>
  )
}

export default AnimatedTextWord
