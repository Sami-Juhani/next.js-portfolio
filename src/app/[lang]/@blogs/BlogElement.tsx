import React from "react"
import Link from "next/link"
import Image from "next/image"

type BlogParagraph = {
  type: "p"
  value: string
  options?: {
    link: boolean
  }
}

type BlogImage = {
  type: "img"
  value: {
    src: string
    alt: string
    figCaption: string
    width: number
    height: number
  }
}

type BlogUnorderedList =
  | {
      type: "ul"
      options: {
        bold: true
      }
      value: BlogListItem[]
    }
  | {
      type: "ul"
      options: undefined
      value: string[]
    }

type BlogListItem = { bolded: string; regular: string }

export type BlogElementType = BlogParagraph | BlogImage | BlogUnorderedList

export function BlogElement({ element }: { element: BlogElementType }) {
  switch (element.type) {
    case "p": {
      if (element.options === undefined) {
        return <p>{element.value}</p>
      } else if (element.options.link) {
        return <TextWithLink paragraph={element.value} />
      }
      break
    }

    case "ul": {
      if (element.options === undefined) {
        return (
          <ul>
            {element.value.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )
      } else if (element.options.bold) {
        return (
          <ul>
            {element.value.map((item, i) => (
              <li key={i}>
                <span className="bold">{item.bolded}: </span> {item.regular}
              </li>
            ))}
          </ul>
        )
      }
      break
    }
    case "img": {
      const { src, alt, figCaption, width, height } = element.value
      return (
        <figure>
          <div className="responsive-image">
            <Image
              src={src}
              alt={alt}
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
              }}
              width={width}
              height={height}
            />
          </div>
          <figcaption className="textSm">
            <i>{figCaption}</i>
          </figcaption>
        </figure>
      )
    }
    default:
      return null
  }
}

function TextWithLink({ paragraph }: { paragraph: string }) {
  const renderTextWithLink = (text: string) => {
    const regex = /<link href=([^>]+)>([^<]+)<\/link>/g
    const parts = text.split(regex)
    let index = 0

    return parts.map((part, i) => {
      if (i % 3 === 0) {
        // Regular text parts
        return <React.Fragment key={index++}>{part}</React.Fragment>
      } else if (i % 3 === 1) {
        // URL part
        const href = part
        const linkText = parts[i + 1]
        return (
          <Link key={index++} href={href}>
            {linkText}
          </Link>
        )
      }
      return null // Skip the link text part as it has already been handled
    })
  }

  return <p>{renderTextWithLink(paragraph)}</p>
}

export default TextWithLink
