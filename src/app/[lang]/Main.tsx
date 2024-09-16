"use client"

import { ReactNode, useState } from "react"
import { PageScroller } from "@/components/PageScroller"
import { StickyNav } from "@/components/StickyNav"
import { useNextAuth } from "@/context/useNextAuth"
import { Loading } from "@/components/Loading"

type MainLayoutProps = { dict: any; lang: string; blogs: ReactNode; projects: ReactNode; portfolio: ReactNode; contact: ReactNode }

export function Main({ dict, lang, blogs, projects, portfolio, contact }: MainLayoutProps) {
  const [activePageIndex, setActivePageIndex] = useState(0)
  const { status } = useNextAuth()

  const links = [
    { name: dict.navigation.links.home, index: 0 },
    { name: dict.navigation.links.blog, index: 1 },
    { name: dict.navigation.links.projects, index: 2 },
    { name: dict.navigation.links.contact, index: 3 },
  ]

  return (
    <>
      <StickyNav
        links={links}
        lang={lang}
        dict={dict}
        activePageIndex={activePageIndex}
        setActivePageIndex={setActivePageIndex}
      />
      <div className="main__layout">
        {status === "loading" && <Loading />}
        <PageScroller activePageIndex={activePageIndex} pages={[portfolio, blogs, projects, contact]} />
      </div>
    </>
  )
}
