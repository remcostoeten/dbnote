"use client"

import React from "react"
import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"

const ThoughtDetail = ({ thought }) => {
  return (
    thought && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.3 }}
        className="icon-card border flex flex-col mb-4 justify-between rounded-md break-words p-6"
      >
        <h2>{thought.title || "No title"}</h2>
        <ReactMarkdown
          className="text-[#5D5C63] font-notes"
          rehypePlugins={[rehypeRaw]}
        >
          {thought.description || "No description"}
        </ReactMarkdown>
      </motion.div>
    )
  )
}

export default ThoughtDetail
