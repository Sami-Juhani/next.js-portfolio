import prisma from "../lib/db"

export async function getOrCreateUser(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (user == null) {
    return await prisma.user.create({
      data: {
        email,
      },
    })
  } else {
    return user
  }
}

export async function addBlogLike(email: string, blogId: string) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (user == null) return null

  const blogLikes = user.blogLikes ?? []

  if (!blogLikes.includes(blogId)) {
    blogLikes.push(blogId)
  }

  const updatedUser = await prisma.user.update({
    where: {
      email,
    },
    data: {
      blogLikes,
    },
  })

  return updatedUser
}

export async function removeBlogLike(email: string, blogId: string) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (user == null) return null

  const blogLikes = user.blogLikes ?? []

  const updatedBlogLikes = blogLikes.filter((id: string) => id !== blogId)

  const updatedUser = await prisma.user.update({
    where: {
      email,
    },
    data: {
      blogLikes: updatedBlogLikes,
    },
  })

  return updatedUser
}
