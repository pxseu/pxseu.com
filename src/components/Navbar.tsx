import Link from "next/link";
import Head from "next/head";
import React, { useState, useEffect, memo } from "react";

const Navbar = () => {
	const NavElements = () => (
		<>
			<Link href="/projects">
				<a>Projects</a>
			</Link>
			<Link href="/about">
				<a>About</a>
			</Link>
			<Link href="/contact">
				<a>Contact</a>
			</Link>
			<Link href="/legal-stuff">
				<a>Legal Stuff</a>
			</Link>
			<Link href="/other">
				<a>Other</a>
			</Link>
			<a href="//dash.pxseu.com">Dash</a>
		</>
	);

	const [navToggle, setNavToggle] = useState(false);
	const [smallScreen, setsmallScreen] = useState(false);

	const resizeHandler = () => {
		setNavToggle(false);
		if (window.innerWidth < 900) setsmallScreen(true);
		else setsmallScreen(false);
	};

	useEffect(() => {
		resizeHandler();

		window.addEventListener("resize", resizeHandler);
		return () => {
			window.removeEventListener("resize", resizeHandler);
		};
	}, []);

	return (
		<>
			<Head>
				<link rel="stylesheet" href="//use.fontawesome.com/releases/v5.5.0/css/all.css" />
			</Head>

			<header className="noselect navbar">
				<Link href="/">
					<p className="logoNavbar">pxseu</p>
				</Link>
				<nav className={smallScreen ? "hidden" : "navigation"}>
					<NavElements />
				</nav>
				<p
					className={smallScreen ? "navigation navIcon" : "hidden"}
					onClick={() => setNavToggle(true)}>
					<i className="fas fa-bars"></i>
				</p>
			</header>
			<div className={navToggle ? "navOverlay show noselect" : "navOverlay"}>
				<a className="closebtn" onClick={() => setNavToggle(false)}>
					&times;
				</a>
				<div className="navOverlay-content">
					<NavElements />
				</div>
			</div>
			<style jsx>{`
				.navIcon {
					cursor: pointer;
				}
			`}</style>
		</>
	);
};

export default memo(Navbar);
