import { ButtonHTMLAttributes, ReactNode } from "react"
import styles from "./ButtonStyles.module.css"
import { cc } from "@/lib/cc"

export type ButtonTypes = "primary" | "secondary" | "warning" | "transparent"

export interface ICustomButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  style?: Object
  buttonType?: ButtonTypes
}

export function CustomButton({ children, className, style, buttonType, ...props }: ICustomButton): ReactNode {
  const defaultStyles = cc(buttonType !== undefined && styles[buttonType])

  return (
    <button className={`${styles.button} ${cc(className !== undefined && className)} ${defaultStyles}`} style={style} {...props}>
      {children}
    </button>
  )
}
