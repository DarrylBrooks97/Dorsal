import { trpc } from '@utils/trpc';
import { motion } from 'framer-motion';
import { NextImage } from '@components/atoms';
import { TrashIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { FetchedTankData } from '@utils/index';
import {
	Box,
	Heading,
	HStack,
	Modal,
	ModalHeader,
	ModalBody,
	ModalContent,
	ModalOverlay,
	ModalCloseButton,
	ModalFooter,
	Input,
	Stack,
	StackProps,
	Text,
	useDisclosure,
	useToast,
	Button,
} from '@chakra-ui/react';

const MotionHStack = motion<StackProps>(HStack);
interface FishListProps {
	fish: FetchedTankData['fish'];
	tank: FetchedTankData['tank'];
	plants: FetchedTankData['plants'];
}

export function FishList({ fish, tank, plants }: FishListProps) {
	const toast = useToast();
	const invalidate = trpc.useContext();
	const [filteredFish, setFilteredFish] = useState(fish);
	const [selectedFishId, setSelectedFishId] = useState<string>('');
	const { isOpen: deleteIsOpen, onToggle: deleteOnToggle } = useDisclosure();

	const updater = trpc.useMutation(['user.deleteFish'], {
		onMutate: async (deletedFish: any) => {
			await invalidate.cancelQuery([
				'user.tanks.byId',
				{ id: deletedFish.tank_id },
			]);

			const freshFish = fish.filter(({ id }) => id !== deletedFish.id);

			invalidate.setQueryData(
				['user.tanks.byId', { id: deletedFish.tank_id }],
				{
					tank,
					plants,
					fish: [...(freshFish as FetchedTankData['fish'])],
				}
			);

			return {
				id: deletedFish.id,
				tank_id: deletedFish.tank_id,
			};
		},
		onSettled(_newData, error, _variables, context: any) {
			if (error) {
				toast({
					title: 'Error',
					description: error.message,
					status: 'error',
					duration: 5000,
					isClosable: true,
				});
			}
			invalidate.invalidateQueries([
				'user.tanks.byId',
				{ id: context.tank_id },
			]);
		},
	});

	useEffect(() => {
		setFilteredFish(fish);
	}, [fish]);

	return (
		<Stack spacing={3} w="calc(100vw - 3rem)">
			<Input
				placeholder="Search Plants"
				bg="white"
				onChange={(e) => {
					setFilteredFish(
						fish.filter((f) =>
							f.name
								.toLowerCase()
								.includes(e.target.value.toLocaleLowerCase())
						)
					);
				}}
			/>
			{filteredFish?.map((f, idx) => (
				<MotionHStack
					key={f.id}
					w="full"
					spacing={3}
					pos="relative"
					bg="rgba(255,255,255,0.4)"
					rounded="15px"
					initial="initial"
					animate="open"
					variants={{
						initial: {
							y: -5,
							opacity: 0,
						},
						open: {
							y: 0,
							opacity: 1,
							transition: {
								delay: idx * 0.2,
							},
						},
					}}
				>
					<Box
						overflow="hidden"
						position="relative"
						w="full"
						p="calc(100vw / 3)"
						bg="blue"
						rounded="15px"
						textAlign="center"
					>
						<NextImage
							layout="fill"
							alt={f.name}
							src={
								f.image_url ??
								'https://images.unsplash.com/photo-1619611384968-e45fbd60bc5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
							}
						/>
						<Heading pos="absolute" bottom="5px">
							{f.name}
						</Heading>
						<Box
							pos="absolute"
							rounded="15px"
							bottom="5"
							right="5"
							onClick={() => {
								setSelectedFishId(f.id as string);
								deleteOnToggle();
							}}
						>
							<TrashIcon color="red" width="30px" height="30px" />
						</Box>
					</Box>
				</MotionHStack>
			))}
			<Modal isOpen={deleteIsOpen} onClose={deleteOnToggle}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Delete Fish ?</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text>Are you sure you want to delete this fish?</Text>
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme="blue"
							variant="outline"
							mr={3}
							onClick={() => deleteOnToggle()}
						>
							Cancel
						</Button>
						<Button
							colorScheme="red"
							onClick={() => {
								updater.mutate({
									id: selectedFishId,
								});
								deleteOnToggle();
							}}
						>
							Delete
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Stack>
	);
}
