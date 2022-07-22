import Spinner from './Spinner';
import NextLink from './atoms/NextLink';
import handleViewport from 'react-in-viewport';
import { Tank } from '@prisma/client';
import { Card } from '@components/Card';
import { trpc } from '@utils/trpc';
import { BsArrowRight } from 'react-icons/bs';
import { Box, Center, Grid, GridItem, HStack, Stack, Text } from '@chakra-ui/react';
import { NextImage } from './atoms';

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
	image: string;
	children: React.ReactNode;
}) {
	const { data } = trpc.useQuery(['user.tanks']);
	const displayedAquariums = data?.tanks.filter((tank: Tank, index) => {
		return index < 4;
	});

	return (
		<Card
			inViewport={props.inViewport}
			forwardedRef={props.forwardedRef}
			heading={props.heading}
			subHeading={props.subHeading}
			image={props.image}
		>
			{data ? (
				<Stack w="full">
					<Grid templateColumns="repeat(2, 1fr)" templateRows="repeat(2, 1fr)" gap={5} p="3">
						{displayedAquariums?.map(({ id, name, image }: Tank) => (
							<NextLink key={id} href={`/aquarium/${id}`}>
								<GridItem display="flex" w="full" flexDir="column" textAlign="center">
									<Box w="full" h="100px" pos="relative" overflow="hidden" rounded="md">
										<NextImage src={image} layout="fill" />
									</Box>
									<Text color="white">{name}</Text>
								</GridItem>
							</NextLink>
						))}
					</Grid>
					{data.tanks.length > 4 && (
						<NextLink href="/aquarium">
							<HStack float="right" p="3">
								<Text color="white" fontSize="lg" fontWeight="semibold" textAlign="center">
									See others
								</Text>
								<BsArrowRight size="24px" color="white" />
							</HStack>
						</NextLink>
					)}
				</Stack>
			) : (
				<Center>
					<Spinner />
				</Center>
			)}
		</Card>
	);
}
