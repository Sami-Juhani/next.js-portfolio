import { getDictionary } from "@/dictionaries/dictionaries"
import { PortfolioPage } from "./Portfolio"

export default async function Portfolio({ params: { lang } }: { params: { lang: string } }) {
  const dict = await getDictionary(lang)

  return <PortfolioPage dict={dict} />
}
