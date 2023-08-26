"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

import { BorderButton } from "@/components/buttons/CustomButtons"
import { examples } from "@/components/ui-dashboard/example-nav"

export default function UiLinks() {
  const pathname = usePathname()
  const example = examples.find((example) => pathname?.startsWith(example.href))

  useEffect(() => {
    const pageUrl = window.location.pathname.split("/").pop()
    console.log(pageUrl)
  }, [])

  if (!example?.code) {
    return null
  }

  return (
    <motion.section
      className="flex w-full items-center space-x-4 pb-8 pt-4 md:pb-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
    >
      <Link href={example?.code} target="_blank" rel="nofollow">
        <BorderButton text="View component" />
      </Link>
    </motion.section>
  )
}
