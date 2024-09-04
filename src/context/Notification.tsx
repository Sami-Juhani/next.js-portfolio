"use client"

import { NotificationModal } from "@/components/NotificationModal"
import { createContext, useState, ReactNode } from "react"

type NotificationType = "success" | "notification" | "warning" | "alert" | ""

/* State to type out useState to control notification modal
   for example: {"text":"Job done succesfully!", type: "success", isOpen: false}
*/
export interface INotifcationState {
  text: string
  type: NotificationType
  isOpen: boolean
}

interface NotificationContextProps {
  notification: INotifcationState
  setNotification: (notification: INotifcationState) => void
}

export const Context = createContext<NotificationContextProps | null>(null)

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<INotifcationState>({ text: "", type: "", isOpen: false })

  return (
    <Context.Provider value={{ notification, setNotification }}>
      {notification.text && (
        <NotificationModal
          text={notification.text}
          type={notification.type}
          isOpen={notification.isOpen}
          onClose={() => setNotification({ text: "", type: "", isOpen: false })}
        />
      )}
      {children}
    </Context.Provider>
  )
}
