import Image from 'next/image';
import { useState } from 'react';
import { UserPlant } from '@prisma/client';
import {
	Box,
	Heading,
	HStack,
	StackProps,
	Input,
	Stack,
	Text,
} from '@chakra-ui/react';
import { TrashIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';

const MotionHStack = motion<StackProps>(HStack);
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
			{filteredPlants.map((p, idx) => (
				<MotionHStack
					key={p.id}
					w="full"
					h="200px"
					spacing={3}
					pos="relative"
					bg="rgba(255,255,255,0.4)"
					rounded="15px"
					initial="initial"
					animate="open"
					variants={{
						initial: {
							y: -5,
							opacity: 0,
						},
						open: {
							y: 0,
							opacity: 1,
							transition: {
								delay: idx * 0.2,
							},
						},
					}}
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
					<Box pos="absolute" rounded="15px" bottom="5" right="5">
						<TrashIcon color="red" width="30px" height="30px" />
					</Box>
				</MotionHStack>
			))}
		</Stack>
	);
}
