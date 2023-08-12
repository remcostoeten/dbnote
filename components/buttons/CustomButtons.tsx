import { ReactNode } from "react"
import Link from "next/link"

import { Button, buttonVariants } from "../ui/button"

interface ButtonProps {
  text: string
  className?: string
  link?: string
  onClick?: () => void
  disabled?: boolean
  children?: React.ReactNode
}

export const GlowButton = ({
  text,
  className,
  link,
  onClick,
  disabled,
}: ButtonProps) => {
  return (
    <button
      className={`${className ? className + " " : ""}button button--glow`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {link ? <Link href={link}>{text}</Link> : text}
    </button>
  )
}

export const WeakGlowButton = ({ text, link }) => {
  return (
    <button className="button button--glow weak" type="button">
      {link ? <Link href={link}>{text}</Link> : text}
    </button>
  )
}

export const ProminentGlowButton = ({ text, link }) => {
  return (
    <button className="button button--glow prominent" type="button">
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

interface BlobButtonProps {
  text: string
  icon?: string
}

export const BlobButton = ({ text, icon }: BlobButtonProps) => {
  return (
    <>
      <button className="blob-btn">
        {icon && <i className={icon}></i>}
        {text}
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
              values="1 0 0 0 0 0 1 0   0 0 0 0 1 0 0 0 0 0 21 -7"
              result="goo"
            ></feColorMatrix>
            <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
          </filter>
        </defs>
      </svg>
    </>
  )
}

export const RoundedGlowButton = ({ text }) => {
  return (
    <div className="relative button-rounded-glow">
      <button className="button-rounded-glow__inner " type="button">{text}</button>
      <div className="button-rounded-glow__bg"></div>
    </div>
  )
}

export const BorderButton = ({ text, variant = "" }) => {
  return (
    <div className="border-btn h-[60px]">
      <div className="absolute h-[60px] w-[155px]">
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
        Swap button (hover to see effect) === bugged
      </h2>
      <SwapButton text="Swap on hover" />
      <h2 className="font-semibold">Stock remcostoeten/ui</h2>
      <Button className={buttonVariants({ variant: "outline" })}>
        Click here
      </Button>
      <h2 className="font-semibold">Stock remcostoeten/ui Link</h2>
      <Link href="#" className={buttonVariants({ variant: "outline" })}>
        Click here
      </Link>
      <h2 className="font-semibold">Weak Glow</h2>
      <WeakGlowButton text="Weak Glow on hover" link={undefined} />
      <h2 className="font-semibold">Glow on hover</h2>
      <GlowButton text="Glow on hover" link={undefined} />
      <h2 className="font-semibold">Rounded glow</h2>
      <RoundedGlowButton text="Glow rounded" />
      <h2 className="font-semibold">Prominent Glow</h2>
      <ProminentGlowButton text="Prominent Glow on hover" link={undefined} />
      <h2 className="font-semibold">Blob button</h2>
      <BlobButton text="Blob on hover" />
      <h2 className="font-semibold">Border button</h2>
      <div className="flex flex-col gap-2 sm:flex-row">
        <BorderButton text="Border on hover" variant={undefined} />
        <div className="left-[270px] sm:absolute">
          <BorderButton variant="teal" text="Border on hover" />
        </div>
      </div>
    </div>
  )
}
