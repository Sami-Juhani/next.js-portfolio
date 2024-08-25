import { useState } from "react"

const DEFAULT_OPTIONS = {
  method: "get",
  headers: { "Content-Type": "application/json" },
}
export function useApiHook(url: string, options?: Object, body?: JSON, update?: Function) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [value, setValue] = useState<unknown>()

  const useApi = async () => {
    try {
      const response = await fetch(url, { ...DEFAULT_OPTIONS, ...options })

      if (!response.ok) {
        setError("Failed to execute api request. Please try later again...")
      }

      const data = await response.json()
      setValue(data)
    } catch (error) {
      setError(error as string)
    } finally {
      if (update !== undefined) update()
      setIsLoading(false)
    }
  }

  return { value, error, isLoading, useApi }
}
