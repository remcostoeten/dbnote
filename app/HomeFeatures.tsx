'use client'; import React from 'react'
import { motion } from 'framer-motion'

export const HomeFeatures = () => (
  <motion.section
    id="features"
    className="  bg-slate-50  dark:bg-transparent git"
    initial={{ skewX: -9, opacity: 0, y: -20 }}
    animate={{ skewX: 0, opacity: 1, y: 0 }}
    transition={{ delay: .6, duration: 0.5 }}>
    <div className="container mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
      <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
        Features
      </h2>
      <p className="w-7/12 leading-normal text-muted-foreground sm:text-lg sm:leading-7">
        This project is an experiment to see how a modern app, with features
        like auth, subscriptions, API routes, and static pages would work in
        Next.js 13 app dir.
      </p>
    </div>
  </motion.section >
)

export default HomeFeatures