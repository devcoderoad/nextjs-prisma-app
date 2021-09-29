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
		} = req;

		const users = await prisma.user.findMany({
			skip: nextPage ? +nextPage : 0,
			take: 5,
			include: {
				posts: true, // Returns all user's posts
				profile: true, // Returns user's profile
				jobs: true, // Returns user's jobs
			},
			orderBy: { id: 'desc' },
		});

		res.statusCode = 200;
		res.json({
			status: 'success',
			data: users,
			total: users.length,
			nextPage: +nextPage + 5,
		});
	})
	// Post method
	.post(async (req, res) => {
		const { body } = req;
		const { slug } = req.query;
		const { username, email, password } = body;
		const userId = slug;
		const newPost = await prisma.user.create({
			data: {
				firstName: username,
				lastName: username,
				email,
				password,
				// status: 1,
			},
		});
		return res.status(200).json({
			status: 'success',
			message: 'done',
			data: newPost,
		});
	})
	// Put method
	.put(async (req, res) => {
		res.end('method - put');
	})
	// Patch method
	.patch(async (req, res) => {
		throw new Error('Throws me around! Error can be caught and handled.');
	});

export default handler;
