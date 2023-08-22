import { Inter as FontSans } from "next/font/google"

import { siteConfig } from "@/config/site"
import { CursorProvider } from "@/lib/CursorContext"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@/components/analytics"
import { ThemeProvider } from "@/components/theme-provider"
import "@/styles/globals.scss"
import Trailer from "@/components/core/Cursor/MouseTrailer"
import Header from "@/components/core/Header"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: "remcostoeten",
      url: "https://remcostoeten.com",
    },
  ],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "black" }],
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export default function RootLayout({ children }: RootLayoutProps) {
return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          " font-sans antialiased",
          fontSans.variable,
        )}
      >
        <CursorProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Trailer />
            <div className="page-wrapper cursor-hover">
           <Header/>
              <div className="page-wrapper__inner ">{children}</div>
            </div>
            <Analytics />
            <Toaster />
          </ThemeProvider>
        </CursorProvider>
      </body>
    </html>
  )
}