import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

const prisma = new PrismaClient();

export default NextAuth({
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	secret: process.env.NEXT_AUTH_SECRET as string,
	adapter: PrismaAdapter(prisma),
	callbacks: {
		async session({ session, token }) {
			// Save the user ID in the session
			session = {
				...session,
				user: {
					...session.user,
				},
				userInfo: {
					//@ts-ignore
					id: token.user.id,
				},
			};
			return session;
		},
		async jwt({ user, token }) {
			user && (token.user = user);
			return token;
		},
	},
});
