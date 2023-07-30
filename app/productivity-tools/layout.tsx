import { notFound } from "next/navigation"
import { AuthProvider } from "@/AuthContext"

import { dashboardConfig } from "@/config/dashboard"
import { auth } from "@/lib/firebase"
import Greeting from "@/components/Greeting"
import { MainNav } from "@/components/main-nav"
import { DashboardNav } from "@/components/nav"
import { SiteFooter } from "@/components/site-footer"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const user = await auth.currentUser

  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col space-y-6">
        <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
          <aside className="hidden w-[200px] flex-col md:flex">
            <DashboardNav items={dashboardConfig.sidebarNav} />
          </aside>
          <main className="flex w-full flex-1 flex-col overflow-hidden">
            <Greeting />
            {children}
          </main>
        </div>
        <SiteFooter className="border-t" />
      </div>
    </AuthProvider>
  )
}
