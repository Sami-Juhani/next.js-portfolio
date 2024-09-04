import { updateBlogLikes } from "@/actions/blogs"
import { addBlogLike, removeBlogLike } from "@/actions/user"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { email, blogId } = await req.json()

  if (!email || !blogId) {
    return NextResponse.json({ message: "Email and Blog ID are required" }, { status: 400 })
  }

  try {
    const [updatedUser, updatedLikes] = await Promise.all([addBlogLike(email, blogId), updateBlogLikes(blogId, true)])
    return NextResponse.json({ updatedUser, updatedLikes }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Internal server error", error }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const { email, blogId } = await req.json()

  if (!email || !blogId) {
    return NextResponse.json({ message: "Email and Blog ID are required" }, { status: 400 })
  }

  try {
    const [updatedUser, updatedLikes] = await Promise.all([
      removeBlogLike(email, blogId),
      updateBlogLikes(blogId, false),
    ])
    return NextResponse.json({ updatedUser, updatedLikes }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Internal server error", error }, { status: 500 })
  }
}
