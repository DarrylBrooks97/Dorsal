import { Box, HStack, Heading, VStack, Text, Input, ButtonGroup, Button } from '@chakra-ui/react';
import { NextImage } from '@components/atoms';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const Settings = () => {
	const { data } = useSession();

	useEffect(() => {}, [data]);

	if (!data) return;

	return (
		<VStack p="1rem">
			<HStack spacing={4} w="full">
				<Box rounded="full" boxSize="100px" overflow="hidden" pos="relative">
					<NextImage src={data?.user?.image as string} layout="fill" />
				</Box>
				<VStack spacing={4} w="full">
					<Heading fontSize="2xl" color="white">
						{data?.user?.name}
					</Heading>
					<Text color="white" isTruncated>
						Member since: June 2021
					</Text>
				</VStack>
			</HStack>
			<VStack spacing={3} w="full" textAlign="left">
				<Text color="gray.300">Phone number</Text>
				<Input variant="outline" color="white" type="tel" />
			</VStack>

			<ButtonGroup spacing={5}>
				<Button variant="solid" colorScheme="green">
					Save
				</Button>
				<Button variant="solid" colorScheme="red">
					Cancel
				</Button>
			</ButtonGroup>
		</VStack>
	);
};

export default Settings;
