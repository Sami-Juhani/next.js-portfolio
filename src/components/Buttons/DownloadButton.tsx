import { ReactNode } from "react"
import styles from "./ButtonStyles.module.css"
import Link from "next/link"
import { CustomButton } from "./CustomButton"

type PrimaryButtonProps = { children: ReactNode; style?: Object; href: string }

export function DownloadButton({ children, href }: PrimaryButtonProps) {
  return (
    <CustomButton buttonType="primary">
      <Link href={href} target="_blank">
        {children}
      </Link>
    </CustomButton>
  )
}
