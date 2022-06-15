import type { FetchedTankData } from '@utils/index';
import { motion } from 'framer-motion';
import { TankTabOptions } from '@constants';
import { FishList, PlantList } from '@components/organisms';
import { TankStatCard, TankRemindersCard } from '@components/organisms';
import { HStack, Text, Box, BoxProps, Center, Stack } from '@chakra-ui/react';
import { Tank } from '@prisma/client';

const tankCards = [TankStatCard, TankRemindersCard, FishList, PlantList];
const MotionBox = motion<BoxProps>(Box);

interface TankTabProps {
	id: string;
	editing: boolean;
	updatedTank: Partial<Tank>;
	setUpdatedTank: (tank: Partial<Tank>) => void;
	data: FetchedTankData;
	activeTab: number;
	setActiveTab: (activeTab: number) => void;
}

export function TankTabs({
	id,
	data,
	editing,
	updatedTank,
	setUpdatedTank,
	activeTab,
	setActiveTab,
}: TankTabProps): JSX.Element {
	return (
		<Stack spacing={3}>
			<HStack
				p="3"
				h="31px"
				w="full"
				pos="relative"
				spacing={3}
				shouldWrapChildren
			>
				{TankTabOptions.map((option, index) => (
					<Text
						as="h3"
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
								<Card
									{...{
										key: index,
										id: id as string,
										editing,
										updatedTank,
										setUpdatedTank,
										tank: data?.tank,
										fish: data?.fish,
										plants: data?.plants,
									}}
								/>
							) : null}
						</>
					))}
				</HStack>
			</Center>
		</Stack>
	);
}
