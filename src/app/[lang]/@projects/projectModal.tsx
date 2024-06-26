"use client"

import { Dispatch, ReactNode, SetStateAction } from "react"
import styles from "./projects.module.css"
import useIcons from "@/hooks/useIcons"

type ProjectModalProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  setActiveComponent: Dispatch<SetStateAction<ReactNode>>
  Component: ReactNode
}

export function ProjectModal({ setIsOpen, Component, setActiveComponent }: ProjectModalProps) {
  const { CloseIcon } = useIcons().action

  return (
    <>
      <div className={"overlay"}></div>
      <div className={styles.__projectModal}>
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
