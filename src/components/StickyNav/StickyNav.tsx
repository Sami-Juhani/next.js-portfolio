"use client"

import Link from "next/link"
import styles from "./StickyNav.module.css"
import { ReactNode, useEffect, useState } from "react"
import { dafoe } from "@/lib/fonts"
import Image from "next/image"
import useIcons from "@/hooks/useIcons"
import { usePathname } from "next/navigation"

export type Link = {
  name: string
  href: string
}

export type StickyNavProps = {
  links: Link[]
  logoDescription: string
  logoSrc?: string
  logo?: ReactNode
}

export function StickyNav({ links, logoSrc, logo, logoDescription }: StickyNavProps) {
  const logoElement = logoSrc !== undefined ? <Image src={logoSrc} alt={logoDescription} /> : logo
  const { SettingsIcon } = useIcons().action
  const pathname = usePathname()

  const [activeLink, setActiveLink] = useState<string | undefined>(() => {
    const activePath = pathname.split("/")[2]
    const currentLink = links.find((link) => link.href.includes(activePath))
    return currentLink?.name || undefined
  })

  useEffect(() => {
    const activePath = pathname.split("/")[2]
    const currentLink = links.find((link) => link.href.includes(activePath))
    setActiveLink(currentLink?.name || undefined)
  }, [pathname, links])

  return (
    <header className={styles.headerContainer}>
      <div className={styles.leftContainer}>
        <Link href={"/"}>{logoElement}</Link>
        <p className={dafoe.className}>{logoDescription}</p>
      </div>
      <nav className={styles.navigation}>
        <ul className={styles.links}>
          {links.length > 0 &&
            links.map((link) => (
              <li key={link.href}>
                <Link
                  className={`${styles.link} ${activeLink === link.name ? styles.active : undefined}`}
                  href={link.href}
                  onClick={() => setActiveLink(link.name)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
      <SettingsIcon />
    </header>
  )
}
