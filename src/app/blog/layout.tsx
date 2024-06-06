import { PageTitle } from "@/components/PageTitle"
import type { Metadata } from "next"
import styles from "./blog.module.css"

export const metadata: Metadata = {
  title: "Sami Paananen - blog",
  description: "Blog page",
}

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={styles.blogLayout}>
      <PageTitle mainStr="Blogs" subStr="about dev" color={"antiquewhite"} />
      {children}
    </div>
  )
}
