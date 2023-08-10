'use client'; import React from 'react'
import { motion } from 'framer-motion'

export const HomeFeatures = () => (
  <motion.section
    id="features"
    className="  bg-slate-50  dark:bg-transparent git"
  >
    <div className="flex items-center flex-col bigContainer space-y-6 pb-2 pt-2 md:pb-12 md:pt-10 lg:py-12  text-center">
      <motion.h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl" initial={{ skewX: -9, opacity: 0, y: -20 }}
        animate={{ skewX: 0, opacity: 1, y: 0 }}
        transition={{ delay: .75, duration: 0.5 }}>
        Features
      </motion.h2>
      <motion.p className="container w-7/12 leading-normal text-muted-foreground sm:text-lg sm:leading-7" initial={{ skewX: -9, opacity: 0, y: -20 }}
        animate={{ skewX: 0, opacity: 1, y: 0 }}
        transition={{ delay: .8, duration: 0.5 }}>
        This project contains a mix off showcasing stuff I build. A lot of experiments stuff which I build to learn new things. Besides that some productivity tools I build for myself.
      </motion.p>
    </div>
  </motion.section >
)

export default HomeFeatures