import { useRouter } from 'next/router';
import Image from 'next/image';
import {
	Box,
	Button,
	ButtonGroup,
	Center,
	FormControl,
	FormLabel,
	HStack,
	Input,
	NumberInput,
	NumberInputField,
	Select,
	Stack,
} from '@chakra-ui/react';

export default function NewFish() {
	const route = useRouter();
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
				<FormControl>
					<Stack spacing={6}>
						<Center w="full">
							<Input
								placeholder="Tank Name"
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
								<NumberInputField color="white" />
							</NumberInput>
						</Box>
						<Box>
							<FormLabel htmlFor="nirate" color="white">
								Nirate
							</FormLabel>
							<NumberInput min={5} max={100}>
								<NumberInputField color="white" />
							</NumberInput>
						</Box>
						<Box>
							<FormLabel htmlFor="hardness" color="white">
								Hardness
							</FormLabel>
							<NumberInput min={100} max={400}>
								<NumberInputField color="white" />
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
			</Stack>
		</Box>
	);
}
