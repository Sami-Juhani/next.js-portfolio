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
    <section className={styles.pageContainer}>
      <div className={styles.pageScroller} ref={scrollerRef} onScroll={handleScroll}>
        {pages.map((item, index) => (
          <div className={styles.pageElement} key={index}>
            {item}
          </div>
        ))}
      </div>
    </section>
  )
}
