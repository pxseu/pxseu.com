import Link from "next/link";
import React, { useState, useEffect, memo, useRef } from "react";
import LogoTxt from "../components/LogoTxt";
import style from "../styles/components/Navbar.module.css";

interface NavElsProps {
	className?: string;
}

const NavElements = ({ className }: NavElsProps) => (
	<>
		<nav className={className}>
			<Link href="/projects">
				<a className="link">Projects</a>
			</Link>
			<Link href="/about">
				<a className="link">About</a>
			</Link>
			<Link href="/contact">
				<a className="link">Contact</a>
			</Link>
			<Link href="/message">
				<a className="link">Message</a>
			</Link>
			<a className="link" href="//discord.pxseu.com/">
				Discord
			</a>
		</nav>
	</>
);

interface MenuProps {
	canHandleClick: boolean;
	handleClick: () => void;
}

const MenuBorger = ({ canHandleClick, handleClick }: MenuProps) => (
	<>
		<nav
			id="menuButton"
			onClick={() => {
				if (canHandleClick) handleClick();
			}}>
			<div className={`center ${style.menuContainer}`}>
				<div className={style.bar1}></div>
				<div className={style.bar2}></div>
				<div className={style.bar3}></div>
			</div>
		</nav>
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
			}, 400);
			return;
		}

		setNavToggle(navOpen);
		setTimeout(() => {
			if (navOverlayRef.current) navOverlayRef.current.classList.add(style.showNav);
		}, 10);
	}, [navOpen]);

	return (
		<>
			<header className={`noselect ${style.navbar}`}>
				<div className={style.logo}>
					<Link href="/">
						<a>
							<LogoTxt />
						</a>
					</Link>
				</div>
				{smallScreen ? (
					<MenuBorger canHandleClick={!navOpen && !navToggle} handleClick={() => setNavOpen(true)} />
				) : (
					<NavElements />
				)}
			</header>
			{navToggle && (
				<div className={`${style.navOverlay} noselect`} ref={navOverlayRef}>
					<a className={`${style.closebtn}`} onClick={() => setNavOpen(false)}>
						&times;
					</a>

					<NavElements className={style.navOverlayContent} />
				</div>
			)}
		</>
	);
};

export default memo(Navbar);
