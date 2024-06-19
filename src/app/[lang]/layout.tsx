import type { Metadata } from "next"
import { getDictionary } from "@/dictionaries/dictionaries"
import { SettingsProvider } from "@/context/Settings"
import { ReactNode } from "react"
import { MainPage } from "./MainPage"
import "./globals.css"

export const metadata: Metadata = {
  title: "Sami Paananen",
  description: "Portfolio",
}

export default async function RootLayout({
  params: { lang },
  blogs,
}: Readonly<{
  children: React.ReactNode
  params: { lang: string }
  blogs: ReactNode
}>) {
  const dict = await getDictionary(lang)

  return (
    <html lang={lang}>
      <body>
        <SettingsProvider>
          <MainPage lang={lang} dict={dict} blogs={blogs} />
        </SettingsProvider>
      </body>
    </html>
  )
}
