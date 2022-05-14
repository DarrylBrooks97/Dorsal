import { prisma } from '@clients/prisma';
import { createRouter } from '../../createRouter';

export const generalRouter = createRouter()
	.query('fish', {
		async resolve() {
			return {
				fish: await prisma.fish.findMany(),
			};
		},
	})
	.query('tank', {
		async resolve() {
			return {
				tank: await prisma.tank.findMany(),
			};
		},
	})
	.query('plants', {
		async resolve() {
			return {
				plants: await prisma.plant.findMany(),
			};
		},
	});
