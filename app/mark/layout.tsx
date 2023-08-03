import Link from "next/link"

import { marketingConfig } from "../../config/marketing"
import { SiteFooter } from "../../components/site-footer"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/header/navigation-items"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header showhand="true" className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={marketingConfig.mainNav} />
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter className={undefined} />
    </div>
  )
}
