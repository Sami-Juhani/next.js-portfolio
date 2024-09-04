"use client"

import { CustomButton } from "@/components/Buttons"
import { useNextAuth } from "@/context/useNextAuth"
import { useState } from "react"
import { ReplyForm } from "./ReplyForm"
import { AddReplyPayload, AddReplyResult } from "@/actions/comments"
import styles from "./blog.module.css"

type CommentAuthorProps = {
  authorId: string
  authorName: string
  date: string
}

export function CommentAuthor({ authorId, authorName, date }: CommentAuthorProps) {
  const { data: session } = useNextAuth()

  return (
    <div className={styles.author__date}>
      <span style={authorId === session?.user?.id ? { fontWeight: "600", color: "var(--link-color)" } : {}}>
        {authorName}
      </span>
      <p>{date}</p>
    </div>
  )
}
