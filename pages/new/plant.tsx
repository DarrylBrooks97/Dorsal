import cuid from 'cuid';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Plant } from '@prisma/client';
import { trpc } from '@utils/trpc';
import { motion } from 'framer-motion';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
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
	useToast,
} from '@chakra-ui/react';
import { FaOldRepublic } from 'react-icons/fa';

const MotionCenter = motion<CenterProps>(Center);

export default function AddPlant() {
	const toast = useToast();
	const { data: sessionData }: any = useSession();
	const { data } = trpc.useQuery(['general.plants']);
	const { data: userTanks } = trpc.useQuery(['user.tanks']);
	const adder = trpc.useMutation(['user.addPlant'], {
		onSuccess: () => {
			toast({
				title: 'Success',
				description: `Plant added to your tank !`,
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
			plantToggle();
			setSelectedPlants([]);
		},
		onError: (error) => {
			toast({
				title: 'Error',
				description: `${error.message}`,
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		},
	});
	const [tankId, setTankId] = useState('');
	const [viewedPlant, setViewedPlant] = useState<Plant>();
	const [selectedPlants, setSelectedPlants] = useState<Plant[]>(
		[] as Plant[]
	);
	const [filteredPlants, setFilteredPlants] = useState(data?.plants);
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
									duration: 0.35,
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
				onClose={() => {
					setSelectedPlants([]);
					setTankId('');
					plantToggle();
				}}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>{viewedPlant?.name}</DrawerHeader>
					<DrawerBody>
						<Select
							placeholder="Select Tanks"
							mb="3"
							onChange={(e) => setTankId(e.target.value)}
						>
							{userTanks?.tanks.map((tank) => (
								<option key={tank.id} value={tank.id}>
									{tank.name}
								</option>
							))}
						</Select>
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
									alt="plant"
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
										(acc, { plant_id }: any) => {
											if (plant_id === viewedPlant?.id) {
												return acc + 1;
											}
											return acc;
										},
										0
									);

									selectedPlants.pop();
									setSelectedPlants([...selectedPlants]);
								}}
							>
								-
							</Button>
							<Input
								w="60px"
								value={selectedPlants.reduce(
									(acc, { plant_id }: any) => {
										if (plant_id === viewedPlant?.id) {
											return acc + 1;
										}
										return acc;
									},
									0
								)}
								onChange={(e) => {}}
								textAlign="center"
							/>
							<Button
								colorScheme="green"
								onClick={() => {
									if (tankId.length === 0) {
										toast({
											title: 'Please select a tank',
											status: 'error',
											duration: 9000,
											isClosable: true,
										});
										return;
									}

									setSelectedPlants([
										...(selectedPlants as any),
										{
											name: viewedPlant?.name,
											plant_id: viewedPlant?.id,
											user_id: sessionData.userInfo.id,
											tank_id: tankId,
										},
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
								adder.mutate({
									plants: selectedPlants as any,
								});
							}}
						>
							Add
						</Button>
						<Button
							variant="outline"
							colorScheme="red"
							onClick={() => {
								setSelectedPlants([]);
								setTankId('');
								plantToggle();
							}}
						>
							Cancel
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</Stack>
	);
}
