import type { Metadata } from "next"
import "./globals.css"
import { StickyNav } from "@/components/StickyNav"
import useIcons from "@/hooks/useIcons"
import { getDictionary } from "@/dictionaries/dictionaries"

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
        <StickyNav
          links={[
            { name: dict.navigation.links.home, href: "/" },
            { name: dict.navigation.links.blog, href: "/blog" },
          ]}
          logoDescription={"Sami Paananen"}
          logo={<CodeIcon />}
        />
        <main className="main-container">{children}</main>
      </body>
    </html>
  )
}
