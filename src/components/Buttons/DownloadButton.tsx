import { ReactNode } from "react"
import styles from "./ButtonStyles.module.css"
import Link from "next/link"

type PrimaryButtonProps = { children: ReactNode; style?: Object; href: string }

export function DownloadButton({ children, style, href }: PrimaryButtonProps) {
  return (
    <Link href={href} style={style} className={styles.primaryButton} target="_blank">
      {children}
    </Link>
  )
}
