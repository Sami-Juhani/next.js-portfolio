import { specialElite } from "@/lib/fonts"
import styles from "./Loading.module.css"

export function Loading() {
  return (
    <>
      <div className="overlay"></div>
      <div className={`${styles.__layout} ${specialElite.className}`}>
        <span style={{ "--char": 1 } as React.CSSProperties}>L</span>
        <span style={{ "--char": 2 } as React.CSSProperties}>O</span>
        <span style={{ "--char": 3 } as React.CSSProperties}>A</span>
        <span style={{ "--char": 4 } as React.CSSProperties}>D</span>
        <span style={{ "--char": 5 } as React.CSSProperties}>I</span>
        <span style={{ "--char": 6 } as React.CSSProperties}>N</span>
        <span style={{ "--char": 7 } as React.CSSProperties}>G</span>
        <span style={{ "--char": 8 } as React.CSSProperties}>.</span>
        <span style={{ "--char": 9 } as React.CSSProperties}>.</span>
        <span style={{ "--char": 10 } as React.CSSProperties}>.</span>
      </div>
    </>
  )
}
