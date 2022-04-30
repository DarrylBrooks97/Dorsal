import { prisma } from '@clients/prisma';
import { createRouter } from '../../createRouter';

export const userRouter = createRouter()
	.query('fish', {
		async resolve() {
			const fish = await prisma.fish.findMany();
			return {
				fish,
			};
		},
	})
	.query('tanks', {
		async resolve() {
			const tanks = await prisma.tank.findMany();
			return {
				tanks,
			};
		},
	})
	.query('plants', {
		async resolve() {
			const plants = await prisma.plant.findMany();
			return {
				plants,
			};
		},
	});
