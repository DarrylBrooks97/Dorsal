import NextLink from './NextLink';
import { useState } from 'react';
import { Menu } from '@components/atoms/Menu';
import React, { useEffect } from 'react';
import { Avatar, Box, HStack, Stack, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';

export const Header = ({ children }: { children: React.ReactNode }) => {
	const { data } = useSession();
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {}, [data]);

	return (
		<Stack h="full" minH="100vh">
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
				{data?.user ? (
					<Avatar
						size="md"
						src={data.user.image as string}
						onClick={() => setIsOpen(prev => !prev)}
					/>
				) : (
					<></>
				)}
				<Menu isOpen={isOpen} setIsOpen={setIsOpen} />
			</HStack>
			<Box w="full" maxW="80rem" p="2" flexGrow={2}>
				{children}
			</Box>
		</Stack>
	);
};
