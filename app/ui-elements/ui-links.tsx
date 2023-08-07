"use client"

import { useEffect } from "react"
import Link from "next/link"

import { BlobButton, GlowButton } from "@/components/buttons/CustomButtons"
import { motion } from "framer-motion"

export default function UiLinks() {
    useEffect(() => {
        const pageUrl = window.location.pathname.split("/").pop()
        console.log(pageUrl)
    }, [])

    return (
        <motion.section className="flex w-full items-center space-x-4 pb-8 pt-4 md:pb-10" initial={{
            opacity: 0, y: -20
        }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}>
            <GlowButton
                link="https://github.com/remcostoeten/dbnote/blob/develop/components/buttons/CustomButtons.tsx"
                text="View component"
            />
        </motion.section >
    )
}
