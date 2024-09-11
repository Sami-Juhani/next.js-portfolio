"use client"

import { useEffect } from "react"
import { useFormState } from "react-dom"
import { signOut } from "next-auth/react"
import { useNotification } from "@/context/useNotification"
import { useNextAuth } from "@/context/useNextAuth"
import useIcons from "@/hooks/useIcons"
import { CustomButton } from "../Buttons"
import { FormGroup } from "../FormGroup"
import { deleteUser } from "@/actions/user"
import styles from "./DeleteAccount.module.css"

type DeleteAccounProps = {
  dict: any
  onClose: () => void
}

export function DeleteAccount({ dict, onClose }: DeleteAccounProps) {
  const { WarningIcon } = useIcons().status
  const [data, action] = useFormState(deleteUser, { completed: false, error: "" })
  const { data: session } = useNextAuth()
  const { setNotification } = useNotification()

  useEffect(() => {
    if (data?.completed) {
      setNotification({ text: dict.deleteAccountPage.accountDeleted, type: "success", isOpen: true })
      signOut({ redirect: false })
      onClose()
    }
  }, [data, setNotification, dict.deleteAccountPage.accountDeleted, onClose])

  return (
    <div className={styles.__layout}>
      <div className="row gap-small items-center">
        <h2>{dict.common.warning}</h2>
        <WarningIcon style={{ fill: "#bb1212", fontSize: "3rem" }} />
      </div>
      <p>{dict.deleteAccountPage.permanently}</p>
      <form
        action={(e) =>
          action({ formData: e, userId: session?.user?.id, validConfirmation: dict.deleteAccountPage.deleteMe })
        }
      >
        <FormGroup errorMessage={data?.error}>
          <label htmlFor="confirmation">
            {dict.deleteAccountPage.procreedStart} <i style={{ color: "#bb1212" }}>{dict.deleteAccountPage.deleteMe}</i>{" "}
            {dict.deleteAccountPage.proceedEnd}
          </label>
          <input id="confirmation" name="confirmation" type="text" autoComplete="off" />
        </FormGroup>
        <div className="row space-between">
          <CustomButton buttonType={"primary"} type={"submit"}>
            {dict.buttons.delete}
          </CustomButton>
          <CustomButton buttonType={"primary"} type={"button"} onClick={onClose}>
            {dict.buttons.cancel}
          </CustomButton>
        </div>
      </form>
    </div>
  )
}
