import cuid from 'cuid';
import { NextImage } from '@components/atoms';
import { trpc } from '@utils/trpc';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import { useSession } from 'next-auth/react';
import {
	Box,
	Button,
	ButtonGroup,
	Center,
	FormControl,
	FormLabel,
	Input,
	NumberInput,
	NumberInputField,
	Select,
	Stack,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionIcon,
	AccordionPanel,
	Text,
	Tooltip,
} from '@chakra-ui/react';
import { InfoCircledIcon } from '@radix-ui/react-icons';

export default function NewTank() {
	const route = useRouter();
	const { data }: any = useSession();

	const addTank = trpc.useMutation(['user.addTank'], {
		onSuccess: () => {
			console.log('success');
		},
		onError: (error: any) => {
			console.error({ error });
		},
	});

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const tankcuid: string = cuid();

		console.log({ alkalinity: Number(formData.get('alkalinity')) });
		addTank.mutate({
			id: tankcuid,
			user_id: data?.userInfo.id as string,
			type: formData.get('type') as string,
			name: formData.get('name') as string,
			image: 'https://images.unsplash.com/photo-1617994679330-2883951d0073?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
		});

		route.push('/aquarium/[id]', `/aquarium/${tankcuid}`);
	};

	return (
		<Box w="100vw" h="100vh" p="6">
			<Stack p="3" shouldWrapChildren>
				<Center
					w="full"
					h="300px"
					overflow="hidden"
					borderRadius="10px"
				>
					<NextImage
						src="https://images.unsplash.com/photo-1617994679330-2883951d0073?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
						width="320px"
						height="300px"
						layout="intrinsic"
						alt="fishImage"
					/>
				</Center>
				<form onSubmit={handleSubmit}>
					<FormControl>
						<Stack spacing={6}>
							<Center w="full">
								<Input
									placeholder="Tank Name"
									name="name"
									variant="flushed"
									color="white"
									textAlign="center"
									w="80%"
								/>
							</Center>
							<Select
								placeholder="Select Type"
								variant="flushed"
								color="white"
								name="type"
							>
								<option value="Freshwater">Freshwater</option>
								<option value="Saltwater">Saltwater</option>
								<option value="Brackish">Brackish</option>
								<option value="Breeder">Breeder</option>
							</Select>
							<Accordion border="black" allowToggle>
								<AccordionItem>
									<AccordionButton>
										<Box flex="1" textAlign="center">
											<Text color="white">
												Know your tank&#39;s parameters?
											</Text>
										</Box>
										<AccordionIcon color="white" />
									</AccordionButton>
									<AccordionPanel
										pos="relative"
										overflowY="scroll"
									>
										<Box>
											<FormLabel
												htmlFor="pH"
												color="white"
												display="flex"
												flexDirection="row"
												alignItems="center"
											>
												<Text mr="2">pH</Text>
												<Tooltip
													label="Optimal pH will minimize the stress on the fish"
													placement="right"
												>
													<InfoCircledIcon color="white" />
												</Tooltip>
											</FormLabel>
											<NumberInput min={6} max={14}>
												<NumberInputField
													color="white"
													name="pH"
												/>
											</NumberInput>
										</Box>
										<Box>
											<FormLabel
												htmlFor="pH"
												color="white"
												display="flex"
												flexDirection="row"
												alignItems="center"
											>
												<Text mr="2">Ammonia</Text>
												<Tooltip
													label="Build up of fish waste that can be very harmful for the fish"
													placement="right"
												>
													<InfoCircledIcon color="white" />
												</Tooltip>
											</FormLabel>
											<NumberInput min={0} max={6}>
												<NumberInputField
													color="white"
													name="ammonia"
												/>
											</NumberInput>
										</Box>
										<Box>
											<FormLabel
												htmlFor="pH"
												color="white"
												display="flex"
												flexDirection="row"
												alignItems="center"
											>
												<Text mr="2">Nirate</Text>
												<Tooltip
													label="Byproduct of good bacteria eating nitrite"
													placement="right"
												>
													<InfoCircledIcon color="white" />
												</Tooltip>
											</FormLabel>
											<NumberInput min={0} max={300}>
												<NumberInputField
													color="white"
													name="nirate"
												/>
											</NumberInput>
										</Box>
										<Box>
											<FormLabel
												htmlFor="pH"
												color="white"
												display="flex"
												flexDirection="row"
												alignItems="center"
											>
												<Text mr="2">Nirite</Text>
												<Tooltip
													label="Byproduct of good bacteria eating ammonia"
													placement="right"
												>
													<InfoCircledIcon color="white" />
												</Tooltip>
											</FormLabel>
											<NumberInput min={0} max={100}>
												<NumberInputField
													color="white"
													name="nirite"
												/>
											</NumberInput>
										</Box>
										<Box>
											<FormLabel
												htmlFor="pH"
												color="white"
												display="flex"
												flexDirection="row"
												alignItems="center"
											>
												<Text mr="2">Hardness</Text>
												<Tooltip
													label="Hard water is ok for fish, soft water can make water pH low"
													placement="right"
												>
													<InfoCircledIcon color="white" />
												</Tooltip>
											</FormLabel>
											<NumberInput min={0} max={400}>
												<NumberInputField
													color="white"
													name="hardness"
												/>
											</NumberInput>
										</Box>
										<Box>
											<FormLabel
												htmlFor="pH"
												color="white"
												display="flex"
												flexDirection="row"
												alignItems="center"
											>
												<Text mr="2">Chlorine</Text>
												<Tooltip
													label="Any level is dangerous for fish"
													placement="right"
												>
													<InfoCircledIcon color="white" />
												</Tooltip>
											</FormLabel>
											<NumberInput min={0} max={20}>
												<NumberInputField
													color="white"
													name="chlorine"
												/>
											</NumberInput>
										</Box>
										<Box>
											<FormLabel
												htmlFor="pH"
												color="white"
												display="flex"
												flexDirection="row"
												alignItems="center"
											>
												<Text mr="2">Alkalinity</Text>
												<Tooltip
													hasArrow
													label="Alkalinity is a critical part of the nitrogen cycle & should be above 100 ppm"
													placement="right"
												>
													<InfoCircledIcon color="white" />
												</Tooltip>
											</FormLabel>
											<NumberInput min={100} max={400}>
												<NumberInputField
													color="white"
													name="alkalinity"
												/>
											</NumberInput>
										</Box>
									</AccordionPanel>
								</AccordionItem>
							</Accordion>
							<ButtonGroup justifyContent="center" spacing="6">
								<Button type="submit" colorScheme="green">
									Add Tank
								</Button>
								<Button
									colorScheme="red"
									variant="outline"
									onClick={() => route.push('/home')}
								>
									Cancel
								</Button>
							</ButtonGroup>
						</Stack>
					</FormControl>
				</form>
			</Stack>
		</Box>
	);
}
