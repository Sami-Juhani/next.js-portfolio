import { useEffect, useState } from "react"

export function usePortal(target: string) {
  const [selector, setSelector] = useState<HTMLDivElement>()

  useEffect(() => {
    const portalTarget = document.getElementById(target) as HTMLDivElement
    if (portalTarget != undefined) setSelector(portalTarget)
  }, [target])
  
  return selector 
}
