"use client"

import { useEffect } from "react"
import { DownloadButton } from "@/components/Buttons"
import { ArrowRight } from "@mui/icons-material"
import useIcons from "@/hooks/useIcons"
import Image from "next/image"
import ReactBeginnerCert from "/public/images/me/react_beginner_cert.png"
import ReactAdvancedCert from "/public/images/me/react_advanced_cert.png"
import NextjsCert from "/public/images/me/nextjs_cert.png"
import DataAnalysisCert from "/public/images/me/data_analysis_cert.png"
import DataVisualizationCert from "/public/images/me/data_visualization_cert.png"
import SelfImage from "/public/images/me/me_bnw.png"
import DevImage from "/public/images/me/sjp_dev.png"
import { TypeWriter } from "@/components/TypeWriter"
import styles from "./portfolio.module.css"

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
      { threshold: 0.1 }
    )

    targets.forEach((target) => observer.observe(target))

    return () => targets.forEach((target) => observer.unobserve(target))
  }, [])

  return (
    <section className={styles.__layout}>
      <div className={styles.__image}>
        <Image className={styles.devImage} src={DevImage} alt="Author" />
        <Image src={SelfImage} alt="Author" priority />
      </div>
      <div className={styles.__personalLayout}>
        <TypeWriter
          paragraph={dict.mainPage.typeWriter.paragraphs}
          prefix={dict.mainPage.typeWriter.prefix}
          userOptions={{ startDelay: 20, typingDelay: 60 }}
        />
        <div className={`${styles.general} ${styles.personalSection}`}>
          <h2>{dict.mainPage.general.title}</h2>
          {dict.mainPage.general.body.map((str: string, i: number) => (
            <p key={i}>{str}</p>
          ))}
        </div>
        <div className={styles.__skillLayout}>
          <div className={styles.__portfolio}>
            <h2>Portfolio</h2>
            <ArrowRight />
            <DownloadButton
              href={"https://samipaan-bucket.s3.eu-north-1.amazonaws.com/nextjs-portfolio/assets/CV_Sami_Paananen.pdf"}
            >
              {dict.mainPage.portfolio.downloadButton}
            </DownloadButton>
          </div>
          <h3>{dict.mainPage.portfolio.skills}</h3>
          <ul className={styles.personalSection}>
            <div className={styles.__skills}>
              <div className={styles.skillItem}>
                <ReactIcon />
                <li className="skill">React</li>
              </div>
              <div className={styles.skillItem}>
                <JsIcon />
                <li className="skill">JavaScript</li>
              </div>
              <div className={styles.skillItem}>
                <TsIcon />
                <li className="skill">TypeScript</li>
              </div>
              <div className={styles.skillItem}>
                <NextIcon />
                <li className="skill">Next.js</li>
              </div>
              <div className={styles.skillItem}>
                <NodeJsIcon />
                <li className="skill">Node.js</li>
              </div>
              <div className={styles.skillItem}>
                <PythonIcon />
                <li className="skill">Python3</li>
              </div>
              <div className={styles.skillItem}>
                <JavaIcon />
                <li className="skill">Java</li>
              </div>
              <div className={styles.skillItem}>
                <SqlIcon />
                <li className="skill">SQL</li>
              </div>
              <div className={styles.skillItem}>
                <MongoIcon />
                <li className="skill">NoSQL</li>
              </div>
              <div className={styles.skillItem}>
                <AwsIcon />
                <li className="skill">AWS</li>
              </div>
              <div className={styles.skillItem}>
                <GitIcon />
                <li className="skill">Git</li>
              </div>
              <div className={styles.skillItem}>
                <ScrumIcon />
                <li className="skill">Scrum</li>
              </div>
            </div>
          </ul>
        </div>
        <div className={styles.__certificates}>
          <h3>{dict.mainPage.portfolio.certificates}</h3>
          <div className={`${styles.certificates}`}>
            <div className={`${`${styles.certItem} ${styles.personalSection}`} ${styles.personalSection}`}>
              <p>React Beginner - 2 / 2024</p>
              <Image src={ReactBeginnerCert} alt="React beginner certificate" />
            </div>
            <div className={`${styles.certItem} ${styles.personalSection}`}>
              <p>React Advanced - 4 / 2024</p>
              <Image src={ReactAdvancedCert} alt="React Advanced certificate" />
            </div>
            <div className={`${styles.certItem} ${styles.personalSection}`}>
              <p>Next.js - 6 / 2024</p>
              <Image src={NextjsCert} alt="Nextjs certificate" />
            </div>
            <div className={`${styles.certItem} ${styles.personalSection}`}>
              <p>Data Analysis with Python - 6 / 2024</p>
              <Image src={DataAnalysisCert} alt="Data analysis certificate" />
            </div>
            <div className={`${styles.certItem} ${styles.personalSection}`}>
              <p>Data Visualization - 6 / 2024</p>
              <Image src={DataVisualizationCert} alt="Data visualization certificate" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
