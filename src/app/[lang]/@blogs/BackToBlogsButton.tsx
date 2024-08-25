"use client"

import { CustomButton } from "@/components/Buttons"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"
import styles from "./blog.module.css"

export function BackToBlogsButton({ children }: { lang: string; children: ReactNode }) {
  const router = useRouter()

  function onClick() {
    router.back()
  }

  return (
    <CustomButton className={styles.backButton} style={{ marginLeft: "auto" }} onClick={onClick}>
      {children}
    </CustomButton>
  )
}
