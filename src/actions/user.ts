"use server"

import prisma from "../lib/db"
import { updateBlogLikes } from "./blogs"

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

export type DeleteUserPayload = {
  formData: FormData
  userId: string | undefined
  validConfirmation: string
}

export type DeleteUserResult = { completed: boolean; error?: string } | undefined

export async function deleteUser(prevState: unknown, payload: DeleteUserPayload): Promise<DeleteUserResult> {
  if (payload.formData.get("confirmation") !== payload.validConfirmation) {
    return { completed: false, error: "Confirmation is not valid" }
  }

  if (payload.userId == undefined) return { completed: false, error: "User Id was not provided" }

  const user = await prisma.user.findUnique({
    where: {
      id: payload.userId,
    },
  })

  if (!user) return { completed: false, error: "User was not found" }

  user.blogLikes.map((id) => updateBlogLikes(id, false))

  await prisma.user.delete({
    where: {
      id: payload.userId,
    },
  })

  return { completed: true, error: "" }
}
