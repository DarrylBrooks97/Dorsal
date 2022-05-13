import Image from 'next/image';
import { trpc } from '@utils/trpc';
import { Plant } from '@prisma/client';
import { Dispatch, SetStateAction, useState } from 'react';
import { Cross1Icon } from '@radix-ui/react-icons';
import { SelectedPlant } from 'pages/new/plant';
import { BsArrowLeft, BsTrash } from 'react-icons/bs';
import {
	Box,
	Center,
	HStack,
	Stack,
	Heading,
	Text,
	Input,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	Select,
	GridItem,
	Button,
	DrawerFooter,
	ButtonGroup,
	Grid,
} from '@chakra-ui/react';

export interface PlantViewProps {
	viewedPlant: Plant | undefined;
	selectedPlants: SelectedPlant[];
	pickerIsOpen: boolean;
	togglePicker: () => void;
	pickerOnClose: () => void;
	toggleShowPlantSelection: () => void;
	setSelectedPlants: Dispatch<SetStateAction<SelectedPlant[]>>;
}

export default function PlantView({
	viewedPlant,
	selectedPlants,
	setSelectedPlants,
	togglePicker,
	pickerIsOpen,
	toggleShowPlantSelection,
	pickerOnClose,
}: PlantViewProps) {
	const { data } = trpc.useQuery(['user.tanks']);
	const [amount, setAmount] = useState(1);
	const [updatedData, setUpdatedData] = useState<SelectedPlant[]>([]);

	const updateSelectedPlants = () => {
		setSelectedPlants(
			selectedPlants.map((plant) => {
				const exists = updatedData.find(
					(p) => p.plant.id === plant.plant.id
				);
				if (exists) {
					return {
						plant: plant.plant,
						quantity: exists.quantity,
					};
				}
				return plant;
			})
		);
	};

	return (
		<Box h="100vh" w="full" p="6">
			<Box w="full" p="3" onClick={() => toggleShowPlantSelection()}>
				<BsArrowLeft
					style={{ width: '25px', height: '25px' }}
					color="white"
				/>
			</Box>
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
					const exisistingPlant = selectedPlants.find(({ plant }) => {
						return plant === viewedPlant;
					});

					if (exisistingPlant) {
						exisistingPlant.quantity += 1;
						setAmount(exisistingPlant.quantity);
					} else {
						viewedPlant
							? setSelectedPlants((prev: SelectedPlant[]) => [
									...prev,
									{ plant: viewedPlant, quantity: 1 },
							  ])
							: null;
					}
					togglePicker();
				}}
			>
				<Cross1Icon
					color="white"
					style={{ transform: 'rotate(-45deg)' }}
				/>
			</Center>
			<Drawer
				isOpen={pickerIsOpen}
				onClose={() => {
					pickerOnClose();
					updateSelectedPlants();
				}}
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
										<option key={idx} value={tank.id}>
											{tank.name}
										</option>
									))}
								</Select>
							</Stack>
							<Stack>
								<Text>Selected Plants</Text>
								<Grid templateColumns="repeat(2, 1fr)" gap="5">
									{selectedPlants?.map(
										(
											{ plant, quantity }: SelectedPlant,
											idx
										) => (
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
															onClick={() => {
																setSelectedPlants(
																	selectedPlants.filter(
																		({
																			plant: oldPlant,
																		}: SelectedPlant) =>
																			oldPlant.id !==
																			plant.id
																	)
																);
															}}
														/>
													</Box>
												</Box>
												<Text textAlign="center">
													{plant.name}
												</Text>
												<HStack w="full">
													<Button
														colorScheme="red"
														onClick={() => {
															if (amount === 1) {
																setSelectedPlants(
																	selectedPlants.filter(
																		({
																			plant: oldPlant,
																		}: SelectedPlant) =>
																			oldPlant.id !==
																			plant.id
																	)
																);
																return;
															}
															setAmount(
																(x) => x - 1
															);
															setUpdatedData(
																updatedData.map(
																	({
																		plant,
																		quantity,
																	}: SelectedPlant) => {
																		return {
																			plant,
																			quantity:
																				quantity -
																				1,
																		};
																	}
																)
															);
														}}
													>
														-
													</Button>
													<Input
														w="60px"
														value={amount}
														onChange={(e) => {
															setAmount(
																Number(
																	e.target
																		.value
																)
															);

															quantity = Number(
																e.target.value
															);
														}}
													/>
													<Button
														colorScheme="green"
														onClick={() => {
															setAmount(
																(x) => x + 1
															);
															const updatedPlant:
																| SelectedPlant
																| undefined = updatedData.find(
																({
																	plant,
																}: SelectedPlant) =>
																	plant ===
																	plant
															);

															if (!updatedPlant) {
																setUpdatedData([
																	...updatedData,
																	{
																		plant,
																		quantity:
																			quantity +
																			1,
																	},
																]);
															} else {
																setUpdatedData(
																	updatedData.map(
																		({
																			plant,
																			quantity,
																		}: SelectedPlant) => {
																			return {
																				plant,
																				quantity:
																					quantity +
																					1,
																			};
																		}
																	)
																);
															}
														}}
													>
														+
													</Button>
												</HStack>
											</GridItem>
										)
									)}
								</Grid>
							</Stack>
						</Stack>
					</DrawerBody>
					<DrawerFooter>
						<ButtonGroup>
							<Button
								colorScheme="green"
								onClick={() => {
									console.log({ selectedPlants });
								}}
							>
								Add
							</Button>
							<Button variant="outline" onClick={pickerOnClose}>
								<Text>Back</Text>
							</Button>
						</ButtonGroup>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</Box>
	);
}
