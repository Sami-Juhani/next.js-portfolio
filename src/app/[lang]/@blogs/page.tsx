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
import { Metadata, ResolvingMetadata } from "next"

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
    <>
      <h2 className={`${dafoe.className} page-title`}>{dict.blogPage.blog}</h2>
      <ul className={styles.__listLayout}>
        {filteredBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} readMore={dict.blogCard.more} lang={lang} />
        ))}
      </ul>
    </>
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
      <div className={styles.articleHeader}>
        <div className="row space-between items-center">
          <p className={styles.date}>{date}</p>
          <BackToBlogsButton>{dict.buttons.backToBlogs}</BackToBlogsButton>
        </div>
        <Image
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          src={localizedBlog.header.image.src}
          alt={localizedBlog.header.image.alt}
          priority={localizedBlog.header.image.priority}
          width={500}
          height={300}
        />
        <div className={styles.headerInfo}>
          <h2>{localizedBlog.header.title}</h2>
          <div className={styles.__metaData}>
            <BlogLikes dict={dict} blogId={localizedBlog._id} blogLikes={blog.likes} />
          </div>
        </div>
      </div>
      {localizedBlog.sections.map((section) => (
        <section key={section.title} className={styles.articleSection}>
          <h3>{section.title}</h3>
          {section.elements.map((element: BlogElementType, i) => (
            <BlogElement key={i} element={element} />
          ))}
        </section>
      ))}
      {localizedBlog.signature.map((element: BlogElementType, i) => (
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
    <article className={styles.__articleLayout}>
      <div className={styles.articleHeader}>
        <div className="row space-between items-center">
          <Skeleton shorter marginTopNone />
          <Skeleton shorter marginTopNone />
        </div>
        <SkeletonImage width="100%" height="500px" />
        <Skeleton />
        <div className="margin-btm-large">
          <Skeleton shortest />
        </div>
        <SkeletonImage width="20px" height="20px" borderRadius="50%" />
        <Skeleton shortest />
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

export async function generateMetadata({
  params: { lang },
  searchParams,
}: {
  params: { lang: SupportedLanguages }
  searchParams: { blogId: string }
}, parent: ResolvingMetadata): Promise<Metadata | undefined> {
  if (searchParams.blogId == undefined) return

  const blog = await getBlog(searchParams.blogId)

  if (blog == null) return

  const blogBase = { _id: blog.id, date: blog.date, likes: blog.likes }
  const localizedBlog = lang === "en" ? { ...blogBase, ...(blog.en as Blog) } : { ...blogBase, ...(blog.fi as Blog) }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: localizedBlog.header.title,
    description: localizedBlog.header.desc,
    openGraph: {
      images: [localizedBlog.header.image.src, ...previousImages],
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  }
}
