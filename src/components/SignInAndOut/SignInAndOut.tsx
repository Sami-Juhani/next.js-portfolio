"use client"

import { CustomButton } from "../Buttons"
import { signIn, signOut } from "next-auth/react"
import styles from "./Signin.module.css"
import { Dispatch, ReactNode, SetStateAction } from "react"
import { useNotification } from "@/context/useNotification"

export function SignInAndOut({
  dict,
  isSigningIn,
  setIsOpen,
}: {
  dict: any
  isSigningIn: boolean
  setIsOpen?: Dispatch<SetStateAction<boolean>>
}): ReactNode {
  const { setNotification } = useNotification()

  const handleSignIn = async () => {
    try {
      const result = await signIn("google", { callbackUrl: "/" })

      if (result?.error) {
        setNotification({ text: dict.notification.googleSignInFailed, type: "warning", isOpen: true })
      } else {
        setNotification({ text: dict.notification.googleSignInOk, type: "success", isOpen: true })
      }
    } catch (error) {
      setNotification({ text: dict.notification.unexpectedError, type: "alert", isOpen: true })
    }
  }

  return isSigningIn ? (
    <div className={styles.signIn__layout}>
      <h1>{dict.signInAndOutPage.signIn}</h1>
      <div className={styles.notice}>
        <h3>{dict.signInAndOutPage.notice}</h3>
        <p>{dict.signInAndOutPage.noticeText}</p>
        <p>{dict.signInAndOutPage.noticeTextConfirmation}</p>
      </div>
      <CustomButton buttonType={"primary"} onClick={handleSignIn}>
        <span className={styles.googleG}>G</span> {dict.signInAndOutPage.signInWithGoogle}
      </CustomButton>
    </div>
  ) : (
    <div className={styles.signIn__layout}>
      <h1>{dict.signInAndOutPage.signOut}</h1>
      <div className={styles.buttons}>
        <CustomButton buttonType={"primary"} onClick={async () => signOut()}>
          {dict.common.yes}
        </CustomButton>
        <CustomButton
          buttonType={"primary"}
          onClick={async () => {
            if (setIsOpen !== undefined) setIsOpen(false)
          }}
        >
          {dict.common.no}
        </CustomButton>
      </div>
    </div>
  )
}
