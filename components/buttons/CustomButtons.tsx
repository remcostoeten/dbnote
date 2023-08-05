"use client"

import Link from "next/link"

import { Button, buttonVariants } from "../ui/button"

export const GlowButton = ({ text, link }) => {
    return (
        <button className="button button--glow" type="button">
            {link ? <Link href={link}>{text}</Link> : text}
        </button>
    )
}

export const SwapButton = ({ text }) => {
    return (
        <button
            aria-label={text}
            className="h-button signout font-semibold"
            data-text={text}
        >
            <span>B</span>
            <span>y</span>
            <span>e</span>
            <span>b</span>
            <span>y</span>
            <span>e</span>
            <span>!</span>
        </button>
    )
}

export const BlobButton = ({ text }) => {
    return (
        <>
            <button className="blob-btn">
                Blob Button
                <span className="blob-btn__inner">
                    <span className="blob-btn__blobs">
                        <span className="blob-btn__blob"></span>
                        <span className="blob-btn__blob"></span>
                        <span className="blob-btn__blob"></span>
                        <span className="blob-btn__blob"></span>
                    </span>
                </span>
            </button>

            <svg className="goo" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur
                            in="SourceGraphic"
                            result="blur"
                            stdDeviation="10"
                        ></feGaussianBlur>
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                            result="goo"
                        ></feColorMatrix>
                        <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                    </filter>
                </defs>
            </svg>
        </>
    )
}

export const BorderButton = ({ text, variant }) => {
    return (
        <div className="border-btn h-[60px]">
            <div className="w-[180px] absolute  h-[60px]">
                <button className={`button button--border ${variant}`}>
                    <svg
                        width="180px"
                        height="60px"
                        viewBox="0 0 180 60"
                        className="border"
                    >
                        <polyline
                            points="179,1 179,59 1,59 1,1 179,1"
                            className="bg-line"
                        />
                        <polyline
                            points="179,1 179,59 1,59 1,1 179,1"
                            className="hl-line"
                        />
                    </svg>
                    <span>{text}</span>
                </button>
            </div>
        </div>
    )
}

export default function CustomButtons() {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="font-semibold">
                Swap buton (hover to see effect === bugged
            </h2>
            <SwapButton text="Swap on hover" />{" "}
            <h2 className="font-semibold ">Stock shadcn/ui</h2>
            <Button className={buttonVariants({ variant: "outline" })}>
                Click here
            </Button>
            <h2 className="font-semibold m">Stock shadcn/ui Link"</h2>
            <Link href="#" className={buttonVariants({ variant: "outline" })}>
                Click here
            </Link>
            <h2 className="font-semibold ">Glow on hover</h2>
            <GlowButton text="Glow on hover" link={undefined} />
            <h2 className="font-semibold ">Blob buton</h2>
            <BlobButton text="Blob on hover" />
            <h2 className="font-semibold">Border buton</h2>
            <div className="flex gap-2">
                <BorderButton text="Border on hover" variant={undefined} />
                <div className="absolute left-[270px]">
                    <BorderButton variant="teal" text="Border on hover" />
                </div>
            </div>
        </div>
    )
}
