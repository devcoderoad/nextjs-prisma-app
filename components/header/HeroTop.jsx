import Link from 'next/link';

const HeroTop = ({ props }) => {
	return (
		<div className="py-12">
			<h1 className="title sr-only">
				Prisma &amp; <a href="https://nextjs.org">Next.js!</a>
			</h1>
			<p className="description flex justify-center pt-4">
				<img
					src="/prisma.svg"
					alt="Prisma"
					width="140"
					style={{ marginRight: '3rem' }}
				/>
				<img src="/nextjs.svg" alt="Next.js" width="100" />
			</p>
		</div>
	);
};

export default HeroTop;
