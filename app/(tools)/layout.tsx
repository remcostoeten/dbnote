import { Metadata } from "next"
import { LayoutIntroHeaderDescription } from "@/dist/ui-elements/LayoutIntroHeaderDescription"

import { PageHeader } from "@/components/ui-dashboard/page-nav"

export const metadata: Metadata = {
  title: "Remcostoeten feature showcase",
  description: "All kinds of random productivity tools i've built for myself.",
}
interface UiShowcaseLayoutProps {
  children: React.ReactNode
}

export default function UiShowcaseLayout({ children }: UiShowcaseLayoutProps) {
  return (
    <>
      <div className="container relative flex flex-col">
        <PageHeader className="page-header pb-8">
          <LayoutIntroHeaderDescription />
        </PageHeader>
        <section>{children}</section>
      </div>
    </>
  )
}
