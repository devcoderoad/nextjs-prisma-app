import Link from 'next/link';

export default function UsersCard(props) {
	const { data = [] } = props;
	return (
		data &&
		data.length &&
		data.map((item, i) => {
			return (
				<Link key={i} href="/user/[slug]" as={`/user/${item.id}`}>
					<a className="card p-4 my-2 sm:mx-4 shadow-md hover:shadow-lg hover:text-gray-500">
						<h3 className="headline text-2xl font-semibold">
							{item.profile.firstName} {item.profile.lastName}
						</h3>
						<p>{item.email}</p>
						<small>Posts: {item.posts.length}</small>{' '}
						<small>Jobs: {item.jobs.length}</small>
					</a>
				</Link>
			);
		})
	);
}
