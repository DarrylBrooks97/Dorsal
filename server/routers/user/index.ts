import { z } from 'zod';
import { prisma } from '@clients/prisma';
import { createRouter } from '../../createRouter';
import { resolve } from 'path';

export const userRouter = createRouter()
	.query('fish', {
		async resolve() {
			const fish = await prisma.fish.findMany();
			return {
				fish,
			};
		},
	})
	.mutation('addFish', {
		input: z.object({
			id: z.string().uuid(),
			user_id: z.string().cuid().optional(),
			tankId: z.string().cuid().optional(),
			name: z.string().min(1).max(255),
			image_url: z.string().min(1).max(255),
			habitat: z.string().min(1).max(255),
			species: z.string().min(1).max(255),
			tank_sizes: z.string().min(1).max(255),
			illnesses: z.string().min(1).max(255),
			diet: z.string().min(1).max(255),
			tank_friends: z.string().min(1).max(255),
			water_params: z.object({
				pH: z.number(),
				nirate: z.number(),
				hardness: z.number(),
				type: z.string().min(1).max(255),
			}),
		}),
		async resolve({ input }) {
			return {
				fish: await prisma.fish.create({
					data: input,
				}),
			};
		},
	})
	.mutation('deleteFish', {
		input: z.object({ id: z.string().cuid() }),
		async resolve({ input }) {
			const { tankId } = await prisma.fish.delete({
				where: {
					id: input.id,
				},
			});

			if (tankId) {
				await prisma.tank.update({
					where: {
						id: tankId,
					},
					data: {
						Fish: {
							delete: {
								id: input.id,
							},
						},
					},
				});
			}

			return {
				status: 202,
			};
		},
	})
	.mutation('updateFish', {
		input: z.object({
			id: z.string().cuid(),
			name: z.string().min(1).max(255),
		}),
		async resolve({ input }) {
			await prisma.fish.update({
				where: {
					id: input.id,
				},
				data: {
					name: input.name,
					maintained_at: new Date(),
				},
			});

			return {
				status: 200,
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
	.query('tanks.byId', {
		input: z.object({
			id: z.string().cuid(),
		}),
		async resolve({ input }) {
			const tank = await prisma.tank.findUnique({
				where: {
					id: input.id,
				},
			});
			return {
				tank,
			};
		},
	})
	.mutation('addTank', {
		input: z.object({
			id: z.string().cuid(),
			user_id: z.string().cuid().optional(),
			name: z.string().min(1).max(255),
			type: z.string().min(1).max(255),
			pH: z.number(),
			nirate: z.number(),
			hardness: z.number(),
			Fish: z
				.array(
					z.object({
						id: z.string().uuid(),
						user_id: z.string().cuid().optional(),
						tankId: z.string().cuid().optional(),
						name: z.string().min(1).max(255),
						image_url: z.string().min(1).max(255),
						habitat: z.string().min(1).max(255),
						species: z.string().min(1).max(255),
						tank_sizes: z.string().min(1).max(255),
						illnesses: z.string().min(1).max(255),
						diet: z.string().min(1).max(255),
						tank_friends: z.string().min(1).max(255),
						water_params: z.object({
							pH: z.number(),
							nirate: z.number(),
							hardness: z.number(),
							type: z.string().min(1).max(255),
						}),
					})
				)
				.optional(),
			Plant: z
				.array(
					z.object({
						id: z.string().uuid(),
						user_id: z.string().cuid().optional(),
						name: z.string().min(1).max(255),
						tank_id: z.string().cuid().optional(),
						image_url: z.string().min(1).max(255),
						species: z.string().min(1).max(255),
						lighting: z.string().min(1).max(255),
						soil: z.string().min(1).max(255),
						water_params: z.object({
							pH: z.number(),
							nirate: z.number(),
							hardness: z.number(),
						}),
						illnesses: z.string().min(1).max(255),
					})
				)
				.optional(),
		}),
		async resolve({ input }) {
			return {
				tank: await prisma.tank.create({
					data: {
						...input,
						created_at: new Date(),
						updated_at: new Date(),
					},
				}),
			};
		},
	})
	.mutation('updateTank', {
		input: z.object({
			id: z.string().cuid(),
			name: z.string().min(1).max(255).optional(),
			type: z.string().min(1).max(255).optional(),
			pH: z.number().optional(),
			nirate: z.number().optional(),
			hardness: z.number().optional(),
			Fish: z
				.array(
					z.object({
						id: z.string().cuid(),
					})
				)
				.optional(),
			Plant: z
				.array(
					z.object({
						id: z.string().cuid(),
					})
				)
				.optional(),
		}),
		async resolve({ input }) {
			await prisma.tank.update({
				where: {
					id: input.id,
				},
				data: {
					...input,
					updated_at: new Date(),
					maintained_at: new Date(),
					Fish: {
						set: input.Fish,
					},
					Plant: {
						set: input.Plant,
					},
				},
			});

			return {
				status: 201,
			};
		},
	})
	.mutation('deleteTank', {
		input: z.object({
			id: z.string().cuid(),
			isRemovingFish: z.boolean(),
			removedFish: z.array(z.string().cuid()).optional(),
			isRemovingPlants: z.boolean(),
			removedPlants: z.array(z.string().cuid()).optional(),
		}),
		async resolve({ input }) {
			if (input.isRemovingFish) {
				await prisma.fish.deleteMany({
					where: {
						id: {
							in: input.removedFish,
						},
					},
				});
			}
			// todo: add case for fish that are not in tank
			if (input.isRemovingPlants) {
				await prisma.plant.deleteMany({
					where: {
						id: {
							in: input.removedPlants,
						},
					},
				});
			}
			// todo: add case for plants that are not in tank
			await prisma.tank.delete({
				where: {
					id: input.id,
				},
			});
			return {
				status: 202,
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
	})
	.mutation('addPlant', {
		input: z.object({
			id: z.string().uuid(),
			user_id: z.string().cuid().optional(),
			name: z.string().min(1).max(255),
			tank_id: z.string().cuid().optional(),
			image_url: z.string().min(1).max(255),
			species: z.string().min(1).max(255),
			lighting: z.string().min(1).max(255),
			soil: z.string().min(1).max(255),
			water_params: z.object({
				pH: z.number(),
				nirate: z.number(),
				hardness: z.number(),
			}),
			illnesses: z.string().min(1).max(255),
		}),
		async resolve({ input }) {
			return {
				plant: await prisma.plant.create({
					data: input,
				}),
			};
		},
	})
	.mutation('updatePlant', {
		input: z.object({
			id: z.string().cuid(),
			name: z.string().min(1).max(255).optional(),
			tankId: z.string().cuid().optional(),
			image_url: z.string().min(1).max(255).optional(),
			illnesses: z.string().min(1).max(255).optional(),
		}),
		async resolve({ input }) {
			await prisma.plant.update({
				where: {
					id: input.id,
				},
				data: {
					...input,
					maintained_at: new Date(),
				},
			});

			return {
				status: 201,
			};
		},
	})
	.mutation('deletePlant', {
		input: z.object({
			id: z.string().cuid(),
		}),
		async resolve({ input }) {
			const { tankId } = await prisma.plant.delete({
				where: {
					id: input.id,
				},
			});

			if (tankId) {
				await prisma.tank.update({
					where: {
						id: tankId,
					},
					data: {
						Plant: {
							delete: {
								id: input.id,
							},
						},
					},
				});
			}

			return {
				status: 202,
			};
		},
	});
