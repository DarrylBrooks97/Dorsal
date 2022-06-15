import { inferQueryResponse } from 'pages/api/trpc/[trpc]';

export const deepArrayFilter = <T>(obj: T[]): T[] => {
	return [
		...new Map(
			obj.map((p: any) => {
				const keys = Object.keys(p);
				return [p[keys[0]], p];
			})
		).values(),
	];
};

export type FetchedTankData = inferQueryResponse<'user.tanks.byId'>;

export const getReminders = (
	fetchedData: FetchedTankData | undefined
): {
	today: FetchedTankData['fish'];
	upcoming: FetchedTankData['fish'];
} => {
	let todayReminders = fetchedData?.fish?.filter((fish) => {
		return (
			new Date(fish.next_update as Date).getDate() ===
				new Date().getDate() ||
			new Date(fish.next_update as Date).getDate() < new Date().getDate()
		);
	});

	todayReminders = todayReminders?.sort((a: any, b: any) => {
		const sort =
			new Date(b.maintained_at as Date) <
			new Date(a.maintained_at as Date);
		return sort ? 1 : -1;
	});

	let upcomingReminders = fetchedData?.fish.filter((fish) => {
		return !todayReminders?.includes(fish);
	});

	upcomingReminders = upcomingReminders?.sort((a: any, b: any) => {
		const sort =
			new Date(b.maintained_at as Date) <
			new Date(a.maintained_at as Date);
		return sort ? 1 : -1;
	});

	return {
		today: todayReminders as FetchedTankData['fish'],
		upcoming: upcomingReminders as FetchedTankData['fish'],
	};
};
