import { FaFish } from 'react-icons/fa';
import { RiPlantFill } from 'react-icons/ri';
import { GiChemicalTank } from 'react-icons/gi';
import { PlusIcon } from '@radix-ui/react-icons';
import { Center } from '@chakra-ui/react';
import { useState } from 'react';
import Link from 'next/link';

export default function AddButton() {
	const [isClicked, setIsClicked] = useState<boolean>(false);

	return (
		<Center
			boxSize="50px"
			position="fixed"
			zIndex="99"
			bottom="30px"
			right="20px"
			rounded="full"
			transition="all .5s"
			bg="white"
			onClick={() => setIsClicked(!isClicked)}
		>
			<Center
				position="absolute"
				boxSize={50}
				bg="white"
				zIndex={1}
				rounded="full"
				transition="all .5s"
				transform={isClicked ? 'rotate(45deg)' : 'roatate(0deg)'}
			>
				<PlusIcon height={30} />
			</Center>
			<Link href="/new/fish">
				<Center
					position="absolute"
					boxSize={50}
					bg="white"
					zIndex={-99}
					rounded="full"
					transition="all .3s"
					top={isClicked ? '-80px' : '0px'}
				>
					<FaFish />
				</Center>
			</Link>
			<Link href="/new/plant">
				<Center
					position="absolute"
					zIndex={-99}
					boxSize={50}
					bg="white"
					rounded="full"
					transition="all .3s"
					top={isClicked ? '-60px' : '0px'}
					left={isClicked ? '-60px' : '0px'}
				>
					<RiPlantFill />
				</Center>
			</Link>
			<Link href="/new/tank">
				<Center
					position="absolute"
					boxSize={50}
					rounded="full"
					bg="white"
					zIndex={-99}
					transition="all .3s"
					left={isClicked ? '-90px' : '0px'}
				>
					<GiChemicalTank />
				</Center>
			</Link>
		</Center>
	);
}
