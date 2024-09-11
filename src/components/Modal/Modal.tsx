"use client"

import { ReactNode, useEffect, useRef } from "react"
import styles from "./modal.module.css"
import useIcons from "@/hooks/useIcons"
import { createPortal } from "react-dom"

type ModalProps = {
  onClose: () => void
  page: ReactNode
}

export function Modal({ onClose, page }: ModalProps) {
  const { CloseIcon } = useIcons().action
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  return createPortal(
    <>
      <div className={"overlay"}></div>
      <div className={styles.__projectModal} ref={modalRef}>
        <CloseIcon className={styles.closeIcon} onClick={onClose} />
        {page}
      </div>
    </>,
    document.getElementById("modal-target") as HTMLDivElement
  )
}
