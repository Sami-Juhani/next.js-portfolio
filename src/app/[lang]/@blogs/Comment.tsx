"use client"

import { formatDate } from "@/lib/formatDate"
import { CommentAuthor } from "./CommentAuthor"
import { ReplyDeleteComment } from "./ReplyDeleteComment"
import { addReply, deleteComment, getComment } from "@/actions/comments"
import { SupportedLanguages } from "@/context/Settings"
import styles from "./blog.module.css"
import { cc } from "@/lib/cc"
import { useSettings } from "@/context/useSettings"

type CommentProps = {
  comment: Awaited<ReturnType<typeof getComment>>
  lang: SupportedLanguages
  dict: any
  blogId: string
  style?: {}
  isReply?: boolean
}

export function Comment({ comment, lang, dict, blogId, style, isReply }: CommentProps) {
  const { darkMode } = useSettings()

  if (comment == null) return

  const date = formatDate(comment.date, lang === "fi" ? "fi-FI" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  return (
    <div
      className={`${styles.comment__layout} ${darkMode ? styles.dark : styles.light} ${cc(isReply && styles.isReply)}`}
      style={style}
    >
      <div className={styles.comment__header}>
        <h3>{comment.title ?? dict.blogPage.reply}</h3>
        <CommentAuthor authorId={comment.authorId} authorName={comment.author.name!} date={date} />
      </div>
      <p>{comment.body}</p>
      <ReplyDeleteComment
        dict={dict}
        authorId={comment.authorId}
        blogId={blogId}
        replyId={comment.replyId}
        authorName={comment.author.name!}
        commentId={comment.id}
        addReply={addReply}
        deleteComment={deleteComment}
        title={comment.title ?? comment.parent?.id}
      />
    </div>
  )
}
