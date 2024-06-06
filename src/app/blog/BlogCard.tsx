import { type Blog } from "@/api/blogs"
import { formatDate } from "@/lib/formatDate"
import Link from "next/link"
import styles from "./blog.module.css"
import Image from "next/image"

export function BlogCard({ blog }: { blog: Blog }) {
  const randomTilt = Math.random() * 1 * (Math.random() < 0.5 ? -1 : 1)

  return (
    <li className={styles.blogCard} style={{ transform: `rotate(${randomTilt}deg)` }}>
      <div className={styles.blogCardTop}>
        <p className={styles.blogTitle}>{blog.title}</p>
        <div className="column gap-medium paragraph-secondary items-center">
        {formatDate(blog.date, { day: "numeric", month: "numeric", year: "numeric" })}
        {blog.img && <Image src={blog.img} width={75} height={75} alt={"gae"} />}
        </div>
      </div>
      <p className={styles.blogBodyPreview}>{blog.body}</p>
      <Link href={`/blog/${blog.href}`}>More...</Link>
    </li>
  )
}
