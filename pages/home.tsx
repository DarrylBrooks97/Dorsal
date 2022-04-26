import Card from '@components/Card';
import AddButton from '@components/AddButton';
import { Tank } from '@prisma/client';
import { Box, Heading, HStack } from '@chakra-ui/react';
import { userHooks } from 'hooks/userHooks';

export default function Home() {
	const { getUser } = userHooks();
	const aquariums = getUser<Tank[]>('/api/user/aquariums');

	return (
		<Box w="full" h="full" p="6" bg="black">
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
					{aquariums?.map(({ name, id }: Tank) => (
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
