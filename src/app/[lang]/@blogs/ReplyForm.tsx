"use client"

import { CustomButton } from "@/components/Buttons"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useNextAuth } from "@/context/useNextAuth"
import styles from "./blog.module.css"
import { FormGroup } from "@/components/FormGroup"
import { useFormState } from "react-dom"
import { SubmitButton } from "../../../components/Buttons/SubmitButton"
import type { AddCommentResult } from "@/actions/comments"
import { useNotification } from "@/context/useNotification"

type ReplyFormProps = {
  dict: any
  blogId: string
  replyId: string
  addReply: (
    prevState: unknown,
    payload: { blogId: string; userId: string; replyId: string; formData: FormData }
  ) => Promise<AddCommentResult>
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function ReplyForm({ dict, blogId, replyId, addReply, isOpen, setIsOpen }: ReplyFormProps) {
  const { data: session } = useNextAuth()
  const [data, action] = useFormState(addReply, { completed: false, errors: {} })
  const { setNotification } = useNotification()

  useEffect(() => {
    if (data?.completed) {
      setNotification({ text: dict.notification.replyAdded, type: "success", isOpen: true })
      setIsOpen(false)}
  }, [data, setIsOpen, dict.notification.replyAdded, setNotification])

  return (
    <div className={styles.replyForm__layout}>
      {isOpen && (
        <form
          className={styles.newCommentForm}
          action={(e) => {
            action({ formData: e, blogId: blogId, replyId, userId: session?.user?.id! })
          }}
        >
          <h2>Reply:</h2>
          <FormGroup errorMessage={data?.errors?.body}>
            <label htmlFor="body">Message</label>
            <textarea id="body" name="body" rows={6} />
          </FormGroup>
          <p>
            {dict.blogPage.author} <span className="bold">{session?.user?.name}</span>
          </p>
          <div className="row space-between">
            <SubmitButton buttonType={"primary"} submit={dict.buttons.send} submitting={dict.buttons.sending} />
            <CustomButton type="button" onClick={() => setIsOpen(false)} buttonType="secondary">
              {dict.buttons.cancel}
            </CustomButton>
          </div>
        </form>
      )}
    </div>
  )
}
