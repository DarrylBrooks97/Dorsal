import Image from 'next/image';
import Spinner from '@components/Spinner';
import { trpc } from '@utils/trpc';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Pencil1Icon } from '@radix-ui/react-icons';
import {
	Box,
	BoxProps,
	Center,
	Grid,
	GridItem,
	Heading,
	HStack,
	Stack,
	Stat,
	StatArrow,
	StatGroup,
	StatHelpText,
	StatLabel,
	StatNumber,
	Text,
} from '@chakra-ui/react';
import { FaWater } from 'react-icons/fa';

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
					w="full"
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
					<HStack w="full" shouldWrapChildren>
						<Stack textAlign="left" spacing={3} shouldWrapChildren>
							<Grid templateColumns="repeat(3, 1fr)">
								<GridItem>
									<Stack
										textAlign="center"
										align="center"
										boxSize="full"
										rounded="12px"
									>
										<FaWater color="white" />
										<Text color="white">Type</Text>
										<Text color="gray.400">Freshwater</Text>
									</Stack>
								</GridItem>
								<GridItem>
									<Stack
										boxSize="full"
										rounded="12px "
										textAlign="center"
										align="center"
									>
										<FaWater color="white" />
										<Text color="white">Type</Text>
										<Text color="gray.400">Freshwater</Text>
									</Stack>
								</GridItem>
								<GridItem>
									<Stack
										boxSize="full"
										rounded="12px"
										textAlign="center"
										align="center"
									>
										<FaWater color="white" />
										<Text color="white">Type</Text>
										<Text color="gray.400">Freshwater</Text>
									</Stack>
								</GridItem>
							</Grid>
							<Text color="white" fontSize="18px">
								Stats
							</Text>
							<Box
								bg="rgba(255,255,255,0.4)"
								rounded="15px"
								w="calc(100vw - 3rem)"
								mb="3"
							>
								<StatGroup flexDir="row" textAlign="center">
									<Stat>
										<StatLabel flexDir="row">pH</StatLabel>
										<StatNumber>7.0</StatNumber>
										<StatHelpText>
											<StatArrow type="increase" />
											0.0%
										</StatHelpText>
									</Stat>
									<Stat>
										<StatLabel>Nirate</StatLabel>
										<StatNumber>50</StatNumber>
										<StatHelpText>
											<StatArrow type="decrease" />
											20.4%
										</StatHelpText>
									</Stat>
									<Stat>
										<StatLabel>Hardness</StatLabel>
										<StatNumber>150</StatNumber>
										<StatHelpText>
											<StatArrow type="increase" />
											5.3%
										</StatHelpText>
									</Stat>
								</StatGroup>
							</Box>
							<Text fontSize="18px" color="white">
								Suggestions
							</Text>
							<Box
								bg="rgba(255,255,255,0.4)"
								rounded="15px"
								w="calc(100vw - 3rem)"
								mb="3"
							>
								<StatGroup flexDir="row" textAlign="center">
									<Stat>
										<StatLabel flexDir="row">pH</StatLabel>
										<StatNumber>7.0</StatNumber>
										<StatHelpText>
											<StatArrow type="increase" />
											0.0%
										</StatHelpText>
									</Stat>
									<Stat>
										<StatLabel>Nirate</StatLabel>
										<StatNumber>50</StatNumber>
										<StatHelpText>
											<StatArrow type="decrease" />
											20.4%
										</StatHelpText>
									</Stat>
									<Stat>
										<StatLabel>Hardness</StatLabel>
										<StatNumber>150</StatNumber>
										<StatHelpText>
											<StatArrow type="increase" />
											5.3%
										</StatHelpText>
									</Stat>
								</StatGroup>
							</Box>
						</Stack>
					</HStack>
				</Stack>
			) : (
				<Center w="100vw" h="100vh">
					<Spinner />
				</Center>
			)}
		</Box>
	);
}
