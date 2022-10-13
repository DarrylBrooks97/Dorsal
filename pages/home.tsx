import AddButton from '@components/AddButton';
import { Text, Stack } from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { UpcomingNotifications } from '@components/UpcomingNotifications';
import { ListOfTanks } from '@components/ListOfTanks';
import { SessionData } from '@utils/types';

export const getServerSideProps = async ({ req, res }: GetServerSidePropsContext) => {
	const session = (await getSession({ req })) as SessionData;
	if (!session) {
		res.writeHead(302, {
			Location: '/',
		});
		res.end();
	}

	return { props: { id: session.userInfo.id } };
};

export interface HomeProps {
	id: string;
}

export default function Home({ id }: HomeProps) {
	return (
		<Stack w="full" h="full" p="3" spacing={5} shouldWrapChildren>
			<AddButton />
			<Stack spacing={3}>
				<Stack>
					<Text color="white" fontSize="3xl" fontWeight="bold">
						Upcoming
					</Text>
					<UpcomingNotifications />
				</Stack>
				<Stack spacing={3}>
					<Text color="white" fontSize="3xl" fontWeight="bold">
						Tanks
					</Text>
					<ListOfTanks />
				</Stack>
			</Stack>
		</Stack>
	);
}
