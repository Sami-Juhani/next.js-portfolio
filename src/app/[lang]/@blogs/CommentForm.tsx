"use client"

import { CustomButton } from "@/components/Buttons"
import { useEffect, useState } from "react"
import { useNextAuth } from "@/context/useNextAuth"
import styles from "./blog.module.css"
import { FormGroup } from "@/components/FormGroup"
import { useFormState } from "react-dom"
import { SubmitButton } from "../../../components/Buttons/SubmitButton"
import type { AddCommentResult } from "@/actions/comments"

type CommentFormProps = {
  blogId: string
  addComment: (
    prevState: unknown,
    payload: { blogId: string; userId: string; formData: FormData }
  ) => Promise<AddCommentResult>
}

export function CommentForm({ blogId, addComment }: CommentFormProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { data: session } = useNextAuth()
  const [data, action] = useFormState(addComment, { completed: false, errors: {} })

  useEffect(() => {
    if (data?.completed) setIsOpen(false)
  }, [data])

  return (
    <div className={styles.newComment__layout} style={isOpen ? { position: "unset", width: "100%" } : {}}>
      {session?.user && !isOpen && (
        <CustomButton buttonType="primary" onClick={() => setIsOpen(true)}>
          New Comment
        </CustomButton>
      )}
      {isOpen && (
        <form
          className={styles.newCommentForm}
          action={(e) => {
            action({ formData: e, blogId: blogId, userId: session?.user?.id! })
          }}
        >
          <h1>New Comment:</h1>
          <FormGroup errorMessage={data?.errors?.title}>
            <label htmlFor="title">Title</label>
            <input id="title" name="title" type="text" />
          </FormGroup>
          <FormGroup errorMessage={data?.errors?.body}>
            <label htmlFor="body">Message</label>
            <textarea id="body" name="body" rows={10} />
          </FormGroup>
          <p>
            Published by: <span className="bold">{session?.user?.name}</span>
          </p>
          <div className="row space-between">
            <SubmitButton submit={"Submit"} submitting={"Submitting..."} buttonType={"primary"} />
            <CustomButton type="button" onClick={() => setIsOpen(false)} buttonType="secondary">
              Cancel
            </CustomButton>
          </div>
        </form>
      )}
    </div>
  )
}
