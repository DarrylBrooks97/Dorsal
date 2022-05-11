import Image from 'next/image';
import { useState } from 'react';
import { trpc } from '@utils/trpc';
import { MdKeyboardArrowRight } from 'react-icons/md';
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
} from '@chakra-ui/react';

export default function AddPlant() {
	const { data } = trpc.useQuery(['user.tanks']);
	const [search, setSearch] = useState('');
	const { isOpen: showPlantSelection, onToggle: togglePlantComponent } =
		useDisclosure();
	const {
		isOpen: filterIsOpen,
		onClose: filterOnClose,
		onToggle: toggleFilter,
	} = useDisclosure();

	return (
		<>
			{showPlantSelection ? (
				<Center>Aquarium Component</Center>
			) : (
				<>
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
									onClick={() => {}}
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
										<MdKeyboardArrowRight color="white" />
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
				</>
			)}
		</>
	);
}
