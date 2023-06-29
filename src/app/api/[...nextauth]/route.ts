import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { CONSTANTS } from "~/constants"
import prisma from "~/lib/prisma"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

const useSecureCookies =
  process.env.VERCEL_ENV === "production" || process.env.VERCEL_ENV === "preview"

const handler = NextAuth({
  useSecureCookies,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    error: "/",
  },
  providers: [
    Google({
      clientId: CONSTANTS.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: CONSTANTS.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    jwt: async ({ user, token }) => {
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
