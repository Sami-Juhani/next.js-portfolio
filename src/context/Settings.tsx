"use client"

import { useLocalStorage } from "@/hooks/useLocalStorage"
import { cc } from "@/lib/cc"
import { usePathname } from "next/navigation"
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect } from "react"

export type SupportedLanguages = "en" | "fi" | (() => SupportedLanguages)

type SettingsContext = {
  darkMode: boolean
  setDarkMode: Dispatch<SetStateAction<boolean>>
  language: SupportedLanguages
  setLanguage: Dispatch<SetStateAction<SupportedLanguages>>
}

export const Context = createContext<SettingsContext | null>(null)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [language, setLanguage] = useLocalStorage<SupportedLanguages>("language", "en")
  const [darkMode, setDarkMode] = useLocalStorage<boolean>("darkMode", false)

  useEffect(() => {
    setLanguage(pathname.split("/")[1] as SupportedLanguages)
  }, [pathname, setLanguage])

  return (
    <Context.Provider value={{ language, setLanguage, darkMode, setDarkMode }}>
      <div className={cc(darkMode ? "dark-theme" : "light-theme")}>{children}</div>
    </Context.Provider>
  )
}
