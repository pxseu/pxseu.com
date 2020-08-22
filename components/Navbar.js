import Link from 'next/link'
import { useState, useEffect } from 'react'

const Navbar = () => {
    const navbarClasses=[ 'navbar' ];

    const [navToggle, setNavToggle] = useState(false),
    [smallScreen, setsmallScreen] = useState(false);

    const resizeHandler = () => {
        setNavToggle(false);
        if (window.innerWidth < 800) setsmallScreen(true);
        else setsmallScreen(false);
    }

    useEffect(() => {
        resizeHandler();

        window.addEventListener("resize", resizeHandler);
        return () => {
          window.removeEventListener("resize", resizeHandler);
        };
    }, []);

    return (
        <>
            <header className={ navbarClasses.join(" ")}>
                <Link href="/"><p className="logoNavbar noselect">pxseu</p></Link>
                <nav className={ smallScreen ? "hidden" : "navigation noselect"}>
                    <NavElements />
                </nav>
                <p className={ smallScreen ? "navigation navIcon" : "hidden"} onClick={ () => setNavToggle(true) }>
                    <i className="fas fa-bars"></i>
                </p>
            </header>
            <div className={navToggle ? "navOverlay show" : "navOverlay"}>
                <a className="closebtn noselect" onClick={ () => setNavToggle(false) }>&times;</a>
                <div className="navOverlay-content noselect">
                    <NavElements />
                </div>
            </div>
        </>
    )
};

function NavElements() {
    return (
        <>
            <Link href="/projects"><a>Projects</a></Link>
            <Link href="/yiff"><a>Yiff</a></Link>
            <Link href="/waifu"><a>Waifu</a></Link>
            <Link href="/about"><a>About</a></Link>
            <Link href="/contact"><a>Contact</a></Link>
            <Link href="/legal-stuff"><a>Legal Stuff</a></Link>
        </>
    )
}

export default Navbar;