export const envURL =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3000'
		: 'https://next-dorsal.vercel.app';
