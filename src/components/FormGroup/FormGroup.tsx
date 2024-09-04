import { ReactNode } from "react"
import styles from "./FormGroup.module.css"

type FormGrourProps = {
    errorMessage?: string
    children: ReactNode
}

export function FormGroup({ errorMessage = "", children }: FormGrourProps) {
    return (
      <div className={`${styles.formGroup} ${errorMessage.length > 0 ? styles.error : ""}`}>
        {children}
        {errorMessage.length > 0 && <div className={styles.msg}>{errorMessage}</div>}
      </div>
    )
  }