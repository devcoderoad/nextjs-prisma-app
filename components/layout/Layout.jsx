import Head from 'next/head';

/* Components */
import Header from '../header/Header';
import Footer from '../footer/Footer';

export default function Layout({
	children,
	title = 'Next.js with Prisma | A boilerplate from dyarfi.github.io',
}) {
	return (
		<div>
			<Head>
				<title>{title}</title>
				<link rel="icon" href="/favicon.ico" />
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<Header />
			<main className="content">{children}</main>
			<Footer />
		</div>
	);
}
