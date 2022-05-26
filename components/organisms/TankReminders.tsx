import Image from 'next/image';
import { trpc } from '@utils/trpc';
import { Loader } from '@components/atoms';
import { motion } from 'framer-motion';
import { getReminders } from '@utils/index';
import { BsCalendar3 } from 'react-icons/bs';
import { addDays, formatDistance } from 'date-fns';
import {
	Box,
	BoxProps,
	Stack,
	StackProps,
	HStack,
	Text,
	Button,
	Heading,
} from '@chakra-ui/react';

const MotionBox = motion<BoxProps>(Box);
const MotionStack = motion<StackProps>(Stack);

export function TankRemindersCard({ id }: { id: string }): JSX.Element {
	const { data, isLoading } = trpc.useQuery([
		'user.tanks.byId',
		{ id: id as string },
	]);

	if (isLoading || typeof id !== 'string') {
		return <Loader />;
	}

	const {
		reminders: { today, upcoming },
	} = getReminders(data);

	return (
		<MotionStack textAlign="left" spacing={3} shouldWrapChildren>
			{data?.fish.length !== 0 ? (
				<Stack textAlign="center">
					{today && today?.length !== 0 && (
						<>
							<Heading color="white">Today</Heading>
							{today.map((reminder, idx) => {
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
													reminder.image_url ??
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
												{reminder.name}
											</Text>
											<Box>
												<HStack>
													<BsCalendar3 color="white" />
													<Text
														color="white"
														isTruncated
													>
														Feed today
													</Text>
												</HStack>
												<Button
													size="sm"
													colorScheme="green"
													onClick={() => {}}
												>
													Complete
												</Button>
											</Box>
										</Stack>
									</HStack>
								</MotionBox>;
							})}
						</>
					)}
					{upcoming && upcoming?.length !== 0 && (
						<Stack>
							<Heading color="white">Upcoming</Heading>
							{upcoming.map((reminder, idx) => (
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
													reminder.image_url ??
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
												{reminder.name}
											</Text>
											<Box>
												<HStack>
													<BsCalendar3 color="white" />
													<Text
														color="white"
														isTruncated
													>
														Feed in{' '}
														{formatDistance(
															addDays(
																new Date(
																	reminder.maintained_at as unknown as string
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
													onClick={() => {}}
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
