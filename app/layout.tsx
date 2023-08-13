import { Inter as FontSans } from "next/font/google"
import localFont from "next/font/local"

import "@/styles/globals.scss"
import { marketingConfig } from "@/config/marketing"
import { siteConfig } from "@/config/site"
import { CursorProvider } from "@/lib/CursorContext"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@/components/analytics"
import { MainNav } from "@/components/header/navigation-items"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

import Trailer from "./../components/core/Cursor/MouseTrailer"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
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
  creator: "remcostoeten",
  themeColor: [
    // { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
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
          fontHeading.variable
        )}
      >
        <CursorProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Trailer />
            <div className="page-wrapper">
              <header className="header ">
                <div className="container z-40 flex h-20 items-center justify-between py-6">
                  {/* <Megamenu /> */}
                  <MainNav items={marketingConfig.mainNav} />
                </div>
              </header>
              <div className="page-wrapper__inner">{children}</div>
            </div>
            <Analytics />
            <Toaster />
            <TailwindIndicator />
          </ThemeProvider>
        </CursorProvider>
      </body>
    </html>
  )
}
