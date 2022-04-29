import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
// import { z } from 'zod';
import { prisma } from '@clients/prisma';

export const appRouter = trpc.router().query('aquariums', {
	async resolve() {
		const aquariums = await prisma.tank.findMany();
		return {
			aquariums,
		};
	},
});

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
	router: appRouter,
	createContext: () => null,
});
