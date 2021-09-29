import jwt from 'jsonwebtoken';

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
// const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;

/*
 * @params {jwtToken} extracted from cookies
 * @return {object} object of extracted token
 */
export function verifyToken(jwtToken) {
	try {
		return jwt.verify(jwtToken, ACCESS_TOKEN_SECRET);
	} catch (e) {
		console.log('e:', e);
		return null;
	}
}

/*
 * @params null
 * @return {object} object of cretead token
 */
export async function createAccessToken() {
	try {
		let { _id, username } = this;
		let accessToken = jwt.sign(
			{ user: { _id, username } },
			ACCESS_TOKEN_SECRET,
			{
				expiresIn: '10m',
			},
		);
		return accessToken;
	} catch (error) {
		console.error(error);
		return;
	}
}

/*
 * @params null
 * @return {object} object of refresh token
 */
export async function createRefreshToken() {
	try {
		let { _id, username } = this;
		let refreshToken = jwt.sign(
			{ user: { _id, username } },
			REFRESH_TOKEN_SECRET,
			{
				expiresIn: '1d',
			},
		);
		// await new Token({ token: refreshToken }).save();
		return refreshToken;
	} catch (error) {
		console.error(error);
		return;
	}
}

export async function generateRefreshToken(req, res) {
	try {
		//get refreshToken
		const { refreshToken } = req.body;
		//send error if no refreshToken is sent
		if (!refreshToken) {
			return res.status(403).json({ error: 'Access denied,token missing!' });
		} else {
			//query for the token to check if it is valid:
			const tokenDoc = await Token.findOne({ token: refreshToken });
			//send error if no token found:
			if (!tokenDoc) {
				return res.status(401).json({ error: 'Token expired!' });
			} else {
				//extract payload from refresh token and generate a new access token and send it
				const payload = jwt.verify(tokenDoc.token, REFRESH_TOKEN_SECRET);
				const accessToken = jwt.sign({ user: payload }, ACCESS_TOKEN_SECRET, {
					expiresIn: '10m',
				});
				return res.status(200).json({ accessToken });
			}
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Internal Server Error!' });
	}
}

export async function logout(req, res) {
	try {
		//delete the refresh token saved in database:
		const { refreshToken } = req.body;
		await Token.findOneAndDelete({ token: refreshToken });
		return res.status(200).json({ success: 'User logged out!' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Internal Server Error!' });
	}
}

/*
 * @params {request} extracted from request response
 * @return {object} object of parse jwt cookie decode object
 */
export function getAppCookies(req) {
	const parsedItems = {};
	if (req.headers.cookie) {
		const cookiesItems = req.headers.cookie.split('; ');
		cookiesItems.forEach((cookies) => {
			const parsedItem = cookies.split('=');
			parsedItems[parsedItem[0]] = decodeURI(parsedItem[1]);
		});
	}
	return parsedItems;
}
