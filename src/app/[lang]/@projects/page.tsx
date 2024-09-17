import { Project, getProjects } from "@/actions/projects"
import { getDictionary } from "@/dictionaries/dictionaries"
import { ProjectArticle } from "./ProjectArticle"
import styles from "./projects.module.css"
import { dafoe } from "@/lib/fonts"

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
    <div id="projects" className={styles.__layout}>
      <h2 className={`${dafoe.className} page-title`}>{dict.projectPage.projects}</h2>
      {filteredProjects.map((project) => (
        <ProjectArticle key={project._id} project={project} dict={dict} />
      ))}
    </div>
  )
}
