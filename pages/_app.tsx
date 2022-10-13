import superjson from 'superjson';
import { theme } from '../theme';
import { withTRPC } from '@trpc/next';
import { AppRouter } from 'server/routers';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Header } from '@components/atoms';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<SessionProvider session={session}>
				<Header>
					<Component {...pageProps} />
				</Header>
			</SessionProvider>
		</ChakraProvider>
	);
}

export default withTRPC<AppRouter>({
	config({ ctx }) {
		const url =
			process.env.NODE_ENV === 'development'
				? 'http://localhost:3000/api/trpc'
				: 'https://dorsal.vercel.app/api/trpc';

		return {
			url,
			transformer: superjson,
			queryClientConfig: {
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
					},
				},
			},
		};
	},
	ssr: false,
})(MyApp);
