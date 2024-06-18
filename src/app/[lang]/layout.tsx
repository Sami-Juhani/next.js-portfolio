import type { Metadata } from "next"
import "./globals.css"
import { StickyNav } from "@/components/StickyNav"
import useIcons from "@/hooks/useIcons"
import { getDictionary } from "@/dictionaries/dictionaries"
import { SettingsProvider } from "@/context/Settings"

export const metadata: Metadata = {
  title: "Sami Paananen",
  description: "Portfolio",
}

export default async function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode
  params: { lang: string }
}>) {
  const { CodeIcon } = useIcons().utils
  const dict = await getDictionary(lang)

  return (
    <html lang={lang}>
      <body>
        <SettingsProvider>
          <StickyNav
            links={[
              { name: dict.navigation.links.home, href: `/${lang}` },
              { name: dict.navigation.links.blog, href: `/${lang}/blog` },
              { name: dict.navigation.links.projects, href: `/${lang}/projects` },
            ]}
            lang={lang}
          />
          <main className="main-container">{children}</main>
        </SettingsProvider>
      </body>
    </html>
  )
}
