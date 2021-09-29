import prisma from '@middleware/prisma';

import nextConnect from 'next-connect';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// const ACCESS_TOKEN_SECRET = process.env.JWT_KEY;

const { ACCESS_TOKEN_SECRET } = process.env;

const handler = nextConnect()
	.get(async (req, res) => {
		res.send('method get');
		// const user = await prisma.user.create({
		//   data: {
		//     email: "example1@example.com",
		//     createdAt: "2020-06-14 18:23:45",
		//     password:
		//       "$2y$10$mj1OMFvVmGAR4gEEXZGtA.R5wYWBZTis72hSXzpxEs.QoXT3ifKSq",
		//   },
		// });
		/* 
    const users = await prisma.user.create({
      data: {
        email: "example4@example.com",
        username: "example4",
        password:
          "$2y$10$mj1OMFvVmGAR4gEEXZGtA.R5wYWBZTis72hSXzpxEs.QoXT3ifKSq",
        createdAt: "2020-06-14 18:23:45",
        posts: {
          create: [
            {
              title: "This is my first post",
              slug: "this-is-my-first-post",
              description: 'createdAt: "2020-06-14 18:23:45",',
              createdAt: "2020-06-14 18:23:45",
            },
            {
              title: "Here comes a second post",
              slug: "this-is-my-second-post",
              description: 'createdAt: "2020-06-14 18:23:45",',
              createdAt: "2020-06-14 18:23:45",
            },
            {
              title: "Here comes a third post",
              slug: "this-is-my-third-post",
              description: 'createdAt: "2020-06-14 18:23:45",',
              createdAt: "2020-06-14 18:23:45",
            },
            {
              title: "Here comes a fourth post",
              slug: "this-is-my-fourth-post",
              description: 'createdAt: "2020-06-14 18:23:45",',
              createdAt: "2020-06-14 18:23:45",
            },
          ],
        },
        jobs: {
          create: [
            {
              title: "This is my job post",
              slug: "this-is-my-job-post",
              description: 'createdAt: "2020-06-14 18:23:45",',
              createdAt: "2020-06-14 18:23:45",
            },
            {
              title: "Here comes a second job post",
              slug: "this-is-my-second-job-post",
              description: 'createdAt: "2020-06-14 18:23:45",',
              createdAt: "2020-06-14 18:23:45",
            },
            {
              title: "Here comes a third job post",
              slug: "this-is-my-third-job-post",
              description: 'createdAt: "2020-06-14 18:23:45",',
              createdAt: "2020-06-14 18:23:45",
            },
            {
              title: "Here comes a fourth job post",
              slug: "this-is-my-fourth-job-post",
              description: 'createdAt: "2020-06-14 18:23:45",',
              createdAt: "2020-06-14 18:23:45",
            },
          ],
        },
        profile: {
          create: {
            id: 4,
            firstName: "Example",
            lastName: "Four",
            bio: "This is my bio",
          },
        },
      },
    });
   */
	})
	.post(async (req, res) => {
		/* Get Post Data */
		const { email, password } = req.body;
		/* Any how email or password is blank */
		if (!email || !password) {
			return res.status(400).json('Request missing username or password');
		}
		/* Check user in database */
		const user = await prisma.user.findFirst({
			where: { email: email },
			take: 1,
		});
		/* Check if exists */
		if (!user) {
			// res.status(400).json({ userNotFound: "User Not Found" });
			res.status(400).json({
				status: 'error',
				error: 'User Not Found',
			});
		}
		/* Define variables */
		const dataUser = user;
		const userId = dataUser.id,
			userEmail = dataUser.email,
			userPassword = dataUser.password;
		/* Check and compare password */
		bcrypt.compare(password, userPassword).then((isMatch) => {
			if (isMatch) {
				/* User matched */
				/* Create JWT Payload */
				const payload = {
					id: userId,
					email: userEmail,
				};
				/* Sign token */
				jwt.sign(
					payload,
					ACCESS_TOKEN_SECRET,
					{
						expiresIn: '10m', // 10 Minutes
					},
					(err, token) => {
						res.status(200).json({
							success: true,
							token: 'Bearer ' + token,
						});
					},
				);

				// let accessToken = await user.createAccessToken();
				// let refreshToken = await user.createRefreshToken();
				// return res.status(201).json({ accessToken, refreshToken });

				// res.json({ data: isMatch });
			} else {
				res.status(400).json({
					status: 'error',
					error: 'Password incorrect',
				});
			}
		});
	})
	.put(async (req, res) => {
		/* res.end("method - put"); */
	})
	.patch(async (req, res) => {
		/* throw new Error("method - patch"); */
	});

export default handler;
