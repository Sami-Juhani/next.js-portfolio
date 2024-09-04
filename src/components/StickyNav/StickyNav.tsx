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
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
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

export function StickyNav({ links, activePageIndex, setActivePageIndex, dict }: StickyNavProps) {
  const [langSettingsOpen, setLangSettingsOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false)
  const { darkMode, setDarkMode } = useSettings()
  const { data: session, status } = useNextAuth()
  const { Globe, DarkMode, LoginIcon, LogoutIcon } = useIcons().action
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
              setLangSettingsOpen((prevOpen) => !prevOpen)
            }}
          />
          {
            <LanguageDropdown
              dict={dict}
              langSettingsOpen={langSettingsOpen}
              setLangSettingsOpen={setLangSettingsOpen}
            />
          }
        </div>
        <div className="row items-center gap-small">
          <div className={styles.__settingsIcon}>
            {status === "unauthenticated" && (
              <LoginIcon
                onClick={() => {
                  if (status === "unauthenticated") {
                    setIsSigningIn(true)
                    setIsOpen(true)
                  }
                }}
              />
            )}
            {status === "loading" && <CircularProgress color="inherit" size={30} />}
            {status === "authenticated" && (
              <LogoutIcon
                onClick={() => {
                  if (status === "authenticated") {
                    setIsSigningIn(false)
                    setIsOpen(true)
                  }
                }}
              />
            )}
          </div>
          {session?.user && <p className="textSm">{session?.user?.name?.split(" ")[0]}</p>}
        </div>
      </div>
      {modalTarget != undefined &&
        createPortal(
          isOpen && (
            <Modal
              setIsOpen={setIsOpen}
              setActiveComponent={() => {}}
              Component={<SignInAndOut isSigningIn={isSigningIn} setIsOpen={setIsOpen} dict={dict} />}
            />
          ),
          modalTarget
        )}
    </header>
  )
}

function LanguageDropdown({
  dict,
  langSettingsOpen,
  setLangSettingsOpen,
}: {
  dict: any
  langSettingsOpen: boolean
  setLangSettingsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const { Checked } = useIcons().status
  const { language, setLanguage } = useSettings()
  const pathname = usePathname()
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangSettingsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => document.removeEventListener("mousedown", handleClickOutside)
  })

  function onLanguageChange(lang: SupportedLanguages) {
    setLanguage(lang)
    const newPath = pathname.replace(language as string, lang as string)
    router.replace(newPath)
  }

  return (
    <div className={`${styles.__languageDropdown}  ${cc(langSettingsOpen && styles.open)}`} ref={dropdownRef}>
      <button onClick={() => onLanguageChange("en")}>
        <div className="row gap-medium items-center">
          <GB style={{ width: "20px" }} />
          <p className="row gap-medium">{dict.languages.english}</p>
        </div>
        <Checked style={language === "en" ? { visibility: "visible" } : { visibility: "hidden" }} />
      </button>
      <button onClick={() => onLanguageChange("fi")}>
        <div className="row gap-medium items-center">
          <FI style={{ width: "20px" }} />
          <p className="row gap-medium">{dict.languages.finnish}</p>
        </div>
        <Checked style={language === "fi" ? { visibility: "visible" } : { visibility: "hidden" }} />
      </button>
    </div>
  )
}
