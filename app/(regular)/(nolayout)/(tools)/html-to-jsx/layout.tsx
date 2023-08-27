import CustomStatusBadge from "@/components/core/StatusBadge"

import {
  PageHeader,
  PageHeaderDescription
} from "@/components/ui-dashboard/page-nav"

import Typewriter from "./components/alternating-text"

const badges = [
  { title: "Beta", emoji: "rocket" },
  { title: "Experiment", emoji: "fire" },
]

export default function ConverterLayout({ children }) {
  return (
    <>
        {badges.map((badge, index) => (
          <CustomStatusBadge key={index} {...badge} index={index} />
        ))}

      <PageHeader>
        <span className="inline-block  space-y-4 font-heading text-4xl sm:mb-0 lg:text-5xl">
        Convert your HTML to <Typewriter />
          <PageHeaderDescription>
            <span className="cursor-hover ">
              Simply paste in your HTML and get the JSX/TSX version. When you
              want to prefix the output with{" "}
              <pre className="inline-block"> 'use client '</pre> for NextJS
              simply toggle the switch. When using TypeScript you can also get
              a version with the types included by filling in the props but they are not required.
            </span>
          </PageHeaderDescription>
        </span>
      </PageHeader>
        <main>
            {children}
        </main>
    </>
  )
}
