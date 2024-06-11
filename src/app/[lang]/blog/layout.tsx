import { PageTitle } from "@/components/PageTitle"
import type { Metadata } from "next"
import styles from "./blog.module.css"
import { getDictionary } from "@/dictionaries/dictionaries"

export const metadata: Metadata = {
  title: "Sami Paananen - blog",
  description: "Blog page",
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
    <div className={styles.blogLayout}>
      <PageTitle mainStr={dict.navigation.linkBar.blog.mainStr} subStr={dict.navigation.linkBar.blog.subStr} color={"antiquewhite"} />
      {children}
    </div>
  )
}
