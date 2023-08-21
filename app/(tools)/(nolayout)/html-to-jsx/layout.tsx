"use client"

import { motion } from "framer-motion"
import { Link } from "lucide-react"

import MsgBar from "@/components/MsgBar"
import { ExamplesNav } from "@/components/ui-dashboard/example-nav"
import {
  PageHeader,
  PageHeaderDescription,
} from "@/components/ui-dashboard/page-nav"

import Typewriter from "./components/alternating-text"

export default function ConverterLayout({ children }) {
  return (
    <>
      <div className="container relative flex flex-col">
        <PageHeader className="page-header pb-8">
          <motion.span
            className="mb-2 inline-block font-heading text-4xl sm:mb-0 lg:text-5xl"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
          >
            Convert your HTML to <Typewriter />
          </motion.span>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <PageHeaderDescription>
              Simply paste in your HTML and get the JSX/TSX version. When you
              want to prefix the output with{" "}
              <pre className="inline-block"> 'use client '</pre> for NextJS
              simply toggle the switch. When using TypeScript you can also get a
              version with the types included by filling in the props.
            </PageHeaderDescription>
            {/* @ts-ignore */}
          </motion.div>
        </PageHeader>{" "}
        <main>
          {/* @ts-ignore */}
          <motion.div
            className=""
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            {children}
            {/* @ts-ignore */}
          </motion.div>
        </main>
      </div>
    </>
  )
}
