import { trpc } from '@utils/trpc';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import {
	Stack,
	Input,
	Box,
	HStack,
	Button,
	Center,
	Text,
} from '@chakra-ui/react';

export default function AddFish() {
	const { data } = trpc.useQuery(['user.fish']);
	const [filteredFish, setFilteredFish] = useState(data?.fish);

	useEffect(() => {
		setFilteredFish(data?.fish);
	}, [data]);

	const handleFilter = (e: BaseSyntheticEvent) => {
		const { value } = e.target as HTMLInputElement;
		setFilteredFish(
			data?.fish.filter((fish) =>
				fish.name.toLowerCase().includes(value.toLowerCase())
			)
		);
	};
	return (
		<Stack
			shouldWrapChildren
			bg="black"
			width="full"
			p="6"
			w="100vw"
			h="100vh"
		>
			<HStack w="calc(100vw - 3rem)">
				<Input
					color="white"
					onChange={handleFilter}
					placeholder="Search for fish"
				/>
				<Button>Filter</Button>
			</HStack>
			<Stack spacing={6} w="calc(100vw-3rem)">
				{filteredFish?.map((fish) => (
					<Center
						key={fish.id}
						bg="#333"
						border="2px solid #444"
						h="calc(100vh / 3)"
						overflow="scroll"
						rounded="15px"
					>
						<Text color="white">{fish.name}</Text>
					</Center>
				))}
			</Stack>
		</Stack>
	);
}
