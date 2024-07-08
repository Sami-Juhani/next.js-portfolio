import { useEffect, useRef, useState } from "react"
import { specialElite } from "@/lib/fonts"
import styles from "./FancyHero.module.css"

export type TypeWriterOptions = {
  x?: string
  y?: string
  typingDelay?: number
  eraseDelay?: number
  startDelay?: number
  endDelay?: number
}

export type TypeWriterProps = {
  prefix: string
  paragraph: string | string[]
  options: TypeWriterOptions
}

export function TypeWriter({ prefix, paragraph, options }: TypeWriterProps) {
  const writerRef = useRef<HTMLSpanElement>(null)
  const [charIndex, setCharIndex] = useState(0)
  const [paragraphIndex, setParagraphIndex] = useState(0)
  const [displayChar, setDisplayChar] = useState<string[]>([])
  const isString = typeof paragraph == "string"

  const chars = isString ? paragraph.split("") : paragraph[paragraphIndex].split("")

  useEffect(() => {
    const interval = setInterval(() => {
      if (writerRef.current == null) return
      writerRef.current.style.display = writerRef.current.style.display === "inline-block" ? "none" : "inline-block"
    }, 500)

    const timeout = setTimeout(
      () => {
        if (writerRef.current == null) return
        writerRef.current.style.display = "inline-block"

        if (charIndex < chars.length) {
          setDisplayChar((prevChars) => [...prevChars, chars[charIndex]])
          setCharIndex(charIndex + 1)
        } else {
          setDisplayChar((prevChars) => prevChars.slice(0, -1))
          if (displayChar.length === 0) {
            if (!isString) setParagraphIndex((prev) => (prev + 1 < paragraph.length ? prev + 1 : 0))
            setCharIndex(0)
          }
        }
        clearTimeout(timeout)
      },
      displayChar.length === 0
        ? options.startDelay
        : displayChar.length === chars.length
        ? options.endDelay
        : charIndex < chars.length
        ? options.typingDelay
        : options.eraseDelay
    )
    return () => {
      clearTimeout(timeout), clearInterval(interval)
    }
  }, [chars, charIndex, displayChar, paragraph.length, isString, options])

  return (
    <p className={`${specialElite.className} ${styles.typeWriterText}`}>
      <span className={`${specialElite.className} ${styles.prefix}`}>{`${prefix} `}</span>
      {displayChar.join("")}
      <span className={styles.cursor} ref={writerRef}>
        &#9612;
      </span>
    </p>
  )
}
