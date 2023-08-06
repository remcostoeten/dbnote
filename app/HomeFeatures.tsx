'use client'; import React from 'react'
import Banner from '@/components/CardContainer'
import { motion } from 'framer-motion'

export const HomeFeatures = ({ undefined }) => (
  <section
    id="features"
    className=" space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
  >
    <div className="container mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
      <motion.h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl" initial={{ skewX: 9, opacity: 0, y: -20 }}
        animate={{ skewX: 0, opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}>
        Features
      </motion.h2>
      <motion.p className="w-7/12 leading-normal text-muted-foreground sm:text-lg sm:leading-7" initial={{ skewX: -9, opacity: 0, y: -20 }}
        animate={{ skewX: 0, opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}>
        This project is an experiment to see how a modern app, with features
        like auth, subscriptions, API routes, and static pages would work in
        Next.js 13 app dir.
      </motion.p>
    </div>
    <Banner />
  </section>
)
