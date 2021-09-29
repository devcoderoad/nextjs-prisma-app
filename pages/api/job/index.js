import nextConnect from 'next-connect';
import middleware from '@middleware/auth';
import prisma from '@middleware/prisma';

const handler = nextConnect()
	// Middleware
	// .use(middleware)
	// Get method
	.get(async (req, res) => {
		const {
			query: { nextPage },
			method,
			body,
			user,
		} = req;

		const jobs = await prisma.job.findMany({
			skip: nextPage ? +nextPage : 0,
			take: 5,
			include: { user: true },
			orderBy: { id: 'desc' },
		});

		res.statusCode = 200;
		res.json({
			status: 'success',
			data: jobs,
			total: jobs.length,
			nextPage: +nextPage + 5,
		});
	});

export default handler;
