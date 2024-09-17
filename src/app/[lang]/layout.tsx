import { ReactNode } from "react"
import type { Metadata } from "next"
import { SettingsProvider } from "@/context/Settings"
import { NotificationProvider } from "@/context/Notification"
import { ModalProvider } from "@/context/Modal"
import NextAuthProvider from "@/context/NextAuth"
import AwsRumInitializer from "@/components/AwsRumInitializer"
import { Main } from "./Main"
import { getDictionary } from "@/dictionaries/dictionaries"
import Favicon from "/public/favicon.ico"
import "./globals.css"
import { ReCaptchaProvider } from "@/context/ReCaptcha"

export const metadata: Metadata = {
  title: "SJP - fullstack software development",
  description: "Focus on software development with blog and projects",
  icons: [{ rel: "icon", url: Favicon.src }],
}

type RootLayOutProps = {
  children: React.ReactNode
  params: { lang: string }
  projects: ReactNode
  blogs: ReactNode
  portfolio: ReactNode
  contact: ReactNode
}

export default async function RootLayout({
  params: { lang },
  blogs,
  projects,
  portfolio,
  contact,
}: Readonly<RootLayOutProps>) {
  const dict = await getDictionary(lang)

  return (
    <html lang={lang}>
      <body>
        <div id="modal-target"></div>
        <div id="notification-target"></div>
        <ReCaptchaProvider lang={lang}>
          <NextAuthProvider>
            <SettingsProvider>
              <NotificationProvider>
                <ModalProvider>
                  <Main
                    lang={lang}
                    dict={dict}
                    blogs={blogs}
                    projects={projects}
                    portfolio={portfolio}
                    contact={contact}
                  />
                </ModalProvider>
              </NotificationProvider>
            </SettingsProvider>
          </NextAuthProvider>
        </ReCaptchaProvider>
        <AwsRumInitializer />
      </body>
    </html>
  )
}
