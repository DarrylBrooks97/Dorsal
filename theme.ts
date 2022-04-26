import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
	useSystemColorMode: false,
};

const breakpoints = createBreakpoints({
	sm: '320px',
	md: '768px',
	lg: '920px',
	xl: '1200px',
});

export const theme = extendTheme({
	config,
	fonts: {
		body: 'Inter, sans-serif',
	},
	styles: {
		global: {
			'html, body': {
				'background-color': 'black',
			},
		},
	},
	breakpoints,
});
