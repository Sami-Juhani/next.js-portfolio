import React from "react"
import Link from "next/link"

export function TextWithLink({ paragraph, href }: { paragraph: string; href: string }) {
  const renderTextWithLink = (text: string) => {
    const parts = text.split(/(<link>|<\/link>)/g)
    let linkText: string

    return parts.map((part, index) => {
      if (part === "</link>" || part === linkText) {
        return null
      }
      if (part === "<link>") {
        linkText = parts[index + 1]
        return (
          <Link key={index} href={href}>
            {parts[index + 1]}
          </Link>
        )
      }

      return <React.Fragment key={index}>{part}</React.Fragment>
    })
  }

  return <p>{renderTextWithLink(paragraph)}</p>
}
