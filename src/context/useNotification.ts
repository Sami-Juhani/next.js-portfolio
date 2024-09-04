"use client"

import { useContext } from "react"
import { Context } from "./Notification"

export function useNotification() {
  const value = useContext(Context)
  if (value == null) {
    throw new Error("useNotification must be used within an NotificationProvider")
  }

  return value
}
