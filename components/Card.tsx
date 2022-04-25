import { Box, Text } from '@chakra-ui/react';
import { Link } from '@chakra-ui/react';

export interface CardProps {
	text: string;
	imageUrl: string;
	link: string;
}
export default function Card({ imageUrl, text, link }: CardProps) {
	return (
		<Link href={link}>
			<Box
				w="calc(100vw - 3rem)"
				h="250px"
				border="1px solid white"
				borderRadius="15px"
				bgSize="cover"
				scrollSnapAlign="start"
				bgGradient={`linear-gradient(135deg, rgba(250,250,250,1) 0%, rgba(250,250,250,0) 50%), url('${imageUrl}')`}
			/>
			<Text
				color="white"
				fontSize="24px"
				fontWeight="semibold"
				textAlign="center"
			>
				{text}
			</Text>
		</Link>
	);
}
