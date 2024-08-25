import Favicon from "/public/favicon.ico"
import type { Metadata } from "next"
import { getDictionary } from "@/dictionaries/dictionaries"
import { SettingsProvider } from "@/context/Settings"
import { ReactNode } from "react"
import { MainLayout } from "./MainLayout"
import "./globals.css"
import AwsRumInitializer from "@/components/AwsRumInitializer"

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
}

export default async function RootLayout({ params: { lang }, blogs, projects }: Readonly<RootLayOutProps>) {
  const dict = await getDictionary(lang)

  return (
    <html lang={lang}>
      <body>
        <div id="project-modal-target"></div>
        <SettingsProvider>
          <MainLayout lang={lang} dict={dict} blogs={blogs} projects={projects} />
        </SettingsProvider>
        <AwsRumInitializer />
      </body>
    </html>
  )
}
