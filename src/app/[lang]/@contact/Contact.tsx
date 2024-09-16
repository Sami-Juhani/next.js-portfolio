"use client"

import { FormGroup } from "@/components/FormGroup"
import styles from "./contact.module.css"
import { specialElite } from "@/lib/fonts"
import useIcons from "@/hooks/useIcons"
import Link from "next/link"
import { useFormState } from "react-dom"
import { sendEmail } from "@/actions/email"
import { useEffect, useRef } from "react"
import { useNotification } from "@/context/useNotification"
import { SubmitButton } from "@/components/Buttons/SubmitButton"

type ContactProps = {
  dict: any
}

export function Contact({ dict }: ContactProps) {
  const { GitHubIcon, LinkedIn, Email } = useIcons().dev
  const [data, action] = useFormState(sendEmail, { completed: false, errors: {} })
  const { setNotification } = useNotification()
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (data?.completed) {
      setNotification({ text: dict.contactPage.messageSent, type: "success", isOpen: true })
      formRef.current?.reset()
    }
    if (data instanceof Error) {
      setNotification({ text: dict.contactPage.messageFailed, type: "alert", isOpen: true })
    }
  }, [data, setNotification, dict.contactPage.messageSent, dict.contactPage.messageFailed])

  return (
    <div className={styles.__layout}>
      <div className="column">
        <h1 className={`${specialElite.className} ${styles.heading}`}>{dict.contactPage.heading}</h1>
        <div className={styles.subHeading}>
          <p>{dict.contactPage.subHeading}</p>
          <p>{dict.contactPage.subHeading2}</p>
        </div>
      </div>
      <form className={styles.__form} action={action} ref={formRef}>
        <FormGroup errorMessage={data?.errors?.name} style={{opacity: "0.9"}}>
          <label htmlFor="name">{dict.contactPage.name}</label>
          <input name="name" id="name" type="text" />
        </FormGroup>
        <FormGroup style={{opacity: "0.9"}}>
          <label htmlFor="phone">{dict.contactPage.phone}</label>
          <input name="phone" id="phone" type="tel" />
        </FormGroup>
        <FormGroup errorMessage={data?.errors?.email} style={{opacity: "0.9"}}>
          <label htmlFor="email">{dict.contactPage.email}</label>
          <input name="email" id="email" type="email" />
        </FormGroup>
        <FormGroup errorMessage={data?.errors?.message} style={{opacity: "0.9"}}>
          <label htmlFor="message">{dict.contactPage.msg}</label>
          <textarea name="message" id="message" rows={10} />
        </FormGroup>
        <SubmitButton
          type={"submit"}
          submit={dict.buttons.send}
          submitting={dict.buttons.sending}
          buttonType={"primary"}
          style={{width: "100%", marginTop: "1rem"}}
        >
          {dict.buttons.send}
        </SubmitButton>
      </form>
      <div className={styles.__icons}>
        <Link type="email" href="mailto:sami.paananen@gmail.com">
          <Email />
        </Link>
        <Link href="https://github.com/Sami-Juhani" target="_blank">
          <GitHubIcon />
        </Link>
        <Link href="https://linkedin.com/in/samipaan" target="_blank">
          <LinkedIn />
        </Link>
      </div>
    </div>
  )
}
