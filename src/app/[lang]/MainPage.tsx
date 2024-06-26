"use client"

import { Dispatch, ReactNode, SetStateAction, useState } from "react"
import { PageScroller } from "@/components/PageScroller"
import { PageTitle } from "@/components/PageTitle"
import { StickyNav } from "@/components/StickyNav"
import useIcons from "@/hooks/useIcons"

type MainPageProps = { dict: any; lang: string; blogs: ReactNode; projects: ReactNode }

export function MainPage({ dict, lang, blogs, projects }: MainPageProps) {
  const [activePageIndex, setActivePageIndex] = useState(0)
  const links = [
    { name: dict.navigation.links.home, index: 0 },
    { name: dict.navigation.links.blog, index: 1 },
    { name: dict.navigation.links.projects, index: 2 },
  ]

  return (
    <>
      <StickyNav links={links} lang={lang} activePageIndex={activePageIndex} setActivePageIndex={setActivePageIndex} />
      <main className="main-container">
        <PageScroller
          activePageIndex={activePageIndex}
          pages={[
            <WelcomePage dict={dict} setActivePageIndex={setActivePageIndex} key={"welcomePage"} />,
            blogs,
            projects,
          ]}
        />
      </main>
    </>
  )
}

function WelcomePage({
  dict,
  setActivePageIndex,
}: {
  dict: any
  setActivePageIndex: Dispatch<SetStateAction<number>>
}) {
  const { ConstructionIcon } = useIcons().status

  return (
    <>
      <PageTitle
        mainStr={dict.navigation.linkBar.landingPage.mainStr}
        subStr={dict.navigation.linkBar.landingPage.subStr}
        color="#d3fbd3"
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10rem",
        }}
      >
        <ConstructionIcon style={{ fontSize: "40px", marginRight: "0.5rem" }} />
        <p>
          {dict.landingPage.status}
          <button className="link" onClick={() => setActivePageIndex(1)}>
            {dict.landingPage.statusBlog}
          </button>
        </p>
      </div>
    </>
  )
}
