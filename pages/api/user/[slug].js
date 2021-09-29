import nextConnect from 'next-connect';
import middleware from '@middleware/auth';
import prisma from '@middleware/prisma';

const handler = nextConnect()
	// Middleware
	.use(middleware)
	// Get method
	.get(async (req, res) => {
		const { slug } = req.query;
		const user = await prisma.user.findFirst({
			where: {
				id: +slug,
			},
			include: { posts: true, jobs: true },
			orderBy: { createdAt: 'asc' },
			take: 1,
		});
		res.statusCode = 200;
		return res.json({ status: 'success', data: user });
	})
	// Post method
	.post(async (req, res) => {
		const { body } = req;
		const { title, content } = body;
		const newPost = await prisma.posts.create({
			title,
			content,
			status: 1,
			userId: 1,
		});

		return res.status(200).json({
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
