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
    <>
              <div className="flex gap-4">

       {badges.map((badge, index) => (
      <CustomStatusBadge key={index} {...badge} index={index} />
    ))}
    </div>
      <main className="fl2">{children}</main>
    </>
  )
}
