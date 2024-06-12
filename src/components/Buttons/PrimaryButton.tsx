import { ReactNode } from "react"
import styles from "./ButtonStyles.module.css"

export function PrimaryButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return <button className={styles.button} onClick={onClick}>{children}</button>
}
