import { DefaultSession, NextAuthOptions, Session } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/db/db"
import { AdapterUser } from "next-auth/adapters"

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, user }: { session: Session; user: AdapterUser }) {
      if (session.user !== undefined) {
        session.user.id = user.id
        session.user.blogLikes = user.blogLikes
        session.user.role = user.role
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
