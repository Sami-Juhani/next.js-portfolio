"use client"

import Link from "next/link"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { dafoe } from "@/lib/fonts"
import useIcons from "@/hooks/useIcons"
import { useSettings } from "@/context/useSettings"
import { FI, GB } from "country-flag-icons/react/3x2"
import { cc } from "@/lib/cc"
import styles from "./StickyNav.module.css"
import { SupportedLanguages } from "@/context/Settings"
import { usePathname, useRouter } from "next/navigation"

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
  const { Globe, DarkMode } = useIcons().action
  const { darkMode, setDarkMode } = useSettings()
  const [langSettingsOpen, setLangSettingsOpen] = useState(false)

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
          <Globe style={{ position: "relative" }} onClick={() => setLangSettingsOpen((prevOpen) => !prevOpen)} />
          {
            <LanguageDropdown
              dict={dict}
              langSettingsOpen={langSettingsOpen}
              setLangSettingsOpen={setLangSettingsOpen}
            />
          }
        </div>
      </div>
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
