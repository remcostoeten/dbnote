import { HomeIntroduction } from './HomeIntroduction'
import Link from "next/link"
import { Icon } from "@radix-ui/react-select"

import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"
import { CursorProvider } from "@/lib/CursorContext"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import Cursor from "@/components/Cursor"

import IconMap from "../components/icons/IconMap"
import CardComponent from "@/components/CardComponent"
import FirebaseLogo from './../components/icons/FirebaseLogo';
import ReactIcon from "@/components/icons/ReactIcon"
import TailwindIcon from './../components/icons/TailwindIcon';
import TypescriptIcon from "@/components/icons/TypescriptIcon"
import NextIcon from './../components/icons/NextIcon';
import ShadCn from './../components/icons/ShadCn';
import IconGrid from './../components/icons/IconGrid';
import CardContainer from "@/components/CardContainer"
import ToolCard from "@/components/CardComponent"
import AutoScrollComponent from "@/components/Auttoscroll"
import Banner from "@/components/CardContainer"

async function getGitHubStars(): Promise<string | null> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/shadcn/taxonomy",
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
      <HomeIntroduction title="Showcasing various UI's and features i've built." />
      <section
        id="features"
        className=" space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="container mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="w-7/12 leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            This project is an experiment to see how a modern app, with features
            like auth, subscriptions, API routes, and static pages would work in
            Next.js 13 app dir.
          </p>
        </div>
        <Banner />
      </section>
    </>
  )
}