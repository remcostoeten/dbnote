'use client'; import { LayoutIntroHeaderDescription } from "./LayoutIntroHeaderDescription"
import { Metadata } from "next"
import { motion } from "framer-motion"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui-dashboard/page-nav"

import { Separator } from "@/components/ui/separator"
import { ExamplesNav } from "@/components/ui-dashboard/example-nav"
import UiLinks from "./ui-links"
import MsgBar from "@/components/MsgBar"

// export const metadata: Metadata = {
// title: "Ui showcase",
// description:
// "Check out some examples app built using the components. I've made countless UI's which I all have scrapped. Some repos have over 700+ commits before getting sick off it. ",
// }

interface UiShowcaseLayoutProps {
  children: React.ReactNode
}

export default function UiShowcaseLayout({ children }: UiShowcaseLayoutProps) {
  return (
    <>
      <div className="container relative flex flex-col">
        <PageHeader className="page-header pb-8">
          <MsgBar />
          <LayoutIntroHeaderDescription />
          <UiLinks />
        </PageHeader>
        <section>
          <motion.div className="min-h-[70vh] space-y-6 border p-10 pb-16 shadow"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}

          >
            <ExamplesNav />
            {children}
          </motion.div>
        </section >
      </div >
    </>
  )
}
