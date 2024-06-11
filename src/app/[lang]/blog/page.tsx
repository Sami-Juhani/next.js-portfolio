import { getBlogs } from "@/api/blogs"
import styles from "./blog.module.css"
import { BlogCard } from "./BlogCard"
import { getDictionary } from "@/dictionaries/dictionaries"
import { notFound } from "next/navigation"

export default async function BlogPage({ params: { lang } }: { params: { lang: string } }) {
  const dict = await getDictionary(lang)
  const blogs = await getBlogs()

  const filteredBlogs = blogs.map((blog) => {
    const filteredBlog = { _id: blog.id, href: blog.href, date: blog.date, likes: blog.likes }
    return lang === "en" ? { ...filteredBlog, ...blog.en as Object } : { ...filteredBlog, ...blog.fi as Object }
  })

  if (blogs === null) return notFound()

  return (
    <ul className={styles.blogListContainer}>
      {filteredBlogs.map((blog) => (
        <BlogCard key={blog.href} blog={blog} readMore={dict.blogCard.more} lang={lang} />
      ))}
    </ul>
  )
}
