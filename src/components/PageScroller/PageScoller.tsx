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
    <div className={styles.scroller__outer}>
      <div
        className={styles.scroller__inner}
        ref={scrollerRef}
        onTransitionEnd={() => scrollerRef.current?.style.setProperty("filter", "unset")}
      >
        {pages.map((item, index) => (
          <section key={index}>
            <div style={{display: activePageIndex === index ? "block" : "none" }}>{item}</div>
          </section>
        ))}
      </div>
    </div>
  )
}