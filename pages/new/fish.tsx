import { trpc } from '@utils/trpc';
import { NextImage } from '@components/atoms';
import { Fish } from '@prisma/client';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import {
	Stack,
	HStack,
	Input,
	Button,
	Center,
	Text,
	Select,
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
	useToast,
} from '@chakra-ui/react';

const MotionCenter = motion<CenterProps>(Center);

export default function AddFish() {
	const toast = useToast();
	const { data: sessionData }: any = useSession();
	const { data: fishData } = trpc.useQuery(['general.fish']);
	const { data: userTanks } = trpc.useQuery(['user.tanks', { id: sessionData.userInfo.id }]);
	const [tankId, setTankId] = useState('');
	const [filteredFish, setFilteredFish] = useState(fishData?.fish);
	const [viewedFish, setViewedFish] = useState<Fish>();
	const [selectedFish, setSelectedFish] = useState<Fish[]>([] as Fish[]);
	const adder = trpc.useMutation(['user.addFish'], {
		onSuccess: () => {
			setSelectedFish([]);
			setTankId('');
			fishToggle();
			toast({
				title: 'Success',
				description: 'Fish added to tank',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
		},
		onError: error => {
			toast({
				title: 'Error',
				description: `${error.message}`,
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		},
	});
	const { isOpen: isFishOpen, onToggle: fishToggle } = useDisclosure();

	useEffect(() => {
		setFilteredFish(fishData?.fish);
	}, [fishData]);

	const handleFilter = (e: BaseSyntheticEvent) => {
		const { value } = e.target as HTMLInputElement;
		setFilteredFish(
			fishData?.fish.filter(fish => fish.name.toLowerCase().includes(value.toLowerCase())),
		);
	};

	return (
		<Stack shouldWrapChildren bg="black" width="full" p="6" w="100vw" h="100vh">
			<HStack w="calc(100vw - 3rem)">
				<Input color="white" onChange={handleFilter} placeholder="Search for fish" />
				<Button colorScheme="green" color="white">
					Filter
				</Button>
			</HStack>
			<Stack spacing={6} w="calc(100vw-3rem)">
				{filteredFish?.map(fish => (
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
							visible: index => ({
								opacity: 1,
								y: 0,
								transition: {
									delay: index * 0.35,
									duration: 0.5,
								},
							}),
						}}
						onClick={() => {
							fishToggle();
							setViewedFish(fish);
						}}
					>
						<NextImage layout="fill" priority src={fish.image_url} alt={`${fish.name}`} />
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
			<Drawer
				placement="right"
				isOpen={isFishOpen}
				onClose={() => {
					setViewedFish(undefined);
					setSelectedFish([]);
					setTankId('');
					fishToggle();
				}}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>{viewedFish?.name}</DrawerHeader>
					<DrawerBody>
						<Select placeholder="Select Tanks" mb="3" onChange={e => setTankId(e.target.value)}>
							{userTanks?.tanks.map(tank => (
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
								<NextImage
									src={
										viewedFish?.image_url ??
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
								<AccordionPanel pos="relative" overflowY="scroll">
									<Grid gap={5} templateColumns="repeat(2, 1fr)">
										<GridItem
											rounded="15px"
											flexDirection="column"
											textAlign="center"
											alignSelf="end"
										>
											<Heading fontSize="1.5rem">
												{
													//@ts-ignore
													viewedFish?.water_params['pH']
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
													viewedFish?.water_params['ammonia']
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
													viewedFish?.water_params['alkalinity']
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
													viewedFish?.water_params['chlorine']
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
													viewedFish?.water_params['nirate']
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
													viewedFish?.water_params['nirite']
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
													viewedFish?.water_params['hardness']
												}
											</Heading>
											<Text>Hardness</Text>
										</GridItem>
									</Grid>
								</AccordionPanel>
							</AccordionItem>
						</Accordion>
						<Grid gap={5} templateColumns="repeat(2, 1fr)">
							<GridItem rounded="15px" flexDirection="column" textAlign="center" alignSelf="end">
								<Heading fontSize="1.5rem">{viewedFish?.max_size} in</Heading>
								<Text>Max Size</Text>
							</GridItem>
							<GridItem flexDirection="column" textAlign="center" alignSelf="end">
								<Heading fontSize="1.5rem">{viewedFish?.min_tank_size} gal</Heading>
								<Text>Tank Size</Text>
							</GridItem>
							<GridItem flexDirection="column" textAlign="center" alignSelf="end">
								<Heading fontSize="1.5rem">{viewedFish?.habitat}</Heading>
								<Text>Habitat</Text>
							</GridItem>
							<GridItem flexDirection="column" textAlign="center" alignSelf="end">
								<Heading fontSize="1.5rem">{viewedFish?.diet}</Heading>
								<Text>Diet</Text>
							</GridItem>
							<GridItem flexDirection="column" textAlign="center" alignSelf="end">
								<Heading fontSize="1.5rem">{viewedFish?.illnesses}</Heading>
								<Text>Illnesses</Text>
							</GridItem>
							<GridItem flexDirection="column" textAlign="center" alignSelf="end">
								<Heading fontSize="1.5rem">{viewedFish?.temperament}</Heading>
								<Text>Temperament</Text>
							</GridItem>
						</Grid>
						<HStack w="full" justify="center">
							<Button
								colorScheme="red"
								onClick={() => {
									selectedFish.pop();
									setSelectedFish([...selectedFish]);
								}}
							>
								-
							</Button>
							<Input
								w="60px"
								value={selectedFish.reduce((acc, { fish_id }: any) => {
									if (fish_id === viewedFish?.id) {
										return acc + 1;
									}
									return acc;
								}, 0)}
								textAlign="center"
								onChange={e => {}}
							/>
							<Button
								colorScheme="green"
								onClick={() => {
									if (tankId.length === 0) {
										toast({
											title: 'Please select a tank',
											description: '',
											status: 'error',
											duration: 5000,
											isClosable: true,
										});
										return;
									}

									setSelectedFish([
										...(selectedFish as any),
										{
											name: viewedFish?.name,
											tank_id: tankId,
											user_id: sessionData.userInfo.id,
											fish_id: viewedFish?.id,
											image_url: viewedFish?.image_url,
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
								if (selectedFish.length === 0 || tankId.length === 0) {
									toast({
										title: 'Please select a tank and fish',
										description: '',
										status: 'error',
										duration: 5000,
										isClosable: true,
									});

									return;
								}

								adder.mutate({ fish: selectedFish as any });
							}}
						>
							Add
						</Button>
						<Button
							variant="outline"
							colorScheme="red"
							onClick={() => {
								setViewedFish(undefined);
								setSelectedFish([]);
								setTankId('');
								fishToggle();
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
