"use client"

import { useNextAuth } from "@/context/useNextAuth"
import { useState } from "react"
import { createPortal } from "react-dom"
import { Modal } from "@/components/Modal"
import { SignInAndOut } from "@/components/SignInAndOut"
import { usePortal } from "@/hooks/usePortal"
import { CustomButton } from "@/components/Buttons"
import useIcons from "@/hooks/useIcons"

export function BlogLikes({ dict, blogId, blogLikes }: { dict: any; blogId: string; blogLikes: number }) {
  const { data: session, status, update } = useNextAuth()
  const { LikeIcon } = useIcons().action
  const [loading, setLoading] = useState(false)
  const [isSignInOpen, setSignInOpen] = useState(false)
  const [nroOfLikes, setNroOfLikes] = useState(blogLikes)
  const modalTarget = usePortal("modal-target")

  async function onClick() {
    if (status === "unauthenticated") {
      setSignInOpen(true)
    }

    if (!session?.user?.email) {
      console.error("User email not found")
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
        throw new Error("Failed to add blog like")
      }

      const { updatedLikes } = await response.json()

      setNroOfLikes(updatedLikes)
    } catch (error) {
      console.error(error)
    } finally {
      update()
      setLoading(false)
    }
  }

  return (
    <>
      <CustomButton className={"custom-image-link"} disabled={loading}>
        <LikeIcon
          style={session?.user?.blogLikes.includes(blogId) ? { fill: "#0072dd" } : { fill: "grey" }}
          onClick={onClick}
        />
      </CustomButton>
      <p className="textXs">
        {dict.blogPage.likes} {nroOfLikes}
      </p>
      {modalTarget != undefined &&
        createPortal(
          isSignInOpen && (
            <Modal
              setIsOpen={setSignInOpen}
              setActiveComponent={() => {}}
              isFullWidth={false}
              Component={<SignInAndOut isSigningIn={true} />}
            />
          ),
          modalTarget
        )}
    </>
  )
}
