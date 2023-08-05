"use client"

import { useEffect } from "react"
import Link from "next/link"

import { BlobButton, GlowButton } from "@/components/buttons/CustomButtons"

export default function UiLinks() {
    useEffect(() => {
        const pageUrl = window.location.pathname.split("/").pop()
        console.log(pageUrl)
    }, [])

    return (
        <section className="flex w-full items-center space-x-4 pb-8 pt-4 md:pb-10">
            <GlowButton
                link="https://github.com/remcostoeten/dbnote/blob/develop/components/buttons/CustomButtons.tsx"
                text="View component"
            />
        </section>
    )
}
