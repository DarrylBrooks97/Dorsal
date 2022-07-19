import { Box, Stack, VStack, Text, Heading, Center } from '@chakra-ui/react';
import Link from 'next/link';

export default function New(): JSX.Element {
	return (
		<Box w="full" h="full">
			<Stack spacing={8} flexDirection="column">
				<Link href="/new/tank">
					<VStack spacing={8}>
						<Heading color="white">Tank</Heading>
					</VStack>
				</Link>
				<Link href="/new/fish">
					<VStack spacing={8}>
						<Heading color="white">Fish</Heading>
					</VStack>
				</Link>
				<Link href="/new/plant">
					<VStack spacing={8}>
						<Heading color="white">Plant</Heading>
					</VStack>
				</Link>
			</Stack>
		</Box>
	);
}
