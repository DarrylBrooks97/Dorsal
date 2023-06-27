import { Box, Text, HStack, Stack, Center } from '@chakra-ui/react';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { NextImage } from './atoms';

export const UpcomingNotifications = () => {
	// TODO: Get upcoming notifications

	return (
		<HStack
			spacing={8}
			overflow="scroll"
			css={{
				'::-webkit-scrollbar': {
					display: 'none',
				},
			}}
		>
			<Stack spacing={2} textAlign="center">
				<Box px="100px" py="80px" overflow="hidden" position="relative" bg="blue.200" rounded="2xl">
					<NextImage
						src="https://images.unsplash.com/photo-1535591273668-578e31182c4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
						layout="fill"
					/>
				</Box>
				<Text color="white" fontSize="md">
					Feed Beta
				</Text>
			</Stack>
			<Stack spacing={2} textAlign="center">
				<Box px="100px" py="80px" overflow="hidden" position="relative" bg="blue.200" rounded="2xl">
					<NextImage
						src="https://images.unsplash.com/photo-1535591273668-578e31182c4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
						layout="fill"
					/>
				</Box>
				<Text color="white" fontSize="md">
					Clean Tank
				</Text>
			</Stack>
			<Stack px="4">
				<Center rounded="full" bg="white" boxSize="10">
					<ArrowRightIcon color="black" />
				</Center>
				<Text fontSize="sm" color="white">
					See more
				</Text>
			</Stack>
		</HStack>
	);
};
