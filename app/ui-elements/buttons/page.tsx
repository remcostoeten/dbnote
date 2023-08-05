import Link from "next/link"

import { Button, buttonVariants } from "@/components/ui/button"

import CustomButtons from "../../../components/buttons/CustomButtons"

export default function page() {
    return (
        <>
            <h1 className="text-4xl font-semibold">
                All the buttons in this project
            </h1>
            <div className="flex flex-col">
                <CustomButtons />
            </div>
        </>
    )
}
