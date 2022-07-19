import { Stack, VStack, Text, Heading, Center } from '@chakra-ui/react';
import Link from 'next/link';
import { GiChemicalTank } from 'react-icons/gi';

export default function New(): JSX.Element {
	return (
		<Center w="100vw" p="3">
			<Stack spacing={8} flexDirection="column" w="full">
				<Link href="/new/tank">
					<VStack spacing={8} p="10px" rounded="150px" overflow="hidden">
						<Stack w="full" bgColor="blue.400" justifyContent="center" alignItems="center">
							<GiChemicalTank />
							<Stack bgColor="gray.800" w="full" textAlign="center">
								<Heading color="white">Tank</Heading>
							</Stack>
						</Stack>
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
		</Center>
	);
}
