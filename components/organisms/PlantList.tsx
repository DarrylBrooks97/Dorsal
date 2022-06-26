import { trpc } from '@utils/trpc';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { LiveStockCard } from '@components/molecules';
import { UserPlant } from '@prisma/client';
import { inferQueryResponse } from 'pages/api/trpc/[trpc]';
import {
	Button,
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

export type FetchedTankData = inferQueryResponse<'user.tanks.byId'>;
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
	const [filteredPlants, setFilteredPlants] = useState<
		UserPlant[] | undefined
	>([]);
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

	useEffect(() => {
		setFilteredPlants(data?.plants);
	}, [data]);

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
			{filteredPlants?.map((plant, idx) => (
				<LiveStockCard<UserPlant>
					data={plant}
					idx={idx}
					key={plant.id}
					deleteToggle={deleteOnToggle}
					setState={setSelectedPlant}
				/>
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
