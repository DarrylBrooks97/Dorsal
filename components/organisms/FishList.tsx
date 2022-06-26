import { trpc } from '@utils/trpc';
import { useSession } from 'next-auth/react';
import { LiveStockCard } from '@components/molecules';
import { FetchedTankData } from '@utils/index';
import { Tank, UserFish } from '@prisma/client';
import { useEffect, useState } from 'react';
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalContent,
	ModalOverlay,
	ModalCloseButton,
	ModalFooter,
	Input,
	Stack,
	Text,
	useDisclosure,
	useToast,
	Button,
} from '@chakra-ui/react';

interface FishListProps {
	id: string;
}

export function FishList({ id }: FishListProps) {
	const toast = useToast();
	const { data: tankData } = trpc.useQuery(['user.tanks.byId', { id }]);
	const invalidate = trpc.useContext();
	const [filteredFish, setFilteredFish] = useState<UserFish[] | undefined>(tankData?.fish);
	const [selectedFish, setSelectedFish] = useState<UserFish>({} as UserFish);
	const { isOpen: deleteIsOpen, onToggle: deleteOnToggle } = useDisclosure();

	const updater = trpc.useMutation(['user.deleteFish'], {
		onMutate: async (deletedFish: any) => {
			await invalidate.cancelQuery(['user.tanks.byId', { id }]);

			const freshFish = tankData?.fish.filter(({ id }) => id !== deletedFish.id);

			invalidate.setQueryData(['user.tanks.byId', { id }], {
				tank: tankData?.tank as Tank,
				plants: tankData?.plants as FetchedTankData['plants'],
				fish: freshFish as FetchedTankData['fish'],
			});

			return {
				deletedFish,
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
			invalidate.invalidateQueries(['user.tanks.byId', { id: context.deletedFish.tank_id }]);
		},
	});

	useEffect(() => {
		setFilteredFish(tankData?.fish);
	}, [tankData]);

	return (
		<Stack spacing={3} w="calc(100vw - 3rem)">
			<Input
				placeholder="Search Fish"
				bg="white"
				onChange={e => {
					setFilteredFish(
						tankData?.fish.filter(f =>
							f.name.toLowerCase().includes(e.target.value.toLocaleLowerCase()),
						),
					);
				}}
			/>
			{filteredFish?.map((f, idx) => (
				<LiveStockCard<UserFish>
					data={f}
					idx={idx}
					key={f.id}
					deleteToggle={deleteOnToggle}
					setState={setSelectedFish}
				/>
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
						<Button colorScheme="blue" variant="outline" mr={3} onClick={() => deleteOnToggle()}>
							Cancel
						</Button>
						<Button
							colorScheme="red"
							onClick={() => {
								updater.mutate({
									id: selectedFish?.id as string,
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
