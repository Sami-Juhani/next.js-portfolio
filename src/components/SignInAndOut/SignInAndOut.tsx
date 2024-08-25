"use client"

import { CustomButton } from "../Buttons"
import { signIn, signOut } from "next-auth/react"
import styles from "./Signin.module.css"
import { Dispatch, ReactNode, SetStateAction } from "react"

export function SignInAndOut({
  isSigningIn,
  setIsOpen,
}: {
  isSigningIn: boolean
  setIsOpen?: Dispatch<SetStateAction<boolean>>
}): ReactNode {
  return isSigningIn ? (
    <div className={styles.signIn__layout}>
      <h1>Sign In</h1>
      <div className={styles.notice}>
        <h3>Notice!</h3>
        <p>
          To add likes and comments in this application, you need to authorize with Google. Your email address will be
          securely stored in our database to keep track of your interactions, such as likes and comments. You can delete
          your profile at any time from the sign-in menu above, which will remove your data from our system.
        </p>
        <p>
          By pressing &apos;Sign in with google&apos; you agree to our terms and conditions, including how we handle
          your data.
        </p>
      </div>
      <CustomButton buttonType={"primary"} onClick={async () => signIn("google", { callbackUrl: "/" })}>
        <span className={styles.googleG}>G</span> Sign in with Google
      </CustomButton>
    </div>
  ) : (
    <div className={styles.signIn__layout}>
      <h1>Sign Out?</h1>
      <div className={styles.buttons}>
        <CustomButton buttonType={"primary"} onClick={async () => signOut()}>Yes</CustomButton>
        <CustomButton buttonType={"primary"}
          onClick={async () => {
            if (setIsOpen !== undefined) setIsOpen(false)
          }}
        >
          No
        </CustomButton>
      </div>
    </div>
  )
}
