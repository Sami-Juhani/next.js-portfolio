import Image from "next/image"
import ReactBeginnerCert from "/public/images/me/react_beginner_cert.png"
import ReactAdvancedCert from "/public/images/me/react_advanced_cert.png"
import NextjsCert from "/public/images/me/nextjs_cert.png"
import DataAnalysisCert from "/public/images/me/data_analysis_cert.png"
import DataVisualizationCert from "/public/images/me/data_visualization_cert.png"
import styles from "./InfiteSideScroller.module.css"

export function InfiniteSideScroller() {
  return (
    <section className={styles.slider__outer}>
      <div className={styles.slider__inner}>
        <div className={`${styles.certItem}`}>
          <p>React Beginner - 2 / 2024</p>
          <Image src={ReactBeginnerCert} alt="React beginner certificate" width={350} height={250} />
        </div>
        <div className={`${styles.certItem}`}>
          <p>React Advanced - 4 / 2024</p>
          <Image src={ReactAdvancedCert} alt="React Advanced certificate" width={350} height={250} />
        </div>
        <div className={`${styles.certItem}`}>
          <p>Next.js - 6 / 2024</p>
          <Image src={NextjsCert} alt="Nextjs certificate" width={350} height={250} />
        </div>
        <div className={`${styles.certItem}`}>
          <p>Data Analysis with Python - 6 / 2024</p>
          <Image src={DataAnalysisCert} alt="Data analysis certificate" width={350} height={250} />
        </div>
        <div className={`${styles.certItem}`}>
          <p>Data Visualization - 6 / 2024</p>
          <Image src={DataVisualizationCert} alt="Data visualization certificate" width={350} height={250} />
        </div>
        <div className={`${styles.certItem}`}>
          <p>React Beginner - 2 / 2024</p>
          <Image src={ReactBeginnerCert} alt="React beginner certificate" width={350} height={250} />
        </div>
        <div className={`${styles.certItem}`}>
          <p>React Advanced - 4 / 2024</p>
          <Image src={ReactAdvancedCert} alt="React Advanced certificate" width={350} height={250} />
        </div>
        <div className={`${styles.certItem}`}>
          <p>Next.js - 6 / 2024</p>
          <Image src={NextjsCert} alt="Nextjs certificate" width={350} height={250} />
        </div>
        <div className={`${styles.certItem}`}>
          <p>Data Analysis with Python - 6 / 2024</p>
          <Image src={DataAnalysisCert} alt="Data analysis certificate" width={350} height={250} />
        </div>
        <div className={`${styles.certItem}`}>
          <p>Data Visualization - 6 / 2024</p>
          <Image src={DataVisualizationCert} alt="Data visualization certificate" width={350} height={250} />
        </div>
      </div>
      
    </section>
  )
}
