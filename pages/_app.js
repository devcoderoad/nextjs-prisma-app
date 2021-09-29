import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';

/* middleware */
import { getAppCookies, verifyToken } from '@middleware/utils';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', (url) => {
	NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

/* CSS */
import '@styles/globals.css';
function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<link rel="stylesheet" type="text/css" href="/nprogress.css" />
			</Head>
			<Component {...pageProps} />
		</>
	);
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
	const { req } = ctx;
	const { token } = getAppCookies(req);
	const user = token && verifyToken(token.replace('Bearer ', ''));

	let pageProps = { user };
	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps({ ctx });
	}

	return { pageProps };
};

export default MyApp;
