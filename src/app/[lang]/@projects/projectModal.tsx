"use client"

import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react"
import styles from "./projects.module.css"
import useIcons from "@/hooks/useIcons"

type ProjectModalProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  setActiveComponent: Dispatch<SetStateAction<ReactNode>>
  Component: ReactNode
}

export function ProjectModal({ setIsOpen, Component, setActiveComponent }: ProjectModalProps) {
  const { CloseIcon } = useIcons().action
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [setIsOpen])

  return (
    <>
      <div className={"overlay"}></div>
      <div className={styles.__projectModal} ref={modalRef}>
        <CloseIcon
          className={styles.closeIcon}
          onClick={() => {
            setIsOpen(false)
            setActiveComponent(null)
          }}
        />
        {Component}
      </div>
    </>
  )
}
