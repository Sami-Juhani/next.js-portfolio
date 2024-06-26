import Favicon from "/public/images/favicon.ico"
import type { Metadata } from "next"
import { PageTitle } from "@/components/PageTitle"
import { getDictionary } from "@/dictionaries/dictionaries"

export const metadata: Metadata = {
  title: "Sami Paananen - projects",
  description: "Project page",
  icons: [{ rel: "icon", url: Favicon.src }],
}

export default async function ProjectsLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode
  params: { lang: string }
}>) {
  const dict = await getDictionary(lang)

  return (
    <>
      <PageTitle
        mainStr={dict.navigation.linkBar.projects.mainStr}
        subStr={dict.navigation.linkBar.projects.subStr}
        color={"#e4d8fd"}
      />
      {children}
    </>
  )
}
