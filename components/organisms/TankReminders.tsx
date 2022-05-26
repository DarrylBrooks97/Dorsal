import Image from 'next/image';
import { trpc } from '@utils/trpc';
import { Loader } from '@components/atoms';
import { motion } from 'framer-motion';
import { BsCalendar3 } from 'react-icons/bs';
import { addDays, formatDistance } from 'date-fns';
import {
	Box,
	BoxProps,
	Stack,
	StackProps,
	HStack,
	Text,
} from '@chakra-ui/react';

const MotionBox = motion<BoxProps>(Box);
const MotionStack = motion<StackProps>(Stack);

export function TankRemindersCard({ id }: { id: string }): JSX.Element {
	const { data, isLoading } = trpc.useQuery([
		'user.tanks.byId',
		{ id: id as string },
	]);
	const getReminders = (fetchedData: typeof data) => {
		const fishFeeding = fetchedData?.fish.map((fish) => {
			return {
				id: fish.id,
				fish_id: fish.fish_id,
				maintained_at: fish.maintained_at as Date,
			};
		});

		const sortedFishFeeding = fishFeeding?.sort((a: any, b: any) => {
			return a.maintained_at - b.maintained_at;
		});

		return {
			reminders: sortedFishFeeding,
		};
	};
	const { reminders } = getReminders(data);

	if (isLoading || typeof id !== 'string') {
		return <Loader />;
	}

	// todo: Replace with actual remainder stuff
	return (
		<MotionStack textAlign="left" spacing={3} shouldWrapChildren>
			{data?.fish.length !== 0 ? (
				[1, 2, 3].map((i, idx) => (
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
								borderRadius="15px 0 0 15px"
							>
								<Image
									src="https://images.unsplash.com/photo-1628172730539-692b42b863de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80"
									alt="cute fish"
									layout="fill"
									loading="lazy"
								/>
							</Box>
							<Stack
								h="full"
								spacing={3}
								p="1"
								textAlign="center"
							>
								<Text fontSize="xl" color="white">
									Ares
								</Text>
								<HStack>
									<BsCalendar3 color="white" />
									<Text color="white" isTruncated>
										Feed{' '}
										{formatDistance(
											new Date(),
											addDays(
												new Date(
													data?.fish[0]
														.maintained_at as unknown as string
												),
												3
											),
											{ addSuffix: true }
										)}
									</Text>
								</HStack>
							</Stack>
						</HStack>
					</MotionBox>
				))
			) : (
				<Text color="white">No Reminders 🤷🏾</Text>
			)}
		</MotionStack>
	);
}
