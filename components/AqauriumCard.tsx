import Link from 'next/link';
import Spinner from './Spinner';
import handleViewport from 'react-in-viewport';
import { Tank } from '@prisma/client';
import { Card } from '@components/Card';
import { trpc } from '@utils/trpc';
import { BsArrowRight } from 'react-icons/bs';
import { Box, Center, HStack, Stack, Text } from '@chakra-ui/react';

export interface CardProps {
	text?: string;
	imageUrl?: string;
	link?: string;
}
const AquariumCardViewport = handleViewport(AquariumCard, {
	threshold: 1,
});

export default AquariumCardViewport;

function AquariumCard(props: {
	inViewport: boolean;
	forwardedRef: any;
	heading: string;
	subHeading: string;
	children: React.ReactNode;
}) {
	const { data } = trpc.useQuery(['user.tanks']);

	return (
		<Card
			inViewport={props.inViewport}
			forwardedRef={props.forwardedRef}
			heading={props.heading}
			subHeading={props.subHeading}
		>
			{data ? (
				<Stack w="full">
					{data.tanks.map(({ id, name }: Tank) => (
						<Link key={id} href={`/aquarium/${id}`} passHref>
							<HStack
								w="full"
								justify="center"
								spacing="10"
								shouldWrapChildren
							>
								<Box>
									<Text
										color="white"
										fontSize="24px"
										fontWeight="semibold"
										textAlign="center"
										isTruncated
									>
										{name}
									</Text>
								</Box>
								<Box boxSize="full" rounded="full">
									<BsArrowRight
										color="white"
										width={30}
										height={30}
									/>
								</Box>
							</HStack>
						</Link>
					))}
				</Stack>
			) : (
				<Center>
					<Spinner />
				</Center>
			)}
		</Card>
	);
}
