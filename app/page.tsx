import { HomeBanners } from "@/components/HomeBanners"
import { HomeFeatures } from "@/components/HomeFeatures"
import Link from "next/link"
import { Icon } from "@radix-ui/react-select"

import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"
import { CursorProvider } from "@/lib/CursorContext"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

import CardComponent from "@/components/homepage/CardComponent"
import ToolCard from "@/components/homepage/CardComponent"
import Cursor from "@/components/Cursor"
import ReactIcon from "@/components/icons/ReactIcon"
import TypescriptIcon from "@/components/icons/TypescriptIcon"

import IconMap from "../components/icons/IconMap"
import FirebaseLogo from "./../components/icons/FirebaseLogo"
import IconGrid from "./../components/icons/IconGrid"
import NextIcon from "./../components/icons/NextIcon"
import ShadCn from "./../components/icons/ShadCn"
import TailwindIcon from "./../components/icons/TailwindIcon"
import { Card } from "@/components/ui/card"
import { Carousel } from '@/components/homepage/Carousel'
import { HomeIntroduction } from '@/components/HomeIntroduction'
import { IconCarousel } from '@/components/homepage/IconCarousel'

export default async function IndexPage() {
  return (
    <>
      <HomeIntroduction title="Showcasing various UI's and features i've built." />
      <HomeFeatures />
      <HomeBanners />
      <IconCarousel />
    </>
  )
}
