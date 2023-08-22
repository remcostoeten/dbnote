"use client"

import AnimatedTextCharacter from "@/components/AnimateText"
import TextRevealSkew from "@/components/core/animations/TextRevealSkew"

export default function Home() {
  return (
    <>
      <TextRevealSkew />
      <AnimatedTextCharacter text="remcostoeten" />
    </>
  )
}
