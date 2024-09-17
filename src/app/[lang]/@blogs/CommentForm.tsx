"use client"

import type { AddCommentResult } from "@/actions/comments"
import { CustomButton } from "@/components/Buttons"
import { FormGroup } from "@/components/FormGroup"
import { useNextAuth } from "@/context/useNextAuth"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { SubmitButton } from "../../../components/Buttons/SubmitButton"
import { useNotification } from "@/context/useNotification"
import styles from "./blog.module.css"

type CommentFormProps = {
  dict: any
  blogId: string
  addComment: (
    prevState: unknown,
    payload: { blogId: string; userId: string; formData: FormData }
  ) => Promise<AddCommentResult>
}

export function CommentForm({ dict, blogId, addComment }: CommentFormProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { data: session } = useNextAuth()
  const [data, action] = useFormState(addComment, { completed: false, errors: {} })
  const { setNotification } = useNotification()

  useEffect(() => {
    if (data?.completed) {
      setNotification({ text: dict.notification.commentAdded, type: "success", isOpen: true })
      setIsOpen(false)
    }
  }, [data, setNotification, dict.notification.commentAdded])

  return (
    <div className={styles.newComment__layout} style={isOpen ? { position: "unset", width: "100%" } : {}}>
      {session?.user && !isOpen && (
        <CustomButton buttonType="primary" onClick={() => setIsOpen(true)}>
          {dict.blogPage.newComment}
        </CustomButton>
      )}
      {isOpen && (
        <form
          className={styles.newCommentForm}
          action={(e) => {
            action({ formData: e, blogId: blogId, userId: session?.user?.id! })
          }}
        >
          <h2>{dict.blogPage.newComment}:</h2>
          <FormGroup errorMessage={data?.errors?.title}>
            <label htmlFor="title">{dict.blogPage.title}</label>
            <input id="title" name="title" type="text" />
          </FormGroup>
          <FormGroup errorMessage={data?.errors?.body}>
            <label htmlFor="body">{dict.blogPage.message}</label>
            <textarea id="body" name="body" rows={10} />
          </FormGroup>
          <p>
            {dict.blogPage.author} <span className="bold">{session?.user?.name}</span>
          </p>
          <div className="row space-between">
            <SubmitButton submit={dict.buttons.submit} submitting={dict.buttons.submitting} buttonType={"primary"} />
            <CustomButton type="button" onClick={() => setIsOpen(false)} buttonType="secondary">
              {dict.buttons.cancel}
            </CustomButton>
          </div>
        </form>
      )}
    </div>
  )
}
