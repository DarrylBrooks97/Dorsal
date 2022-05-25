import { TankTabOptions } from '@constants';
import { motion } from 'framer-motion';
import { HStack, Text, Box, BoxProps } from '@chakra-ui/react';

const MotionBox = motion<BoxProps>(Box);

interface TankTabProps {
	activeTab: number;
	setActiveTab: (activeTab: number) => void;
}

export function TankTabs({
	activeTab,
	setActiveTab,
}: TankTabProps): JSX.Element {
	return (
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
	);
}
