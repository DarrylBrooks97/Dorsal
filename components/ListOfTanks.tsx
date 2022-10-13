import { ArrowRightIcon } from '@radix-ui/react-icons';
import { trpc } from '@utils/trpc';
import { useMemo } from 'react';
import { NextImage } from './atoms';
import { Box, Text, HStack, Center, Stack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import NextLink from './atoms/NextLink';

export const ListOfTanks = () => {
	const { data: sessionData } = useSession() as any;
	const { data } = trpc.useQuery(['user.tanks', { id: sessionData?.userInfo?.id }]);
	const tanks = useMemo(() => {
		return data?.tanks.filter((_tank: any, index: number) => index < 3);
	}, [data]);

	return (
		<HStack
			spacing={8}
			overflow="scroll"
			css={{
				'::-webkit-scrollbar': {
					display: 'none',
				},
			}}
		>
			{tanks?.map((tank: any) => (
				<NextLink href={`/aquarium/${tank.id}`} key={tank.id}>
					<Stack spacing={2} textAlign="center" key={tank?.id}>
						<Box
							px="100px"
							py="80px"
							overflow="hidden"
							position="relative"
							bg="blue.200"
							rounded="2xl"
						>
							<NextImage src={tank?.image ?? ''} layout="fill" />
						</Box>
						<Text color="white" fontSize="md">
							{tank?.name}
						</Text>
					</Stack>
				</NextLink>
			))}
			<Stack px="4">
				<Center rounded="full" bg="white" boxSize="10">
					<ArrowRightIcon color="black" />
				</Center>
				<Text fontSize="sm" color="white">
					See more
				</Text>
			</Stack>
		</HStack>
	);
};
