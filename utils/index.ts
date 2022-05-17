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
