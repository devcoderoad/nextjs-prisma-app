import React, { useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';

/* Middleware utils */
import { getAppCookies } from '@middleware/utils';

/* components */
import Layout from '@components/layout/Layout';
import UserNav from '@components/navigation/User';
import HeroTop from '@components/header/HeroTop';
/* card */
import PostsCard from '@components/card/PostsCard';

function Post(props) {
	const { user, posts } = props;

	async function loadMoreClick(e) {
		await Router.push({
			pathname: '/post',
			query: {
				nextPage: posts.nextPage ? posts.nextPage : 5,
			},
		});
	}

	return (
		<Layout title="Next.js with Prisma | Post Page">
			<div className="container mx-auto py-20">
				<HeroTop />
				<UserNav props={{ user: user }} />
				<h2>
					{' '}
					<Link
						href={{
							pathname: '/',
						}}
					>
						<a>&larr; </a>
					</Link>
					Latest Posts
				</h2>
				<div className="grid">
					<small
						style={{
							textAlign: 'center',
							marginTop: '0rem',
							marginBottom: '1rem',
						}}
					>
						<Link href="/post/add">
							<a>+ Add Post</a>
						</Link>
					</small>
					{posts.status === 'success' ? (
						posts.data.length && <PostsCard data={posts.data} />
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
							{posts.error}
						</h3>
					)}

					{posts.status === 'success' && (
						<>
							{posts.nextPage < posts.total &&
							posts.data.length !== posts.total ? (
								<button onClick={loadMoreClick}>Next</button>
							) : (
								<span className="span-info">no page left</span>
							)}
							<style jsx>
								{`
									button,
									.span-info {
										margin: 1rem auto;
										padding: 0.5rem 1rem;
										border: 1px solid #cecece;
										background-color: #fffcfc;
										color: #7b7b7b;
										outline: none;
									}
								`}
							</style>
						</>
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
	const token = getAppCookies(req).token || '';

	const referer = req.headers.referer || '';

	const nextPageUrl = !isNaN(nextPage) ? `?nextPage=${nextPage}` : '';
	const baseApiUrl = `${host}${req.headers.host}/api`;

	const postsApi = await fetch(`${baseApiUrl}/post${nextPageUrl}`, {
		headers: {
			authorization: token || '',
		},
	});
	const posts = await postsApi.json();

	return {
		props: {
			posts,
			referer,
			token,
		},
	};
}

export default Post;
