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


  return (
    <div className="container relative flex-1 space-y-4 p-8 pt-6">
        <CustomStatusBadge title="beta" emojiKey="rocket" index={0} />
      <CustomStatusBadge title="wip" emojiKey="fire" index={1} />
      <main className="flex items-center justify-between space-y-2">{children}</main>
    </div>
      <main className="fl2">{children}</main>
    </>
  )
}
