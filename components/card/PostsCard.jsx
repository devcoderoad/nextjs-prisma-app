import Link from 'next/link';

export default function PostsCard(props) {
	const { data = [] } = props;
	return (
		data &&
		data.length &&
		data.map((item, j) => {
			return (
				<Link key={j} href="/post/[slug]" as={`/post/${item.slug}`}>
					<a className="card p-4 my-2 sm:mx-4 shadow-md hover:shadow-lg hover:text-gray-500">
						<h3 className="headline text-2xl font-semibold">{item.title}</h3>
						<div>
							<small>{item.createdAt}</small>
						</div>
						{item.user && (
							<div>
								<small>Post by: {item.user.username || ''}</small>
							</div>
						)}
						<p>{item.description}</p>
					</a>
				</Link>
			);
		})
	);
}
