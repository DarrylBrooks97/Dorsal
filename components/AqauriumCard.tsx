import { Box, Center, Grid, GridItem, Text } from '@chakra-ui/react';
import { Link } from '@chakra-ui/react';
import { Tank } from '@prisma/client';
import { userHooks } from 'hooks/userHooks';
import { Card } from '@components/Card';
import handleViewport from 'react-in-viewport';

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
	const { getUser } = userHooks();
	const aquariums = getUser<Tank[]>('/api/user/aquariums');

	return (
		<Card
			inViewport={props.inViewport}
			forwardedRef={props.forwardedRef}
			heading={props.heading}
			subHeading={props.subHeading}
		>
			<Grid templateColumns="repeat(3,1fr)" gap={6}>
				{aquariums?.map(({ id, name }: Tank, idx) => (
					<GridItem key={id} w="full">
						<Link href={`/aquariums/${id}`}>
							<Box
								boxSize="100px"
								border="1px solid white"
								borderRadius="15px"
								bgSize="cover"
								scrollSnapAlign="start"
								bgGradient={`linear-gradient(135deg, rgba(250,250,250,1) 0%, rgba(250,250,250,0) 50%), url('https://images.unsplash.com/photo-1599492816933-2101fe60bc72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')`}
							/>
							<Text
								color="white"
								fontSize="24px"
								fontWeight="semibold"
								textAlign="center"
							>
								{name}
							</Text>
						</Link>
					</GridItem>
				))}
			</Grid>
		</Card>
	);
}
