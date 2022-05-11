import Image from 'next/image';
import { BsTrash } from 'react-icons/bs';
import { Plant } from '@prisma/client';
import { trpc } from '@utils/trpc';
import { useState } from 'react';
import { GrNext } from 'react-icons/gr';
import { Cross1Icon } from '@radix-ui/react-icons';
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
	ButtonGroup,
	GridItem,
	Grid,
} from '@chakra-ui/react';

const tempPlants: Partial<Plant>[] = [
	{
		id: '1',
		name: 'Plant 1',
		image_url:
			'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1373&q=80',
		maintained_at: new Date(),
	},
	{
		id: '2',
		name: 'Plant 2',
		image_url:
			'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1373&q=80',
		maintained_at: new Date(),
	},
	{
		id: '3',
		name: 'Plant 3',
		image_url:
			'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1373&q=80',
		maintained_at: new Date(),
	},
	{
		id: '4',
		name: 'Plant 4',
		image_url:
			'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1373&q=80',
		maintained_at: new Date(),
	},
	{
		id: '5',
		name: 'Plant 5',
		image_url:
			'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1373&q=80',
		maintained_at: new Date(),
	},
	{
		id: '6',
		name: 'Plant 6',
		image_url:
			'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1373&q=80',
		maintained_at: new Date(),
	},
];
export default function AddPlant() {
	const { data } = trpc.useQuery(['user.tanks']);
	const { data: plantsData } = trpc.useQuery(['general.plants']);
	const [search, setSearch] = useState('');
	const [viewedPlant, setViewedPlant] = useState<Partial<Plant>>();
	const [selectedPlants, setSelectedPlants] = useState<Plant[]>();
	const { isOpen: showPlantSelection, onToggle: toggleShowPlantSelection } =
		useDisclosure();
	const {
		isOpen: filterIsOpen,
		onClose: filterOnClose,
		onToggle: toggleFilter,
	} = useDisclosure();
	const {
		isOpen: pickedIsOpen,
		onClose: pickerOnClose,
		onToggle: togglePicker,
	} = useDisclosure();

	return (
		<>
			{showPlantSelection ? (
				<Box
					h="100vh"
					w="full"
					p="6"
					onClick={() => toggleShowPlantSelection()}
				>
					<Box
						pos="relative"
						w="full"
						h="300px"
						borderRadius="15px"
						overflow="hidden"
					>
						<Image
							src={
								viewedPlant?.image_url ??
								'https://images.unsplash.com/photo-1567331711402-509c12c41959?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80'
							}
							layout="fill"
						/>
					</Box>
					<Heading color="white" textAlign="center">
						{viewedPlant?.name}
					</Heading>
					<Stack
						w="calc(100vw - 3rem)"
						alignContent="center"
						justifyContent="center"
						shouldWrapChildren
					>
						<HStack bg="gray" w="full" h="100px" rounded="15px">
							<Box w="calc(100% / 3)">
								<Text color="gray.300" textAlign="center">
									Lighting
								</Text>
							</Box>
							<Box w="calc(100% / 3)">
								<Text color="gray.300" textAlign="center">
									Soil
								</Text>
							</Box>
							<Box w="calc(100%/ 3)">
								<Text color="gray.300" textAlign="center">
									Species
								</Text>
							</Box>
						</HStack>
					</Stack>
					<Center
						boxSize="50px"
						pos="absolute"
						bg="green"
						rounded="full"
						bottom="10"
						right="5"
						onClick={() => {
							setSelectedPlants((prev: any) => [
								...prev,
								viewedPlant,
							]);
							togglePicker();
						}}
					>
						<Cross1Icon
							color="white"
							style={{ transform: 'rotate(-45deg)' }}
						/>
					</Center>
				</Box>
			) : (
				<Box>
					<Stack w="full" h="100vh" p="6">
						<HStack
							bg="rgba(0,0,0,0.8)"
							pos="sticky"
							top={0}
							zIndex="99"
							w="full"
							p="0.75rem 0rem"
						>
							<Input
								placeholder="Search Plants"
								color="white"
								onChange={(e) => setSearch(e.target.value)}
							/>
							<Button
								variant="solid"
								color="green"
								onClick={() => toggleFilter()}
							>
								Filter
							</Button>
						</HStack>
						<Stack spacing={30}>
							{plantsData?.plants.map((plant, i) => (
								<HStack
									key={i}
									rounded="15px"
									overflow="hidden"
									bg="rgba(238,235,211,0.4)"
									w="calc(100vw - 3rem)"
									h="100px"
									pos="relative"
									onClick={() => {
										toggleShowPlantSelection();
										setViewedPlant(plant);
									}}
								>
									<Image
										priority
										width="100%"
										height="100%"
										layout="fixed"
										src={plant.image_url ?? ''}
										alt="plant photo"
									/>
									<Stack
										h="full"
										w="calc(100vw - 3rem - 30%)"
										shouldWrapChildren
									>
										<Heading
											fontSize="24px"
											color="white"
											textAlign="center"
											isTruncated
										>
											{plant.name}
										</Heading>
										<Text color="gray.300" fontSize="sm">
											Type: Semi Aquatic
										</Text>
										<Text color="gray.300" fontSize="sm">
											Species: {plant.species}
										</Text>
									</Stack>
									<Center
										as="button"
										pos="absolute"
										boxSize="30px"
										right="10px"
										bottom="50%"
										transform="translateY(50%)"
										color="white"
									>
										<GrNext color="white" />
									</Center>
								</HStack>
							))}
						</Stack>
					</Stack>
					<Drawer
						isOpen={filterIsOpen}
						onClose={filterOnClose}
						placement="bottom"
					>
						<DrawerOverlay />
						<DrawerContent>
							<DrawerCloseButton />
							<DrawerHeader>
								<Heading>Filter</Heading>
							</DrawerHeader>

							<DrawerBody>
								<Stack spacing={50} shouldWrapChildren>
									<Stack>
										<Text>Type</Text>
										<Select>
											<option value="All">All</option>
											<option value="Semi">
												Semi Aquatic
											</option>
											<option value="Aquatic">
												Aquatic
											</option>
										</Select>
									</Stack>
								</Stack>
							</DrawerBody>
							<DrawerFooter>
								<Button
									variant="outline"
									onClick={filterOnClose}
								>
									<Text>Back</Text>
								</Button>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
					<Drawer
						isOpen={pickedIsOpen}
						onClose={pickerOnClose}
						placement="right"
					>
						<DrawerOverlay />
						<DrawerContent>
							<DrawerCloseButton />
							<DrawerHeader>
								<Heading>Adder</Heading>
							</DrawerHeader>

							<DrawerBody>
								<Stack spacing={5} shouldWrapChildren>
									<Stack>
										<Text>Tank</Text>
										<Select>
											{data?.tanks.map((tank, idx) => (
												<option
													key={idx}
													value={tank.id}
												>
													{tank.name}
												</option>
											))}
										</Select>
									</Stack>
									<Stack>
										<Text>Selected Plants</Text>
										<Grid
											templateColumns="repeat(2, 1fr)"
											gap="5"
										>
											{tempPlants?.map((plant, idx) => (
												<GridItem key={idx}>
													<Box
														w="100%"
														h="150px"
														pos="relative"
														borderRadius="15px"
													>
														<Image
															priority
															layout="fill"
															src={
																plant.image_url ??
																''
															}
															style={{
																borderRadius:
																	'15px',
															}}
														/>
														<Box
															pos="absolute"
															right="4"
															bottom="4"
														>
															<BsTrash
																color="red"
																onClick={() => {}}
															/>
														</Box>
													</Box>
													<Text textAlign="center">
														{plant.name}
													</Text>
												</GridItem>
											))}
										</Grid>
									</Stack>
								</Stack>
							</DrawerBody>
							<DrawerFooter>
								<ButtonGroup>
									<Button
										colorScheme="green"
										onClick={() => {}}
									>
										Add
									</Button>
									<Button
										variant="outline"
										onClick={pickerOnClose}
									>
										<Text>Back</Text>
									</Button>
								</ButtonGroup>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</Box>
			)}
		</>
	);
}
