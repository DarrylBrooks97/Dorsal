import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { CONSTANTS } from "~/constants"
import prisma from "~/lib/prisma"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

const useSecureCookies =
  process.env.VERCEL_ENV === "production" || process.env.VERCEL_ENV === "preview"

const WEEK = 60 * 60 * 24 * 7
const handler = NextAuth({
  useSecureCookies,
  jwt: {
    maxAge: WEEK,
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    error: "/",
  },
  providers: [
    Google({
      clientId: CONSTANTS.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: CONSTANTS.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    jwt: async ({ user, token }) => {
      console.log({ user })
      if (!user.email) {
        return {}
      }

      return {
        ...token,
      }
    },
    session: async ({ session, token }) => {
      return {
        id: token.id,
        ...session,
      }
    },
  },
})

export const dynamic = "force-dynamic"
export { handler as GET, handler as POST }
