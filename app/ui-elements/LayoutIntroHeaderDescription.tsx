"use client"
import React from "react"
import Link from "next/link"
import {
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui-dashboard/page-nav"
import { motion } from "framer-motion"

export const LayoutIntroHeaderDescription = () => (
  <>
    <motion.span
      className="mb-2 inline-block font-heading text-4xl sm:mb-0 lg:text-5xl"
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: .5 }}
    >
      Some examples which I have not abbandoned yet.
    </motion.span>
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}>
      <PageHeaderDescription>
        Dashboard, e-commerce, blogs, landing pages, parallax scrolls, portfolio
        designs, authentication pages... I've made countless UI's which I all have
        scrapped. Some{" "}
        <Link
          className="default font-normal underline"
          href="https://github.com/remcostoeten/remcostoeten.com"
          target="_blank"
        >
          repos
        </Link>
        have over 700+ commits before getting sick off it.
      </PageHeaderDescription>
    </motion.div>
  </>
)
