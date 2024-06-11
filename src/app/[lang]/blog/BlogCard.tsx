import { formatDate } from "@/lib/formatDate"
import Link from "next/link"
import styles from "./blog.module.css"
import Image from "next/image"

export function BlogCard({ blog, readMore, lang }: { blog: any; readMore: string; lang: string }) {
  const randomTilt = Math.random() * 1 * (Math.random() < 0.5 ? -1 : 1)
  const date = formatDate(blog.date, lang === "fi" ? "fi-FI" : "en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  })

  return (
    <li className={styles.blogCard} style={{ transform: `rotate(${randomTilt}deg)` }}>
      <div className={styles.blogCardTop}>
        <p className={styles.blogTitle}>{blog.header.title}</p>
        <div className="column gap-medium paragraph-secondary items-center">
          {date}
          {blog.header.image && (
            <Image src={blog.header.image.src} width={100} height={100} alt={blog.header.image.alt} />
          )}
        </div>
      </div>
      <p className={styles.blogBodyPreview}>{blog.sections[0].elements[0].value as string}</p>
      <Link href={`/blog/${blog.href}`}>{readMore}</Link>
    </li>
  )
}
