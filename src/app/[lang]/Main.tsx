"use client"

import { ReactNode, useState } from "react"
import { PageScroller } from "@/components/PageScroller"
import { StickyNav } from "@/components/StickyNav"

type MainLayoutProps = { dict: any; lang: string; blogs: ReactNode; projects: ReactNode; portfolio: ReactNode }

export function Main({ dict, lang, blogs, projects, portfolio }: MainLayoutProps) {
  const [activePageIndex, setActivePageIndex] = useState(0)
  
  const links = [
    { name: dict.navigation.links.home, index: 0 },
    { name: dict.navigation.links.blog, index: 1 },
    { name: dict.navigation.links.projects, index: 2 },
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
        <PageScroller activePageIndex={activePageIndex} pages={[portfolio, blogs, projects]} />
      </div>
    </>
  )
}
