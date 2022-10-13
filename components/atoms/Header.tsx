import NextLink from './NextLink';
import { useState } from 'react';
import { Menu } from '@components/atoms/Menu';
import { ReactNode } from 'react';
import { Avatar, Box, Button, HStack, Stack, Text } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';

export const Header = ({ image, children }: { image?: string; children: ReactNode }) => {
	const [isOpen, setIsOpen] = useState(false);
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
				{image ? (
					<Avatar size="md" src={image as string} onClick={() => setIsOpen(prev => !prev)} />
				) : (
					<Button onClick={() => signIn('google')} variant="outline" color="white">
						Login
					</Button>
				)}
				<Menu isOpen={isOpen} setIsOpen={setIsOpen} />
			</HStack>
			<Box w="full" maxW="80rem" p="2">
				{children}
			</Box>
		</Stack>
	);
};
