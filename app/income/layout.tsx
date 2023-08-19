import { Metadata } from "next"

import { PageHeader } from "@/components/ui-dashboard/page-nav"

export const metadata: Metadata = {
  title: "Expense Tracker",
  description:
    "Keep track of your expenses and income using this expense tracker app. Add, manage, and analyze your financial transactions. Built with Next.js, Tailwind CSS, and Firebase.",
}

interface UiShowcaseLayoutProps {
  children: React.ReactNode
}

export default function UiShowcaseLayout({ children }: UiShowcaseLayoutProps) {
  return (
    <>
      <div className="expenses-tracker container relative flex flex-col">
        <PageHeader className="page-header pb-8"></PageHeader>
        <main>{children}</main>
      </div>
    </>
  )
}
