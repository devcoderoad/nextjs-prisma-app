import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';

/* middleware */
import flash from '@middleware/flash';
/* components */
import Layout from '@components/layout/Layout';
/* card */
import PostsCard from '@components/card/PostsCard';
import JobsCard from '@components/card/JobsCard';

function Slug(props) {
	const router = useRouter();
	const { user, userDetail, slug, referer } = props;

	const [titlePage, setTitlePage] = useState('Profile');

	useEffect(() => {
		if (slug === 'logout') {
			Cookies.remove('token');
			router.push({ pathname: '/' }, '/');
		} else if (slug === 'login') {
			setTitlePage('Login');
		} else if (slug === 'register') {
			setTitlePage('Register');
		}
	}, []);

	function renderProfile() {
		return (
			userDetail.data && (
				<>
					<div className="my-5">
						<h1 className="text-2xl font-bold">
							Username: {userDetail.data.username || ''}
						</h1>
						<hr />
						<h3 className="text-2xl font-bold">
							Email: {userDetail.data.email}
						</h3>
						<h3 className="text-2xl font-bold">
							Member since: {userDetail.data.createdAt}
						</h3>
					</div>
					{userDetail.data.posts.length && (
						<div className="grid">
							<h2>Latest Posts</h2>
							<PostsCard data={userDetail.data.posts} />
						</div>
					)}
					{userDetail.data.jobs.length && (
						<div className="grid">
							<h2>Latest Jobs</h2>
							<JobsCard data={userDetail.data.jobs} />
						</div>
					)}
				</>
			)
		);
	}

	function renderSelf() {
		return (
			(user && (
				<div className="grid rounded w-full bg-white border border-gray-100 shadow-lg hover:shadow-xl my-20 py-20">
					<h1 className="text-2xl my-10 mx-auto">{user.email}</h1>
				</div>
			)) || (
				<div className="grid rounded w-full bg-white border border-gray-100 shadow-lg hover:shadow-xl my-20 py-20">
					<h1 className="text-2xl my-10 mx-auto">Please Login First..</h1>
				</div>
			)
		);
	}

	return (
		<Layout title={`Next.js with Prisma | User Page - ${titlePage}`}>
			<div className="container mx-auto py-20">
				<Link href="/user">
					<a>&larr; Back</a>
				</Link>
				{slug !== 'profile' ? renderProfile() : renderSelf()}
			</div>
		</Layout>
	);
}

export async function getServerSideProps(ctx) {
	const { params, req, res, user } = ctx;
	const { slug } = params;
	const referer = req.headers.referer || '';
	const host = process.env.NODE_ENV === 'production' ? 'https://' : 'http://';
	const baseApiUrl = `${host}${req.headers.host}/api`;

	let userDetail = {};
	if (slug !== 'logout' && slug !== 'profile') {
		const userApi = await fetch(`${baseApiUrl}/user/${slug}`);
		userDetail = await userApi.json();
	}
	// flash.set(ctx, {
	// 	type: 'warning',
	// 	error: `${slug} not available`,
	// 	message: `${slug} not found`,
	// });
	return {
		props: {
			userDetail,
			slug,
			referer,
		},
	};
}

export default Slug;
