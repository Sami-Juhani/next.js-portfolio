"use client"

import styles from "./PageTitle.module.css"
import { CSSProperties } from "react"

export function PageTitle({ mainStr, subStr, color }: { mainStr: string; subStr: string; color: string }) {
  return (
    <div className={styles.pageTitle} style={{ "--_bgColor": color } as CSSProperties}>
      <h2>
        /{mainStr}/{subStr}
      </h2>
    </div>
  )
}
