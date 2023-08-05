"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"

export const HomeIntroduction = ({ title }) => {
  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
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
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          I&apos;m a <span className="dutch">dutch</span> front-end developer
          with a graphic design degree. Passionate about building beautiful
          applications. And lately features which help me be more productive.
        </motion.p>

        <div className="absolute h-[20vh] w-[50vw]"></div>

        <div className="z-10 flex items-center align-middle space-x-4">
          <Link
            aria-label="Register"
            className="h-button  inline-flex items-center justify-center text-sm font-medium transition-colors  disabled:opacity-50  h-11 px-8 rounded-md"
            data-text="Dashboard"
            href="/dashboard"
          >
            <div>Dashboard</div>

            <span>s</span>
            <span>o</span>
            <span>m</span>
            <span>e</span>
            <span>t</span>
            <span>e</span>
            <span>x</span>
            <span>t</span>
          </Link>

          <Link
            aria-label="Github"
            className="h-button b-button h-[44px] px-8 rounded-md"
            data-text="Github"
            href="https://github.com/remcostoeten"
            target={"_blank"}
          >
            <span className="colored-text">Dashboard</span>
            <span>G</span>
            <span>i</span>
            <span>v</span>
            <span>e</span>
            <span>s</span>
            <span>t</span>
            <span>a</span>
            <span>r</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
