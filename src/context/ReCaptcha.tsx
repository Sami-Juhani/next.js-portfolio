"use client"

import { ReactNode } from "react"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"

export function ReCaptchaProvider({ children, lang }: { children: ReactNode, lang?: string }) {
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string

  if (!recaptchaKey) throw new Error("To use GoogleRecaptcha please provide a valid secret key")

  return <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey} language={lang}>{children}</GoogleReCaptchaProvider>
}
