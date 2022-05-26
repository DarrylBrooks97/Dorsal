import Image from 'next/image';
import { useState } from 'react';
import { UserPlant } from '@prisma/client';
import { Box, Heading, HStack, Input, Stack, Text } from '@chakra-ui/react';

export interface PlantList extends UserPlant {
	species: string;
	image_url: string;
}
export function PlantList({ plants }: { plants: PlantList[] }) {
	const [filteredPlants, setFilteredPlants] = useState(plants);

	return (
		<Stack spacing={3} w="calc(100vw - 3rem)">
			<Input
				placeholder="Search Plants"
				bg="white"
				onChange={(e) => {
					setFilteredPlants(
						plants.filter((p) =>
							p.name
								.toLowerCase()
								.includes(e.target.value.toLocaleLowerCase())
						)
					);
				}}
			/>
			{filteredPlants.map((p) => (
				<HStack
					key={p.id}
					w="full"
					h="200px"
					spacing={3}
					pos="relative"
					bg="rgba(255,255,255,0.4)"
					rounded="15px"
				>
					<Box
						overflow="hidden"
						position="relative"
						w="full"
						h="200px"
						bg="blue"
						rounded="15px"
					>
						<Image
							layout="fill"
							alt={p.name}
							src={p.image_url as string}
						/>
					</Box>
					<Stack spacing={3} textAlign="center" w="full" h="full">
						<Heading color="white" textAlign="center">
							{p.name}
						</Heading>
						<Text color="gray.400">{p.species}</Text>
					</Stack>
				</HStack>
			))}
		</Stack>
	);
}
