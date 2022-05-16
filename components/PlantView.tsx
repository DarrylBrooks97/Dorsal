import cuid from 'cuid';
import Image from 'next/image';
import { trpc } from '@utils/trpc';
import { Plant, UserPlant } from '@prisma/client';
import { Dispatch, SetStateAction, useState } from 'react';
import { Cross1Icon } from '@radix-ui/react-icons';
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
	Button,
	DrawerFooter,
	ButtonGroup,
	useToast,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';

export interface PlantViewProps {
	viewedPlant: Plant;
	selectedPlants: Plant[];
	pickerIsOpen: boolean;
	togglePicker: () => void;
	pickerOnClose: () => void;
	toggleShowPlantSelection: () => void;
	setSelectedPlants: Dispatch<SetStateAction<Plant[]>>;
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
	const toast = useToast();
	const { data } = trpc.useQuery(['user.tanks']);
	const mutate = trpc.useMutation(['user.addPlant']);
	const [tankId, setTankId] = useState<string>('');
	const { data: sessionData }: any = useSession();

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
					alt="plantImage"
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
					viewedPlant
						? setSelectedPlants((prev: Plant[]) => [
								...prev,
								{ ...viewedPlant, uid: cuid(), tankId: tankId },
						  ])
						: null;
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
								<Select
									required
									placeholder="Select a tank"
									onChange={(e) => setTankId(e.target.value)}
								>
									{data?.tanks.map((tank, idx) => (
										<option key={idx} value={tank.id}>
											{tank.name}
										</option>
									))}
								</Select>
							</Stack>
							<Stack>
								<Text>Selected Plants</Text>
								{selectedPlants?.map((plant: Plant, idx) => (
									<Box key={idx}>
										<Box
											w="100%"
											h="250px"
											pos="relative"
											borderRadius="15px"
										>
											<Image
												priority
												layout="fill"
												alt="selectedPlantImage"
												src={plant.image_url ?? ''}
												style={{
													borderRadius: '15px',
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
																(
																	oldPlant: Plant
																) =>
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
										<HStack w="full" justify="center">
											<Button
												colorScheme="red"
												onClick={() => {
													const quantity =
														selectedPlants.reduce(
															(acc, { id }) => {
																if (
																	id ===
																	plant.id
																) {
																	return (
																		acc + 1
																	);
																}
																return acc;
															},
															0
														);
													if (quantity === 1) {
														setSelectedPlants(
															selectedPlants.filter(
																(
																	oldPlant: Plant
																) =>
																	oldPlant.id !==
																	plant.id
															)
														);
														return;
													}
													selectedPlants.pop();
												}}
											>
												-
											</Button>
											<Input
												w="60px"
												value={selectedPlants.reduce(
													(acc, { id }) => {
														if (id === plant.id) {
															return acc + 1;
														}
														return acc;
													},
													0
												)}
												textAlign="center"
												onChange={(e) => {
													setSelectedPlants(
														(p: any) =>
															p.plant.id ===
															plant.id
																? {
																		...p,
																		quantity:
																			parseInt(
																				e
																					.target
																					.value
																			),
																  }
																: p
													);
												}}
											/>
											<Button
												colorScheme="green"
												onClick={() => {
													console.log({ plant });

													setSelectedPlants([
														...selectedPlants,
														{
															...plant,
															uid: cuid() as string,
															lighting:
																plant.lighting,
															soil: plant.soil,
															illnesses:
																plant.illnesses,
															water_params:
																plant.water_params,
														},
													]);
												}}
											>
												+
											</Button>
										</HStack>
									</Box>
								))}
							</Stack>
						</Stack>
					</DrawerBody>
					<DrawerFooter>
						<ButtonGroup>
							<Button
								colorScheme="green"
								onClick={() => {
									if (tankId === '') {
										toast({
											title: 'Select a tank first',
											status: 'error',
											duration: 5000,
											isClosable: true,
										});
										return;
									}
									const plants = selectedPlants.map((p) => {
										return {
											id: cuid(),
											name: p.name,
											plantId: p.id,
											userId: sessionData.userInfo.id,
											maintained_at: new Date(),
											tankId,
										};
									});

									mutate.mutate({
										plants,
										tankId,
									});
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
