"use client"

import { CustomButton } from "@/components/Buttons"
import { useFormStatus } from "react-dom"
import { ButtonTypes, ICustomButton } from "./CustomButton"

interface ISubmitButton extends ICustomButton {
  submit: string
  submitting: string
  onClick?: () => void
}

export function SubmitButton({ submit, submitting, buttonType, onClick }: ISubmitButton) {
  const { pending } = useFormStatus()

  return (
    <CustomButton
      type={typeof onClick == "function" ? "button" : "submit"}
      buttonType={buttonType}
      disabled={pending}
      onClick={onClick}
    >
      {!pending ? submit : submitting}
    </CustomButton>
  )
}
