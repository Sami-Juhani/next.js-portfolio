import React from "react"
import { addComment, getComments } from "@/actions/comments"
import { SupportedLanguages } from "@/context/Settings"
import { CommentForm } from "./CommentForm"
import { Comment } from "./Comment"
import styles from "./blog.module.css"

export async function Comments({ lang, dict, blogId }: { lang: SupportedLanguages; dict: any; blogId: string }) {
  const comments = await getComments(blogId)

  return (
    <section className={styles.comments__layout}>
      <div className={styles.commentsTitle}>
        <h2>{dict.blogPage.comments}</h2>
        <CommentForm dict={dict} blogId={blogId} addComment={addComment} />
      </div>
      {comments.map((comment) => {
        /* Comment without replies */
        if (comment.replies.length === 0 && typeof comment.replyId == null)
          return <Comment key={comment.id} blogId={blogId} dict={dict} lang={lang} comment={comment} />
        /* Comment with replies */ else
          return (
            <React.Fragment key={comment.id}>
              <Comment blogId={blogId} dict={dict} lang={lang} comment={comment} />
              {comment.replies.map((reply, i) => (
                <Comment
                  style={{ marginLeft: "30px" }}
                  key={reply.id}
                  blogId={blogId}
                  dict={dict}
                  lang={lang}
                  comment={reply}
                  isReply
                />
              ))}
            </React.Fragment>
          )
      })}
    </section>
  )
}
