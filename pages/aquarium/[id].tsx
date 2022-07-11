import Compressor from 'compressorjs';
import { NextImage } from '@components/atoms';
import { TankTabs } from '@components/molecules';
import { trpc } from '@utils/trpc';
import { useRouter } from 'next/router';
import { AiOutlineCamera } from 'react-icons/ai';
import { inferQueryResponse } from 'pages/api/trpc/[trpc]';
import { useEffect, useState } from 'react';
import { CheckIcon, Cross1Icon, Pencil1Icon } from '@radix-ui/react-icons';
import {
	Box,
	Heading,
	HStack,
	Input,
	InputGroup,
	InputRightElement,
	Skeleton,
	SkeletonText,
	Stack,
	useToast,
} from '@chakra-ui/react';

type FetchedTankData = inferQueryResponse<'user.tanks.byId'>;

export default function Aquarium(): JSX.Element {
	const toast = useToast();
	const invalidate = trpc.useContext();
	const { id } = useRouter().query;
	const { data, isLoading } = trpc.useQuery(['user.tanks.byId', { id: id as string }]);
	const [updatedTank, setUpdatedTank] = useState<any>();
	const [activeTab, setActiveTab] = useState(0);
	const [editing, setEditing] = useState(false);
	const [tankName, setTankName] = useState(data?.tank?.name ?? 'null');
	const [tankImage, setTankImage] = useState(
		data?.tank?.image ??
			'https://images.unsplash.com/photo-1619611384968-e45fbd60bc5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
	);
	const adder = trpc.useMutation(['user.updateTank'], {
		onMutate: async (updatedTank: any) => {
			await invalidate.cancelQuery(['user.tanks.byId', { id: id as string }]);

			type Tank = typeof data;

			const newTankData: Tank = {
				...data,
				fish: [...(data?.fish as any)],
				plants: [...(data?.plants as any)],
				tank: {
					...data?.tank,
					...updatedTank,
				},
			};

			invalidate.setQueryData(['user.tanks.byId', { id: id as string }], newTankData);

			setEditing(false);

			return {
				updatedTank,
			};
		},
		onSettled: async (_newData, error, _variables, context: any) => {
			if (error) {
				toast({
					title: 'Error',
					description: error.message,
					status: 'error',
					duration: 5000,
					isClosable: true,
				});
				setUpdatedTank(context?.updatedTank);
			}

			await invalidate.invalidateQueries(['user.tanks.byId', { id: id as string }]);

			setEditing(false);
			setUpdatedTank({ id });
		},
	});

	useEffect(() => {
		if (data?.tank) {
			setTankImage(data.tank.image);
			setTankName(data.tank.name);
			setUpdatedTank((prev: any) => ({ ...prev, id }));
		}
	}, [data, id]);

	const updateTank = async () => {
		if (!data?.tank?.name) {
			toast({
				title: 'Error',
				description: 'Error updating tank',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
			return;
		}

		if (data.tank.name !== tankName) updatedTank.name = tankName;
		if (data.tank.image !== tankImage) updatedTank.image = tankImage;

		adder.mutate(updatedTank);
	};

	return (
		<Box w="100vw" p="3" h="full">
			<Stack align="center" h="full" mt="6" spacing={6} shouldWrapChildren>
				<Skeleton
					h="274px"
					w="calc(100vw - 3rem)"
					rounded="15px"
					isLoaded={!isLoading}
					fadeDuration={4}
				>
					<Box
						w="calc(100vw - 3rem)"
						h="274px"
						pos="relative"
						overflow="hidden"
						borderRadius="15px"
					>
						<NextImage src={tankImage} layout="fill" alt="tank image" />
						{editing ? (
							<Box
								as="label"
								pos="absolute"
								top="50%"
								left="50%"
								transform="translate(-50%, -50%)"
								display="relative"
							>
								<Input
									type="file"
									accept="image/png,image/jpeg"
									display="none"
									onChange={(e: any) => {
										try {
											const file = e.target.files[0];

											if (file) {
												new Compressor(file, {
													quality: 0.2,
													success: async (result: any) => {
														const reader = new FileReader();
														reader.readAsDataURL(result);

														reader.onload = e => {
															const image: string = e.target?.result as string;
															setTankImage(image);
														};
													},
													error: (error: any) => {
														toast({
															title: 'Error',
															description: error.message,
															status: 'error',
															duration: 5000,
															isClosable: true,
														});
													},
												});
											} else {
												setEditing(false);
											}
										} catch (e) {
											console.log(e);
										}
									}}
								/>
								<AiOutlineCamera
									color="white"
									cursor="pointer"
									style={{
										position: 'absolute',
										top: '50%',
										left: '50%',
										transform: 'translate(-50%, -50%)',
										width: '40px',
										height: '40px',
									}}
								/>
							</Box>
						) : null}
					</Box>
				</Skeleton>
				<SkeletonText w="full" noOfLines={1} isLoaded={!isLoading} fadeDuration={1}>
					<HStack>
						{!editing ? (
							<>
								<Heading color="white">{data?.tank?.name}</Heading>
								<Pencil1Icon
									color="white"
									onClick={() => setEditing(true)}
									style={{
										alignSelf: 'center',
										width: '18px',
										height: '18px',
									}}
								/>
							</>
						) : (
							<InputGroup w="calc(100vw - 3rem)" variant="flushed">
								<Input
									color="white"
									textAlign="center"
									variant="flushed"
									placeholder={data?.tank?.name}
									onChange={e => setTankName(e.target.value)}
								/>
								<InputRightElement mr="10%" onClick={updateTank}>
									<CheckIcon
										color="green"
										style={{
											width: 30,
											height: 30,
										}}
									/>
								</InputRightElement>
								<InputRightElement
									onClick={() => {
										setTankName(data?.tank?.name as string);
										setTankImage(data?.tank?.image as string);
										setEditing(false);
									}}
								>
									<Cross1Icon
										color="red"
										style={{
											width: 20,
											height: 20,
										}}
									/>
								</InputRightElement>
							</InputGroup>
						)}
					</HStack>
				</SkeletonText>
				<SkeletonText isLoaded={!isLoading} noOfLines={5} fadeDuration={1} spacing="5">
					<TankTabs
						{...{
							id: id as string,
							data: data as FetchedTankData,
							editing,
							activeTab,
							setActiveTab,
							updatedTank,
							setUpdatedTank,
						}}
					/>
				</SkeletonText>
			</Stack>
		</Box>
	);
}
