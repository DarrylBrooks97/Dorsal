import superjson from 'superjson';
import { createRouter } from '../createRouter';
import { generalRouter } from './general';
import { userRouter } from './user';

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('general.', generalRouter)
	.merge('user.', userRouter);

export type AppRouter = typeof appRouter;
