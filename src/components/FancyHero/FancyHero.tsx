import { TypeWriter, TypeWriterOptions } from "./TypeWriter"
import styles from "./FancyHero.module.css"
import Image from "next/image"
import SelfImage from "/public/images/me/self_cartoon_nobg.png"


const DEFAULT_TYPEWRITER_OPTIONS: TypeWriterOptions = {
  typingDelay: 100,
  eraseDelay: 50,
  endDelay: 4000,
  startDelay: 2000,
}

export type FancyHeroProps = {
  prefix: string
  paragraph: string | string[]
  typeWriterOptions?: TypeWriterOptions
}

export function FancyHero({ prefix, paragraph, typeWriterOptions }: FancyHeroProps) {
  return (
    <section className={styles.__layout}>
      <Image src={SelfImage} alt="Author" priority/>
      <TypeWriter paragraph={paragraph} prefix={prefix} options={{ ...DEFAULT_TYPEWRITER_OPTIONS, ...typeWriterOptions }} />
    </section>
  )
}
