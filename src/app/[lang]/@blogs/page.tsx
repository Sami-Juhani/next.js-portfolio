import { getBlogs } from "@/db/blogs"
import { getDictionary } from "@/dictionaries/dictionaries"
import { notFound } from "next/navigation"
import { BlogCard } from "./BlogCard"
import styles from "./blog.module.css"

export default async function BlogPage({ params: { lang } }: { params: { lang: string } }) {
  const dict = await getDictionary(lang)
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
