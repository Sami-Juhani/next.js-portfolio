"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { useNotification } from "@/context/useNotification"
import { useFormState } from "react-dom"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import useIcons from "@/hooks/useIcons"
import { FormGroup } from "@/components/FormGroup"
import { SubmitButton } from "@/components/Buttons/SubmitButton"
import { sendEmail } from "@/actions/email"
import { specialElite } from "@/lib/fonts"
import styles from "./contact.module.css"

type ContactProps = {
  dict: any
}

export function Contact({ dict }: ContactProps) {
  const { GitHubIcon, LinkedIn, Email } = useIcons().dev
  const [data, action] = useFormState(sendEmail, { completed: false, errors: {} })
  const { setNotification } = useNotification()
  const formRef = useRef<HTMLFormElement>(null)
  const { executeRecaptcha } = useGoogleReCaptcha()

  const onSubmit = async (e: FormData) => {
    if (!executeRecaptcha) {
      console.error("ReCAPTCHA not available")
      return
    }

    const gRecaptchaToken = await executeRecaptcha("registerSubmit")

    try {
      const res = await fetch("/api/recaptcha", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gRecaptchaToken }),
      })

      if (!res.ok) {
        setNotification({ text: "An error occurred. Please try again.", type: "alert", isOpen: true })
      }

      const response = await res.json()

      if (response.success) {
        action(e)
      } else {
        setNotification({ text: "Validation failed. Please try again.", type: "warning", isOpen: true })
      }
    } catch (error) {
      setNotification({ text: "An error occurred. Please try again.", type: "alert", isOpen: true })
    }
  }

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
      <form className={styles.__form} action={onSubmit} ref={formRef}>
        <FormGroup errorMessage={data?.errors?.name} style={{ opacity: "0.9" }}>
          <label htmlFor="name">{dict.contactPage.name}</label>
          <input name="name" id="name" type="text" />
        </FormGroup>
        <FormGroup style={{ opacity: "0.9" }}>
          <label htmlFor="phone">{dict.contactPage.phone}</label>
          <input name="phone" id="phone" type="tel" />
        </FormGroup>
        <FormGroup errorMessage={data?.errors?.email} style={{ opacity: "0.9" }}>
          <label htmlFor="email">{dict.contactPage.email}</label>
          <input name="email" id="email" type="email" />
        </FormGroup>
        <FormGroup errorMessage={data?.errors?.message} style={{ opacity: "0.9" }}>
          <label htmlFor="message">{dict.contactPage.msg}</label>
          <textarea name="message" id="message" rows={10} />
        </FormGroup>
        <SubmitButton
          type={"submit"}
          submit={dict.buttons.send}
          submitting={dict.buttons.sending}
          buttonType={"primary"}
          style={{ width: "100%", marginTop: "1rem" }}
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
