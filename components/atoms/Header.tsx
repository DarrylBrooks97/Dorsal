import { Avatar, Box, HStack, Stack, Text } from '@chakra-ui/react';
import React from 'react';

export const Header = ({ children }: { children: React.ReactNode }) => {
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
				<Text color="white" fontSize="3xl">
					Dorsal
				</Text>
				<Avatar
					size="md"
					src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
				/>
			</HStack>
			<Box w="full" maxW="80rem" flexGrow={1}>
				{children}
			</Box>
		</Stack>
	);
};
