import { Skeleton, SkeletonImage, SkeletonList } from "@/components/Skeleton/Skeleton"
import styles from "./blog.module.css"

export default function BlogListLoadingPage() {
  return (
    <ul className={styles.blogListContainer}>
      <SkeletonList amount={1}>
        <li className={styles.blogCard} style={{ gap: 0 }}>
          <div className={styles.blogCardTop}>
            <Skeleton short />
            <div className="column gap-medium paragraph-secondary items-end">
              <Skeleton shortest />
              <SkeletonImage width="75px" height="75px" />
            </div>
          </div>
          <SkeletonList amount={2}>
            <Skeleton />
          </SkeletonList>
          <Skeleton shortest />
        </li>
      </SkeletonList>
    </ul>
  )
}
