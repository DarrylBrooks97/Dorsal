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
		return new Date(fish.maintained_at as Date) === new Date();
	});

	todayReminders = todayReminders?.sort((a: any, b: any) => {
		return a.maintained_at - b.maintained_at;
	});

	let upcomingReminders = fetchedData?.fish.filter((fish) => {
		return !todayReminders?.includes(fish);
	});

	upcomingReminders = upcomingReminders?.sort((a: any, b: any) => {
		return a.maintained_at - b.maintained_at;
	});

	return {
		today: todayReminders as FetchedTankData['fish'],
		upcoming: upcomingReminders as FetchedTankData['fish'],
	};
};
