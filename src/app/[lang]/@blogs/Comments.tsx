import { addComment, addReply, deleteComment } from "@/actions/comments"
import { SupportedLanguages } from "@/context/Settings"
import { getComment, getComments } from "@/actions/comments"
import { formatDate } from "@/lib/formatDate"
import { CommentForm } from "./CommentForm"
import { CommentAuthor } from "./CommentAuthor"
import { ReplyDeleteComment } from "./ReplyDeleteComment"
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
            <>
              <Comment key={comment.id} blogId={blogId} dict={dict} lang={lang} comment={comment} />
              {comment.replies.map((reply, index) => (
                <Comment
                  style={{ marginLeft: "30px" }}
                  key={index}
                  blogId={blogId}
                  dict={dict}
                  lang={lang}
                  comment={reply}
                />
              ))}
            </>
          )
      })}
    </section>
  )
}

type CommentProps = {
  comment: Awaited<ReturnType<typeof getComment>>
  lang: SupportedLanguages
  dict: any
  blogId: string
  style?: {}
}

function Comment({ comment, lang, dict, blogId, style }: CommentProps) {
  if (comment == null) return

  const date = formatDate(comment.date, lang === "fi" ? "fi-FI" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  return (
    <div className={styles.comment__layout} style={style}>
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
