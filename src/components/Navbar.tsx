import Link from "next/link";
import React, { memo, useEffect, useRef, useState } from "react";
import styles from "../styles/components/Navbar.module.css";
import { LogoSVG } from "./LogoSVG";

interface NavElsProps {
	className?: string;
}

const NavElements = ({ className }: NavElsProps) => (
	<nav className={[className ?? "", styles.navElement].join(" ")}>
		<Link href="/projects">
			<a className={styles.link}>Projects</a>
		</Link>
		<Link href="/about">
			<a className={styles.link}>About</a>
		</Link>
		<Link href="/contact">
			<a className={styles.link}>Contact</a>
		</Link>
		<Link href="/message">
			<a className={styles.link}>Message</a>
		</Link>
		<a className={styles.link} href="//discord.pxseu.com/">
			Discord
		</a>
	</nav>
);

interface MenuProps {
	canHandleClick: boolean;
	handleClick: () => void;
}

const MenuBorger = ({ canHandleClick, handleClick }: MenuProps) => (
	<div
		className={styles.menuContainer}
		onClick={() => {
			if (canHandleClick) handleClick();
		}}>
		<div className={styles.bar1}></div>
		<div className={styles.bar2}></div>
		<div className={styles.bar3}></div>
	</div>
);

const Navbar = () => {
	const [navToggle, setNavToggle] = useState(false);
	const [smallScreen, setsmallScreen] = useState(false);
	const [navOpen, setNavOpen] = useState(false);
	const navOverlayRef = useRef<HTMLDivElement | null>(null);

	const resizeHandler = () => {
		if (window.innerWidth < 850) setsmallScreen(true);
		else {
			setsmallScreen(false);
			setNavOpen(false);
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
			if (navOverlayRef.current) navOverlayRef.current.classList.remove(styles.showNav);
			setTimeout(() => {
				setNavToggle(navOpen);
			}, 400);
			return;
		}

		setNavToggle(navOpen);
		setTimeout(() => {
			if (navOverlayRef.current) navOverlayRef.current.classList.add(styles.showNav);
		}, 10);
	}, [navOpen]);

	return (
		<>
			<header className={`noselect ${styles.navbar}`}>
				<Link href="/">
					<a className={styles.logo}>
						<LogoSVG />
					</a>
				</Link>

				{smallScreen ? (
					<MenuBorger canHandleClick={!navOpen && !navToggle} handleClick={() => setNavOpen(true)} />
				) : (
					<NavElements />
				)}
			</header>
			{navToggle && (
				<div className={`${styles.navOverlay} noselect`} ref={navOverlayRef}>
					<a className={`${styles.closebtn}`} onClick={() => setNavOpen(false)}>
						&times;
					</a>

					<NavElements className={styles.navOverlayContent} />
				</div>
			)}
		</>
	);
};

export default memo(Navbar);
