import AquariumCard from '@components/AqauriumCard';
import AddButton from '@components/AddButton';
import handleViewport from 'react-in-viewport';
import { Card } from '@components/Card';
import { headerOptions } from '@constants';
import { Box, Text, HStack, Stack } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';

const CardViewportBlock = handleViewport(Card, {
	threshold: 1,
});

const componentCards: JSX.Element[] = [
	CardViewportBlock,
	AquariumCard,
	CardViewportBlock,
	CardViewportBlock,
];

export const getServerSideProps = async ({
	req,
	res,
}: GetServerSidePropsContext) => {
	const session = await getSession({ req });

	if (!session) {
		res.writeHead(302, {
			Location: '/login',
		});
		res.end();
	}

	return { props: { status: null } };
};

export default function Home() {
	const cardRef = useRef<HTMLDivElement>(null);
	const [pos, setPos] = useState(0);
	const [navClicked, setNavClicked] = useState(false);

	useEffect(() => {
		cardRef?.current?.scrollTo({
			// @ts-ignore
			left: cardRef.current.children[pos].offsetLeft,
			behavior: 'smooth',
		});
	}, [pos]);

	return (
		<Stack w="full" h="100vh" p="6" spacing={5} shouldWrapChildren>
			<AddButton />
			<Stack w="full" mb="3">
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
							key={idx}
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
							key={idx}
						/>
					))}
				</HStack>
			</Stack>
			<HStack
				ref={cardRef}
				overflow="scroll"
				spacing={50}
				alignItems="start"
				scrollSnapType="x mandatory"
				shouldWrapChildren
				css={{
					'::-webkit-scrollbar': {
						display: 'none',
					},
				}}
			>
				{componentCards.map((Card, idx) => (
					// @ts-ignore
					<Card
						onEnterViewport={() => {
							if (pos === idx) setNavClicked(false);
							setPos(navClicked ? pos : idx);
						}}
						key={idx}
						heading={headerOptions[idx].name}
						subHeading={headerOptions[idx].subHeading}
					/>
				))}
			</HStack>
		</Stack>
	);
}
