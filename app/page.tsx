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

          <div className="z-10 space-x-4">
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Go to Dashboard
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              GitHub
            </Link>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="w-7/12 leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            This project is an experiment to see how a modern app, with features
            like auth, subscriptions, API routes, and static pages would work in
            Next.js 13 app dir.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <CardComponent
            title="Firebase"
            description="For authentication + storage. Also some MySQL in the mix."
            icon={<FirebaseLogo />}
          />
          <CardComponent
            title="Next.js 13"
            description="App dir, Routing, Layouts, Loading UI and API routes."
            icon={<NextIcon />}
          />
          <CardComponent
            title="React 18"
            description="App dir, Routing, Layouts, Loading UI and API routes."
            icon={<ReactIcon />}
          />
          <CardComponent
            title="TailwindIcon"
            description="Tailwind for styling and some SCSS for animations."
            icon={<TailwindIcon />}
          />
          <CardComponent
            title="ShadCN/ui + Radix"
            description="For unstyled out of the box proper compopnents.."
            icon={<ShadCn />} />
          <CardComponent
            title="Typescript"
            description="For type safety and a better developer experience."
            icon={<TypescriptIcon />}
          />
        </div>
      </section>
    </>
  )
}
