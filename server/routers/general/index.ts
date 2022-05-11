import { prisma } from '@clients/prisma';
import { createRouter } from '../../createRouter';

export const generalRouter = createRouter()
	.query('fish', {
		async resolve() {
			const fish = await prisma.fish.findMany();
			return {
				fish,
			};
		},
	})
	.query('tank', {
		async resolve() {
			const tank = await prisma.tank.findMany();
			return {
				tank,
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
