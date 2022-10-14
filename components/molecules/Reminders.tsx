import { Box, Stack, Heading, Text, HStack, Button, BoxProps } from '@chakra-ui/react';
import { NextImage } from '@components/atoms';
import { UserFish } from '@prisma/client';
import { formatDistance, addDays } from 'date-fns';
import { motion } from 'framer-motion';
import { BsCalendar3 } from 'react-icons/bs';

const MotionBox = motion<BoxProps>(Box);

export const Reminder = ({
	reminders,
	update,
	title,
}: {
	reminders: UserFish[];
	title: string;
	update: (...args: any) => void;
}) => (
	<Stack spacing={5}>
		<Heading color="white">{title}</Heading>
		{reminders.map((fish, idx) => (
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
					<Box w="50%" h="full" pos="relative" rounded="15px" overflow="hidden">
						<NextImage
							src={
								fish.image_url ??
								'https://images.unsplash.com/photo-1628172730539-692b42b863de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80'
							}
							alt="cute fish"
							layout="fill"
							loading="lazy"
						/>
					</Box>
					<Stack p="1" h="full" textAlign="center" justify="space-between" shouldWrapChildren>
						<Text fontSize="xl" color="white">
							{fish.name}
						</Text>
						<Box>
							<HStack>
								<BsCalendar3 color="white" />
								<Text color="white" isTruncated>
									{formatDistance(addDays(fish.next_update as Date, 0), new Date(), {
										addSuffix: true,
									})}
								</Text>
							</HStack>
							<Button
								size="sm"
								colorScheme="green"
								onClick={() => update(fish as UserFish, undefined)}
							>
								Complete
							</Button>
						</Box>
					</Stack>
				</HStack>
			</MotionBox>
		))}
	</Stack>
);
