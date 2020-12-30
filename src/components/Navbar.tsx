import Link from "next/link";
import Head from "next/head";
import React, { useState, useEffect, memo, useRef } from "react";
import style from "./Navbar.module.css";

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
		<Link href="/other">
			<a>Other</a>
		</Link>
		<a href="//dash.pxseu.com">Dash</a>
	</>
);

const Navbar = () => {
	const [navToggle, setNavToggle] = useState(false);
	const [smallScreen, setsmallScreen] = useState(false);
	const [navOpen, setNavOpen] = useState(false);
	const navOverlayRef = useRef<HTMLDivElement | null>(null);

	const resizeHandler = () => {
		if (window.innerWidth < 900) setsmallScreen(true);
		else {
			setsmallScreen(false);
			setNavToggle(false);
		}
	};

	useEffect(() => {
		resizeHandler();

		window.addEventListener("resize", resizeHandler);
		return () => {
			window.removeEventListener("resize", resizeHandler);
		};
	}, []);

	useEffect(() => {
		if (!navOpen) {
			if (navOverlayRef.current) navOverlayRef.current.classList.remove(style.showNav);
			setTimeout(() => {
				setNavToggle(navOpen);
			}, 500);
			return;
		}

		setNavToggle(navOpen);
		setTimeout(() => {
			if (navOverlayRef.current) navOverlayRef.current.classList.add(style.showNav);
		}, 10);
	}, [navOpen]);

	return (
		<>
			<Head>
				<link rel="stylesheet" href="//use.fontawesome.com/releases/v5.5.0/css/all.css" />
			</Head>

			<header className={`noselect ${style.navbar}`}>
				<Link href="/">
					<p className={style.logoNavbar}>pxseu</p>
				</Link>
				{smallScreen ? (
					<p
						className={`navigation ${style.navIcon} `}
						onClick={() => {
							if (!navOpen && !navToggle) setNavOpen(true);
						}}>
						<i className="fas fa-bars"></i>
					</p>
				) : (
					<nav className="navigation">
						<NavElements />
					</nav>
				)}
			</header>
			{navToggle && (
				<div className={`${style.navOverlay} noselect`} ref={navOverlayRef}>
					<a className={style.closebtn} onClick={() => setNavOpen(false)}>
						&times;
					</a>
					<div className={style.navOverlayContent}>
						<NavElements />
					</div>
				</div>
			)}
			<style jsx>{``}</style>
		</>
	);
};

export default memo(Navbar);
