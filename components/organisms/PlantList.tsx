import { motion } from 'framer-motion';
import { TrashIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { NextImage } from '@components/atoms';
import { trpc } from '@utils/trpc';
import { inferQueryResponse } from 'pages/api/trpc/[trpc]';
import {
	Box,
	Button,
	Heading,
	HStack,
	StackProps,
	Input,
	Stack,
	Text,
	Modal,
	ModalHeader,
	ModalBody,
	ModalContent,
	ModalOverlay,
	ModalCloseButton,
	ModalFooter,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { UserPlant } from '@prisma/client';

export type FetchedTankData = inferQueryResponse<'user.tanks.byId'>;
const MotionHStack = motion<StackProps>(HStack);

interface FishListProps {
	fish: FetchedTankData['fish'];
	tank: FetchedTankData['tank'];
	plants: FetchedTankData['plants'];
}

export function PlantList({ fish, tank, plants }: FishListProps) {
	const toast = useToast();
	const invalidate = trpc.useContext();
	const [selectedPlant, setSelectedPlant] = useState<UserPlant>();
	const [filteredPlants, setFilteredPlants] = useState(plants);
	const { isOpen: deleteIsOpen, onToggle: deleteOnToggle } = useDisclosure();
	const updater = trpc.useMutation(['user.deletePlant'], {
		onMutate: async ({ id: deletedId }) => {
			await invalidate.cancelQuery([
				'user.tanks.byId',
				{ id: selectedPlant?.tank_id as string },
			]);

			const freshPlants = plants.filter(({ id }) => id !== deletedId);

			invalidate.setQueryData(
				['user.tanks.byId', { id: selectedPlant?.tank_id as string }],
				{
					tank,
					plants: [...(freshPlants as FetchedTankData['plants'])],
					fish,
				}
			);

			return {
				id: deletedId,
				tank_id: selectedPlant?.tank_id as string,
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

	return (
		<Stack spacing={3} w="calc(100vw - 3rem)">
			<Input
				placeholder="Search Plants"
				bg="white"
				onChange={(e) => {
					setFilteredPlants(
						plants.filter((p) =>
							p.name
								.toLowerCase()
								.includes(e.target.value.toLocaleLowerCase())
						)
					);
				}}
			/>
			{filteredPlants.map((p, idx) => (
				<MotionHStack
					key={p.id}
					w="full"
					h="200px"
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
						h="200px"
						bg="blue"
						rounded="15px"
					>
						<NextImage
							layout="fill"
							alt={p.name}
							src={p.image_url as string}
						/>
					</Box>
					<Stack spacing={3} textAlign="center" w="full" h="full">
						<Heading color="white" textAlign="center">
							{p.name}
						</Heading>
						<Text color="gray.400">{p.species}</Text>
					</Stack>
					<Box pos="absolute" rounded="15px" bottom="5" right="5">
						<TrashIcon
							color="red"
							width="30px"
							height="30px"
							onClick={() => {
								setSelectedPlant(p);
								deleteOnToggle();
							}}
						/>
					</Box>
				</MotionHStack>
			))}
			<Modal isOpen={deleteIsOpen} onClose={deleteOnToggle}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Delete Plant ?</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text>Are you sure you want to delete this plant?</Text>
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
									id: selectedPlant?.id as string,
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
