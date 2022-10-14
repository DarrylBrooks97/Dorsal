import { trpc } from '@utils/trpc';
import { Loader } from '@components/atoms';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { UserFish } from '@prisma/client';
import { Reminder } from '@components/molecules/Reminders';
import { getReminders } from '@utils/index';
import { Stack, StackProps, Text, useToast } from '@chakra-ui/react';

const MotionStack = motion<StackProps>(Stack);

export function TankRemindersCard({ id }: { id: string }): JSX.Element {
	const toast = useToast();
	const invalidate = trpc.useContext();
	const { data, isLoading } = trpc.useQuery(['user.tanks.byId', { id }]);
	const [todayReminders, setTodayReminders] = useState<UserFish[] | undefined>(undefined);
	const [upcomingReminders, setUpcomingReminders] = useState<UserFish[] | undefined>(undefined);

	const updater = trpc.useMutation(['user.updateFish'], {
		onMutate: (updatedFish: any) => {
			invalidate.cancelQuery(['user.tanks.byId', { id }]);

			let freshReminder = data?.fish.find((v: UserFish) => v.fish_id === updatedFish.id);

			if (!freshReminder) return;

			freshReminder.next_update = updatedFish.next_update;

			invalidate.setQueryData(['user.tanks.byId', { id }], {
				tank: data?.tank as any,
				fish: [{ ...freshReminder, ...updatedFish }],
				plants: [...(data?.plants as any)],
			});

			return {
				updatedFish,
			};
		},
		onSettled: (_newData, error, _variables, _context: any) => {
			if (error) {
				toast({
					title: 'Error',
					description: error.message,
					status: 'error',
					duration: 5000,
					isClosable: true,
				});
				return;
			}

			invalidate.invalidateQueries(['user.tanks.byId', { id }]);
		},
	});

	useEffect(() => {
		const { today, upcoming } = getReminders(data?.fish);

		setTodayReminders(today);
		setUpcomingReminders(upcoming);
	}, [data]);

	const updateFish = (fish: UserFish, next_update?: Date) => {
		const newUpdate = new Date();
		newUpdate.setDate(next_update ? next_update.getDate() + 3 : newUpdate.getDate() + 3);

		updater.mutate({
			id: fish.id,
			next_update: newUpdate.toISOString(),
		});
	};

	if (isLoading || typeof id !== 'string') {
		return <Loader />;
	}

	return (
		<MotionStack textAlign="left" spacing={3} shouldWrapChildren>
			{data?.fish.length !== 0 ? (
				<Stack textAlign="center">
					{todayReminders && todayReminders?.length > 0 && (
						<Reminder title="Today" reminders={todayReminders as UserFish[]} update={updateFish} />
					)}
					{upcomingReminders && upcomingReminders.length > 0 && (
						<Reminder
							title="Upcoming"
							reminders={upcomingReminders as UserFish[]}
							update={updateFish}
						/>
					)}
				</Stack>
			) : (
				<Text color="white">You&apos;re up to date 🥳</Text>
			)}
		</MotionStack>
	);
}
