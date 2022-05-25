import Image from 'next/image';
import PlantView from '@components/PlantView';
import { Plant } from '@prisma/client';
import { trpc } from '@utils/trpc';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { GrNext } from 'react-icons/gr';
import {
	Button,
	Center,
	Heading,
	HStack,
	Input,
	Stack,
	Text,
	useDisclosure,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	DrawerCloseButton,
	DrawerFooter,
	Select,
	Box,
	CenterProps,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionIcon,
	AccordionPanel,
	Grid,
	GridItem,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionCenter = motion<CenterProps>(Center);

export default function AddPlant() {
	const { data } = trpc.useQuery(['general.plants']);
	const [viewedPlant, setViewedPlant] = useState<Plant>();
	const [selectedPlants, setSelectedPlants] = useState<Plant[]>(
		[] as Plant[]
	);
	const [filteredPlants, setFilteredPlants] = useState(data?.plants);
	const { isOpen: showPlantSelection, onToggle: toggleShowPlantSelection } =
		useDisclosure();
	const {
		isOpen: filterIsOpen,
		onClose: filterOnClose,
		onToggle: toggleFilter,
	} = useDisclosure();
	const {
		isOpen: isPlantOpen,
		onClose: onPlantClose,
		onToggle: plantToggle,
	} = useDisclosure();

	const handleFilter = (e: BaseSyntheticEvent) => {
		const { value } = e.target as HTMLInputElement;
		setFilteredPlants(
			data?.plants.filter((plant) =>
				plant.name.toLowerCase().includes(value.toLowerCase())
			)
		);
	};

	useEffect(() => {
		setFilteredPlants(data?.plants);
	}, [data]);

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
					placeholder="Search for plants"
				/>
				<Button colorScheme="green" color="white">
					Filter
				</Button>
			</HStack>
			<Stack spacing={6} w="calc(100vw-3rem)">
				{filteredPlants?.map((plant) => (
					<MotionCenter
						key={plant.id}
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
							plantToggle();
							setViewedPlant(plant);
						}}
					>
						<Image
							layout="fill"
							priority
							src={plant.image_url}
							alt={`${plant.name}`}
						/>
						<Stack
							pos="absolute"
							left="50%"
							bottom="3%"
							textAlign="center"
							transform="translateX(-50%)"
						>
							<Heading color="black" fontSize="2xl">
								{plant.name}
							</Heading>
							<Text color="gray.600">{plant.species}</Text>
						</Stack>
					</MotionCenter>
				))}
			</Stack>
			<Drawer
				placement="right"
				isOpen={isPlantOpen}
				onClose={onPlantClose}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>{viewedPlant?.name}</DrawerHeader>
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
										viewedPlant?.image_url ??
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
													//@ts-ignore
													viewedPlant?.water_params[
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
													//@ts-ignore
													viewedPlant?.water_params[
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
													//@ts-ignore
													viewedPlant?.water_params[
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
													//@ts-ignore
													viewedPlant?.water_params[
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
													//@ts-ignore
													viewedPlant?.water_params[
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
													//@ts-ignore
													viewedPlant?.water_params[
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
													//@ts-ignore
													viewedPlant?.water_params[
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
									{viewedPlant?.lighting} lum
								</Heading>
								<Text>Lighting</Text>
							</GridItem>
							<GridItem
								flexDirection="column"
								textAlign="center"
								alignSelf="end"
							>
								<Heading fontSize="1.5rem">
									{viewedPlant?.soil}
								</Heading>
								<Text>Soil</Text>
							</GridItem>
							<GridItem
								flexDirection="column"
								textAlign="center"
								alignSelf="end"
							>
								<Heading fontSize="1.5rem">
									{viewedPlant?.illnesses}
								</Heading>
								<Text>Illnesses</Text>
							</GridItem>
						</Grid>
						<HStack w="full" justify="center">
							<Button
								colorScheme="red"
								onClick={() => {
									const quantity = selectedPlants.reduce(
										(acc, { id }) => {
											if (id === viewedPlant?.id) {
												return acc + 1;
											}
											return acc;
										},
										0
									);
									if (quantity === 1) {
										setSelectedPlants(
											selectedPlants.filter(
												(oldFish: Plant) =>
													oldFish.id !==
													viewedPlant?.id
											)
										);
										plantToggle();
										return;
									}
									selectedPlants.pop();
								}}
							>
								-
							</Button>
							<Input
								w="60px"
								value={selectedPlants.reduce((acc, { id }) => {
									if (id === viewedPlant?.id) {
										return acc + 1;
									}
									return acc;
								}, 0)}
								textAlign="center"
								onChange={(e) => {}}
							/>
							<Button
								colorScheme="green"
								onClick={() => {
									setSelectedPlants([
										...(selectedPlants as any),
										viewedPlant,
									]);
								}}
							>
								+
							</Button>
						</HStack>
					</DrawerBody>
					<DrawerFooter>
						<Button
							colorScheme="green"
							mr={3}
							onClick={() => {
								plantToggle();
								return {};
							}}
						>
							Add
						</Button>
						<Button
							variant="outline"
							colorScheme="red"
							onClick={() => plantToggle()}
						>
							Cancel
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</Stack>
	);
}
