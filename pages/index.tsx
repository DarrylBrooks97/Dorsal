import Link from 'next/link';
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
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import {
	GitHubLogoIcon,
	InstagramLogoIcon,
	TwitterLogoIcon,
} from '@radix-ui/react-icons';

export const getServerSideProps = async ({
	req,
	res,
}: GetServerSidePropsContext) => {
	const session = await getSession({ req });

	if (session) {
		res.writeHead(302, {
			Location: '/home',
		});
		res.end();
	}

	return { props: { status: 'not logged in' } };
};
const JoinInput = () => {
	return (
		<HStack
			pos="relative"
			bg="rgba(217,217,217,0.5)"
			backdropFilter={'blur(10px)'}
			rounded="26px"
			h="50px"
			p="2"
			w="full"
		>
			<Input
				placeholder="Email"
				type="email"
				color="gray.200"
				variant="unstyled"
				rounded="26px"
			/>
			<Button pos="absolute" right="5px" rounded="26px">
				Join
			</Button>
		</HStack>
	);
};
export default function Home() {
	return (
		<Center w="100vw" h="100vh" overflow="hidden" p="3">
			<Stack
				w="calc(100vw - 3rem)"
				alignItems="center"
				textAlign="center"
			>
				<Heading color="white" fontSize="72px">
					Dorsal
				</Heading>
				<Stack h="88px" w="294px" spacing={2}>
					<Text color="white" fontWeight="600" fontSize="24px">
						Aquariums are complex
					</Text>
					<Text color="gray.400" fontWeight="500">
						Mollit magna sint incididunt exercitation sint do anim
						magna{' '}
					</Text>
				</Stack>
				<JoinInput />
				<HStack>
					<TwitterLogoIcon
						color="white"
						style={{ width: '30px', height: '30px' }}
					/>
					<GitHubLogoIcon
						color="white"
						style={{ width: '30px', height: '30px' }}
					/>
					<InstagramLogoIcon
						color="white"
						style={{ width: '30px', height: '30px' }}
					/>
				</HStack>
			</Stack>
		</Center>
	);
}
