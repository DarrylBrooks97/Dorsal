import Link from 'next/link';
import { Box, Center, Heading, Stack, Text } from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';

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

export default function Home() {
	return (
		<Box w="100vw" h="100vh" bg="black" p="6">
			<Stack
				w="full"
				pt={{ base: '80px', md: '20px' }}
				textAlign="center"
			>
				<Heading fontSize="72px" fontWeight="medium" color="white">
					Dorsal
				</Heading>
				<Text fontSize="24px" fontWeight="bold" color="white">
					Owning fish is complex
				</Text>
				<Text fontSize="16px" fontWeight="medium" color="white">
					Learn from a community of experts at a click
				</Text>
			</Stack>
			<Center mt="10">
				<Link href="/login">
					<Center
						bgColor="green"
						color="white"
						width="141px"
						height="50px"
						borderRadius="13px"
					>
						<Text fontSize="16px">Get Started</Text>
					</Center>
				</Link>
			</Center>
		</Box>
	);
}
