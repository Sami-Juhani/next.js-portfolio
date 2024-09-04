"use client"

import { CustomButton } from "@/components/Buttons"
import { useState, useTransition } from "react"
import { ReplyForm } from "./ReplyForm"
import { AddReplyPayload, AddReplyResult } from "@/actions/comments"
import { useNextAuth } from "@/context/useNextAuth"
import { useNotification } from "@/context/useNotification"
import styles from "./blog.module.css"

type ReplyDeleteButtonsProps = {
  authorId: string
  authorName: string
  commentId: string
  blogId: string
  replyId: string | null
  title?: string | null
  dict: any
  addReply: (prevState: unknown, payload: AddReplyPayload) => Promise<AddReplyResult>
  deleteComment: (id: string) => void
}

export function ReplyDeleteComment({
  authorId,
  commentId,
  replyId,
  blogId,
  title,
  dict,
  addReply,
  deleteComment,
}: ReplyDeleteButtonsProps) {
  const [formIsOpen, setFormIsOpen] = useState(false)
  const { setNotification } = useNotification()
  const [confirmationIsOpen, setConfirmationIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const { data: session } = useNextAuth()

  return (
    <>
      <div className={styles.replyDelete__layout}>
        {authorId === session?.user?.id && (
          <CustomButton
            type={"button"}
            buttonType="warning"
            onClick={() => setConfirmationIsOpen(true)}
            disabled={formIsOpen || (confirmationIsOpen && !isPending)}
          >
            {!isPending ? dict.buttons.delete : dict.buttons.deleting}
          </CustomButton>
        )}
        {session?.user?.role === "admin" && replyId == null && (
          <CustomButton
            type={"button"}
            buttonType="primary"
            onClick={() => setFormIsOpen(true)}
            disabled={formIsOpen || confirmationIsOpen}
          >
            {dict.buttons.reply}
          </CustomButton>
        )}
        {confirmationIsOpen && (
          <div className={styles.deleteConfirmation}>
            <div className="column gap-medium">
              <p>
                {replyId === null
                  ? `${dict.blogPage.deleteComment} ${title}?`
                  : `${dict.blogPage.deleteReply} ${title}?`}{" "}
              </p>
              <p>{dict.blogPage.confirmation}</p>
            </div>
            <div className="row gap-medium space-between">
              <CustomButton
                type={"button"}
                buttonType="warning"
                onClick={() => {
                  startTransition(() => {
                    deleteComment(commentId)
                    setConfirmationIsOpen(false)
                    setNotification({ text: dict.notification.commentDeleted, type: "success", isOpen: true })
                  })
                }}
                disabled={isPending}
              >
                {dict.common.yes}
              </CustomButton>
              <CustomButton
                type={"button"}
                buttonType="primary"
                onClick={() => setConfirmationIsOpen(false)}
                disabled={isPending}
              >
                {dict.common.no}
              </CustomButton>
            </div>
          </div>
        )}
      </div>
      {formIsOpen && (
        <ReplyForm
          dict={dict}
          key={commentId}
          addReply={addReply}
          blogId={blogId}
          replyId={commentId}
          isOpen={formIsOpen}
          setIsOpen={setFormIsOpen}
        />
      )}
    </>
  )
}
