import { prisma } from '@clients/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method, body } = req;

	if (method !== 'POST') {
		return res.status(405).json({
			message: 'Method not allowed',
		});
	}

	const newTank = await prisma.tank.create({
		data: body,
	});

	return res.status(201).json(newTank);
}
