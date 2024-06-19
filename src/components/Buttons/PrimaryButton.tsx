import { ReactNode } from "react"
import styles from "./ButtonStyles.module.css"

type PrimaryButtonProps = { children: ReactNode; style?: Object; onClick: () => void }

export function PrimaryButton({ children, style, onClick }: PrimaryButtonProps) {
  return (
    <button style={style} className={styles.primaryButton} onClick={onClick}>
      {children}
    </button>
  )
}
