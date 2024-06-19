"use client"

import Link from "next/link"
import { Dispatch, SetStateAction } from "react"
import { usePathname, useRouter } from "next/navigation"
import { dafoe } from "@/lib/fonts"
import useIcons from "@/hooks/useIcons"
import { useSettings } from "@/context/useSettings"
import { FI, GB } from "country-flag-icons/react/3x2"
import { cc } from "@/lib/cc"
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
}

export function StickyNav({ links, activePageIndex, setActivePageIndex }: StickyNavProps) {
  const { LanguageIcon, LightBulp } = useIcons().action
  const { language, setLanguage, darkMode, setDarkMode } = useSettings()
  const router = useRouter()
  const pathname = usePathname()

  function onLanguageChange() {
    const lang = language === "en" ? "fi" : "en"
    setLanguage(lang)
    const newPath = pathname.replace(language as string, lang as string)
    router.push(newPath)
  }

  return (
    <header className={cc(styles.headerContainer, darkMode && styles.dark)}>
      <div className={styles.leftContainer}>
        <p className={dafoe.className}>SjP</p>
      </div>
      <nav className={styles.navigation}>
        <ul className={styles.links}>
          {links.length > 0 &&
            links.map((link) => (
              <li key={link.index}>
                <button
                  className={`${styles.link} ${cc(activePageIndex === link.index && styles.active)}`}
                  onClick={() => setActivePageIndex(link.index)}
                >
                  {link.name}
                </button>
              </li>
            ))}
        </ul>
      </nav>
      <div className={styles.settingsContainer}>
        <div className={styles.darkModeSettings}>
          <div className={`${styles.lightBulpLight}  ${cc(!darkMode && styles.On)}`}></div>
          <LightBulp onClick={() => setDarkMode((darkMode) => !darkMode)} />
        </div>
        <div className={styles.flagSettings}>
          <LanguageIcon className="pointer" onClick={onLanguageChange} />
          {language === "en" ? (
            <GB title="English" className={styles.flagIcon} />
          ) : (
            <FI title="Finnish" className={styles.flagIcon} />
          )}
        </div>
      </div>
    </header>
  )
}
