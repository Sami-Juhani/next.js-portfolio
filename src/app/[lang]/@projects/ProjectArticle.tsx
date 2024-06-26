"use client"

import { useSettings } from "@/context/useSettings"
import { ReactNode, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { ProjectModal } from "./projectModal"
import { cc } from "@/lib/cc"
import { Project } from "@/db/projects"
import Image from "next/image"
import styles from "./projects.module.css"

type ProjectArticleProps = {
  dict: any
  project: Project
}

export function ProjectArticle({ project, dict }: ProjectArticleProps) {
  const { darkMode } = useSettings()
  const [isOpen, setIsOpen] = useState(false)
  const [selector, setSelector] = useState<HTMLDivElement>()
  const [activeComponent, setActiveComponent] = useState<ReactNode | null>(null)

  useEffect(() => {
    const portalTarget = document.getElementById("project-modal-target") as HTMLDivElement
    if (portalTarget != undefined) setSelector(portalTarget)
  }, [])

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false)
    }

    document.addEventListener("keydown", handler)

    return () => {
      document.removeEventListener("keydown", handler)
    }
  }, [])

  function onImageClick() {
    setIsOpen(true)
    setActiveComponent(
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
    setIsOpen(true)
    setActiveComponent(<ArticleIntro mainSection={mainSection} modalOpen={true} dict={dict} />)
  }

  function onFeaturesClick(features: any) {
    setIsOpen(true)
    setActiveComponent(<ArticleFeatures features={features} modalOpen={true} dict={dict} />)
  }

  return (
    <>
      <article
        className={styles.article}
        style={darkMode ? { backgroundColor: "#26243a" } : { backgroundColor: "#ddd5ff" }}
      >
        <div className={styles.__projectTitle}>
          <h3>{project.title}</h3>
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
      {selector != undefined &&
        createPortal(
          isOpen && activeComponent != null && (
            <ProjectModal setIsOpen={setIsOpen} setActiveComponent={setActiveComponent} Component={activeComponent} />
          ),
          selector
        )}
    </>
  )
}

function ArticleIntro({ mainSection, modalOpen, dict }: { mainSection: any; modalOpen?: boolean, dict: any }) {
  return (
    <div className={cc(modalOpen && styles.__modalInfo)}>
      <div>
        <h4 className={styles.articleTitle}>{dict.projectPage.intro}</h4>
        <p className={cc(!modalOpen && styles.maxLinesFour)}>{mainSection.intro}</p>
      </div>
      {modalOpen && (
        <div>
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
