"use client"

import { CustomButton } from "@/components/Buttons"
import { useState, useTransition } from "react"
import { ReplyForm } from "./ReplyForm"
import { AddReplyPayload, AddReplyResult } from "@/actions/comments"
import { useNextAuth } from "@/context/useNextAuth"
import styles from "./blog.module.css"

type ReplyDeleteButtonsProps = {
  authorId: string
  authorName: string
  commentId: string
  blogId: string
  replyId: string | null
  title?: string | null
  addReply: (prevState: unknown, payload: AddReplyPayload) => Promise<AddReplyResult>
  deleteComment: (id: string) => void
}

export function ReplyDeleteComment({
  authorId,
  commentId,
  replyId,
  blogId,
  title,
  addReply,
  deleteComment,
}: ReplyDeleteButtonsProps) {
  const [formIsOpen, setFormIsOpen] = useState(false)
  const [confirmationIsOpen, setConfirmationIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const { data: session } = useNextAuth()

  return (
    <>
      <div className={styles.replyDelete__layout}>
        {authorId === session?.user?.id && (
          <CustomButton type={"button"} buttonType="warning" onClick={() => setConfirmationIsOpen(true)} disabled={formIsOpen || confirmationIsOpen && !isPending}>
            {!isPending ? "Delete" : "Deleting..." }
          </CustomButton>
        )}
        {session?.user?.role === "admin" && replyId == null && (
          <CustomButton type={"button"} buttonType="primary" onClick={() => setFormIsOpen(true)} disabled={formIsOpen || confirmationIsOpen}>
            Reply
          </CustomButton>
        )}
        {confirmationIsOpen && (
          <div className={styles.deleteConfirmation}>
            <div className="column gap-medium">
              <p>{replyId === null ? `Delete comment: ${title}?` : `Delete reply for comment: ${title}?`} </p>
              <p>Are you sure?</p>
            </div>
            <div className="row gap-medium space-between">
              <CustomButton type={"button"} buttonType="warning" onClick={() => startTransition(async () => deleteComment(commentId))} disabled={isPending}>
                Yes
              </CustomButton>
              <CustomButton type={"button"} buttonType="primary" onClick={() => setConfirmationIsOpen(false)} disabled={isPending}>
                No
              </CustomButton>
            </div>
          </div>
        )}
      </div>
      {formIsOpen && (
        <ReplyForm
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
