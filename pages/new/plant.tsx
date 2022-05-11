import Image from 'next/image';
import { Plant } from '@prisma/client';
import { trpc } from '@utils/trpc';
import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
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
	const [search, setSearch] = useState('');
	const [selectedPlants, setSelectedPlants] = useState<Plant[] | null>(null);
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
				<Center
					onClick={() => toggleShowPlantSelection()}
					bg="gray.300"
					w="calc(100vw - 3rem)"
					h="300px"
				>
					Aquarium Component
				</Center>
			) : (
				<Box onClick={() => toggleShowPlantSelection()}>
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
							{[0, 1, 2, 3, 4, 5, 6].map((i) => (
								<HStack
									key={i}
									rounded="15px"
									overflow="hidden"
									bg="rgba(238,235,211,0.4)"
									w="calc(100vw - 3rem)"
									h="100px"
									pos="relative"
								>
									<Image
										width="100%"
										height="100%"
										layout="fixed"
										src="https://images.unsplash.com/photo-1567331711402-509c12c41959?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80"
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
										>
											Bamboo
										</Heading>
										<Text color="gray.300" fontSize="sm">
											Type: Semi Aquatic
										</Text>
										<Text color="gray.300" fontSize="sm">
											Species: Poales
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
										<AiOutlinePlus
											color="white"
											onClick={() => togglePicker()}
										/>
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
						isOpen={true}
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
									<Stack spacing="2" shouldWrapChildren>
										<Text>Selected Plants</Text>
										<Grid
											templateColumns="repeat(2, 1fr)"
											gap="5"
										>
											{tempPlants?.map((plant, idx) => (
												<GridItem
													borderRadius="15px"
													overflow="hidden"
													pos="relative"
													w="full"
													h="150px"
													key={idx}
												>
													<Image
														priority
														layout="fill"
														src={
															plant.image_url ??
															''
														}
													/>
													<Text
														textAlign="center"
														zIndex="4"
													>
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
