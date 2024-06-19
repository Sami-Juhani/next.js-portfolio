import { ReactNode } from "react"
import styles from "./ButtonStyles.module.css"
import useIcons from "@/hooks/useIcons"

type GoBackButton = { children: ReactNode; style?: Object; onClick: () => void }

export function GoBackButton({ children, style, onClick }: GoBackButton) {
  const { GoBackIcon } = useIcons().action

  return (
    <button style={style} className={styles.goBackButton} onClick={onClick}>
      <GoBackIcon />
      {children}
    </button>
  )
}
