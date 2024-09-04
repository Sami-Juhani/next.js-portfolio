"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

export type AddCommentPayload = {
  blogId: string
  userId: string
  formData: FormData
}

export type AddReplyPayload = {
  replyId: string
  blogId: string
  userId: string
  formData: FormData
}

export type AddCommentResult = { completed: boolean; errors?: { title?: string; body?: string } } | undefined
export type AddReplyResult = { completed: boolean; errors?: { title?: string; body?: string } } | undefined

export async function addComment(prevState: unknown, payload: AddCommentPayload): Promise<AddCommentResult> {
  const title = payload.formData.get("title") as string
  const body = payload.formData.get("body") as string

  let errors = {}

  if (title === "" || title == null) errors = { title: "Title is required" }
  if (body === "" || body == null) errors = { ...errors, body: "Message is required" }

  if (Object.keys(errors).length > 0) return { completed: false, errors }

  await prisma.comment.create({
    data: {
      title: title,
      body: body,
      blogId: payload.blogId,
      authorId: payload.userId,
      replyId: null,
    },
  })

  revalidatePath("/")

  return { completed: true }
}

export async function deleteComment(id: string) {
  const replies = await prisma.comment.findMany({
    where: {
      replyId: id,
    },
  })

  if (replies.length > 0) {
    for (const r of replies) {
      await prisma.comment.delete({
        where: {
          id: r.id,
        },
      })
    }
  }

  await prisma.comment.delete({
    where: {
      id: id,
    },
  })

  revalidatePath("/")
}

export async function addReply(prevState: unknown, payload: AddReplyPayload): Promise<AddReplyResult> {
  const body = payload.formData.get("body") as string

  let errors = {}

  if (body === "" || body == null) errors = { body: "Message is required" }

  if (Object.keys(errors).length > 0) return { completed: false, errors }

  await prisma.comment.create({
    data: {
      blogId: payload.blogId,
      replyId: payload.replyId,
      authorId: payload.userId,
      body: body,
    },
  })

  revalidatePath("/")

  return { completed: true }
}

export async function getComments(blogId: string) {
  return await prisma.comment.findMany({
    where: {
      blogId: blogId,
      replyId: null,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
      replies: {
        include: {
          author: {
            select: {
              name: true,
            },
          },
          parent: {
            select: {
              id: true,
            },
          },
        },
        orderBy: {
          date: "desc",
        },
      },
      parent: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  })
}

export async function getComment(id: string) {
  return await prisma.comment.findUnique({
    where: {
      id: id,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
      parent: {
        select: {
          id: true,
        },
      },
    },
  })
}
