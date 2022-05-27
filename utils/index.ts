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

export const getReminders = (fetchedData: FetchedTankData | undefined) => {
	const fishFeeding = fetchedData?.fish.map((fish) => {
		return {
			id: fish.id,
			fish_id: fish.fish_id,
			name: fish.name,
			image_url: fish.image_url,
			maintained_at: fish.maintained_at as Date,
		};
	});

	let todayReminders = fishFeeding?.filter((fish) => {
		return new Date(fish.maintained_at) === new Date();
	});

	todayReminders = todayReminders?.sort((a: any, b: any) => {
		return a.maintained_at - b.maintained_at;
	});

	let upcomingReminders = fishFeeding?.filter((fish) => {
		return !todayReminders?.includes(fish);
	});

	upcomingReminders = upcomingReminders?.sort((a: any, b: any) => {
		return a.maintained_at - b.maintained_at;
	});

	return {
		reminders: {
			today: todayReminders,
			upcoming: upcomingReminders,
		},
	};
};
