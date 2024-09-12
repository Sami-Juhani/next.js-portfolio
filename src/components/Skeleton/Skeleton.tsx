import { CSSProperties, Fragment, ReactNode } from "react"
import styles from "./Skeleton.module.css"

export function Skeleton({
  short,
  shorter,
  shortest,
  inline,
  marginTopNone,
}: {
  short?: boolean
  inline?: boolean
  shorter?: boolean
  shortest?: boolean
  marginTopNone?: boolean
}) {
  return (
    <div
      className={styles.skeleton}
      style={{
        width: short ? "15em" : shorter ? "8em" : shortest ? "2em" : undefined,
        display: inline ? "inline-block" : undefined,
        marginTop: marginTopNone ? "-0.5rem" : undefined,
      }}
    />
  )
}

export function SkeletonButton() {
  return <div className={`${styles.skeleton}  ${styles.skeletonBtn}`} />
}

export function SkeletonInput() {
  return <div className={`${styles.skeleton}  ${styles.skeletonInput}`} />
}

export function SkeletonImage({
  width,
  height,
  borderRadius,
}: {
  width: string
  height: string
  borderRadius?: string
}) {
  return (
    <div
      className={styles.skeletonImage}
      style={
        {
          "--_skeletonImageWidth": width,
          "--_skeletonImageHeight": height,
          "--_borderRadius": borderRadius,
        } as CSSProperties
      }
    />
  )
}

export function SkeletonList({ amount, children }: { amount: number; children: ReactNode }) {
  return (
    <>
      {Array.from({ length: amount }).map((_, i) => (
        <Fragment key={i}>{children}</Fragment>
      ))}
    </>
  )
}
