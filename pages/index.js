import Link from 'next/link';

import flash from '@middleware/flash';

/* components */
import Layout from '@components/layout/Layout';
import UserNav from '@components/navigation/User';
import HeroTop from '@components/header/HeroTop';
import FlashMessage from '@components/header/FlashMessage';

export default function Home(props) {
	const { user } = props;

	flash.set({ flash: { name: 'asdasd', description: 'asdfasd' } });
	// console.log(flash.get('flash'));
	const flashMessage = flash.get('flash');
	// console.log(flashMessage);
	return (
		<Layout title="Next.js with Prisma | Home Page">
			<div className="container mx-auto py-20">
				<HeroTop />
				<div>
					<FlashMessage props={flashMessage} />
				</div>
				<UserNav props={{ user: user }} />
				<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 my-8 mx-5 md:mx-auto">
					<Link href="/user">
						<a className="card p-5 my-2 rounded-md shadow-md hover:shadow-lg">
							<h3 className="text-3xl font-black group-hover:text-gray-200">
								Users &rarr;
							</h3>
							<p className="py-4">Listed users of this web application.</p>
						</a>
					</Link>

					<Link href="/post">
						<a className="card p-5 my-2 rounded-md shadow-md hover:shadow-lg">
							<h3 className="text-3xl font-black group-hover:text-gray-200">
								Posts &rarr;
							</h3>
							<p className="py-4">
								Post collection from users of this web application.
							</p>
						</a>
					</Link>

					<Link href="/job">
						<a className="card p-5 my-2 rounded-md shadow-md hover:shadow-lg">
							<h3 className="text-3xl font-black group-hover:text-gray-200">
								Jobs &rarr;
							</h3>
							<p className="py-4">
								Job Post collection from users of this web application.
							</p>
						</a>
					</Link>

					<p className="block py-20 mx-auto w-full">&nbsp;</p>
				</div>
			</div>
		</Layout>
	);
}

export async function getServerSideProps(ctx) {
	const host = process.env.NODE_ENV === 'production' ? 'https://' : 'http://';
	const { query, req, res, cookie } = ctx;
	return {
		props: {},
	};
}
