import Image from 'next/image';
import { useState } from 'react';
import { trpc } from '@utils/trpc';
import { MdKeyboardArrowRight } from 'react-icons/md';
import {
	Box,
	Button,
	Center,
	Heading,
	HStack,
	Input,
	Stack,
	Text,
} from '@chakra-ui/react';

export default function AddPlant() {
	const { data } = trpc.useQuery(['user.tanks']);
	const [search, setSearch] = useState('');

	return (
		<Stack w="full" h="100vh" p="6">
			<HStack
				bg="rgba(0,0,0,0.8)"
				pos="sticky"
				top={0}
				zIndex="99"
				w="full"
				p="0.75rem 0rem"
			>
				<Input
					placeholder="Search Plants"
					color="white"
					onChange={(e) => setSearch(e.target.value)}
				/>
				<Button variant="solid" color="green">
					Filter
				</Button>
			</HStack>
			<Stack spacing={50}>
				{[0, 1, 2, 3, 4, 5, 6].map((i) => (
					<HStack
						key={i}
						rounded="15px"
						overflow="hidden"
						bg="rgba(238,235,211,0.4)"
						w="calc(100vw - 3rem)"
						h="100px"
						pos="relative"
					>
						<Image
							width="100%"
							height="100%"
							layout="fixed"
							src="https://images.unsplash.com/photo-1567331711402-509c12c41959?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80"
						/>
						<Stack
							h="full"
							w="calc(100vw - 3rem - 30%)"
							shouldWrapChildren
						>
							<Heading
								fontSize="24px"
								color="white"
								textAlign="center"
							>
								Bamboo
							</Heading>
							<Text color="gray.300" fontSize="sm">
								Type: Semi Aquatic
							</Text>
							<Text color="gray.300" fontSize="sm">
								Species: Poales
							</Text>
						</Stack>
						<Center
							as="button"
							pos="absolute"
							boxSize="30px"
							right="10px"
							bottom="50%"
							transform="translateY(50%)"
							color="white"
						>
							<MdKeyboardArrowRight color="white" />
						</Center>
					</HStack>
				))}
			</Stack>
		</Stack>
	);
}
