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
    { title: "Hot", emoji: "fire" },
  ]

  return (
    <div className="container relative flex flex-col">
       {badges.map((badge, index) => (
      <CustomStatusBadge key={index} {...badge} index={index} />
    ))}
      <main>{children}</main>
    </div>
  )
}
