import Link from 'next/link';

export default function JobsCard(props) {
	const { data = [] } = props;
	return (
		data &&
		data.length &&
		data.map((item, j) => {
			return (
				<Link key={j} href="/job/[slug]" as={`/job/${item.slug}`}>
					<a className="card p-4 my-2 sm:mx-4 shadow-md hover:shadow-lg hover:text-gray-500">
						<h3 className="headline text-2xl font-semibold">{item.title}</h3>
						<div>
							<small>Posted: {item.createdAt}</small>
							{item.user && (
								<small style={{ float: 'right' }}>
									Job by: {item.user.username || ''}
								</small>
							)}
						</div>
						<p className="description">{item.text}</p>
						<small style={{ display: 'block' }}>Email: {item.emailTo}</small>
						<small style={{ display: 'block' }}>
							Report to: {item.reportManager}
						</small>
						<small style={{ display: 'block' }}>Limit :{item.dateLimit}</small>
					</a>
				</Link>
			);
		})
	);
}
