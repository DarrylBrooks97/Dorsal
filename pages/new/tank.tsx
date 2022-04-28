import Image from 'next/image';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import { useSession } from 'next-auth/react';
import { Prisma, Tank } from '@prisma/client';
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
} from '@chakra-ui/react';

export default function NewTank() {
	const route = useRouter();
	const { data }: any = useSession();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);

		const tankData: Tank = {
			id:
				Math.random().toString(36).substring(2, 15) +
				Math.random().toString(36).substring(2, 15),
			user_id: data?.userInfo.id as string,
			type: formData.get('type') as string,
			name: formData.get('name') as string,
			alkalinity: new Prisma.Decimal(7),
			created_at: new Date(),
			updated_at: new Date(),
			hardness: new Prisma.Decimal(formData.get('hardness') as string),
			nirate: new Prisma.Decimal(formData.get('nirate') as string),
			pH: new Prisma.Decimal(formData.get('pH') as string),
		};

		const { newTank } = await (
			await fetch('/api/add/tank', {
				method: 'POST',
				body: JSON.stringify(tankData),
				headers: {
					'Content-Type': 'application/json',
				},
			})
		).json();

		route.push('/aquarium/[id]', `/aquarium/${newTank.id}`);
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
					<Image
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
							<Box>
								<FormLabel htmlFor="pH" color="white">
									pH
								</FormLabel>
								<NumberInput min={0} max={14}>
									<NumberInputField color="white" name="pH" />
								</NumberInput>
							</Box>
							<Box>
								<FormLabel htmlFor="nirate" color="white">
									Nirate
								</FormLabel>
								<NumberInput min={5} max={100}>
									<NumberInputField
										color="white"
										name="nirate"
									/>
								</NumberInput>
							</Box>
							<Box>
								<FormLabel htmlFor="hardness" color="white">
									Hardness
								</FormLabel>
								<NumberInput min={100} max={400}>
									<NumberInputField
										color="white"
										name="hardness"
									/>
								</NumberInput>
							</Box>
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
