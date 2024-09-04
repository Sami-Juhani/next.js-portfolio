import prisma from "../lib/db"

export type Project = {
  title: string
  video: string
  gitHub: string
  mainSection: {
    image: { src: string; alt: string }
    intro: string
    learnings: string
  }
  techStack: string[]
  features: string[]
}

export async function getProjects() {
  return await prisma.project.findMany()
}
