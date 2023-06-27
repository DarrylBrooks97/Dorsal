import { Tank } from '@prisma/client';
import { Text, NumberInput, NumberInputField } from '@chakra-ui/react';
import { ReactNode, useState } from 'react';

export function StatView({
	editing,
	tank,
	tankKey,
	defaultValue,
	min,
	max,
	step,
	updatedTank,
	setUpdatedTank,
	precision,
}: {
	editing: boolean;
	tank: Tank;
	tankKey: keyof Tank;
	defaultValue: number;
	min: number;
	max: number;
	step: number;
	updatedTank: Partial<Tank>;
	setUpdatedTank: (tank: Partial<Tank>) => void;
	precision?: number;
}): JSX.Element {
	const [value, setValue] = useState(tank[tankKey] ?? defaultValue);
	return (
		<>
			{editing ? (
				<NumberInput
					variant="flushed"
					value={value as any}
					{...{
						defaultValue,
						min,
						max,
						precision,
					}}
					onChange={(e) => {
						setUpdatedTank({
							...updatedTank,
							[tankKey]: Number(e),
						});
						setValue(e);
					}}
				>
					<NumberInputField color="white" textAlign="center" />
				</NumberInput>
			) : (
				<Text color="gray.400">
					{(tank[tankKey] as ReactNode) ?? '??'}
				</Text>
			)}
		</>
	);
}
