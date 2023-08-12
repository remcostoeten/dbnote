import { Inter as FontSans } from "next/font/google"
import localFont from "next/font/local"
import styles from '@/styles/modules/cursor.module.scss';
import "@/styles/globals.scss"

import { CursorProvider } from "@/lib/CursorContext"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@/components/analytics"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

import { MainNav } from "@/components/header/navigation-items"
import { marketingConfig } from "@/config/marketing"
import Trailer from './../components/core/Cursor/MouseTrailer';

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
          "min-h-[300vh] bg-background font-sans antialiased",
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
              <div className="page-wrapper__inner">
                <div
                  className={styles.interactable}
                  data-type="video"
                  style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1657779582398-a13b5896ff19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60)' }}
                />
                <div
                  className={styles.interactable}
                  data-type="video"
                  style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1657779582398-a13b5896ff19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60)' }}
                ></div>
                {children}</div>
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
