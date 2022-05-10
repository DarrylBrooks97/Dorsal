import { Button, HStack, Input, Stack } from '@chakra-ui/react';
import { trpc } from '@utils/trpc';
import { useState } from 'react';

export default function AddPlant() {
	const { data } = trpc.useQuery(['user.tanks']);
	const [search, setSearch] = useState('');

	return (
		<Stack w="full" h="100vh" p="6">
			<HStack pos="sticky" top={0} zIndex="99" w="full" p="0.75rem 0rem">
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
					></HStack>
				))}
			</Stack>
		</Stack>
	);
}
