import Link from 'next/link';

/* Components */
// import DarkModeToggle from "../DarkModeToggle";

const User = ({ props }) => {
	const { user } = props;
	return (
		<p className="account mb-12">
			{(user && (
				<Link href="/user/logout">
					<a>Logout</a>
				</Link>
			)) || (
				<>
					<span className="mr-2">Have an Account?</span>
					<Link href={{ pathname: '/user/login' }}>
						<a className="mr-2">Login</a>
					</Link>
					or
					<Link href={{ pathname: '/user/register' }}>
						<a className="ml-2">Register</a>
					</Link>
				</>
			)}
		</p>
	);
};

export default User;
