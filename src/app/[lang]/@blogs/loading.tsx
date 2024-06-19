import { Skeleton, SkeletonImage, SkeletonList } from "@/components/Skeleton/Skeleton"
import styles from "./blog.module.css"

export default function BlogListLoadingPage() {
  return (
    <ul className={styles.blogListContainer}>
      <li
        className={styles.blogCard}
        style={{
          backgroundColor: "#ffffff",
        }}
      >
        <div className={styles.blogCardLeft}>
          <div style={{ position: "absolute", top: "-15px" }}>
            <SkeletonImage width="200px" height="180px" />
          </div>
          <div>
            <Skeleton shorter />
          </div>
        </div>
        <div className={styles.blogCardRight}>
          <div className={styles.blogTitle}>
            <Skeleton short />
          </div>
          <div className={styles.blogBodyPreview}>
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
