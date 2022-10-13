import AddButton from '@components/AddButton';
import { Text, Stack } from '@chakra-ui/react';
import { UpcomingNotifications } from '@components/UpcomingNotifications';
import { ListOfTanks } from '@components/ListOfTanks';

export default function Home() {
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
