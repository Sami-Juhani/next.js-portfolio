"use client"

import { Modal } from "@/components/Modal"
import { createContext, useState, ReactNode, SetStateAction, Dispatch } from "react"

type ModalState = ReactNode | null

interface ModalContextProps {
  page: ReactNode
  setPage: Dispatch<SetStateAction<ModalState>>
  onClose: () => void
}

export const Context = createContext<ModalContextProps | null>(null)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState<ModalState>(null)

  const onClose = () => setPage(null)

  return (
    <Context.Provider value={{ page, setPage, onClose }}>
      {page !== null && <Modal page={page} onClose={() => setPage(null)} />}
      {children}
    </Context.Provider>
  )
}
