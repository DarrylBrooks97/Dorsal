import Image from 'next/image';
import { trpc } from '@utils/trpc';
import { Loader } from '@components/atoms';
import { motion } from 'framer-motion';
import { BsCalendar3 } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import { addDays, formatDistance } from 'date-fns';
import { FetchedTankData, getReminders } from '@utils/index';
import {
	Box,
	BoxProps,
	Stack,
	StackProps,
	HStack,
	Text,
	Button,
	Heading,
	useToast,
} from '@chakra-ui/react';

const MotionBox = motion<BoxProps>(Box);
const MotionStack = motion<StackProps>(Stack);

export function TankRemindersCard({ id }: { id: string }): JSX.Element {
	const toast = useToast();
	const invalidate = trpc.useContext();
	const [todayReminders, setTodayReminders] =
		useState<FetchedTankData['fish']>();
	const [upcomingReminders, setUpcomingReminders] =
		useState<FetchedTankData['fish']>();
	const { data, isLoading } = trpc.useQuery([
		'user.tanks.byId',
		{ id: id as string },
	]);

	const updater = trpc.useMutation(['user.updateFish'], {
		onMutate: (updatedFish: any) => {
			invalidate.cancelQuery(['user.tanks.byId', { id }]);

			let freshReminder = data?.fish.find(
				(v) => v.fish_id === updatedFish.id
			);

			if (!freshReminder) return;

			freshReminder.maintained_at = updatedFish.maintained_at;

			invalidate.setQueryData(['user.tanks.byId', { id }], {
				tank: data?.tank as any,
				fish: [
					...(data?.fish as any),
					{ ...freshReminder, ...updatedFish },
				],
				plants: [...(data?.plants as any)],
			});

			return {
				updatedFish,
			};
		},
		onSettled: (_newData, error, _variables, _context: any) => {
			if (error) {
				toast({
					title: 'Error',
					description: error.message,
					status: 'error',
					duration: 5000,
					isClosable: true,
				});
				return;
			}

			invalidate.invalidateQueries(['user.tanks.byId', { id }]);
		},
	});

	useEffect(() => {
		const { today, upcoming } = getReminders(data);

		setTodayReminders(today);
		setUpcomingReminders(upcoming);
	}, [data]);

	if (isLoading || typeof id !== 'string') {
		return <Loader />;
	}

	return (
		<MotionStack textAlign="left" spacing={3} shouldWrapChildren>
			{data?.fish.length !== 0 ? (
				<Stack textAlign="center">
					{todayReminders && todayReminders?.length !== 0 && (
						<Stack spacing={5}>
							<Heading color="white">Today</Heading>
							{todayReminders.map((fish, idx) => (
								<MotionBox
									key={idx}
									bg="rgba(255,255,255,0.4)"
									rounded="15px"
									w="calc(100vw - 3rem)"
									mb="3"
									overflow="hidden"
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
									<HStack h="200px" w="full">
										<Box
											w="50%"
											h="full"
											pos="relative"
											rounded="15px"
											overflow="hidden"
										>
											<Image
												src={
													fish.image_url ??
													'https://images.unsplash.com/photo-1628172730539-692b42b863de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80'
												}
												alt="cute fish"
												layout="fill"
												loading="lazy"
											/>
										</Box>
										<Stack
											p="1"
											h="full"
											textAlign="center"
											justify="space-between"
											shouldWrapChildren
										>
											<Text fontSize="xl" color="white">
												{fish.name}
											</Text>
											<Box>
												<HStack>
													<BsCalendar3 color="white" />
													<Text
														color="white"
														isTruncated
													>
														Feed 29 days adfasdf ago
														{formatDistance(
															addDays(
																new Date(
																	fish.maintained_at as unknown as string
																),
																0
															),
															new Date(),
															{ addSuffix: true }
														)}
													</Text>
												</HStack>
												<Button
													size="sm"
													colorScheme="green"
													onClick={() => {
														updater.mutate({
															id: fish.id,
															maintained_at:
																new Date().toISOString(),
														});
													}}
												>
													Complete
												</Button>
											</Box>
										</Stack>
									</HStack>
								</MotionBox>
							))}
						</Stack>
					)}
					{upcomingReminders && upcomingReminders?.length !== 0 && (
						<Stack>
							<Heading color="white">Upcoming</Heading>
							{upcomingReminders.map((fish, idx) => (
								<MotionBox
									key={idx}
									bg="rgba(255,255,255,0.4)"
									rounded="15px"
									w="calc(100vw - 3rem)"
									mb="3"
									overflow="hidden"
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
									<HStack h="200px" w="full">
										<Box
											w="50%"
											h="full"
											pos="relative"
											rounded="15px"
											overflow="hidden"
										>
											<Image
												src={
													fish.image_url ??
													'https://images.unsplash.com/photo-1628172730539-692b42b863de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80'
												}
												alt="cute fish"
												layout="fill"
												loading="lazy"
											/>
										</Box>
										<Stack
											p="1"
											h="full"
											textAlign="center"
											justify="space-between"
											shouldWrapChildren
										>
											<Text fontSize="xl" color="white">
												{fish.name}
											</Text>
											<Box>
												<HStack>
													<BsCalendar3 color="white" />
													<Text
														color="white"
														isTruncated
														flexWrap="wrap"
													>
														Feed in{' '}
														{formatDistance(
															addDays(
																new Date(
																	fish.maintained_at as unknown as string
																),
																3
															),
															new Date(),
															{ addSuffix: true }
														)}
													</Text>
												</HStack>
												<Button
													size="sm"
													colorScheme="green"
													onClick={() => {
														updater.mutate({
															id: fish.id,
															maintained_at:
																new Date().toISOString(),
														});
													}}
												>
													Complete
												</Button>
											</Box>
										</Stack>
									</HStack>
								</MotionBox>
							))}
						</Stack>
					)}
				</Stack>
			) : (
				<Text color="white">No Fish 🤷🏾 go add some fish!</Text>
			)}
		</MotionStack>
	);
}
