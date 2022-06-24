import { trpc } from '@utils/trpc';
import { motion } from 'framer-motion';
import { NextImage } from '@components/atoms';
import { TrashIcon } from '@radix-ui/react-icons';
import { FetchedTankData } from '@utils/index';
import { UserFish } from '@prisma/client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
	id: string;
	tank: FetchedTankData['tank'];
	plants: FetchedTankData['plants'];
}
interface CardProps<T> {
	data: T;
	idx: number;
	setState: Dispatch<SetStateAction<T>>;
	deleteToggle: () => void;
}
type DisplayLiveStockData = Pick<UserFish, 'id' | 'name' | 'image_url'>;

const LiveStockCard = <T extends DisplayLiveStockData>({
	data,
	idx,
	setState,
	deleteToggle,
}: CardProps<T>): JSX.Element => {
	return (
		<MotionHStack
			key={data.id}
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
			>
				<NextImage
					layout="fill"
					alt={data.name}
					src={
						data.image_url ??
						'https://images.unsplash.com/photo-1619611384968-e45fbd60bc5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
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
						<Heading>{data.name}</Heading>
					</Box>
				</Stack>
				<Box pos="absolute" rounded="15px" bottom="2" right="2">
					<TrashIcon
						color="red"
						width="30px"
						height="30px"
						onClick={() => {
							setState(data);
							deleteToggle();
						}}
					/>
				</Box>
			</Box>
		</MotionHStack>
	);
};

export function FishList({ id, tank, plants }: FishListProps) {
	const toast = useToast();
	const { data } = trpc.useQuery(['user.fish', { id }]);
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
