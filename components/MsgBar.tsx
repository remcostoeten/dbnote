"use client"

import Link from "next/link"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { Separator } from "@radix-ui/react-separator"
import { motion } from "framer-motion"

export default function MsgBar() {
    return (
        <motion.span
            initial={{ scale: 0.8, opacity: 0, y: -40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, transition: { duration: 0.6 } }}
            transition={{
                delay: 0.1,
                duration: 0.5,
                ease: "easeInOut",
            }}
            className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
        >
            <Link href="roadmap">
                🎉 <Separator className="mx-2 h-4" orientation="vertical" />
                ETA off my own component library is ~ spring 2034.
                <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>{" "}
        </motion.span>
    )
}
