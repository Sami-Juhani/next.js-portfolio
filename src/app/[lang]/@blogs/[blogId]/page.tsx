import Image from "next/image"
import type { Blog } from "@/api/blogs"
import { getBlog } from "@/api/blogs"
import useIcons from "@/hooks/useIcons"
import { formatDate } from "@/lib/formatDate"
import { BlogElement, BlogElementType } from "./BlogElement"
import { dafoe } from "@/lib/fonts"
import { notFound } from "next/navigation"
import styles from "../../@blogs/blog.module.css"
import { BackToBlogsButton } from "./BackToBlogsButton"

export default async function BlogPage({ params: { blogId, lang } }: { params: { blogId: string; lang: string } }) {
  const { LikeIcon } = useIcons().action

  if (blogId === undefined) return undefined

  const blog = await getBlog(blogId)

  if (blog === null) return notFound()

  const blogBase = { _id: blog.id, href: blog.href, date: blog.date, likes: blog.likes }
  const localizedBlog = lang === "en" ? { ...blogBase, ...(blog.en as Blog) } : { ...blogBase, ...(blog.fi as Blog) }

  const date = formatDate(blog.date, lang === "fi" ? "fi-FI" : "en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  })

  return (
    <article className={styles.articleContainer}>
      <BackToBlogsButton lang={lang} />
      <div className={styles.articleHeader}>
        <Image
          src={localizedBlog.header.image.src}
          width={localizedBlog.header.image.width}
          height={localizedBlog.header.image.height}
          alt={localizedBlog.header.image.alt}
          priority={localizedBlog.header.image.priority}
        />
        <div className="row space-between">
          <h2>{localizedBlog.header.title}</h2>
          <div className="column gap-small items-end">
            <p className="margin-btm-large">{date}</p>
            <LikeIcon className="custom-image-link" style={{ fill: "#0072dd" }} />
            <p className="textXs">Likes {localizedBlog.likes}</p>
          </div>
        </div>
      </div>
      {localizedBlog.sections.map((section, _i) => (
        <section key={section.title} className={styles.articleSection}>
          <h3>{section.title}</h3>
          {section.elements.map((element: BlogElementType, i: number) => (
            <BlogElement key={i} element={element} />
          ))}
        </section>
      ))}
      {localizedBlog.signature.map((element, i) => (
        <BlogElement key={i} element={element} />
      ))}
      <div className="column">
        <p className={`${dafoe.className} textXl`}>Sami Paananen</p>
        <p className="bold"> Junior Fullstack Developer</p>
      </div>
    </article>
  )
}
