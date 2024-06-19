"use client"

import { Dispatch, ReactNode, SetStateAction, useState } from "react"
import { PageScroller } from "@/components/PageScroller"
import { PageTitle } from "@/components/PageTitle"
import { StickyNav } from "@/components/StickyNav"
import useIcons from "@/hooks/useIcons"
import { useRouter } from "next/navigation"

export function MainPage({ dict, lang, blogs }: { dict: any; lang: string; blogs: ReactNode }) {
  const [activePageIndex, setActivePageIndex] = useState(0)
  const { GoBackIcon, GoNextIcon } = useIcons().action
  const router = useRouter()

  const links = [
    { name: dict.navigation.links.home, index: 0 },
    { name: dict.navigation.links.blog, index: 1 },
  ]
  const lastPageIndex = links.length - 1

  return (
    <>
      <StickyNav links={links} lang={lang} activePageIndex={activePageIndex} setActivePageIndex={setActivePageIndex} />
      <main className="main-container">
        <GoBackIcon
          className="custom-image-link"
          style={{ marginTop: "0.5rem", transform: "translateX(50px)", zIndex: "1" }}
          onClick={() => {
            router.push(`/${lang}/`)
            setActivePageIndex((prevIndex) => (prevIndex == 0 ? lastPageIndex : prevIndex - 1))
          }}
        />
        <PageScroller
          activePageIndex={activePageIndex}
          pages={[<WelcomePage dict={dict} setActivePageIndex={setActivePageIndex} key={"welcomePage"} />, blogs]}
        />
        <GoNextIcon
          className="custom-image-link"
          style={{ marginTop: "0.5rem", transform: "translateX(-50px)", zIndex: "1" }}
          onClick={() => {
            router.push(`/${lang}/`)
            setActivePageIndex((prevIndex) => (prevIndex == lastPageIndex ? 0 : prevIndex + 1))
          }}
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
      <PageTitle mainStr={dict.navigation.linkBar.landingPage.mainStr} subStr={dict.navigation.linkBar.landingPage.subStr} color="#d3fbd3" />
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