"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { useSettings } from "@/context/useSettings"
import { useModal } from "@/context/useModal"
import useIcons from "@/hooks/useIcons"
import { Project } from "@/actions/projects"
import { cc } from "@/lib/cc"
import styles from "./projects.module.css"

type ProjectArticleProps = {
  dict: any
  project: Project
}

export function ProjectArticle({ project, dict }: ProjectArticleProps) {
  const { darkMode } = useSettings()
  const { GitHubIcon } = useIcons().dev
  const { setPage, onClose } = useModal()

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handler)

    return () => {
      document.removeEventListener("keydown", handler)
    }
  }, [onClose])

  function onImageClick() {
    setPage(
      <div className={styles.__modalImage}>
        <Image
          src={project.mainSection.image.src}
          width={900}
          height={700}
          className={styles.image}
          alt={project.mainSection.image.alt}
        />
      </div>
    )
  }

  function onIntroClick(mainSection: any) {
    setPage(<ArticleIntro mainSection={mainSection} modalOpen={true} dict={dict} />)
  }

  function onFeaturesClick(features: any) {
    setPage(<ArticleFeatures features={features} modalOpen={true} dict={dict} />)
  }

  return (
    <>
      <article className={styles.article}>
        <div className={styles.__projectTitle}>
          <h3>{project.title}</h3>
          <div className={styles.__gitHubLayout}>
            <GitHubIcon />
            <Link href={project.gitHub} target="_blank">
              Code
            </Link>
          </div>
        </div>
        <div
          className={styles.info}
          style={darkMode ? { backgroundColor: "#1f1a28" } : { backgroundColor: "var(--background-color)" }}
          onClick={() => onIntroClick(project.mainSection)}
        >
          <div className={styles.details}>
            <div>
              <h4 className={styles.articleTitle}>{dict.projectPage.tech}</h4>
              <ul className={styles.techStack}>
                {project.techStack.map((tech: string, index: number) => (
                  <li key={index}>{tech}</li>
                ))}
              </ul>
            </div>
            <ArticleIntro mainSection={project.mainSection} dict={dict} />
          </div>
        </div>
        <div className={styles.__video}>
          <p>video</p>
          {project.video && (
            <iframe
              className={styles.video}
              src={project.video}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </div>
        <div
          className={styles.__features}
          style={darkMode ? { backgroundColor: "#3b3b5c" } : { backgroundColor: "var(--background-color)" }}
          onClick={() => onFeaturesClick(project.features)}
        >
          <ArticleFeatures features={project.features} dict={dict} />
        </div>
        <div className={styles.__image} onClick={onImageClick}>
          <p>image</p>
          <Image
            src={project.mainSection.image.src}
            width={900}
            height={700}
            className={styles.image}
            alt={project.mainSection.image.alt}
          />
        </div>
      </article>
    </>
  )
}

function ArticleIntro({ mainSection, modalOpen, dict }: { mainSection: any; modalOpen?: boolean; dict: any }) {
  return (
    <div className={cc(modalOpen && styles.__modalInfo)}>
      <div className={styles.feats}>
        <h4 className={styles.articleTitle}>{dict.projectPage.intro}</h4>
        <p className={cc(!modalOpen && styles.maxLinesFour)}>{mainSection.intro}</p>
      </div>
      {modalOpen && (
        <div className={styles.feats}>
          <h4 className={styles.articleTitle}>{dict.projectPage.myLearnings}</h4>
          <p>{mainSection.learnings}</p>
        </div>
      )}
    </div>
  )
}

function ArticleFeatures({ features, modalOpen, dict }: { features: any; modalOpen?: boolean; dict: any }) {
  return (
    <div className={cc(modalOpen && styles.__modalInfo)}>
      <h4 className={styles.articleTitle}>{dict.projectPage.features}</h4>
      <ul className={styles.__featuresList}>
        {modalOpen
          ? features.map((feat: string, index: number) => <li key={index}>{feat}</li>)
          : features.slice(0, 4).map((feat: string, index: number) => {
              if (index === 3)
                return (
                  <li key={index}>
                    {feat} <strong>...</strong>{" "}
                  </li>
                )
              else return <li key={index}>{feat}</li>
            })}
      </ul>
    </div>
  )
}
