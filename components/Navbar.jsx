import Link from 'next/link';
import { useState, useEffect } from 'react';

const Navbar = () => {
	const NavElements = () => (
		<>
			<Link href='/projects'>
				<a>Projects</a>
			</Link>
			<Link href='/about'>
				<a>About</a>
			</Link>
			<Link href='/contact'>
				<a>Contact</a>
			</Link>
			<Link href='/legal-stuff'>
				<a>Legal Stuff</a>
			</Link>
			<Link href='/other'>
				<a>Other</a>
			</Link>
		</>
	);

	const navbarClasses = ['navbar'];

	const [navToggle, setNavToggle] = useState(false);
	const [smallScreen, setsmallScreen] = useState(false);

	const resizeHandler = () => {
		setNavToggle(false);
		if (window.innerWidth < 800) setsmallScreen(true);
		else setsmallScreen(false);
	};

	useEffect(() => {
		resizeHandler();

		window.addEventListener('resize', resizeHandler);
		return () => {
			window.removeEventListener('resize', resizeHandler);
		};
	}, []);

	return (
		<>
			<header className={navbarClasses.join(' ')}>
				<Link href='/'>
					<p className='logoNavbar noselect'>pxseu</p>
				</Link>
				<nav className={smallScreen ? 'hidden' : 'navigation noselect'}>
					<NavElements />
				</nav>
				<p
					className={smallScreen ? 'navigation navIcon' : 'hidden'}
					onClick={() => setNavToggle(true)}
				>
					<i className='fas fa-bars'></i>
				</p>
			</header>
			<div className={navToggle ? 'navOverlay show' : 'navOverlay'}>
				<a className='closebtn noselect' onClick={() => setNavToggle(false)}>
					&times;
				</a>
				<div className='navOverlay-content noselect'>
					<NavElements />
				</div>
			</div>
		</>
	);
};

export default Navbar;
