import Image from 'next/image';
import Error from 'next/error';
import Spinner from '@components/Spinner';
import Compressor from 'compressorjs';
import TankRemindersCard from '@components/TankReminders';
import TankOverviewCard from '@components/TankOverviewCard';
import { trpc } from '@utils/trpc';
import { AiOutlineCamera } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { CheckIcon, Cross1Icon, Pencil1Icon } from '@radix-ui/react-icons';
import {
	Box,
	BoxProps,
	Center,
	Heading,
	HStack,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	Text,
} from '@chakra-ui/react';

const MotionBox = motion<BoxProps>(Box);

const TankOptions: { label: string }[] = [
	{
		label: 'Overview',
	},
	{
		label: 'Reminders',
	},
	{
		label: 'Fish',
	},
	{
		label: 'Plants',
	},
];

const tankCards = [
	TankOverviewCard,
	TankRemindersCard,
	TankRemindersCard,
	TankRemindersCard,
];

export default function Aquarium() {
	const invalidate = trpc.useContext();
	const adder = trpc.useMutation(['user.updateTank'], {
		onSuccess: () => {
			invalidate.invalidateQueries(['user.tanks.byId']);
		},
		onError: (error: any) => {
			console.error({ error });
		},
	});
	const [activeTab, setActiveTab] = useState(0);
	const [editing, setEditing] = useState(false);
	const [tankName, setTankName] = useState('');
	const [tankImage, setTankImage] = useState(
		'https://images.unsplash.com/photo-1619611384968-e45fbd60bc5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
	);
	const { id } = useRouter().query;
	const { data } = trpc.useQuery(['user.tanks.byId', { id: id as string }]);

	if (typeof id !== 'string') return;

	const updateTank = async () => {
		if (tankName.length === 0 || data?.tank?.name === tankName) {
			setEditing(false);
			return;
		}

		adder.mutate(
			{ id, name: tankName, image: tankImage },
			{
				onSuccess: () => {
					setEditing(false);
					console.log('success');
				},
				onError: (error: any) => {
					throw new Error(error);
				},
			}
		);
	};

	return (
		<Box w="100vw" p="3" h="full">
			{data?.tank ? (
				<Stack
					align="center"
					h="full"
					mt="6"
					spacing={6}
					shouldWrapChildren
				>
					<Box
						w="calc(100vw - 3rem)"
						h="274px"
						pos="relative"
						overflow="hidden"
						borderRadius="15px"
					>
						<Image src={tankImage} layout="fill" alt="tank image" />
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
													success: async (
														result: any
													) => {
														const reader =
															new FileReader();
														reader.readAsDataURL(
															result
														);

														reader.onload = (e) => {
															const image: string =
																e.target
																	?.result as string;
															console.log(
																image.length
															);
															setTankImage(image);
															// adder.mutate(
															// 	{
															// 		id,
															// 		image,
															// 	},
															// 	{
															// 		onError: (
															// 			error: any
															// 		) => {
															// 			throw new Error(
															// 				error
															// 			);
															// 		},
															// 	}
															// );
														};
													},
													error: (error: any) => {
														console.log(error);
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
					<HStack>
						{!editing ? (
							<>
								<Heading color="white">
									{data.tank?.name}
								</Heading>
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
							<InputGroup
								w="calc(100vw - 3rem)"
								variant="flushed"
							>
								<Input
									color="white"
									textAlign="center"
									variant="flushed"
									placeholder={data.tank?.name}
									value={tankName}
									onChange={(e) =>
										setTankName(e.target.value)
									}
								/>
								<InputRightElement mr="19" onClick={updateTank}>
									<CheckIcon
										color="green"
										style={{
											width: 30,
											height: 30,
										}}
									/>
								</InputRightElement>
								<InputRightElement
									onClick={() => setEditing(false)}
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
					<HStack
						p="3"
						h="31px"
						w="full"
						pos="relative"
						spacing={3}
						shouldWrapChildren
					>
						{TankOptions.map((option, index) => (
							<Text
								key={index}
								fontSize="20px"
								color="white"
								pos="relative"
								onClick={() => setActiveTab(index)}
							>
								{option.label}
								{index === activeTab ? (
									<MotionBox
										pos="absolute"
										bottom="-1px"
										left="0"
										right="0"
										h="1px"
										w=""
										bg="white"
										layoutId="active-tab"
									/>
								) : null}
							</Text>
						))}
					</HStack>
					<Center h="full" w="calc(100vw - 3rem)">
						<HStack overflowX="scroll" spacing={6}>
							{tankCards.map((Card, index) => (
								<>
									{index === activeTab ? (
										<Card key={index} id={id} />
									) : null}
								</>
							))}
						</HStack>
					</Center>
				</Stack>
			) : (
				<Center w="100vw" h="100vh">
					<Spinner />
				</Center>
			)}
		</Box>
	);
}
