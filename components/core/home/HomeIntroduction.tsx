"use client"

import React from "react"

import { ButtonSection, Paragraph, Title } from "./HomeIntroductionComponents"

interface HomeIntroductionProps {
  title: string
}

const HomeIntroduction: React.FC<HomeIntroductionProps> = ({ title }) => {
  return (
    <section className="hand-hover showsvg space-y-6 pb-2 pt-2 md:pb-12 md:pt-10 lg:py-12">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 pb-8 text-center">
        <Title title={title} />
        <Paragraph />
        <ButtonSection />
      </div>
    </section>
  )
}

export default HomeIntroduction
