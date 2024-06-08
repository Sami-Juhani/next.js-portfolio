import type { Metadata } from "next"
import "./globals.css"
import { StickyNav } from "@/components/StickyNav"
import useIcons from "@/hooks/useIcons"

export const metadata: Metadata = {
  title: "Sami Paananen",
  description: "Portfolio",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { CodeIcon } = useIcons().utils

  return (
    <html lang="en">
      <body>
        <StickyNav
          links={[
            { name: "home", href: "/" },
            { name: "blog", href: "/blog" },
          ]}
          logoDescription={"Sami Paananen"}
          logo={<CodeIcon />}
        />
        <main className="main-container">{children}</main>
      </body>
    </html>
  )
}
