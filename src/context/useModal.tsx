"use client"

import { useContext } from "react"
import { Context } from "./Modal"

export function useModal() {
  const value = useContext(Context)
  if (value == null) {
    throw new Error("useModal must be used within an ModalProvider")
  }

  return value
}
