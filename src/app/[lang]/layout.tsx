import Favicon from "/public/favicon.ico"
import type { Metadata } from "next"
import { getDictionary } from "@/dictionaries/dictionaries"
import { SettingsProvider } from "@/context/Settings"
import NextAuthProvider from "@/context/NextAuth"
import { ReactNode } from "react"
import { Main } from "./Main"
import "./globals.css"
import AwsRumInitializer from "@/components/AwsRumInitializer"
import { NotificationProvider } from "@/context/Notification"

export const metadata: Metadata = {
  title: "SJP - fullstack software development",
  description: "Portfolio",
  icons: [{ rel: "icon", url: Favicon.src }],
}

type RootLayOutProps = {
  children: React.ReactNode
  params: { lang: string }
  projects: ReactNode
  blogs: ReactNode
  portfolio: ReactNode
}

export default async function RootLayout({ params: { lang }, blogs, projects, portfolio }: Readonly<RootLayOutProps>) {
  const dict = await getDictionary(lang)

  return (
    <html lang={lang}>
      <body>
        <div id="modal-target"></div>
        <div id="notification-target"></div>
        <NextAuthProvider>
          <SettingsProvider>
            <NotificationProvider>
              <Main lang={lang} dict={dict} blogs={blogs} projects={projects} portfolio={portfolio} />
            </NotificationProvider>
          </SettingsProvider>
        </NextAuthProvider>
        <AwsRumInitializer />
      </body>
    </html>
  )
}
