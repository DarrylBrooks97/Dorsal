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
	Grid,
	GridItem,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionIcon,
	AccordionPanel,
} from '@chakra-ui/react';
import Image from 'next/image';
import { Fish } from '@prisma/client';

const MotionCenter = motion<CenterProps>(Center);

export default function AddFish() {
	const { data } = trpc.useQuery(['user.fish']);
	const [filteredFish, setFilteredFish] = useState(data?.fish);
	const [selectedFish, setSelectedFish] = useState<Fish>();
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
		console.log(data?.fish);
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
						onClick={() => {
							onFishToggle();
							setSelectedFish(fish);
						}}
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
							bottom="3%"
							textAlign="center"
							transform="translateX(-50%)"
						>
							<Heading color="black" fontSize="2xl">
								{fish.name}
							</Heading>
							<Text color="gray.600">{fish.species}</Text>
						</Stack>
					</MotionCenter>
				))}
			</Stack>
			<Drawer placement="right" isOpen={isFishOpen} onClose={onFishClose}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>{selectedFish?.name}</DrawerHeader>
					<DrawerBody>
						<Stack mb="1em">
							<Box
								w="full"
								h="300px"
								pos="relative"
								rounded="15px"
								overflow="hidden"
								boxShadow="md"
							>
								<Image
									src={
										selectedFish?.image_url ??
										'https://images.unsplash.com/photo-1617994679330-2883951d0073?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
									}
									alt="fish"
									layout="fill"
								/>
							</Box>
						</Stack>
						<Accordion border="white" mb={9} allowToggle>
							<AccordionItem>
								<AccordionButton>
									<Box flex="1" textAlign="center">
										<Text>Tank Parameters</Text>
									</Box>
									<AccordionIcon color="green" />
								</AccordionButton>
								<AccordionPanel
									pos="relative"
									overflowY="scroll"
								>
									<Grid
										gap={5}
										templateColumns="repeat(2, 1fr)"
									>
										<GridItem
											rounded="15px"
											flexDirection="column"
											textAlign="center"
											alignSelf="end"
										>
											<Heading fontSize="1.5rem">
												{
													selectedFish?.water_params[
														'pH'
													]
												}
											</Heading>
											<Text>pH</Text>
										</GridItem>
										<GridItem
											rounded="15px"
											flexDirection="column"
											textAlign="center"
											alignSelf="end"
										>
											<Heading fontSize="1.5rem">
												{
													selectedFish?.water_params[
														'ammonia'
													]
												}
											</Heading>
											<Text>Ammonia</Text>
										</GridItem>
										<GridItem
											rounded="15px"
											flexDirection="column"
											textAlign="center"
											alignSelf="end"
										>
											<Heading fontSize="1.5rem">
												{
													selectedFish?.water_params[
														'alkalinity'
													]
												}
											</Heading>
											<Text>Alkalinity</Text>
										</GridItem>
										<GridItem
											rounded="15px"
											flexDirection="column"
											textAlign="center"
											alignSelf="end"
										>
											<Heading fontSize="1.5rem">
												{
													selectedFish?.water_params[
														'chlorine'
													]
												}
											</Heading>
											<Text>Chlorine</Text>
										</GridItem>
										<GridItem
											rounded="15px"
											flexDirection="column"
											textAlign="center"
											alignSelf="end"
										>
											<Heading fontSize="1.5rem">
												{
													selectedFish?.water_params[
														'nirate'
													]
												}
											</Heading>
											<Text>Nitrate</Text>
										</GridItem>
										<GridItem
											rounded="15px"
											flexDirection="column"
											textAlign="center"
											alignSelf="end"
										>
											<Heading fontSize="1.5rem">
												{
													selectedFish?.water_params[
														'nirite'
													]
												}
											</Heading>
											<Text>Nitrite</Text>
										</GridItem>
										<GridItem
											rounded="15px"
											flexDirection="column"
											textAlign="center"
											alignSelf="end"
										>
											<Heading fontSize="1.5rem">
												{
													selectedFish?.water_params[
														'hardness'
													]
												}
											</Heading>
											<Text>Hardness</Text>
										</GridItem>
									</Grid>
								</AccordionPanel>
							</AccordionItem>
						</Accordion>
						<Grid gap={5} templateColumns="repeat(2, 1fr)">
							<GridItem
								rounded="15px"
								flexDirection="column"
								textAlign="center"
								alignSelf="end"
							>
								<Heading fontSize="1.5rem">
									{selectedFish?.max_size} in
								</Heading>
								<Text>Max Size</Text>
							</GridItem>
							<GridItem
								flexDirection="column"
								textAlign="center"
								alignSelf="end"
							>
								<Heading fontSize="1.5rem">
									{selectedFish?.min_tank_size} gal
								</Heading>
								<Text>Tank Size</Text>
							</GridItem>
							<GridItem
								flexDirection="column"
								textAlign="center"
								alignSelf="end"
							>
								<Heading fontSize="1.5rem">
									{selectedFish?.habitat}
								</Heading>
								<Text>Habitat</Text>
							</GridItem>
							<GridItem
								flexDirection="column"
								textAlign="center"
								alignSelf="end"
							>
								<Heading fontSize="1.5rem">
									{selectedFish?.diet}
								</Heading>
								<Text>Diet</Text>
							</GridItem>
							<GridItem
								flexDirection="column"
								textAlign="center"
								alignSelf="end"
							>
								<Heading fontSize="1.5rem">
									{selectedFish?.illnesses}
								</Heading>
								<Text>Illnesses</Text>
							</GridItem>
							<GridItem
								flexDirection="column"
								textAlign="center"
								alignSelf="end"
							>
								<Heading fontSize="1.5rem">
									{selectedFish?.temperament}
								</Heading>
								<Text>Temperament</Text>
							</GridItem>
						</Grid>
					</DrawerBody>
					<DrawerFooter>
						<Button
							colorScheme="green"
							mr={3}
							onClick={() => onFishToggle()}
						>
							Add
						</Button>
						<Button
							variant="outline"
							colorScheme="red"
							onClick={() => onFishToggle()}
						>
							Cancel
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</Stack>
	);
}
