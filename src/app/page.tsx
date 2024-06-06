import useIcons from "@/hooks/useIcons"
import Link from "next/link"

export default function Home() {
  const { ConstructionIcon } = useIcons().status

  return (
    <div
      className="row items-center"
      style={{
        opacity: "0.8",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <ConstructionIcon style={{ fontSize: "40px", marginRight: "0.5rem" }} />
      <p>Under construction... but checkout the <Link href={"/blog"}>blog</Link></p>
    </div>
  )
}
