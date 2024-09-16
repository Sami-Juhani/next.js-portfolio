import { getDictionary } from "@/dictionaries/dictionaries"
import { Contact } from "./Contact"

export default async function ContactPage({ params: { lang } }: { params: { lang: string } }) {
  const dict = await getDictionary(lang)
  return <Contact dict={dict} />
}
