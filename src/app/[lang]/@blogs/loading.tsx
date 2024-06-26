import { Skeleton, SkeletonImage, SkeletonList } from "@/components/Skeleton/Skeleton"
import styles from "./blog.module.css"

export default function BlogListLoadingPage() {
  return (
    <ul className={styles.__listLayout}>
      <li
        className={styles.card}
        style={{
          backgroundColor: "#ffffff",
        }}
      >
        <div className={styles.cardLeft}>
          <div style={{ position: "absolute", top: "-15px" }}>
            <SkeletonImage width="200px" height="180px" />
          </div>
          <div style={{ position: "absolute", top: "88%", left: "5px" }}>
            <Skeleton shorter />
          </div>
        </div>
        <div className={styles.cardRight}>
          <div className={styles.cardTitle}>
            <Skeleton shorter />
          </div>
          <div className={styles.cardPreview}>
            <SkeletonList amount={5}>
              <Skeleton />
            </SkeletonList>
          </div>
          <Skeleton shorter />
        </div>
      </li>
    </ul>
  )
}
