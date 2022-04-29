// import Card from '@components/Card';
import AddButton from '@components/AddButton';
import { Tank } from '@prisma/client';
import { userHooks } from 'hooks/userHooks';
import { Box, Text, HStack, Stack, Center, Heading } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { headerOptions } from '@/constants';
import Image from 'next/image';
import handleViewport from 'react-in-viewport';

const TempComponent = (props: { inViewport: boolean; forwardedRef: any }) => {
	const { inViewport, forwardedRef } = props;
	return (
		<Center
			w="calc(100vw - 3rem)"
			h="50vh"
			bg={inViewport ? 'red' : 'white'}
			transition="all 4s"
			scrollSnapAlign="start"
			ref={forwardedRef}
		>
			Hello
		</Center>
	);
};

const ViewportBlock = handleViewport(TempComponent, {
	threshold: 1,
});

const componentCards: JSX.Element[] = [
	ViewportBlock,
	ViewportBlock,
	ViewportBlock,
	ViewportBlock,
];

export default function Home() {
	// const { getUser } = userHooks();
	const cardRef = useRef<HTMLDivElement>(null);
	const [pos, setPos] = useState(0);
	const [navClicked, setNavClicked] = useState(false);
	// const aquariums = getUser<Tank[]>('/api/user/aquariums');

	useEffect(() => {
		cardRef?.current?.scrollTo({
			// @ts-ignore
			left: cardRef.current.children[pos].offsetLeft,
			behavior: 'smooth',
		});
	}, [pos]);

	return (
		<Box w="full" h="full" p="6" bg="black">
			<AddButton />
			<Stack w="full" h="full" mb="3">
				<HStack
					spacing="4"
					w="full"
					overflow="scroll"
					shouldWrapChildren
					css={{
						'::-webkit-scrollbar': {
							display: 'none',
						},
					}}
				>
					{headerOptions.map((option, idx) => (
						<Text
							fontSize="xl"
							color={pos === idx ? 'white' : 'gray.500'}
							transition=".3s ease-in-out"
							onClick={() => {
								setNavClicked(true);
								setPos(idx);
							}}
						>
							{option.name}
						</Text>
					))}
				</HStack>
				<HStack
					w="full"
					spacing={2}
					justify="center"
					shouldWrapChildren
				>
					{headerOptions.map((options, idx) => (
						<Box
							rounded="full"
							boxSize={2}
							transition=".2s ease-in-out"
							bg={pos === idx ? 'white' : 'gray.500'}
						/>
					))}
				</HStack>
			</Stack>
			<Center bg="white" w="full" h="full">
				<HStack
					ref={cardRef}
					overflow="scroll"
					spacing={2}
					alignItems="start"
					overflowX="scroll"
					scrollSnapType="x mandatory"
					shouldWrapChildren
				>
					{componentCards.map((Card, idx) => (
						// @ts-ignore
						<Card
							onEnterViewport={() => {
								console.log({ navClicked });
								if (pos === idx) setNavClicked(false);
								setPos(navClicked ? pos : idx);
							}}
						/>
					))}
					{/* <Stack
					justify="center"
					align="center"
					borderRadius="15"
					bg="rgba(255,255,255,0.1)"
					backdropFilter={`blur(10px)`}
					width="calc(100vw - 3rem)"
					height="full"
				>
					<Image
						alt="overview"
						width="100%"
						height="100%"
						placeholder="blur"
						src="https://images.unsplash.com/photo-1512391806023-e43a4e65899f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
						blurDataURL="https://images.unsplash.com/photo-1512391806023-e43a4e65899f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
					/>
					<Heading color="gray.300">Overview</Heading>
				</Stack> */}
				</HStack>
			</Center>
			{/* <HStack
				w="full"
				spacing={2}
				alignItems="start"
				overflowX="scroll"
				scrollSnapType="x mandatory"
				shouldWrapChildren
			>
				<Box id="homeContent">
					<Text
						alignSelf="left"
						color="white"
						fontWeight="extrabold"
						fontSize="40"
						scrollSnapAlign="start"
					>
						Home
					</Text>
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
					<Text
						alignSelf="left"
						color="white"
						fontWeight="extrabold"
						fontSize="40"
						scrollSnapAlign="start"
					>
						My Aquariums
					</Text>
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
					<Text
						alignSelf="left"
						color="white"
						fontWeight="extrabold"
						fontSize="40"
						scrollSnapAlign="start"
					>
						Live Stock
					</Text>
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
			</HStack> */}
		</Box>
	);
}
