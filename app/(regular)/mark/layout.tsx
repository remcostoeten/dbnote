
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/header/navigation-items"

import { SiteFooter } from "@/components/site-footer"
import { marketingConfig } from "@/config/marketing"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="bg-black flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={marketingConfig.mainNav} />
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter className={undefined} />
    </div>
  )
}
