import { Avatar, Box, SkeletonCircle, HStack, Stack, Text } from '@chakra-ui/react';
import NextLink from './NextLink';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

export const Header = ({ children }: { children: React.ReactNode }) => {
	const { data } = useSession();

	useEffect(() => {}, [data]);

	return (
		<Stack h="full" minH="100vh" w="100vw">
			<HStack
				pos="sticky"
				top="0"
				zIndex="99999"
				w="full"
				maxW="80rem"
				mx="auto"
				justify="space-between"
				backdropFilter="blur(10px)"
				p="1rem"
			>
				<NextLink href="/">
					<Text color="white" fontSize="3xl">
						Dorsal
					</Text>
				</NextLink>
				<Avatar size="md" src={data?.user?.image as string} />
			</HStack>
			<Box w="full" maxW="80rem" flexGrow={1}>
				{children}
			</Box>
		</Stack>
	);
};
