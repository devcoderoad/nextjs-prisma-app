import React from 'react';

import Link from 'next/link';
import Router from 'next/router';

/* components */
import Layout from '@components/layout/Layout';
import UserNav from '@components/navigation/User';
import HeroTop from '@components/header/HeroTop';
/* card */
import UsersCard from '@components/card/UsersCard';

function User(props) {
	const { user, users } = props;

	async function loadMoreClick(e) {
		await Router.push({
			pathname: '/user',
			query: {
				nextPage: users.nextPage ? users.nextPage : 5,
			},
		});
	}

	return (
		<Layout title="Next.js with Prisma | User Page">
			<div className="container mx-auto py-20">
				<HeroTop />
				<UserNav props={{ user: user }} />
				<h2>
					<Link
						href={{
							pathname: '/',
						}}
					>
						<a>&larr; </a>
					</Link>
					Recent Users
				</h2>
				<div className="grid">
					{users.status === 'success' ? (
						users.data.length && <UsersCard data={users.data} />
					) : (
						<h3
							style={{
								textAlign: 'center',
								marginTop: '0rem',
								marginBottom: '1rem',
								display: 'inline-block',
								width: '100%',
							}}
						>
							{users.error}
						</h3>
					)}
				</div>
			</div>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const host = process.env.NODE_ENV === 'production' ? 'https://' : 'http://';

	const { query, req } = context;
	const { nextPage } = query;
	const { url } = req;
	const referer = req.headers.referer || '';

	const nextPageUrl = !isNaN(nextPage) ? `?nextPage=${nextPage}` : '';

	const baseApiUrl = `${host}${req.headers.host}/api`;

	const usersApi = await fetch(`${baseApiUrl}/user${nextPageUrl}`);
	const users = await usersApi.json();

	return {
		props: {
			users,
			referer,
			url,
		},
	};
}

export default User;
