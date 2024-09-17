"use client"

import { useNextAuth } from "@/context/useNextAuth"
import { useState } from "react"
import { useNotification } from "@/context/useNotification"
import { useModal } from "@/context/useModal"
import { SignInAndOut } from "@/components/SignInAndOut"
import { CustomButton } from "@/components/Buttons"
import useIcons from "@/hooks/useIcons"

export function BlogLikes({ dict, blogId, blogLikes }: { dict: any; blogId: string; blogLikes: number }) {
  const { data: session, status, update } = useNextAuth()
  const { LikeIcon } = useIcons().action
  const [loading, setLoading] = useState(false)
  const { setNotification } = useNotification()
  const [nroOfLikes, setNroOfLikes] = useState(blogLikes)
  const { setPage, onClose } = useModal()

  async function onClick() {
    setNotification({ text: "", type: "", isOpen: false })

    if (status === "unauthenticated") {
      setNotification({ text: dict.notification.signInFailed, type: "warning", isOpen: true })
      setPage(<SignInAndOut isSigningIn={true} dict={dict} onClose={onClose} />)
      return
    }

    if (!session?.user?.email) {
      setNotification({ text: dict.notification.signInFailed, type: "warning", isOpen: true })
      return
    }

    let method: string
    if (!session.user.blogLikes.includes(blogId)) method = "POST"
    else method = "DELETE"

    setLoading(true)

    try {
      const response = await fetch("/api/blog", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session.user.email, blogId }),
      })

      if (!response.ok) {
        throw new Error(dict.notification.blogLikeFailed)
      }

      const { updatedLikes } = await response.json()

      setNroOfLikes(updatedLikes)

      if (method == "POST") setNotification({ text: dict.notification.blogLikeOk, type: "success", isOpen: true })
      else setNotification({ text: dict.notification.blogLikeDeleted, type: "success", isOpen: true })
    } catch (error: any) {
      setNotification({ text: error.message, type: "alert", isOpen: true })
    } finally {
      update()
      setLoading(false)
    }
  }

  return (
    <>
      <CustomButton buttonType={"transparent"} className="custom-image-link" disabled={loading}>
        <LikeIcon
          style={session?.user?.blogLikes.includes(blogId) ? { fill: "#0072dd" } : { fill: "grey" }}
          onClick={onClick}
        />
      </CustomButton>
      <p style={{fontSize: "var(--text-size-xs)"}}>
        {dict.blogPage.likes} {nroOfLikes}
      </p>
    </>
  )
}
