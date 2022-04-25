import Card from '@components/Card';
import AddButton from '@components/AddButton';
import { Box, Heading, HStack } from '@chakra-ui/react';

export interface UserAquarium {
	id: number;
	name: string;
	imageUrl: string;
	description?: string;
}
export default function Home() {
	const aquariums: UserAquarium[] = [
		{
			id: 1,
			name: 'Aquarium 1',
			imageUrl:
				'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
		},
	];
	return (
		<Box w="full" h="100vh" p="6" bg="black">
			<AddButton />
			<HStack
				w="full"
				spacing={10}
				alignItems="start"
				overflowX="scroll"
				scrollSnapType="x mandatory"
				shouldWrapChildren
			>
				<Box id="homeContent">
					<Heading
						alignSelf="left"
						color="white"
						fontWeight="extrabold"
						fontSize="40"
						scrollSnapAlign="start"
					>
						Home
					</Heading>
					<Card
						imageUrl="https://images.unsplash.com/photo-1599492816933-2101fe60bc72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
						text="Overview"
						link="/overview"
					/>
					<Card
						imageUrl="https://images.unsplash.com/photo-1599492816933-2101fe60bc72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
						text="Tank Ideas"
						link="/ideas"
					/>
				</Box>
				<Box id="aquariumContent">
					<Heading
						alignSelf="left"
						color="white"
						fontWeight="extrabold"
						fontSize="40"
						scrollSnapAlign="start"
					>
						My Aquariums
					</Heading>
					{aquariums?.map(({ name, id }: UserAquarium) => (
						<Card
							key={id}
							imageUrl="https://images.unsplash.com/photo-1599492816933-2101fe60bc72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
							text={name}
							link={`/aquarium/${id}`}
						/>
					))}
				</Box>
				<Box id="liveStockContent">
					<Heading
						alignSelf="left"
						color="white"
						fontWeight="extrabold"
						fontSize="40"
						scrollSnapAlign="start"
					>
						Live Stock
					</Heading>
					<Card
						imageUrl="https://images.unsplash.com/photo-1599492816933-2101fe60bc72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
						text="Fish"
						link="/myfish"
					/>
					<Card
						imageUrl="https://images.unsplash.com/photo-1599492816933-2101fe60bc72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
						text="Plants"
						link="/myplants"
					/>
				</Box>
			</HStack>
		</Box>
	);
}
