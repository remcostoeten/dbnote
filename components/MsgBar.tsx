"use client"

import Link from "next/link"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { Separator } from "@radix-ui/react-separator"
import { motion } from "framer-motion"

export default function MsgBar() {
    return (
        <motion.span
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: .5 }}
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
