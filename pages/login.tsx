import { getSession, signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { Button, Center, Heading, Stack } from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next';

export const getServerSideProps = async ({
	req,
	res,
}: GetServerSidePropsContext) => {
	const session = await getSession({ req });

	if (session) {
		return res.writeHead(302, {
			Location: '/home',
		});
	}

	return { props: {} };
};

export default function Login() {
	return (
		<Center w="100vw" h="100vh">
			<Stack
				justify="center"
				alignContent="center"
				w="300px"
				h="500px"
				bg="white"
				borderRadius="15px"
				p="6"
			>
				<Heading textAlign="center">Dorsal</Heading>
				<Button
					as="button"
					onClick={() => signIn('google')}
					leftIcon={<FcGoogle />}
				>
					Google
				</Button>
			</Stack>
		</Center>
	);
}
