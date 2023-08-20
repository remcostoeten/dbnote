import { Metadata } from "next"

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
    <>
      <div className="container relative flex flex-col">{children}</div>
    </>
  )
}
