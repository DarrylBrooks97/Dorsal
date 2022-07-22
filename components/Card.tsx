import { NextImage } from '@components/atoms';
import { Stack, Box, Heading, Text } from '@chakra-ui/react';

export const Card = (props: {
	inViewport: boolean;
	forwardedRef: any;
	heading: string;
	subHeading: string;
	image: string;
	children: React.ReactNode;
}) => {
	const { forwardedRef, heading, subHeading, image, children } = props;
	return (
		<Stack
			align="center"
			borderRadius="15"
			bg="rgba(255,255,255,0.1)"
			backdropFilter="blur(10px)"
			width="calc(100vw - 3rem)"
			height="70vh"
			scrollSnapAlign="start"
			overflow="hidden"
			ref={forwardedRef}
		>
			<Box bg="white" w="full" h="35%" pos="relative" overflow="hidden">
				<NextImage alt="random image" layout="fill" width="100%" height="100%" src={image} />
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
