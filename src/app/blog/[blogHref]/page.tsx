import { getBlog } from "@/api/blogs"
import styles from "../blog.module.css"
import { formatDate } from "@/lib/formatDate"
import Image from "next/image"
import { notFound } from "next/navigation"


export default async function BlogArticle({ params }: { params: { blogHref: string } }) {
  return notFound()
  
  const blogHref = params?.blogHref as string
  const blog = await getBlog(blogHref)

  return (
    <article className={styles.articleContainer}>
      <div className={styles.blogArticle}>
        {blog.img && <Image src={blog.img} width={250} height={250} alt={blog.imgAlt} />}
        <div className="row space-between">
          <h3>{blog.title}</h3>
          <p>{formatDate(blog.date, { day: "numeric", month: "numeric", year: "numeric" })}</p>
        </div>
      </div>
      {Array.isArray(blog.body) ? blog.body.map((str, index) => <p key={index}>{str}</p>) : <p>{blog.body}</p>}
    </article>
  )
}