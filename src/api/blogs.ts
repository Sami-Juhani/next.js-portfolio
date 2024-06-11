import { BlogElementType } from "@/app/[lang]/blog/[blogHref]/BlogElement"
import { PrismaClient } from "@prisma/client"

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

const prisma = new PrismaClient()

export async function getBlogs() {
  return await prisma.blog.findMany()
}

export async function getBlog(blogHref: string) {
  return await prisma.blog.findFirst({
    where: {
      href: blogHref,
    },
  })
}
