import Image from 'next/image';
import Spinner from '@components/Spinner';
import TankRemindersCard from '@components/TankReminders';
import TankOverviewCard from '@components/TankOverviewCard';
import { trpc } from '@utils/trpc';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Pencil1Icon } from '@radix-ui/react-icons';
import {
	Box,
	BoxProps,
	Center,
	Heading,
	HStack,
	Stack,
	Text,
} from '@chakra-ui/react';

const MotionBox = motion<BoxProps>(Box);

const TankOptions: { label: string }[] = [
	{
		label: 'Overview',
	},
	{
		label: 'Reminders',
	},
	{
		label: 'Fish',
	},
	{
		label: 'Plants',
	},
];

const tankCards = [
	TankOverviewCard,
	TankRemindersCard,
	TankRemindersCard,
	TankRemindersCard,
];

export default function Aquarium() {
	const [activeTab, setActiveTab] = useState(0);
	const { id } = useRouter().query;
	const { data } = trpc.useQuery(['user.tanks.byId', { id: id as string }]);

	return (
		<Box w="100vw" h="full">
			{data ? (
				<Stack
					align="center"
					h="full"
					w="100vw"
					mt="6"
					spacing={6}
					shouldWrapChildren
				>
					<Box
						w="378px"
						h="274px"
						pos="relative"
						overflow="hidden"
						borderRadius="15px"
					>
						<Image
							src="https://images.unsplash.com/photo-1619611384968-e45fbd60bc5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
							layout="fill"
							alt="tank image"
						/>
					</Box>
					<HStack>
						<Heading
							color="white"
							onClick={() => console.log('editing...')}
						>
							{data.tank?.name}
						</Heading>
						<Pencil1Icon
							color="white"
							style={{
								alignSelf: 'center',
								width: '18px',
								height: '18px',
							}}
						/>
					</HStack>
					<HStack
						p="3"
						h="31px"
						w="full"
						pos="relative"
						spacing={3}
						shouldWrapChildren
					>
						{TankOptions.map((option, index) => (
							<Text
								key={index}
								fontSize="20px"
								color="white"
								pos="relative"
								onClick={() => setActiveTab(index)}
							>
								{option.label}
								{index === activeTab ? (
									<MotionBox
										pos="absolute"
										bottom="-1px"
										left="0"
										right="0"
										h="1px"
										w=""
										bg="white"
										layoutId="active-tab"
									/>
								) : null}
							</Text>
						))}
					</HStack>
					<Center h="full" w="calc(100vw - 3rem)">
						<HStack overflowX="scroll" spacing={6}>
							{tankCards.map((Card, index) => (
								<>
									{index === activeTab ? (
										<Card key={index} />
									) : null}
								</>
							))}
						</HStack>
					</Center>
				</Stack>
			) : (
				<Center w="100vw" h="100vh">
					<Spinner />
				</Center>
			)}
		</Box>
	);
}
