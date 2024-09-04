import { DefaultUser } from "next-auth"
declare module "next-auth" {
  interface Session {
    user?: { id: string; role: string; name: string; blogLikes: string[]; email: string }
  }
  interface User extends DefaultUser {
    role: string
    blogLikes: string[]
    email: string
  }
}
