import { Text, VStack } from '@chakra-ui/react';
import NextLink from './NextLink';

interface OptionType {
	text: string;
	to: string;
	icon: string;
	colorScheme: string;
}
const Options: OptionType[] = [
	{
		text: 'Home',
		to: '/',
		icon: 'home',
		colorScheme: 'blue',
	},
	{
		text: 'New',
		to: '/new',
		icon: 'aquarium',
		colorScheme: 'blue',
	},
	{
		text: 'Settings',
		to: '/settings',
		icon: 'gear',
		colorScheme: 'blue',
	},
	{
		text: 'Logout',
		to: '/api/auth/logout',
		icon: 'leave',
		colorScheme: 'red',
	},
];

export const Menu = ({
	isOpen,
	setIsOpen,
}: {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	return (
		<VStack
			bg="rgba(0, 0, 0, 0.7)"
			px="7"
			backdropFilter="blur(10px)"
			display={isOpen ? 'flex' : 'none'}
			pos="absolute"
			top={20}
			right={10}
			onClick={() => setIsOpen(prev => !prev)}
		>
			{Options.map(({ text, to, icon, colorScheme }: OptionType) => (
				<NextLink key={text} href={to}>
					<Text color="#FFF">{text}</Text>
				</NextLink>
			))}
		</VStack>
	);
};
