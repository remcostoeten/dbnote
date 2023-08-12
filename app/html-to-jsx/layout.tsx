"use client"

import { motion } from "framer-motion"
import { Link } from "lucide-react"

import MsgBar from "@/components/MsgBar"
import { ExamplesNav } from "@/components/ui-dashboard/example-nav"
import {
  PageHeader,
  PageHeaderDescription,
} from "@/components/ui-dashboard/page-nav"

import { LayoutIntroHeaderDescription } from "../ui-elements/LayoutIntroHeaderDescription"
import UiLinks from "../ui-elements/ui-links"

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
            Convert your HTML to JSX
          </motion.span>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <PageHeaderDescription>
              Simply paste in your HTML and get the JSX version. Also works for
              plain SVG's. Working on adding a function to wrap the entire
              output in a component with/withour props.
            </PageHeaderDescription>
          </motion.div>
        </PageHeader>{" "}
        <section>
          <motion.div
            className=""
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            {children}
          </motion.div>
        </section>
      </div>
    </>
  )
}
