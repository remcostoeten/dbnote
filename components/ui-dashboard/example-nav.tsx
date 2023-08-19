"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export const examples = [
  {
    name: "Buttons",
    href: "/ui-elements/buttons",
    code: "https://github.com/remcostoeten/dbnote/blob/develop/components/buttons/CustomButtons.tsx",
  },
  {
    name: "Forms",
    href: "/ui-elements/forms",
    code: "https://github.com/remcostoeten/dbnote/tree/develop/app/ui-elements/forms",
  },
  {
    name: "3d text effect",
    href: "/ui-elements/3d-text",
    code: "https://github.com/remcostoeten/dbnote/blob/develop/components/Text3d.jsx",
  },
  {
    name: "Data table tasks",
    href: "/ui-elements/data-todos",
    code: "https://github.com/remcostoeten/dbnote/blob/develop/components/data-todos.jsx",
    page: "https://github.com/remcostoeten/dbnote/blob/develop/pages/ui-elements/data-tables/page.tsx",
  },
  {
    name: "Cursor trailer",
    href: "/ui-elements/mouse-trailer",
    code: "https://github.com/remcostoeten/dbnote/blob/develop/components/core/Cursor/MouseTrailer.tsx",
  },
  {
    name: "Text reveal animation",
    href: "/ui-elements/reveal-animations",
    code: "https://github.com/remcostoeten/dbnote/blob/develop/components/core/animations/TextRevealSkew.jsA",
  },
]

interface ExamplesNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ExamplesNav({ className, ...props }: ExamplesNavProps) {
  const pathname = usePathname()

  return (
    <div className="relative">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className={cn("mb-4 flex items-center", className)} {...props}>
          {examples.map((example) => (
            <motion.div
              key={example.href}
              whileHover={{ x: 10, filter: "blur(.4px)" }}
            >
              <Link
                href={example.href}
                className={cn(
                  "flex items-center px-4",
                  pathname?.startsWith(example.href)
                    ? "font-bold text-primary"
                    : "font-medium text-muted-foreground"
                )}
              >
                {example.name}
              </Link>
            </motion.div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
      <div className="flex gap-2">
        <ExampleCodeLink
          pathname={pathname === "/" ? "/ui-elements/" : pathname}
        />
        <ExamplePageLink
          pathname={pathname === "/" ? "/ui-elements/" : pathname}
        />
      </div>
    </div>
  )
}

interface ExampleCodeLinkProps {
  pathname: string | null
}

export function ExamplePageLink({ pathname }) {
  const example = examples.find((example) => pathname?.startsWith(example.href))

  if (!example?.page) {
    return null
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Link
        href={example?.page}
        target="_blank"
        rel="nofollow"
        className="view-code absolute right-0 top-8 hidden items-center rounded-[0.5rem] text-sm font-medium md:flex"
      >
        <motion.span
          className="pr-2"
          whileHover={{ x: -5, filter: "blur(.5px)" }}
        >
          View page
        </motion.span>
        <motion.div whileHover={{ x: 10, filter: "blur(2px)" }}>
          <ArrowRightIcon />
        </motion.div>
      </Link>
    </motion.div>
  )
}

export function ExampleCodeLink({ pathname }: ExampleCodeLinkProps) {
  const example = examples.find((example) => pathname?.startsWith(example.href))

  if (!example?.code) {
    return null
  }

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Link
          href={example?.code}
          target="_blank"
          rel="nofollow"
          className="view-code absolute right-0 top-0 hidden items-center rounded-[0.5rem] text-sm font-medium md:flex"
        >
          <motion.span
            className="pr-2"
            whileHover={{ x: -5, filter: "blur(.5px)" }}
          >
            View code
          </motion.span>
          <motion.div whileHover={{ x: 10, filter: "blur(2px)" }}>
            <ArrowRightIcon />
          </motion.div>
        </Link>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Link
          href={example?.code}
          target="_blank"
          rel="nofollow"
          className="view-code absolute right-0 top-0 hidden items-center rounded-[0.5rem] text-sm font-medium md:flex"
        >
          <motion.span
            className="pr-2"
            whileHover={{ x: -5, filter: "blur(.5px)" }}
          >
            View code
          </motion.span>
          <motion.div whileHover={{ x: 10, filter: "blur(2px)" }}>
            <ArrowRightIcon />
          </motion.div>
        </Link>
      </motion.div>
    </>
  )
}
