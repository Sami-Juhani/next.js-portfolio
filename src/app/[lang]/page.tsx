import { TextWithLink } from "@/components/TextWithLink"
import { getDictionary } from "@/dictionaries/dictionaries"
import useIcons from "@/hooks/useIcons"

export default async function Home({ params: { lang } }: { params: { lang: string } }) {
  const { ConstructionIcon } = useIcons().status
  const dict = await getDictionary(lang)

  return (
    <div
      className="row items-center"
      style={{
        opacity: "0.8",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <ConstructionIcon style={{ fontSize: "40px", marginRight: "0.5rem" }} />
      <TextWithLink paragraph={dict.landingPage.status} href={`${lang}/blog`} />
    </div>
  )
}
