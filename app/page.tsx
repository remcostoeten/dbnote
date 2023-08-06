import { HomeFeatures } from "./HomeFeatures"
import Link from "next/link"
import { Icon } from "@radix-ui/react-select"

import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"
import { CursorProvider } from "@/lib/CursorContext"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import CardComponent from "@/components/CardComponent"
import ToolCard from "@/components/CardComponent"
import CardContainer from "@/components/CardContainer"
import Banner from "@/components/CardContainer"
import Cursor from "@/components/Cursor"
import ReactIcon from "@/components/icons/ReactIcon"
import TypescriptIcon from "@/components/icons/TypescriptIcon"

import IconMap from "../components/icons/IconMap"
import FirebaseLogo from "./../components/icons/FirebaseLogo"
import IconGrid from "./../components/icons/IconGrid"
import NextIcon from "./../components/icons/NextIcon"
import ShadCn from "./../components/icons/ShadCn"
import TailwindIcon from "./../components/icons/TailwindIcon"
import { HomeIntroduction } from "./HomeIntroduction"
import TrustedBySwiper from "./../components/ui/Swiper"
import InfiniteSlider, { generateSlides } from "@/components/ui/Slide"
import Carousel from './../components/ui/Slide';
import { Card } from "@/components/ui/card"
async function getGitHubStars(): Promise<string | null> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/remcostoeten/remcostoeten.com",
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${env.GITHUB_ACCESS_TOKEN}`,
        },
        next: {
          revalidate: 60,
        },
      }
    )

    if (!response?.ok) {
      return null
    }

    const json = await response.json()

    return parseInt(json["stargazers_count"]).toLocaleString()
  } catch (error) {
    return null
  }
}


export default async function IndexPage() {
  const stars = await getGitHubStars()

  return (
    <>
      <Carousel />
      <HomeIntroduction title="Showcasing various UI's and features i've built." />
      <HomeFeatures />
      <div className="grid col-span-3 gap-3">
        {banners.map((banner, index) => (
          <div key={index}>
            <ToolCard title={banner.title} description={banner.description} icon={banner.icon} />
          </div>
        ))}

      </div>
    </>
  )
}
