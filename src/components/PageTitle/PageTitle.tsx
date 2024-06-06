"use client"

import useIcons from "@/hooks/useIcons"
import styles from "./PageTitle.module.css"
import { useRouter } from "next/navigation"
import { CSSProperties } from "react"

export function PageTitle({ mainStr, subStr, color }: { mainStr: string; subStr: string; color: string }) {
  const { GoBackIcon } = useIcons().action
  const router = useRouter()

  return (
    <div className={styles.pageTitle} style={{ "--_bgColor": color } as CSSProperties}>
      <h2>
        / {mainStr} / <span className="textMd font-weight-normal">{subStr}</span>
      </h2>
      <GoBackIcon className="custom-image-link" onClick={() => router.back()} />
    </div>
  )
}
