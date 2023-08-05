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
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Showcasing various UI's and features i've built.
          </h1>

          <p className="mmax-w-[48rem] w-full leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            I&apos;m a <span className="dutch">dutch</span> front-end developer
            with a graphic design degree. Passionate about building beautiful
            applications. And lately features which help me be more productive.
          </p>

          <div className="absolute h-[20vh] w-[50vw]"></div>

          <div className="z-10 flex items-center align-middle space-x-4">
            <Link
              aria-label="Register"
              className="h-button  inline-flex items-center justify-center text-sm font-medium transition-colors  disabled:opacity-50  h-11 px-8 rounded-md"
              data-text="Dashboard"
              href="/dashboard"
            >
              <div>Dashboard</div>

              <span>s</span>
              <span>o</span>
              <span>m</span>
              <span>e</span>
              <span>t</span>
              <span>e</span>
              <span>x</span>
              <span>t</span>
            </Link>

            <Link
              aria-label="Github"
              className="h-button b-button h-[44px] px-8 rounded-md"
              data-text="Github"
              href="https://github.com/remcostoeten"
              target={"_blank"}
            >
              <span class="colored-text">Dashboard</span>
              <span>G</span>
              <span>i</span>
              <span>v</span>
              <span>e</span>
              <span>s</span>
              <span>t</span>
              <span>a</span>
              <span>r</span>
            </Link>
          </div>
        </div>
      </section>
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
