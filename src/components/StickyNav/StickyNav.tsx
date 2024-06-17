"use client"

import Link from "next/link"
import styles from "./StickyNav.module.css"
import { useEffect, useState } from "react"
import { dafoe } from "@/lib/fonts"
import useIcons from "@/hooks/useIcons"
import { usePathname, useRouter } from "next/navigation"
import { useSettings } from "@/context/useSettings"
import { FI, GB } from "country-flag-icons/react/3x2"
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
  const { CodeIcon } = useIcons().utils
  const { LanguageIcon, LightBulp } = useIcons().action
  const { language, setLanguage, darkMode, setDarkMode } = useSettings()
  const router = useRouter()
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

  function onLanguageChange() {
    const lang = language === "en" ? "fi" : "en"
    setLanguage(lang)
    const newPath = pathname.replace(language as string, lang as string)
    console.log(newPath)
    router.replace(newPath)
  }

  return (
    <header className={cc(styles.headerContainer, darkMode && styles.dark)}>
      <div className={styles.leftContainer}>
        <Link href={`/${lang}/`}>
          <CodeIcon />
        </Link>
        <p className={dafoe.className}>SjP</p>
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
      <div className={styles.settingsContainer}>
        <LanguageIcon className="pointer" onClick={onLanguageChange} />
        <LightBulp onClick={() => setDarkMode((darkMode) => !darkMode)} />
        <div className={`${styles.lightBulp}  ${cc(!darkMode && styles.lightBulpOn)}`}></div>
      </div>
      {language === "en" ? (
        <GB title="English" className={styles.flagIcon} />
      ) : (
        <FI title="Finnish" className={styles.flagIcon} />
      )}
    </header>
  )
}
