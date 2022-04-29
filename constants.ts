export const envURL =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3000'
		: 'https://next-dorsal.vercel.app';

export const headerOptions = [
	{
		name: 'Overview',
		subHeading: 'A brief overview of your tanks',
	},
	{
		name: 'Aquariums',
		subHeading: 'Your aquariums',
	},
	{
		name: 'Live Stock',
		subHeading: 'All of your live stock',
	},
	{
		name: 'Community',
		subHeading: 'Find out what other users are doing',
	},
];
