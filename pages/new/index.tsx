import { Stack, VStack, Text, Heading, Center } from '@chakra-ui/react';
import Link from 'next/link';
import { FaFish } from 'react-icons/fa';
import { GiChemicalTank } from 'react-icons/gi';
import { RiPlantFill } from 'react-icons/ri';

export default function New(): JSX.Element {
	return (
		<Center w="100vw" p="3">
			<Stack spacing={8} flexDirection="column" w="80%">
				<Link href="/new/aquarium">
					<VStack spacing={4} minH="200px" bgColor="gray.800" rounded="15px" overflow="hidden">
						<Stack
							h="100px"
							w="full"
							bgColor="purple.600"
							justifyContent="center"
							alignItems="center"
						>
							<GiChemicalTank
								fill="white"
								style={{
									width: '40px',
									height: '40px',
								}}
							/>
						</Stack>
						<VStack justifyContent="center">
							<Heading color="white" fontSize="3xl">
								Aquarium
							</Heading>
							<Text color="gray.300">Add a new Aquarium</Text>
						</VStack>
					</VStack>
				</Link>
				<Link href="/new/fish">
					<VStack spacing={4} minH="200px" bgColor="gray.800" rounded="15px" overflow="hidden">
						<Stack
							h="100px"
							w="full"
							bgColor="blue.400"
							justifyContent="center"
							alignItems="center"
						>
							<FaFish
								fill="white"
								style={{
									width: '40px',
									height: '40px',
								}}
							/>
						</Stack>
						<VStack justifyContent="center">
							<Heading color="gray.300" fontSize="3xl">
								Fish
							</Heading>
							<Text color="white">Add a new Fish to your Aquarium</Text>
						</VStack>
					</VStack>
				</Link>
				<Link href="/new/plant">
					<VStack spacing={4} minH="200px" bgColor="gray.800" rounded="15px" overflow="hidden">
						<Stack
							h="100px"
							w="full"
							bgColor="green.600"
							justifyContent="center"
							alignItems="center"
						>
							<RiPlantFill
								fill="white"
								style={{
									width: '40px',
									height: '40px',
								}}
							/>
						</Stack>
						<VStack justifyContent="center">
							<Heading color="white" fontSize="3xl">
								Plant
							</Heading>
							<Text color="gray.300">Add a new Plant to your Aquarium</Text>
						</VStack>
					</VStack>
				</Link>
			</Stack>
		</Center>
	);
}
