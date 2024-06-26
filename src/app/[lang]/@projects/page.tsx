import { Project, getProjects } from "@/db/projects"
import { ProjectArticle } from "./ProjectArticle"
import { getDictionary } from "@/dictionaries/dictionaries"
import styles from "./projects.module.css"

export default async function ProjectsPage({ params: { lang } }: { params: { lang: string } }) {
  const projects = await getProjects()
  const dict = await getDictionary(lang)

  const filteredProjects = projects.map((project) => {
    const filteredProject = { _id: project.id, video: project.video, gitHub: project.gitHub }
    return lang === "en"
      ? { ...filteredProject, ...(project.en as Project) }
      : { ...filteredProject, ...(project.fi as Project) }
  })

  return (
    <section className={styles.__layout}>
      {filteredProjects.map((project) => (
        <ProjectArticle key={project._id} project={project} dict={dict} />
      ))}
    </section>
  )
}
