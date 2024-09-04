import type { Blog } from "@/actions/blogs"
import { getBlog, getBlogs } from "@/actions/blogs"
import { Skeleton, SkeletonImage, SkeletonList } from "@/components/Skeleton/Skeleton"
import { SupportedLanguages } from "@/context/Settings"
import { getDictionary } from "@/dictionaries/dictionaries"
import { dafoe } from "@/lib/fonts"
import { formatDate } from "@/lib/formatDate"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { BackToBlogsButton } from "./BackToBlogsButton"
import styles from "./blog.module.css"
import { BlogCard } from "./BlogCard"
import { BlogElement, BlogElementType } from "./BlogElement"
import { BlogLikes } from "./BlogLikes"
import { Comments } from "./Comments"

export default async function BlogLayoutPage({
  params: { lang },
  searchParams,
}: {
  params: { lang: SupportedLanguages }
  searchParams: any
}) {
  const { blogId } = searchParams
  const dict = await getDictionary(lang)

  return (
    <div className={styles.__layout}>
      {blogId === undefined ? (
        <BlogListPage dict={dict} lang={lang} />
      ) : (
        <BlogPage blogId={blogId} dict={dict} lang={lang} />
      )}
    </div>
  )
}

async function BlogListPage({ dict, lang }: { dict: any; lang: SupportedLanguages }) {
  const blogs = await getBlogs()
  if (blogs === null) return notFound()

  const filteredBlogs = blogs.map((blog) => {
    const filteredBlog = { _id: blog.id, date: blog.date, likes: blog.likes }
    return lang === "en" ? { ...filteredBlog, ...(blog.en as Object) } : { ...filteredBlog, ...(blog.fi as Object) }
  })

  return (
    <ul className={styles.__listLayout}>
      {filteredBlogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} readMore={dict.blogCard.more} lang={lang} />
      ))}
    </ul>
  )
}

function BlogPage({ blogId, dict, lang }: { blogId: string; dict: any; lang: SupportedLanguages }) {
  return (
    <Suspense fallback={<LoadingBlogPage />}>
      <Blog blogId={blogId} dict={dict} lang={lang} />
    </Suspense>
  )
}

async function Blog({ blogId, lang, dict }: { blogId: string; lang: SupportedLanguages; dict: any }) {
  if (blogId === undefined) return notFound()

  const blog = await getBlog(blogId)

  if (blog == null) return notFound()

  const blogBase = { _id: blog.id, date: blog.date, likes: blog.likes }
  const localizedBlog = lang === "en" ? { ...blogBase, ...(blog.en as Blog) } : { ...blogBase, ...(blog.fi as Blog) }

  const date = formatDate(blog.date, lang === "fi" ? "fi-FI" : "en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  })

  return (
    <article className={styles.__articleLayout}>
      <BackToBlogsButton>{dict.buttons.backToBlogs}</BackToBlogsButton>
      <div className={styles.articleHeader}>
        <Image
          src={localizedBlog.header.image.src}
          width={localizedBlog.header.image.width}
          height={localizedBlog.header.image.height}
          alt={localizedBlog.header.image.alt}
          priority={localizedBlog.header.image.priority}
        />
        <div className={styles.headerInfo}>
          <h2>{localizedBlog.header.title}</h2>
          <div className={styles.__metaData}>
            <p className="margin-btm-large textSm">{date}</p>
            <BlogLikes dict={dict} blogId={localizedBlog._id} blogLikes={blog.likes} />
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
      <Comments lang={lang} dict={dict} blogId={localizedBlog._id} />
    </article>
  )
}

function LoadingBlogPage() {
  return (
    <article className={styles.articleContainer}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Skeleton shorter />
      </div>
      <div className={styles.articleHeader}>
        <SkeletonImage width="350px" height="250px" />
        <div className="row space-between width-full">
          <Skeleton short inline />
          <div className="column gap-small items-end">
            <div className="margin-btm-large">
              <Skeleton shortest />
            </div>
            <SkeletonImage width="20px" height="20px" borderRadius="50%" />
            <Skeleton shortest />
          </div>
        </div>
      </div>
      <section className={styles.articleSection} style={{ gap: 0 }}>
        <Skeleton short />
        <SkeletonList amount={7}>
          <Skeleton />
        </SkeletonList>
      </section>
      <section className={styles.articleSection} style={{ gap: 0 }}>
        <Skeleton short />
        <SkeletonList amount={5}>
          <Skeleton />
        </SkeletonList>

        <Skeleton short />
        <ul style={{ marginBlock: "0.5rem", listStyleType: "none" }}>
          <li>
            <Skeleton short />
          </li>
          <li>
            <Skeleton short />
          </li>
          <li>
            <Skeleton short />
          </li>
          <li>
            <Skeleton short />
          </li>
          <li>
            <Skeleton short />
          </li>
          <li>
            <Skeleton short />
          </li>
        </ul>

        <Skeleton short />
        <SkeletonList amount={5}>
          <Skeleton />
        </SkeletonList>
      </section>
      <section>
        <Skeleton short />
        <SkeletonList amount={5}>
          <Skeleton />
        </SkeletonList>
      </section>
    </article>
  )
}
