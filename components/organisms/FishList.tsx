import { trpc } from '@utils/trpc';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { LiveStockCard } from '@components/molecules';
import { FetchedTankData } from '@utils/index';
import { UserFish } from '@prisma/client';
import { useEffect, useState } from 'react';
import {
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

interface FishListProps {
	tank: FetchedTankData['tank'];
	plants: FetchedTankData['plants'];
}

export function FishList({ tank, plants }: FishListProps) {
	const toast = useToast();
	const { data: userData } = useSession();
	const { data } = trpc.useQuery([
		'user.fish',
		//@ts-ignore
		{ id: userData?.userInfo.id as string },
	]);
	const invalidate = trpc.useContext();
	const [filteredFish, setFilteredFish] = useState<UserFish[] | undefined>(
		data?.fish
	);
	const [selectedFish, setSelectedFish] = useState<UserFish>({} as UserFish);
	const { isOpen: deleteIsOpen, onToggle: deleteOnToggle } = useDisclosure();

	const updater = trpc.useMutation(['user.deleteFish'], {
		onMutate: async (deletedFish: any) => {
			await invalidate.cancelQuery([
				'user.tanks.byId',
				{ id: deletedFish.tank_id },
			]);

			const freshFish = data?.fish.filter(
				({ id }) => id !== deletedFish.id
			);

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
		setFilteredFish(data?.fish);
	}, [data]);

	return (
		<Stack spacing={3} w="calc(100vw - 3rem)">
			<Input
				placeholder="Search Fish"
				bg="white"
				onChange={(e) => {
					setFilteredFish(
						data?.fish.filter((f) =>
							f.name
								.toLowerCase()
								.includes(e.target.value.toLocaleLowerCase())
						)
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
