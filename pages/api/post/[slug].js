import nextConnect from 'next-connect';
import middleware from '@middleware/auth';
import prisma from '@middleware/prisma';

const handler = nextConnect()
	// Middleware
	.use(middleware)
	// Get method
	.get(async (req, res) => {
		const { slug } = req.query;
		const post = await prisma.post.findFirst({
			where: {
				slug: slug,
			},
			include: {
				user: {
					select: {
						id: true,
						username: true,
						email: true, // or any other field you want from the relation
						createdAt: true,
					},
				},
			},
			orderBy: { createdAt: 'asc' },
		});

		res.statusCode = 200;
		return res.json({ status: 'success', data: post });
	})
	// Post method
	.post(async (req, res) => {
		const { body, user } = req;
		const { title, content } = body;
		const newPost = await prisma.post.create({
			data: {
				title,
				slug: title.trim().replace(/[^a-z0-9]+/gi, '-'),
				description: content,
				// status: 1,
				userId: user.id,
			},
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
