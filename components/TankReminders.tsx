import { motion } from 'framer-motion';
import {
	Box,
	BoxProps,
	Stack,
	StackProps,
	Stat,
	StatGroup,
	StatLabel,
	StatNumber,
	StatHelpText,
	StatArrow,
} from '@chakra-ui/react';

const MotionBox = motion<BoxProps>(Box);
const MotionStack = motion<StackProps>(Stack);

export default function Remainders() {
	return (
		<MotionStack textAlign="left" spacing={3} shouldWrapChildren>
			// todo: Replace with actual remainder stuff
			{[1, 2, 3, 4, 5].map((i, idx) => (
				<MotionBox
					bg="rgba(255,255,255,0.4)"
					rounded="15px"
					w="calc(100vw - 3rem)"
					mb="3"
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
				</MotionBox>
			))}
		</MotionStack>
	);
}
