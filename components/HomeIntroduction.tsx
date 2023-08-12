"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { GlowButton, ProminentGlowButton, SwapButton, WeakGlowButton } from "@/components/buttons/CustomButtons"

export const HomeIntroduction = ({ title }) => {
  return (
    <section className="space-y-6 pb-2 pt-2 md:pb-12 md:pt-10 lg:py-12">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center pb-8">
        <motion.h1
          className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ skewX: -4, opacity: 0, y: -20 }}
          animate={{ skewX: 0, opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="max-w-[48rem] w-full leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          initial={{ skewX: 4, opacity: 0, y: -40 }}
          animate={{ skewX: 0, opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          I&apos;m a <span className="dutch">dutch</span> creative front-end developer
          with a graphic design degree. Passionate about unique development and creating UI's with micro-interactions.
        </motion.p>

        <div className="absolute h-[20vh] w-[50vw]"></div>

        <motion.div className="z-10 flex items-center align-middle space-x-4" initial={{ skewX: 4, opacity: 0, y: -40 }}
          animate={{ skewX: 0, opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}>
          <ProminentGlowButton link="/dashboard" text="Go to dashboard" />
          <WeakGlowButton link="https://github.com/remcostoeten" text="Github" />
        </motion.div>
      </div>
    </section >
  )
}
