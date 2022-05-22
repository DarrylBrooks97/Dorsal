import { trpc } from '@utils/trpc';
import { motion } from 'framer-motion';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import {
	Stack,
	Input,
	HStack,
	Button,
	Center,
	Text,
	CenterProps,
	Heading,
	useDisclosure,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerBody,
	DrawerCloseButton,
	DrawerHeader,
	DrawerFooter,
	Box,
} from '@chakra-ui/react';
import Image from 'next/image';

const MotionCenter = motion<CenterProps>(Center);

export default function AddFish() {
	const { data } = trpc.useQuery(['user.fish']);
	const [filteredFish, setFilteredFish] = useState(data?.fish);
	// const [selectedFish, setSelectedFish] = useState<>();
	const {
		isOpen: isFilterOpen,
		onClose: onFilterClose,
		onToggle: onFilterToggle,
	} = useDisclosure();
	const {
		isOpen: isFishOpen,
		onClose: onFishClose,
		onToggle: onFishToggle,
	} = useDisclosure();

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
				<Button colorScheme="green" color="white">
					Filter
				</Button>
			</HStack>
			<Stack spacing={6} w="calc(100vw-3rem)">
				{filteredFish?.map((fish) => (
					<MotionCenter
						key={fish.id}
						border="2px solid #444"
						h="calc(100vh / 3)"
						overflow="scroll"
						pos="relative"
						rounded="15px"
						initial="hidden"
						animate="visible"
						variants={{
							hidden: {
								y: -10,
								opacity: 0,
							},
							visible: (index) => ({
								opacity: 1,
								y: 0,
								transition: {
									delay: index * 0.35,
									duration: 0.5,
								},
							}),
						}}
						onClick={() => onFishToggle()}
					>
						<Image
							layout="fill"
							priority
							src={fish.image_url}
							alt={`${fish.name}`}
						/>
						<Stack
							pos="absolute"
							left="50%"
							bottom="5%"
							textAlign="center"
							transform="translateX(-50%)"
						>
							<Heading color="black">{fish.name}</Heading>
							<Text color="gray.600">{fish.species}</Text>
						</Stack>
					</MotionCenter>
				))}
			</Stack>
			<Drawer placement="right" isOpen={isFishOpen} onClose={onFishClose}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Change me</DrawerHeader>
					<DrawerBody>
						<Stack>
							<Box
								w="full"
								h="300px"
								pos="relative"
								rounded="15px"
								overflow="hidden"
							>
								<Image
									src="https://images.unsplash.com/photo-1617994679330-2883951d0073?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
									alt="fish"
									layout="fill"
								/>
							</Box>
							<Text>Fish name</Text>
						</Stack>
					</DrawerBody>
					<DrawerFooter>
						<Button
							variant="green"
							mr={3}
							onClick={() => onFishToggle()}
						>
							Add
						</Button>
						<Button variant="red" onClick={() => onFishToggle()}>
							Cancel
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</Stack>
	);
}
