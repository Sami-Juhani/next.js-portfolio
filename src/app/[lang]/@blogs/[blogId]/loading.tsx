import { Skeleton, SkeletonImage, SkeletonList } from "@/components/Skeleton/Skeleton";
import styles from "../../@blogs/blog.module.css"

export default function LoadingBlogPage() {
    return (
      <article className={styles.articleContainer}>
        <div className={styles.articleHeader}>
          <SkeletonImage width="350px" height="250px" />
          <div className="row space-between width-full">
            <Skeleton short inline />
            <div className="column gap-small items-end">
              <div className="margin-btm-large">
                <Skeleton shortest />
              </div>
              <SkeletonImage width="20px" height="20px" borderRadius="50%" />
              <Skeleton shortest />
            </div>
          </div>
        </div>
        <section className={styles.articleSection} style={{ gap: 0 }}>
          <Skeleton short />
          <SkeletonList amount={7}>
            <Skeleton />
          </SkeletonList>
        </section>
        <section className={styles.articleSection} style={{ gap: 0 }}>
          <Skeleton short />
          <SkeletonList amount={5}>
            <Skeleton />
          </SkeletonList>
  
          <Skeleton short />
          <ul style={{ marginBlock: "0.5rem", listStyleType: "none" }}>
            <li>
              <Skeleton short />
            </li>
            <li>
              <Skeleton short />
            </li>
            <li>
              <Skeleton short />
            </li>
            <li>
              <Skeleton short />
            </li>
            <li>
              <Skeleton short />
            </li>
            <li>
              <Skeleton short />
            </li>
          </ul>
  
          <Skeleton short />
          <SkeletonList amount={5}>
            <Skeleton />
          </SkeletonList>
        </section>
        <section>
          <Skeleton short />
          <SkeletonList amount={5}>
            <Skeleton />
          </SkeletonList>
        </section>
      </article>
    )
  }
  