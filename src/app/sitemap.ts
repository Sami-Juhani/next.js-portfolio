import { getBlogs } from "@/actions/blogs"
import { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  const blogs = await getBlogs()

  const blogUrls = blogs.flatMap((blog) => [
    { url: `${baseUrl}/fi?blogId=${blog.id}`, lastModified: new Date(blog.date) },
    { url: `${baseUrl}/en?blogId=${blog.id}`, lastModified: new Date(blog.date) },
  ])

  return [
    {
      url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
      lastModified: new Date(),
    },
    ...blogUrls,
  ]
}
