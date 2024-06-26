import { ReactNode, useRef, useEffect, useState, Dispatch, SetStateAction } from "react"
import styles from "./PageScroller.module.css"

type MediaScrollerProps = {
  pages: ReactNode[]
  activePageIndex: number
  setActivePageIndex: Dispatch<SetStateAction<number>>
}

export function PageScroller({ pages, activePageIndex, setActivePageIndex }: MediaScrollerProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const pageWidth = scrollerRef.current?.clientWidth || 0
    scrollerRef.current?.scrollTo({
      left: pageWidth * activePageIndex,
      behavior: "smooth",
    })
    window.scrollTo({
      top: 0,
    })
  }, [activePageIndex])

  const handleScroll = () => {
    if (scrollTimeout) clearTimeout(scrollTimeout)

    setScrollTimeout(
      setTimeout(() => {
        const pageWidth = scrollerRef.current?.clientWidth || 0
        const scrollPosition = scrollerRef.current?.scrollLeft || 0
        const newActivePageIndex = Math.round(scrollPosition / pageWidth)

        setActivePageIndex(newActivePageIndex)
      }, 50)
    )
  }

  return (
    <section className={styles.__pagesLayout}>
      <div className={styles.scroller} ref={scrollerRef} onScroll={handleScroll}>
        {pages.map((page, index) => (
          <div className={styles.page} key={index}>
            {page}
          </div>
        ))}
      </div>
    </section>
  )
}
