"use server"

import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"

interface sendEmailResult {
  completed: boolean
  errors?: { name?: string; email?: string; message?: string }
}

/**
 * Sends an email using the provided details.
 *
 * @param payload - FormData
 * @returns A promise that resolves with a success message or rejects with an error message.
 */
export async function sendEmail(prevState: unknown, payload: FormData): Promise<sendEmailResult> {
  const name = payload.get("name") as string
  const phone = payload.get("phone")
  const email = payload.get("email") as string
  const message = payload.get("message") as string

  let errors = {}

  if (name == undefined || name === "") errors = { name: "Name is required" }
  if (email == undefined || email === "") errors = { ...errors, email: "Email is required" }
  if (message == undefined || message === "") errors = { ...errors, message: "Message is required" }

  if (Object.keys(errors).length > 0) return { completed: false, errors }

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_EMAIL_PW,
    },
  })

  const mailOptions: Mail.Options = {
    from: email,
    to: process.env.MY_EMAIL,
    subject: `Message from ${name}, (${email})` + (phone !== null && " " + phone),
    text: message,
  }

  return new Promise((resolve, reject) => {
    transport.sendMail(mailOptions, (err) => {
      if (err) {
        reject(err.message)
      } else {
        resolve({ completed: true })
      }
    })
  })
}
