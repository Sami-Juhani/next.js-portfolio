"use client"

import { useSettings } from "@/context/useSettings"
import { formatDate } from "@/lib/formatDate"
import Image from "next/image"
import styles from "./blog.module.css"
import Link from "next/link"

export function BlogCard({ blog, readMore, lang }: { blog: any; readMore: string; lang: string }) {
  const date = formatDate(blog.date, lang === "fi" ? "fi-FI" : "en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  })
  const { darkMode } = useSettings()

  return (
    <li
      className={styles.blogCard}
      style={{
        backgroundColor: darkMode ? "#eeeeee" : "#ffffff",
      }}
    >
      <div className={styles.blogCardLeft}>
        <Image src={blog.header.image.src} alt={blog.header.image.alt} width={200} height={200} priority />
        <p>{date}</p>
      </div>
      <div className={styles.blogCardRight}>
        <p className={styles.blogTitle}>{blog.header.title}</p>
        <p className={styles.blogBodyPreview}>{blog.sections[0].elements[0].value as string}</p>
        <Link href={`blog/${blog.href}`}>{readMore}</Link>
      </div>
    </li>
  )
}
