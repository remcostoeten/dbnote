import { Inter as FontSans } from "next/font/google"
import localFont from "next/font/local"

import "@/styles/globals.scss"
import { marketingConfig } from "@/config/marketing"
import { siteConfig } from "@/config/site"
import { CursorProvider } from "@/lib/CursorContext"
import { Toaster } from "@/components/ui/toaster"
import Cursor from "@/components/Cursor"
import { Analytics } from "@/components/analytics"
import { MainNav } from "@/components/header/navigation-items"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

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
  hidecircel?: string
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
    "Firebase",
  ],
  authors: [
    {
      name: "shadcn",
      url: "https://shadcn.com",
    },
  ],
  creator: "shadcn",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@shadcn",
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
      <body className="min-h-screen bg-background font-sans antialiased">
        <CursorProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Cursor />
            <div className="page-wrapper">
              <div className="page-wrapper__inner">
                <header className="container z-40 ">
                  <div className="flex h-20 items-center justify-between py-6">
                    <MainNav
                      items={marketingConfig.mainNav}
                      hidecircel="true"
                    />
                  </div>
                </header>
                {children}
              </div>
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
