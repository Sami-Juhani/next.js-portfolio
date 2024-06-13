"use client"

import Link from "next/link"
import styles from "./StickyNav.module.css"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { dafoe } from "@/lib/fonts"
import useIcons from "@/hooks/useIcons"
import { usePathname, useRouter } from "next/navigation"
import { useSettings } from "@/context/useSettings"
import { SupportedLanguages } from "@/context/Settings"
import { PrimaryButton } from "../Buttons"
import { cc } from "@/lib/cc"

export type Link = {
  name: string
  href: string
}

export type StickyNavProps = {
  lang: string
  links: Link[]
}

export function StickyNav({ lang, links }: StickyNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { SettingsIcon } = useIcons().action
  const { CodeIcon } = useIcons().utils
  const { darkMode } = useSettings()
  const pathname = usePathname()

  const [activeLink, setActiveLink] = useState<string | undefined>(() => {
    const currentPath =
      pathname.split("/").length > 2
        ? "/" + pathname.split("/")[1] + "/" + pathname.split("/")[2]
        : "/" + pathname.split("/")[1]
    const currentLink = links.find((link) => link.href === currentPath)
    return currentLink?.name
  })

  useEffect(() => {
    const currentPath =
      pathname.split("/").length > 2
        ? "/" + pathname.split("/")[1] + "/" + pathname.split("/")[2]
        : "/" + pathname.split("/")[1]
    const currentLink = links.find((link) => link.href === currentPath)
    setActiveLink(currentLink?.name)
  }, [pathname, links])

  return (
    <header className={cc(styles.headerContainer, darkMode && styles.dark)}>
      <div className={styles.leftContainer}>
        <Link href={`/${lang}/`}>
          <CodeIcon />
        </Link>
        <p className={dafoe.className}>Sami Paananen</p>
      </div>
      <nav className={styles.navigation}>
        <ul className={styles.links}>
          {links.length > 0 &&
            links.map((link) => (
              <li key={link.href}>
                <Link
                  className={`${styles.link} ${cc(activeLink === link.name && styles.active)}`}
                  href={link.href}
                  onClick={() => setActiveLink(link.name)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
      <SettingsIcon
        className={cc(isTransitioning && styles.spinning)}
        onClick={() => {
          setIsOpen((isOpen) => !isOpen)
          setIsTransitioning(true)
        }}
      />
      <SettingsMenu isOpen={isOpen} setIsOpen={setIsOpen} setIsTransitioning={setIsTransitioning} />
    </header>
  )
}

type SettingsMenuProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  setIsTransitioning: Dispatch<SetStateAction<boolean>>
}

function SettingsMenu({ isOpen, setIsOpen, setIsTransitioning }: SettingsMenuProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { CloseIcon } = useIcons().action
  const { LanguageIcon, LightModeIcon } = useIcons().status
  const { language, setLanguage, darkMode, setDarkMode } = useSettings()

  function handleLanguageChange(lang: SupportedLanguages) {
    setLanguage(lang)
    const newPath = pathname.replace(language as string, lang as string)
    router.replace(newPath)
  }

  return (
    <div
      onTransitionEnd={() => setIsTransitioning(false)}
      className={`${styles.settingsMenu} ${cc(isOpen && styles.open)}`}
      style={{ backgroundColor: darkMode ? "#eeeeee" : "#ffffff" }}
    >
      <div className="column gap-medium">
        <CloseIcon
          onClick={() => {
            setIsOpen(false)
            setIsTransitioning(true)
          }}
        />
        <div className="row gap-medium">
          <LanguageIcon style={{ fill: "#007bff" }} />
          <label htmlFor="language-options">Language</label>
        </div>
        <select
          value={language as string}
          name="language-options"
          id="language-options"
          className={styles.menuSelect}
          onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguages)}
        >
          <option value="en">English</option>
          <option value="fi">Finnish</option>
        </select>
      </div>
      <div className="column gap-medium">
        <div className="row gap-medium">
          <LightModeIcon style={darkMode ? { fill: "var(--text-primary)" } : { fill: "#d4cd24" }} />
          <p>Dark Mode</p>
        </div>
        <PrimaryButton onClick={() => setDarkMode((darkMode) => !darkMode)}>{darkMode ? "On" : "Off"}</PrimaryButton>
      </div>
    </div>
  )
}
