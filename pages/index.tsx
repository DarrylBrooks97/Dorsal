import { motion } from 'framer-motion';
import { Button, Center, Heading, keyframes, Stack, StackProps, Text } from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next';
import { getSession, signIn } from 'next-auth/react';

export const getServerSideProps = async ({ req, res }: GetServerSidePropsContext) => {
	const session = await getSession({ req });

	if (session) {
		res.writeHead(302, {
			Location: '/home',
		});
		res.end();
	}

	return { props: { status: 'not logged in' } };
};

const MotionStack = motion<StackProps>(Stack);
const slide = keyframes`
  0% { background-position: 0% 0;}
  100% { background-position: 100% 0;}
`;

export default function Home() {
	return (
		<Center w="full" h="calc(100vh - 6rem)" px="2" overflow="hidden">
			<MotionStack
				alignItems="center"
				textAlign="center"
				initial={{
					opacity: 0,
				}}
				animate={{
					opacity: 1,
					transition: {
						duration: 1,
						ease: 'easeInOut',
					},
				}}
			>
				<Heading
					color="white"
					pb="4"
					fontSize="72px"
					fontWeight="extrabold"
					bgGradient="linear-gradient(to-r, red, blue);"
					bgClip="text"
					animation={`${slide} 3s linear infinite`}
					backgroundSize="300% 100%"
				>
					Dorsal
				</Heading>
				<Stack spacing={2}>
					<Text color="white" fontWeight="600" fontSize="24px">
						Aquariums are complex
					</Text>
					<Text color="gray.400" fontWeight="500">
						Manage your aquariums from anywhere at your touch
					</Text>
				</Stack>
				<Button onClick={() => signIn('google')} colorScheme="green">
					Sign up
				</Button>
			</MotionStack>
		</Center>
	);
}
