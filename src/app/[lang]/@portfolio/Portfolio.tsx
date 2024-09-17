"use client"

import { useEffect } from "react"
import { ArrowRight } from "@mui/icons-material"
import { TypeWriter } from "@/components/TypeWriter"
import useIcons from "@/hooks/useIcons"
import Image from "next/image"
import SelfImage from "/public/images/me/me_bnw.png"
import DevImage from "/public/images/me/sjp_dev.png"
import styles from "./portfolio.module.css"
import { InfiniteSideScroller } from "@/components/InifiniteSideScroller/InfiniteSideScroller"
import Link from "next/link"

export function PortfolioPage({ dict }: { dict: any }) {
  const {
    ReactIcon,
    AwsIcon,
    GitIcon,
    JavaIcon,
    JsIcon,
    MongoIcon,
    NextIcon,
    NodeJsIcon,
    ScrumIcon,
    SqlIcon,
    TsIcon,
    PythonIcon,
  } = useIcons().dev

  useEffect(() => {
    const targets = document.querySelectorAll(`.${styles.personalSection}`)
    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible)
          }
        })
      },
      { threshold: 0 }
    )

    targets.forEach((target) => observer.observe(target))

    return () => targets.forEach((target) => observer.unobserve(target))
  }, [])

  return (
    <div className={styles.__layout}>
      <TypeWriter paragraph={dict.mainPage.typeWriter.paragraphs} userOptions={{ startDelay: 20, typingDelay: 60 }} />
      <div
        className={styles.__image}
      >
        <Image className={styles.devImage} src={DevImage} alt="Brand logo with text SJP" priority />
        <Image className={styles.authorImage} src={SelfImage} alt="Author" priority />
      </div>
      <div className={styles.__personalLayout}>
        <div className={`${styles.general}`}>
          <h1>{dict.mainPage.general.title}</h1>
          {dict.mainPage.general.body.map((str: string, i: number) => (
            <p key={i}>{str}</p>
          ))}
        </div>
        <div className={styles.__skillLayout}>
          <div className={styles.__portfolio}>
            <h2>Portfolio</h2>
            <ArrowRight />
            <Link
              href={"https://samipaan-bucket.s3.eu-north-1.amazonaws.com/nextjs-portfolio/assets/CV_Sami_Paananen.pdf"}
              target="_blank"
            >
              {dict.mainPage.portfolio.downloadButton}
            </Link>
          </div>
          <h3>{dict.mainPage.portfolio.skills}</h3>
          <div className={styles.personalSection}>
            <ul className={styles.__skills}>
              <li className={styles.skillItem}>
                <ReactIcon aria-label="React Icon"/>
                <span>React</span>
              </li>
              <li className={styles.skillItem}>
                <JsIcon aria-label="JavaScript Icon"/>
                <span>JavaScript</span>
              </li>
              <li className={styles.skillItem}>
                <TsIcon aria-label="TypeScript Icon"/>
                <span>TypeScript</span>
              </li>
              <li className={styles.skillItem}>
                <NextIcon aria-label="Nextjs Icon" />
                <span>Next.js</span>
              </li>
              <li className={styles.skillItem}>
                <NodeJsIcon aria-label="Nodejs Icon" />
                <span>Node.js</span>
              </li>
              <li className={styles.skillItem}>
                <PythonIcon aria-label="Python Icon" />
                <span>Python3</span>
              </li>
              <li className={styles.skillItem}>
                <JavaIcon aria-label="Java Icon" />
                <span>Java</span>
              </li>
              <li className={styles.skillItem}>
                <SqlIcon aria-label="SQL Icon"/>
                <span>SQL</span>
              </li>
              <li className={styles.skillItem}>
                <MongoIcon aria-label="Mongo Icon" />
                <span>NoSQL</span>
              </li>
              <li className={styles.skillItem}>
                <AwsIcon aria-label="AWS Icon"/>
                <span>AWS</span>
              </li>
              <li className={styles.skillItem}>
                <GitIcon aria-label="Git Icon"/>
                <span>Git</span>
              </li>
              <li className={styles.skillItem}>
                <ScrumIcon aria-label="Scrum Icon" />
                <span>Scrum</span>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.__certificates}>
          <h3>{dict.mainPage.portfolio.certificates}</h3>
          <div className={`${styles.certificates}`}>
            <InfiniteSideScroller  />
            
            
          </div>
        </div>
      </div>
    </div>
  )
}
