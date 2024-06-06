import { getBlogs } from "@/api/blogs"
import styles from "./blog.module.css"
import { BlogCard } from "./BlogCard"


export default async function BlogPage() {
  const blogs = await getBlogs()

  return (
    <ul className={styles.blogListContainer}>
      {blogs.map((blog) => (
        <BlogCard key={blog.href} blog={blog} />
      ))}
    </ul>
  )
}
