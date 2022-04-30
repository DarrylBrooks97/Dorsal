import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function Aquarium() {
	const { id } = useRouter().query;
	return (
		<Box w="100vw" h="full">
			Aquarium {id}
		</Box>
	);
}
