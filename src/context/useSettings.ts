"use client"

import { useContext } from "react"
import { Context } from "./Settings"

export function useSettings() {
  const value = useContext(Context)
  if (value == null) {
    throw new Error("useSettings must be used within an EventsProvider")
  }

  return value
}
