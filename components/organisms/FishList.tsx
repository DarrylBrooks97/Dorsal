import Image from 'next/image';
import { trpc } from '@utils/trpc';
import { TrashIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FetchedTankData } from '@utils/index';
import {
	Box,
	Heading,
	HStack,
	Input,
	Stack,
	StackProps,
	Text,
	useToast,
} from '@chakra-ui/react';

const MotionHStack = motion<StackProps>(HStack);
interface FishListProps {
	tank_id: string;
}

export function FishList({ tank_id }: FishListProps) {
	const toast = useToast();
	const { data } = trpc.useQuery(['user.tanks.byId', { id: tank_id }]);
	const [filteredFish, setFilteredFish] = useState(data?.fish);
	const invalidate = trpc.useContext();
	const updater = trpc.useMutation(['user.deleteFish'], {
		onMutate: async (deletedFish: any) => {
			await invalidate.cancelQuery(['user.tanks.byId', { id: tank_id }]);

			const freshFish = data?.fish.filter(
				({ id }) => id !== deletedFish.id
			);

			invalidate.setQueryData(
				['user.tanks.byId', { id: deletedFish.tank_id }],
				{
					tank: data?.tank as any,
					fish: [...(freshFish as FetchedTankData['fish'])],
					plants: [...(data?.plants as any)],
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
	return (
		<Stack spacing={3} w="calc(100vw - 3rem)">
			<Input
				placeholder="Search Plants"
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
				<MotionHStack
					key={f.id}
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
						<Image
							layout="fill"
							alt={f.name}
							src={
								f.image_url ??
								'https://images.unsplash.com/photo-1619611384968-e45fbd60bc5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
							}
						/>
					</Box>
					<Stack spacing={3} textAlign="center" w="full" h="full">
						<Heading color="white" textAlign="center">
							{f.name}
						</Heading>
						<Text color="gray.400">{f.species}</Text>
						<Box
							pos="absolute"
							rounded="15px"
							bottom="5"
							right="5"
							onClick={() => {
								updater.mutate({
									id: f.id,
								});
							}}
						>
							<TrashIcon color="red" width="30px" height="30px" />
						</Box>
					</Stack>
				</MotionHStack>
			))}
		</Stack>
	);
}
