"use client"

import { SupportedLanguages } from "@/context/Settings"
import { useNextAuth } from "@/context/useNextAuth"
import { useSettings } from "@/context/useSettings"
import useIcons from "@/hooks/useIcons"
import { cc } from "@/lib/cc"
import { dafoe } from "@/lib/fonts"
import CircularProgress from "@mui/material/CircularProgress"
import { FI, GB } from "country-flag-icons/react/3x2"
import { usePathname, useRouter } from "next/navigation"
import { Dispatch, ReactNode, RefObject, SetStateAction, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Modal } from "../Modal"
import { SignInAndOut } from "../SignInAndOut"
import { usePortal } from "@/hooks/usePortal"
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
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false)
  const { darkMode, setDarkMode } = useSettings()
  const { data: session, status } = useNextAuth()
  const { Globe, DarkMode, LoginIcon, LogoutIcon } = useIcons().action
  const { User } = useIcons().status
  const modalTarget = usePortal("modal-target")

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
            style={{ position: "relative" }}
            onMouseDown={() => {
              setOpenDropDown("langSettings")
            }}
          />
          {<LanguageDropdown dict={dict} isOpen={openDropDown === "langSettings"} setOpenDropDown={setOpenDropDown} />}
        </div>

        <div className={styles.__settingsIcon}>
          {status === "loading" ? (
            <CircularProgress color="inherit" size={30} />
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
            setIsSignInOpen={setIsSignInOpen}
            setIsUserSigningIn={setIsSigningIn}
            status={status}
          />
        </div>
      </div>

      {modalTarget != undefined &&
        createPortal(
          isSignInOpen && (
            <Modal
              setIsOpen={setIsSignInOpen}
              setActiveComponent={() => {}}
              Component={<SignInAndOut isSigningIn={isSigningIn} setIsOpen={setIsSignInOpen} dict={dict} />}
            />
          ),
          modalTarget
        )}
    </header>
  )
}

type DropDownProps = {
  isOpen: boolean
  setOpenDropDown: Dispatch<SetStateAction<DropDownType>>
  children: ReactNode
  dropDownRef: RefObject<HTMLDivElement>
}

function DropDown({ isOpen, setOpenDropDown, children, dropDownRef }: DropDownProps) {
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target as Node)) {
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

function LanguageDropdown({
  dict,
  isOpen,
  setOpenDropDown,
}: {
  dict: any
  isOpen: boolean
  setOpenDropDown: Dispatch<SetStateAction<DropDownType>>
}) {
  const langSettingsRef = useRef<HTMLDivElement>(null)
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
    <DropDown isOpen={isOpen} setOpenDropDown={setOpenDropDown} dropDownRef={langSettingsRef}>
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
  setIsUserSigningIn: Dispatch<SetStateAction<boolean>>
  setIsSignInOpen: Dispatch<SetStateAction<boolean>>
  status: "authenticated" | "unauthenticated" | "loading"
}

function UserDropDown({
  dict,
  isOpen,
  userName,
  setOpenDropDown,
  setIsUserSigningIn,
  setIsSignInOpen,
  status,
}: UserDropDownProps) {
  const { WarningIcon } = useIcons().status
  const userDropDownRef = useRef<HTMLDivElement>(null)

  return (
    <DropDown isOpen={isOpen} setOpenDropDown={setOpenDropDown} dropDownRef={userDropDownRef}>
      <p className={styles.userName}>
        Welcome, <span>{userName !== undefined && userName}!</span>
      </p>
      <button
        onClick={() => {
          /* SIGN OUT */
          if (status === "authenticated") {
            setIsSignInOpen(true)
            setIsUserSigningIn(false)
          } else {
            /* SIGN IN */
            setIsSignInOpen(true)
            setIsUserSigningIn(true)
          }
        }}
      >
        <div className="row gap-medium items-center">{status === "authenticated" ? "Sign out" : "Sign in"} </div>
      </button>
      {status === "authenticated" && (
        <button onClick={() => {}}>
          <p>Delete Account</p>
          <WarningIcon style={{ fill: "#bb1212" }} />
        </button>
      )}
    </DropDown>
  )
}
