import { ReactNode, useRef, useEffect } from "react"
import styles from "./PageScroller.module.css"

type MediaScrollerProps = {
  pages: ReactNode[]
  activePageIndex: number
}

export function PageScroller({ pages, activePageIndex }: MediaScrollerProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const pageWidth = scrollerRef.current?.clientWidth || 0
    scrollerRef.current?.scrollTo({
      left: pageWidth * activePageIndex,
      behavior: "smooth",
    })
  }, [activePageIndex])

  return (
    <section className={styles.pageContainer}>
      <div className={styles.pageScroller} ref={scrollerRef}>
        {pages.map((item, index) => (
          <div className={styles.pageElement} key={index}>
            {item}
          </div>
        ))}
      </div>
    </section>
  )
}
