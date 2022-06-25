import { motion } from 'framer-motion';
import { TrashIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { NextImage } from '@components/atoms';
import { trpc } from '@utils/trpc';
import { UserPlant } from '@prisma/client';
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
import { useSession } from 'next-auth/react';

export type FetchedTankData = inferQueryResponse<'user.tanks.byId'>;
const MotionHStack = motion<StackProps>(HStack);

interface FishListProps {
	id: string;
	fish: FetchedTankData['fish'];
	tank: FetchedTankData['tank'];
}

export function PlantList({ fish, tank }: FishListProps) {
	const toast = useToast();
	const { data: userData } = useSession();
	const { data } = trpc.useQuery([
		'user.plants',
		//@ts-ignore
		{ id: userData?.userInfo.id as string },
	]);
	const invalidate = trpc.useContext();
	const [selectedPlant, setSelectedPlant] = useState<UserPlant>(
		{} as UserPlant
	);
	const [filteredPlants, setFilteredPlants] = useState<UserPlant[]>([]);
	const { isOpen: deleteIsOpen, onToggle: deleteOnToggle } = useDisclosure();
	const updater = trpc.useMutation(['user.deletePlant'], {
		onMutate: async ({ id: deletedId }) => {
			await invalidate.cancelQuery([
				'user.tanks.byId',
				{ id: selectedPlant?.tank_id as string },
			]);

			const freshPlants = data?.plants.filter(
				({ id }) => id !== deletedId
			);

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
						data!.plants.filter((p) =>
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
						rounded="15px"
					>
						<NextImage
							layout="fill"
							alt={p.name}
							src={
								p.image_url ??
								'https://images.unsplash.com/photo-1619611384968-e45fbd60bc5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80as'
							}
						/>
						<Stack
							w="full"
							pos="absolute"
							left="0"
							bottom="2"
							flexDir="row"
							justify="center"
						>
							<Box>
								<Heading>{p.name}</Heading>
							</Box>
						</Stack>
						<Box pos="absolute" rounded="15px" bottom="2" right="2">
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
