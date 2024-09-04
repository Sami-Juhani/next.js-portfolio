"use client"

import { useSession } from "next-auth/react"

export function useNextAuth() {
  const value = useSession()
  if (value == null) {
    throw new Error("useSettings must be used within an EventsProvider")
  }

  return value
}
