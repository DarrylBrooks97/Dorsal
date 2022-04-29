import useSWR from 'swr';

export const useFetcher = async (url: string) => {
	return await (await fetch(url)).json();
};

const getUser = <T>(url: string): T => {
	const fetchURL =
		process.env.NODE_ENV === 'development'
			? `http://localhost:3000${url}`
			: `https://next-dorsal.vercel.app${url}`;

	const { data, error } = useSWR(fetchURL, useFetcher);
	if (error) {
		throw new Error(error);
	}

	return data;
};

export const userHooks = () => {
	return {
		getUser,
	};
};
