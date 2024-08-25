import { ButtonHTMLAttributes, ReactNode } from "react"
import styles from "./ButtonStyles.module.css"

interface ICustomButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  style?: Object
  buttonType?: "primary" | "secondary"
}

export function CustomButton({ children, className, style, buttonType, ...props }: ICustomButton): ReactNode {
  const defaultStyles = buttonType === "primary" ? styles.primaryButton : styles.secondaryButton

  return (
    <button className={`${defaultStyles} ${className}`} style={style} {...props}>
      {children}
    </button>
  )
}
