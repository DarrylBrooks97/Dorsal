import Spinner from '@components/Spinner';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { trpc } from '@utils/trpc';
import { Box, Center, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Aquarium() {
	const { id } = useRouter().query;
	const { data } = trpc.useQuery(['user.tanks.byId', { id: id! as string }]);

	return (
		<Box w="100vw" h="full" p="">
			{data ? (
				<Stack align="center" spacing={6} shouldWrapChildren>
					<Box
						w="378px"
						h="274"
						pos="relative"
						borderRadius="15px"
						overflow="hidden"
					>
						<Image
							src="https://images.unsplash.com/photo-1619611384968-e45fbd60bc5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
							layout="fill"
							alt="tank image"
						/>
					</Box>
					<HStack>
						<Heading
							color="white"
							onClick={() => console.log('editing...')}
						>
							{data.tank?.name}
						</Heading>
						<Pencil1Icon
							color="white"
							style={{
								alignSelf: 'center',
								width: '18px',
								height: '18px',
							}}
						/>
					</HStack>
					<HStack
						pos="relative"
						w="full"
						h="31px"
						bg="#414141"
						borderRadius="15px"
						p="3"
						shouldWrapChildren
					>
						<Text color="white" fontSize="20px">
							Tank Health
						</Text>
						<Text color="white" fontSize="20px">
							Reminders
						</Text>
						<Text color="white" fontSize="20px">
							Fish
						</Text>
						<Text color="white" fontSize="20px">
							Plants
						</Text>
					</HStack>
				</Stack>
			) : (
				<Center w="100vw" h="100vh">
					<Spinner />
				</Center>
			)}
		</Box>
	);
}
