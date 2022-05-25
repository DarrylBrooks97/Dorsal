import Spinner from '@components/Spinner';
import { Center } from '@chakra-ui/react';

export default function Loader() {
	return (
		<Center w="100vw" h="100vh">
			<Spinner />
		</Center>
	);
}
