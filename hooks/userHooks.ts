import useSWR from 'swr';

export const useFetcher = async (url: string) => {
	return await (await fetch(url)).json();
};

const getUser = <T>(url: string): T => {
	const { data, error } = useSWR(url, useFetcher);
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
