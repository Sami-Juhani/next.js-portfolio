import { BlogElementType } from "@/app/[lang]/@blogs/BlogElement"
import prisma from "./db"

export type Blog = {
  header: {
    title: string
    image: {
      src: string
      alt: string
      width: number
      height: number
      priority: boolean
    }
  }
  sections: { title: string; elements: BlogElementType[] }[]
  signature: BlogElementType[]
}

export async function getBlogs() {
  return await prisma.blog.findMany()
}

export async function getBlog(id: string) {
  return await prisma.blog.findUnique({
    where: {
      id: id,
    },
  })
}

export async function updateBlogLikes(id: string, increment: boolean) {
  const blog = await prisma.blog.findUnique({
    where: {
      id: id,
    },
  })
  if (blog === null) return null

  let updatedLikes = blog.likes

  if (increment === true) updatedLikes++
  else updatedLikes = Math.max(0, updatedLikes - 1)

  const updatedBlog = await prisma.blog.update({
    where: {
      id: id,
    },
    data: {
      likes: updatedLikes,
    },
  })

  return updatedBlog.likes
}
