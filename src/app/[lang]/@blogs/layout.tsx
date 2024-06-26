import Favicon from "/public/images/favicon.ico"
import type { Metadata } from "next"
import { PageTitle } from "@/components/PageTitle"
import { getDictionary } from "@/dictionaries/dictionaries"
import styles from "./blog.module.css"

export const metadata: Metadata = {
  title: "Sami Paananen - blog",
  description: "Blog page",
  icons: [{ rel: "icon", url: Favicon.src }],
}

export default async function BlogLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode
  params: { lang: string }
}>) {
  const dict = await getDictionary(lang)

  return (
    <div className={styles.__layout}>
      <PageTitle
        mainStr={dict.navigation.linkBar.blog.mainStr}
        subStr={dict.navigation.linkBar.blog.subStr}
        color={"antiquewhite"}
      />
      {children}
    </div>
  )
}
