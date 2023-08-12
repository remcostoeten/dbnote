"use client"

import { useEffect } from "react"
import Link from "next/link"

import { BlobButton, GlowButton } from "@/components/buttons/CustomButtons"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { examples } from "@/components/ui-dashboard/example-nav"

export default function UiLinks() {
    const pathname = usePathname();
    const example = examples.find((example) => pathname?.startsWith(example.href));

    useEffect(() => {
        const pageUrl = window.location.pathname.split("/").pop()
        console.log(pageUrl)
    }, [])

    if (!example?.code) {
        return null;
    }

    return (
        <motion.section
            className="flex w-full items-center space-x-4 pb-8 pt-4 md:pb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
        >
            <Link href={example?.code} target="_blank" rel="nofollow"><GlowButton text="View component" /></Link>
        </motion.section>
    )
}
