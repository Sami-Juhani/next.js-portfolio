"use client"

import { PrimaryButton } from "@/components/Buttons"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"

export function BackToBlogsButton({ lang, children }: { lang: string; children: ReactNode }) {
  const router = useRouter()

  function onClick() {
    router.push(`/${lang}`)
  }

  return (
    <PrimaryButton style={{ marginLeft: "auto" }} onClick={onClick}>
      {children}
    </PrimaryButton>
  )
}
