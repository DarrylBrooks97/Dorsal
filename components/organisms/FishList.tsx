import Image from 'next/image';
import { UserFish } from '@prisma/client';
import { useState } from 'react';
import { addDays, formatDistance } from 'date-fns';
import {
	Box,
	Heading,
	HStack,
	Input,
	Stack,
	StackProps,
	Text,
} from '@chakra-ui/react';
import { TrashIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';

const MotionHStack = motion<StackProps>(HStack);
export interface FishList extends UserFish {
	species: string;
	image_url: string;
}
export function FishList({ fish }: { fish: FishList[] }) {
	const [filteredFish, setFilteredFish] = useState(fish);

	return (
		<Stack spacing={3} w="calc(100vw - 3rem)">
			<Input
				placeholder="Search Plants"
				bg="white"
				onChange={(e) => {
					setFilteredFish(
						fish.filter((f) =>
							f.name
								.toLowerCase()
								.includes(e.target.value.toLocaleLowerCase())
						)
					);
				}}
			/>
			{filteredFish.map((f, idx) => (
				<MotionHStack
					key={f.id}
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
						<Image layout="fill" alt={f.name} src={f.image_url} />
					</Box>
					<Stack spacing={3} textAlign="center" w="full" h="full">
						<Heading color="white" textAlign="center">
							{f.name}
						</Heading>
						<Text color="gray.400">{f.species}</Text>
						<Box pos="absolute" rounded="15px" bottom="5" right="5">
							<TrashIcon color="red" width="30px" height="30px" />
						</Box>
					</Stack>
				</MotionHStack>
			))}
		</Stack>
	);
}
