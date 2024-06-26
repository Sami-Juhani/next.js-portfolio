"use client"

import { ReactNode, useRef } from "react"
import styles from "./PageScroller.module.css"

type MediaScrollerProps = {
  pages: ReactNode[]
  activePageIndex: number
}

export function PageScroller({ pages, activePageIndex }: MediaScrollerProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  scrollerRef.current?.style.setProperty("--_pageIndex", activePageIndex.toString())
  scrollerRef.current?.style.setProperty("filter", "blur(0.2rem)")

  return (
    <section className={styles.pageContainer}>
      <div
        className={styles.pageScroller}
        ref={scrollerRef}
        onTransitionEnd={() => scrollerRef.current?.style.setProperty("filter", "unset")}
      >
        {pages.map((item, index) => (
          <div style={{ width: "100%" }} key={index}>
            <div style={{ width: "100%", display: activePageIndex === index ? "block" : "none" }}>{item}</div>
          </div>
        ))}
      </div>
    </section>
  )
}