import { ReactNode } from "react"
import type { Metadata } from "next"
import { SettingsProvider } from "@/context/Settings"
import { NotificationProvider } from "@/context/Notification"
import { ModalProvider } from "@/context/Modal"
import NextAuthProvider from "@/context/NextAuth"
import AwsRumInitializer from "@/components/AwsRumInitializer"
import { Main } from "./Main"
import { getDictionary } from "@/dictionaries/dictionaries"
import { ReCaptchaProvider } from "@/context/ReCaptcha"
import { inter } from "@/lib/fonts"
import "./globals.css"

export const metadata: Metadata = {
  title: {default: "SJP | Fullstack Software Development", template: "SJP | %s "},
  description: "Focus on software development with blog and projects",
  icons: [
    { rel: "icon", url: "/images/favicon/favicon.ico" },
    { rel: "apple-touch-icon", sizes: "180x180", url: "/images/favicon/apple-touch-icon.png" },
    { rel: "icon", type: "image/png", sizes: "192x192", url: "/images/favicon/android-chrome-192x192.png" },
    { rel: "icon", type: "image/png", sizes: "32x32", url: "/images/favicon/favicon-32x32.png" },
    { rel: "icon", type: "image/png", sizes: "16x16", url: "/images/favicon/favicon-16x16.png" },
  ],
  openGraph: {
    title: "SJP - Fullstack Software Development",
    description: "Focus on software development with blog and projects",
    url: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
    type: "website",
    images: [
      {
        url: "/images/me/sjp_dev.png",
        width: 1200,
        height: 630,
        alt: "SJP - Fullstack Software Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
    title: "SJP - Fullstack Software Development",
    description: "Focus on software development with blog and projects",
    images: ["/images/me/sjp_dev.png"],
  },
  keywords: ["fullstack", "software development", "blog", "projects"],
  authors: [{ name: "SJP", url: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000") }],
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    languages: {
      "en-US": "/en",
      "fi-FI": "/fi",
    },
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
}

type RootLayOutProps = {
  children: React.ReactNode
  params: { lang: string }
  projects: ReactNode
  blogs: ReactNode
  portfolio: ReactNode
  contact: ReactNode
}

export default async function RootLayout({
  params: { lang },
  blogs,
  projects,
  portfolio,
  contact,
}: Readonly<RootLayOutProps>) {
  const dict = await getDictionary(lang)

  return (
    <html lang={lang}>
      <body className={inter.className}>
        <ReCaptchaProvider lang={lang}>
          <NextAuthProvider>
            <SettingsProvider>
              <NotificationProvider>
                <ModalProvider>
                  <div id="modal-target"></div>
                  <div id="notification-target"></div>
                  <Main
                    lang={lang}
                    dict={dict}
                    blogs={blogs}
                    projects={projects}
                    portfolio={portfolio}
                    contact={contact}
                  />
                </ModalProvider>
              </NotificationProvider>
            </SettingsProvider>
          </NextAuthProvider>
        </ReCaptchaProvider>
        <AwsRumInitializer />
      </body>
    </html>
  )
}
