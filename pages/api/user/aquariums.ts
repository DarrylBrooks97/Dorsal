import { prisma } from '@clients/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req;

	if (method !== 'GET') {
		return res.status(405).json({
			message: 'Method not allowed',
		});
	}

	const aquariums = await prisma.tank.findMany();

	return res.status(200).send(aquariums ? aquariums : []);
}
