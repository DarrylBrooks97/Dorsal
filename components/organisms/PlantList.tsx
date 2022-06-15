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
} from '@chakra-ui/react';

export type FetchedPlantData = inferQueryResponse<'user.tanks.byId'>['plants'];
const MotionHStack = motion<StackProps>(HStack);

export function PlantList({ plants }: { plants: FetchedPlantData }) {
	const invalidate = trpc.useContext();
	const [filteredPlants, setFilteredPlants] = useState(plants);
	const { isOpen: deleteIsOpen, onToggle: deleteOnToggle } = useDisclosure();
	// const updater = trpc.useMutation(['user.deleteFish'], {
	// 	onMutate: async (deletedFish: any) => {
	// 		await invalidate.cancelQuery(['user.tanks.byId', { id: tank_id }]);

	// 		const freshFish = data?.fish.filter(
	// 			({ id }) => id !== deletedFish.id
	// 		);

	// 		invalidate.setQueryData(['user.tanks.byId', { id: tank_id }], {
	// 			tank: data?.tank as any,
	// 			fish: [...(freshFish as FetchedTankData['fish'])],
	// 			plants: [...(data?.plants as any)],
	// 		});

	// 		return {
	// 			id: deletedFish.id,
	// 			tank_id: deletedFish.tank_id,
	// 		};
	// 	},
	// 	onSettled(_newData, error, _variables, context: any) {
	// 		if (error) {
	// 			toast({
	// 				title: 'Error',
	// 				description: error.message,
	// 				status: 'error',
	// 				duration: 5000,
	// 				isClosable: true,
	// 			});
	// 		}
	// 		invalidate.invalidateQueries([
	// 			'user.tanks.byId',
	// 			{ id: context.tank_id },
	// 		]);
	// 	},
	// });

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
						<TrashIcon color="red" width="30px" height="30px" />
					</Box>
				</MotionHStack>
			))}
			{/* <Modal isOpen={deleteIsOpen} onClose={deleteOnToggle}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Delete Fish</ModalHeader>
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
			</Modal> */}
		</Stack>
	);
}
