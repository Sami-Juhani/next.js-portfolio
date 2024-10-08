"use client"

import { useSettings } from "@/context/useSettings"
import { formatDate } from "@/lib/formatDate"
import Image from "next/image"
import styles from "./blog.module.css"
import Link from "next/link"
import { SupportedLanguages } from "@/context/Settings"

export function BlogCard({ blog, readMore, lang }: { blog: any; readMore: string; lang: SupportedLanguages }) {
  const date = formatDate(blog.date, lang === "fi" ? "fi-FI" : "en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  })
  const { darkMode } = useSettings()

  return (
    <li
      className={styles.card}
      style={{
        backgroundColor: darkMode ? "var(--clr-box-dark)" : "var(--clr-box-light)",
      }}
    >
      <div className={styles.cardLeft}>
        <Image
          className={styles.cardImage}
          src={blog.header.image.src}
          alt={blog.header.image.alt}
          width={175}
          height={175}
          priority
        />
        <Image
          className={styles.cardBlurredImage}
          src={blog.header.image.src}
          alt={blog.header.image.alt}
          width={200}
          height={200}
        />
        <p style={{marginLeft: "3px", marginBottom: "3px"}}>{date}</p>
      </div>
      <div className={styles.cardRight}>
        <p className={styles.cardTitle}>{blog.header.title}</p>
        <p className={styles.cardPreview}>{blog.header.desc}</p>
        <Link href={`/${lang}/?blogId=${blog._id}`}>{readMore}</Link>
      </div>
    </li>
  )
}
