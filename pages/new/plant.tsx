import Image from 'next/image';
import PlantView from '@components/PlantView';
import { Plant } from '@prisma/client';
import { trpc } from '@utils/trpc';
import { useState } from 'react';
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
} from '@chakra-ui/react';

export interface SelectedPlant {
	plant: Plant;
	quantity: number;
}
export default function AddPlant() {
	const { data: plantsData } = trpc.useQuery(['general.plants']);
	const [search, setSearch] = useState('');
	const [viewedPlant, setViewedPlant] = useState<Plant>();
	const [selectedPlants, setSelectedPlants] = useState<SelectedPlant[]>([]);
	const { isOpen: showPlantSelection, onToggle: toggleShowPlantSelection } =
		useDisclosure();
	const {
		isOpen: filterIsOpen,
		onClose: filterOnClose,
		onToggle: toggleFilter,
	} = useDisclosure();
	const {
		isOpen: pickerIsOpen,
		onClose: pickerOnClose,
		onToggle: togglePicker,
	} = useDisclosure();

	return (
		<>
			{showPlantSelection ? (
				<PlantView
					{...{
						viewedPlant,
						selectedPlants,
						setSelectedPlants,
						togglePicker,
						pickerIsOpen,
						toggleShowPlantSelection,
						pickerOnClose,
					}}
				/>
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
										setViewedPlant(plant);
										toggleShowPlantSelection();
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
				</Box>
			)}
		</>
	);
}
