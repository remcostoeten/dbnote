'use client';
import { useEffect, useRef } from 'react';
import { TimelineLite, SlowMo, Elastic } from 'gsap';
import styles from './styles.module.css';
import { Button, buttonVariants } from '../ui/button';
import Link from 'next/link';
const GlowButton = ({ text }) => {
    return (
        <button className="button button--glow" type="button">{text}</button>
    )
}

const SwapButton = ({ text }) => {
    return (
        <button
            aria-label={text}
            className="h-button  signout font-semibold"
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



const BlobButton = ({ text }) => {
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

            <svg className='goo' xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo"></feColorMatrix>
                        <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                    </filter>
                </defs>
            </svg>

        </>
    )
}

const BorderButton = ({ text }) => {
    return (
        <div className="border-btn">
            <div className="center">
                <button className="button button--border">
                    <svg width="180px" height="60px" viewBox="0 0 180 60" className="border">
                        <polyline points="179,1 179,59 1,59 1,1 179,1" clasNames="bg-line" />
                        <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
                    </svg>
                    <span>{text}</span>
                </button>
            </div>
        </div >
    )
}

export default function CustomButtons() {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="font-semibold">Swap buton (hover to see effect === bugged</h2>
            <SwapButton text="Swap on hover" /> <h2 className="font-semibold ">Stock shadcn/ui</h2>
            <Button className={buttonVariants({ variant: "outline" })}>Click here</Button>
            <h2 className="font-semibold m">Stock shadcn/ui Link"</h2>
            <Link href='#' className={buttonVariants({ variant: "outline" })}>Click here</Link>
            <h2 className="font-semibold ">Glow on hover</h2>
            <GlowButton text="Glow on hover" />
            <h2 className="font-semibold ">Blob buton</h2>
            <BlobButton text="Blob on hover" />
            <h2 className="font-semibold">Border buton</h2>
            <BorderButton text="Border on hover" />


        </div>
    )
}
