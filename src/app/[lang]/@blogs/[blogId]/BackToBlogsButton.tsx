"use client"

import { PrimaryButton } from "@/components/Buttons"
import { useRouter } from "next/navigation"

export function BackToBlogsButton({ lang }: { lang: string }) {
  const router = useRouter()

  function onClick() {
    router.push(`/${lang}`)
  }

  return <PrimaryButton style={{ marginLeft: "auto"}} onClick={onClick}>Back to blogs</PrimaryButton>
}
