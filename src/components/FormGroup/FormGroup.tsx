import { CSSProperties, ReactNode } from "react"
import styles from "./FormGroup.module.css"
import { cc } from "@/lib/cc"

type FormGrourProps = {
    errorMessage?: string
    children: ReactNode
    style?: CSSProperties
}

export function FormGroup({ errorMessage = "", style = {}, children }: FormGrourProps) {
    return (
      <div className={`${styles.formGroup} ${errorMessage.length > 0 ? styles.error : ""}`} style={style}>
        {children}
        {errorMessage.length > 0 && <div className={styles.msg}>{errorMessage}</div>}
      </div>
    )
  }