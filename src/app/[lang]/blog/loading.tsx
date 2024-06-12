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
          <SkeletonImage width="200px" height="200px" />
          <p>
            <Skeleton shorter />
          </p>
        </div>
        <div className={styles.blogCardRight}>
          <p className={styles.blogTitle}>
            <Skeleton />
          </p>
          <p className={styles.blogBodyPreview}>
            <SkeletonList amount={4}>
              <Skeleton />
            </SkeletonList>
          </p>
          <Skeleton shorter />
        </div>
      </li>
    </ul>
  )
}
