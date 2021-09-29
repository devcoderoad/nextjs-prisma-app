import Link from 'next/link';

/* Components */
// import DarkModeToggle from "../DarkModeToggle";

const Header = ({ props }) => {
	return (
		<>
			<nav className="z-50 flex justify-between p-4 fixed bg-gray-800 text-gray-300 shadow-lg w-full">
				<Link href="/">
					<a className="justify-self-auto hover:text-gray-100">Home</a>
				</Link>
				<Link href="/user/profile">
					<a className="justify-self-auto hover:text-gray-100">Profile</a>
				</Link>
			</nav>
		</>
	);
};

export default Header;
