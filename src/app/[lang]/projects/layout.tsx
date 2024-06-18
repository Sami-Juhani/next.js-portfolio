import { ReactNode } from "react"
import { Metadata } from "next"
import { getDictionary } from "@/dictionaries/dictionaries"
import { PageTitle } from "@/components/PageTitle"
import styles from "./projects.module.css"

export const metadata: Metadata = {
  title: "Sami Paananen - blog",
  description: "Blog page",
}

export default async function ProjectPageLayout({
  children,
  params: { lang },
}: Readonly<{
  children: ReactNode
  params: { lang: string }
}>) {
  const dict = await getDictionary(lang)

  return (
    <div className={styles.projectsLayout}>
      <PageTitle
        mainStr={dict.navigation.linkBar.projects.mainStr}
        subStr={dict.navigation.linkBar.projects.subStr}
        color="rgb(220, 255, 255)"
      />
      {children}
    </div>
  )
}
