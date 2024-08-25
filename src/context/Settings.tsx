"use client"

import { useLocalStorage } from "usehooks-ts"
import { cc } from "@/lib/cc"
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export type SupportedLanguages = "en" | "fi"

export type User = {
  id: string
  name: string
  role: string
  blogLikes: string[]
}

type SettingsContext = {
  darkMode: boolean
  setDarkMode: Dispatch<SetStateAction<boolean>>
  language: SupportedLanguages
  setLanguage: Dispatch<SetStateAction<SupportedLanguages>>
  user: User | undefined
  setUser: Dispatch<SetStateAction<User | undefined>>
}

export const Context = createContext<SettingsContext | null>(null)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [user, setUser] = useState<User>()
  const [language, setLanguage] = useLocalStorage<SupportedLanguages>("language", "en", { initializeWithValue: false })
  const [darkMode, setDarkMode] = useLocalStorage<boolean>("darkMode", false, { initializeWithValue: false })

  useEffect(() => {
    const lang = pathname.split("/")[1] as SupportedLanguages
    setLanguage(lang)
  }, [pathname, setLanguage])

  return (
    <Context.Provider value={{ language, setLanguage, darkMode, setDarkMode, user, setUser }}>
      <div className={cc(darkMode ? "dark-theme" : "light-theme")}>{children}</div>
    </Context.Provider>
  )
}
