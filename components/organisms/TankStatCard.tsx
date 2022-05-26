import { trpc } from '@utils/trpc';
import { Tank } from '@prisma/client';
import { motion } from 'framer-motion';
import { FaWater } from 'react-icons/fa';
import { StatView } from '../StatView';
import { RiPlantFill } from 'react-icons/ri';
import { GiDoubleFish } from 'react-icons/gi';
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
	Progress,
	HStack,
} from '@chakra-ui/react';

const MotionStack = motion<StackProps>(Stack);

const hasANullStat = (tank: Tank): boolean => {
	return Object.values(tank).some((value) => value === null);
};

export function TankStatCard({
	id,
	editing,
	updatedTank,
	setUpdatedTank,
}: {
	id: string;
	editing: boolean;
	updatedTank: Partial<Tank>;
	setUpdatedTank: (tank: Partial<Tank>) => void;
}): JSX.Element {
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
						<Text color="gray.400">{data?.fish?.length}</Text>
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
						<Text color="gray.400">{data?.plants?.length}</Text>
					</Stack>
				</GridItem>
			</Grid>
			{data?.tank && (
				<>
					<Grid templateColumns="repeat(2, 1fr)" gap={3}>
						<GridItem>
							<Stack>
								<HStack>
									<Text color="white">pH</Text>
									<StatView
										{...{
											editing,
											tankKey: 'pH',
											tank: data?.tank,
											defaultValue: 7,
											min: 6,
											max: 14,
											step: 0.1,
											precision: 1,
											updatedTank,
											setUpdatedTank,
										}}
									/>
								</HStack>
								<Progress
									size="md"
									rounded="15px"
									colorScheme={
										(data.tank.pH as any) < 8.4 &&
										(data.tank.pH as any) > 6.2
											? 'green'
											: 'red'
									}
									value={((data.tank.pH as any) / 14) * 100}
									isIndeterminate={editing}
								/>
							</Stack>
						</GridItem>
						<GridItem>
							<Stack>
								<HStack>
									<Text color="white">Ammonia</Text>
									<StatView
										{...{
											editing,
											tankKey: 'ammonia',
											tank: data?.tank,
											defaultValue: 3,
											min: 0,
											max: 6,
											step: 1,
											updatedTank,
											setUpdatedTank,
										}}
									/>
								</HStack>
								<Progress
									size="md"
									rounded="15px"
									colorScheme={
										(data.tank.ammonia as any) < 0.25
											? 'green'
											: 'red'
									}
									value={
										((data.tank.ammonia as any) / 6) * 100
									}
									isIndeterminate={editing}
								/>
							</Stack>
						</GridItem>
						<GridItem>
							<Stack>
								<HStack>
									<Text color="white">Nirate</Text>
									<StatView
										{...{
											editing,
											tankKey: 'nirate',
											tank: data?.tank,
											defaultValue: 150,
											min: 0,
											max: 300,
											step: 1,
											updatedTank,
											setUpdatedTank,
										}}
									/>
								</HStack>
								<Progress
									size="md"
									rounded="15px"
									colorScheme={
										(data.tank.nirate as any) < 20
											? 'green'
											: 'red'
									}
									value={
										((data.tank.nirate as any) / 300) * 100
									}
									isIndeterminate={editing}
								/>
							</Stack>
						</GridItem>
						<GridItem>
							<Stack>
								<HStack>
									<Text color="white">Nirite</Text>
									<StatView
										{...{
											editing,
											tankKey: 'nirite',
											tank: data?.tank,
											defaultValue: 50,
											min: 0,
											max: 100,
											step: 1,
											updatedTank,
											setUpdatedTank,
										}}
									/>
								</HStack>
								<Progress
									size="md"
									rounded="15px"
									colorScheme={
										(data.tank.nirite as any) < 0.5
											? 'green'
											: 'red'
									}
									value={
										((data.tank.nirite as any) / 100) * 100
									}
									isIndeterminate={editing}
								/>
							</Stack>
						</GridItem>
						<GridItem>
							<Stack>
								<HStack>
									<Text color="white">Hardness</Text>
									<StatView
										{...{
											editing,
											tankKey: 'hardness',
											tank: data?.tank,
											defaultValue: 200,
											min: 0,
											max: 400,
											step: 1,
											updatedTank,
											setUpdatedTank,
										}}
									/>
								</HStack>
								<Progress
									size="md"
									rounded="15px"
									colorScheme={
										(data.tank.hardness as any) < 150 &&
										(data.tank.hardness as any) > 25
											? 'green'
											: 'red'
									}
									value={
										((data.tank.hardness as any) / 400) *
										100
									}
									isIndeterminate={editing}
								/>
							</Stack>
						</GridItem>
						<GridItem>
							<Stack>
								<HStack>
									<Text color="white">Chlorine</Text>
									<StatView
										{...{
											editing,
											tankKey: 'chlorine',
											tank: data?.tank,
											defaultValue: 10,
											min: 0,
											max: 20,
											step: 1,
											updatedTank,
											setUpdatedTank,
										}}
									/>
								</HStack>
								<Progress
									size="md"
									rounded="15px"
									colorScheme={
										(data.tank.chlorine as any) < 0.5
											? 'green'
											: 'red'
									}
									value={
										((data.tank.chlorine as any) / 20) * 100
									}
									isIndeterminate={editing}
								/>
							</Stack>
						</GridItem>
						<GridItem>
							<Stack>
								<HStack>
									<Text color="white">Alkalinity</Text>
									<StatView
										{...{
											editing,
											tankKey: 'alkalinity',
											tank: data?.tank,
											defaultValue: 200,
											min: 0,
											max: 400,
											step: 1,
											updatedTank,
											setUpdatedTank,
										}}
									/>
								</HStack>
								<Progress
									size="md"
									rounded="15px"
									colorScheme={
										(data.tank.alkalinity as any) < 300 &&
										(data.tank.alkalinity as any) > 120
											? 'green'
											: 'red'
									}
									value={
										((data.tank.alkalinity as any) / 400) *
										100
									}
									isIndeterminate={editing}
								/>
							</Stack>
						</GridItem>
					</Grid>
				</>
			)}
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
