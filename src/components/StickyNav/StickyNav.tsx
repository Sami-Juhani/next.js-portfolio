"use client"

import { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from "react"
import { useNextAuth } from "@/context/useNextAuth"
import { useSettings } from "@/context/useSettings"
import useIcons from "@/hooks/useIcons"
import { useModal } from "@/context/useModal"
import { usePathname, useRouter } from "next/navigation"
import { SignInAndOut } from "../SignInAndOut"
import { DeleteAccount } from "../DeleteAccount"
import CircularProgress from "@mui/material/CircularProgress"
import { SupportedLanguages } from "@/context/Settings"
import { FI, GB } from "country-flag-icons/react/3x2"
import { cc } from "@/lib/cc"
import { dafoe } from "@/lib/fonts"
import styles from "./StickyNav.module.css"

export type Link = {
  name: string
  index: number
}

export type StickyNavProps = {
  lang: string
  links: Link[]
  activePageIndex: number
  setActivePageIndex: Dispatch<SetStateAction<number>>
  dict: any
}

type DropDownType = "langSettings" | "userDropDown" | null

export function StickyNav({ links, activePageIndex, setActivePageIndex, dict }: StickyNavProps) {
  const [openDropDown, setOpenDropDown] = useState<DropDownType>(null)
  const langDropDownRef = useRef<HTMLDivElement>(null)
  const userDropDownRef = useRef<HTMLDivElement>(null)
  const { darkMode, setDarkMode } = useSettings()
  const { data: session, status } = useNextAuth()
  const { Globe, DarkMode } = useIcons().action
  const { User } = useIcons().status

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        /* UseDropDown is Open & Clicked outside */
        (openDropDown === "userDropDown" &&
          userDropDownRef.current &&
          !userDropDownRef.current.contains(e.target as Node)) ||
        /* LanguageDropdown is Open & Clicked outside */
        (openDropDown === "langSettings" &&
          langDropDownRef.current &&
          !langDropDownRef.current.contains(e.target as Node))
      ) {
        setOpenDropDown(null)
      }
    }
    if (userDropDownRef.current) document.addEventListener("mousedown", handleClickOutside)

    return () => document.removeEventListener("mousedown", handleClickOutside)
  })

  return (
    <header className={cc(styles.__navLayout, darkMode && styles.dark)}>
      <div className={styles.__leftLayout}>
        <p className={dafoe.className}>SjP</p>
      </div>
      <nav className={styles.navigation}>
        <ul className={styles.__linksLayout}>
          {links.length > 0 &&
            links.map((link) => (
              <li key={link.index}>
                <button
                  className={`${styles.link} ${cc(activePageIndex === link.index && styles.active)}`}
                  onClick={() => {
                    if (activePageIndex !== link.index) window.scrollTo({ top: 0 }), setActivePageIndex(link.index)
                  }}
                >
                  {link.name}
                </button>
              </li>
            ))}
        </ul>
      </nav>
      <div className={styles.__settingsLayout}>
        <button className={styles.__settingsIcon}>
          <DarkMode onClick={() => setDarkMode((darkMode) => !darkMode)} />
        </button>
        <div className={styles.__settingsIcon}>
          <Globe
            onMouseDown={() => {
              setOpenDropDown("langSettings")
            }}
          />
          <LanguageDropdown dict={dict} isOpen={openDropDown === "langSettings"} setOpenDropDown={setOpenDropDown} />
        </div>

        <div className={styles.__settingsIcon}>
          {status === "loading" ? (
            <CircularProgress color="inherit" size={"1.5em"} />
          ) : (
            <User
              onMouseDown={() => {
                setOpenDropDown("userDropDown")
              }}
            />
          )}
          <UserDropDown
            dict={dict}
            isOpen={openDropDown === "userDropDown"}
            userName={session?.user?.name?.split(" ")[0]}
            setOpenDropDown={setOpenDropDown}
            status={status}
          />
        </div>
      </div>
    </header>
  )
}

type DropDownProps = {
  isOpen: boolean
  setOpenDropDown: Dispatch<SetStateAction<DropDownType>>
  children: ReactNode
}

function DropDown({ isOpen, setOpenDropDown, children }: DropDownProps) {
  const dropDownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (isOpen && dropDownRef.current && !dropDownRef.current.contains(e.target as Node)) {
        setOpenDropDown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => document.removeEventListener("mousedown", handleClickOutside)
  })

  return (
    <div className={`${styles.__dropdown}  ${cc(isOpen && styles.open)}`} ref={dropDownRef}>
      {children}
    </div>
  )
}

type LanguageDropDownProps = {
  dict: any
  isOpen: boolean
  setOpenDropDown: Dispatch<SetStateAction<DropDownType>>
}

function LanguageDropdown({ dict, isOpen, setOpenDropDown }: LanguageDropDownProps) {
  const { Checked } = useIcons().status
  const { language, setLanguage } = useSettings()
  const pathname = usePathname()
  const router = useRouter()

  function onLanguageChange(lang: SupportedLanguages) {
    setLanguage(lang)
    const newPath = pathname.replace(language as string, lang as string)
    router.replace(newPath)
  }

  return (
    <DropDown isOpen={isOpen} setOpenDropDown={setOpenDropDown}>
      <button onClick={() => onLanguageChange("en")}>
        <div className="row gap-medium items-center">
          <GB style={{ width: "20px" }} />
          <p className="row gap-medium">{dict.languages.english}</p>
        </div>
        <Checked
          style={
            language === "en" ? { visibility: "visible", fill: "#00ff00" } : { visibility: "hidden", fill: "#00ff00" }
          }
        />
      </button>
      <button onClick={() => onLanguageChange("fi")}>
        <div className="row gap-medium items-center">
          <FI style={{ width: "20px" }} />
          <p className="row gap-medium">{dict.languages.finnish}</p>
        </div>
        <Checked
          style={
            language === "fi" ? { visibility: "visible", fill: "#00ff00" } : { visibility: "hidden", fill: "#00ff00" }
          }
        />
      </button>
    </DropDown>
  )
}

type UserDropDownProps = {
  dict: any
  isOpen: boolean
  userName: string | undefined
  setOpenDropDown: Dispatch<SetStateAction<DropDownType>>
  status: "authenticated" | "unauthenticated" | "loading"
}

function UserDropDown({ dict, isOpen, userName, setOpenDropDown, status }: UserDropDownProps) {
  const { WarningIcon } = useIcons().status
  const { setPage, onClose } = useModal()

  return (
    <DropDown isOpen={isOpen} setOpenDropDown={setOpenDropDown}>
      {userName !== undefined && (
        <p className={styles.userName}>
          {dict.userDropDown.welcome}, <span>{userName}!</span>
        </p>
      )}
      <button
        onClick={() => {
          /* SIGN OUT */
          if (status === "authenticated") {
            setPage(<SignInAndOut isSigningIn={false} onClose={onClose} dict={dict} />)
          } else {
            /* SIGN IN */
            setPage(<SignInAndOut isSigningIn={true} onClose={onClose} dict={dict} />)
          }
        }}
      >
        <div className="row gap-medium items-center">
          {status === "authenticated" ? dict.userDropDown.signOut : dict.userDropDown.signIn}{" "}
        </div>
      </button>
      {status === "authenticated" && (
        <button onClick={() => setPage(<DeleteAccount dict={dict} onClose={onClose} />)}>
          <p>{dict.userDropDown.deleteAccount}</p>
          <WarningIcon style={{ fill: "#bb1212" }} />
        </button>
      )}
    </DropDown>
  )
}
