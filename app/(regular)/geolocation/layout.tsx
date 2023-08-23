import { Metadata } from "next"

import CustomStatusBadge from "@/components/core/StatusBadge"

export const metadata: Metadata = {
  title: "Address to long lat",
  description:
    "Simply paste in your address and get the latitude and longitude.",
}

interface UiShowcaseLayoutProps {
  children: React.ReactNode
}

export default function UiShowcaseLayout({ children }: UiShowcaseLayoutProps) {
  const badges = [
    { title: "Beta", emoji: "rocket" },
    { title: "Experiment", emoji: "fire" },
  ]

  return (
    <div className="container relative flex-1 space-y-4 p-8 pt-6">
       {badges.map((badge, index) => (
      <CustomStatusBadge as any key={index} {...badge} index={index} />
    ))}
      <main className="flex items-center justify-between space-y-2">{children}</main>
    </div>
  )
}
