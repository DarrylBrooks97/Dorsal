import Image from 'next/image';
import { Stack, Box, Heading, Text } from '@chakra-ui/react';

export const Card = (props: {
	inViewport: boolean;
	forwardedRef: any;
	heading: string;
	subHeading: string;
	children: React.ReactNode;
}) => {
	const { forwardedRef, children, heading, subHeading } = props;
	return (
		<Stack
			align="center"
			borderRadius="15"
			bg="rgba(255,255,255,0.1)"
			backdropFilter={`blur(10px)`}
			width="calc(100vw - 3rem)"
			height="70vh"
			scrollSnapAlign="start"
			overflow="hidden"
			ref={forwardedRef}
		>
			<Box bg="white" w="full" h="35%" pos="relative" overflow="hidden">
				<Image
					alt="overview"
					width="100%"
					height="100%"
					layout="fill"
					placeholder="blur"
					src="https://images.unsplash.com/photo-1512391806023-e43a4e65899f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
					blurDataURL="https://images.unsplash.com/photo-1512391806023-e43a4e65899f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
				/>
			</Box>
			<Heading fontSize="28px" color="white">
				{heading}
			</Heading>
			<Text color="gray.300" letterSpacing={1.1}>
				{subHeading}
			</Text>
			{children}
		</Stack>
	);
};
