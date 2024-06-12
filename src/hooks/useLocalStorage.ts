import { Dispatch, SetStateAction, useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window !== "undefined") {
      const localValue = window.localStorage.getItem(key)
      if (localValue === null) {
        if (typeof initialValue === "function") {
          return (initialValue as () => T)()
        } else {
          return initialValue
        }
      } else {
        return JSON.parse(localValue)
      }
    }
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (value === undefined) {
        window.localStorage.removeItem(key)
      } else {
        window.localStorage.setItem(key, JSON.stringify(value))
      }
    }
  }, [value, key])

  return [value, setValue]
}
