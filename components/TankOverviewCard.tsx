import { FaWater } from 'react-icons/fa';
import { GiDoubleFish } from 'react-icons/gi';
import { RiPlantFill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { trpc } from '@utils/trpc';
import {
	Box,
	Stack,
	StackProps,
	Grid,
	GridItem,
	Text,
	Stat,
	StatGroup,
	StatLabel,
	StatNumber,
	StatHelpText,
	StatArrow,
} from '@chakra-ui/react';

const MotionStack = motion<StackProps>(Stack);

export default function TankOverviewCard({ id }: { id: string }) {
	const { data } = trpc.useQuery(['user.tanks.byId', { id: id as string }]);

	return (
		<MotionStack textAlign="left" spacing={3} shouldWrapChildren>
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
						<Text color="gray.400">{data?.tank?.type}</Text>
					</Stack>
				</GridItem>
				<GridItem>
					<Stack
						boxSize="full"
						rounded="12px "
						textAlign="center"
						align="center"
					>
						<GiDoubleFish color="white" />
						<Text color="white"># of fish</Text>
						<Text color="gray.400">{data?.fish.length}</Text>
					</Stack>
				</GridItem>
				<GridItem>
					<Stack
						boxSize="full"
						rounded="12px"
						textAlign="center"
						align="center"
					>
						<RiPlantFill color="white" />
						<Text color="white"># of plants</Text>
						<Text color="gray.400">{data?.plants.length}</Text>
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
						<StatNumber>
							{data?.tank?.pH as unknown as number}
						</StatNumber>
						<StatHelpText>
							<StatArrow type="increase" />
							0.0%
						</StatHelpText>
					</Stat>
					<Stat>
						<StatLabel>Nirate</StatLabel>
						<StatNumber>
							{data?.tank?.nirate as unknown as number}
						</StatNumber>
						<StatHelpText>
							<StatArrow type="decrease" />
							20.4%
						</StatHelpText>
					</Stat>
					<Stat>
						<StatLabel>Hardness</StatLabel>
						<StatNumber>
							{data?.tank?.hardness as unknown as number}
						</StatNumber>
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
		</MotionStack>
	);
}
