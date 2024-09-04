"use client"

import { CustomButton } from "@/components/Buttons"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useNextAuth } from "@/context/useNextAuth"
import styles from "./blog.module.css"
import { FormGroup } from "@/components/FormGroup"
import { useFormState } from "react-dom"
import { SubmitButton } from "../../../components/Buttons/SubmitButton"
import type { AddCommentResult } from "@/actions/comments"

type ReplyFormProps = {
  blogId: string
  replyId: string
  addReply: (
    prevState: unknown,
    payload: { blogId: string; userId: string; replyId: string; formData: FormData }
  ) => Promise<AddCommentResult>
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function ReplyForm({ blogId, replyId, addReply, isOpen, setIsOpen }: ReplyFormProps) {
  const { data: session } = useNextAuth()
  const [data, action] = useFormState(addReply, { completed: false, errors: {} })

  useEffect(() => {
    if (data?.completed) setIsOpen(false)
  }, [data, setIsOpen])

  return (
    <div className={styles.replyForm__layout}>
      {isOpen && (
        <form
          className={styles.newCommentForm}
          action={(e) => {
            action({ formData: e, blogId: blogId, replyId, userId: session?.user?.id! })
          }}
        >
          <h1>Reply:</h1>
          <FormGroup errorMessage={data?.errors?.body}>
            <label htmlFor="body">Message</label>
            <textarea id="body" name="body" rows={10} />
          </FormGroup>
          <p>
            Published by: <span className="bold">{session?.user?.name}</span>
          </p>
          <div className="row space-between">
            <SubmitButton buttonType={"primary"} submit={"Send"} submitting={"Sending..."} />
            <CustomButton type="button" onClick={() => setIsOpen(false)} buttonType="secondary">
              Cancel
            </CustomButton>
          </div>
        </form>
      )}
    </div>
  )
}
