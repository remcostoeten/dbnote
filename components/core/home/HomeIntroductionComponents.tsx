"use client"

import React from "react"
import { motion } from "framer-motion"

import {
  GlowButton,
  ProminentGlowButton,
} from "@/components/buttons/CustomButtons"

interface AnimationProps {
  skewX: number
  opacity: number
  y: number
}

interface Variants {
  initial: AnimationProps
  animate: AnimationProps
  transition: {
    delay: number
    duration: number
  }
}

const titleAnimation: Variants = {
  initial: { skewX: -4, opacity: 0, y: 20 },
  animate: { skewX: 0, opacity: 1, y: 0 },
  transition: { delay: 0.5, duration: 0.5 },
}

const paragraphAnimation: Variants = {
  initial: { skewX: 4, opacity: 0, y: 40 },
  animate: { skewX: 0, opacity: 1, y: 0 },
  transition: { delay: 0.6, duration: 0.5 },
}

const buttonSectionAnimation: Variants = {
  initial: { skewX: 4, opacity: 0, y: 40 },
  animate: { skewX: 0, opacity: 1, y: 0 },
  transition: { delay: 0.7, duration: 0.5 },
}

interface TitleProps {
  title: string
}

export const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <motion.h1
      className="z-10 font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
      initial={titleAnimation.initial}
      animate={titleAnimation.animate}
      transition={titleAnimation.transition}
    >
      {title}
    </motion.h1>
  )
}

export const Paragraph: React.FC = () => {
  return (
    <motion.p
      className="cursor-hover w-full max-w-[48rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
      initial={paragraphAnimation.initial}
      animate={paragraphAnimation.animate}
      transition={paragraphAnimation.transition}
    >
      I&apos;m a <span className="dutch">dutch</span> creative front-end
      developer with a graphic design degree. Passionate about unique
      development and creating UI's with micro-interactions.
    </motion.p>
  )
}

export const ButtonSection: React.FC = () => {
  return (
    <motion.div
      className="z-10 flex cursor-hover items-center space-x-6 align-middle"
      initial={buttonSectionAnimation.initial}
      animate={buttonSectionAnimation.animate}
      transition={buttonSectionAnimation.transition}
    >
      <ProminentGlowButton text="Go to dashboard" />
      <GlowButton link="https://github.com/remcostoeten" text="Github" />
    </motion.div>
  )
}
