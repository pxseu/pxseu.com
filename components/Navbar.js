import Link from 'next/link'
import { useState, useEffect } from 'react'

const Navbar = () => {
    const navbarClasses=[ 'navbar' ];

    const [loaded, setLoaded] = useState(false);

    const [navToggle, setNavToggle] = useState(false);

    const [smallScreen, setsmallScreen] = useState(false);

    const resizeHandler = () => {
        setNavToggle(false);
        if (window.innerWidth < 600) setsmallScreen(true);
        else setsmallScreen(false);
    }

    useEffect(() => {
        if (!loaded){
            resizeHandler();
            setLoaded(true);
        }
        window.addEventListener("resize", resizeHandler);
        return () => {
          window.removeEventListener("resize", resizeHandler);
        };
    });

    return (
        <>
            <header className={ navbarClasses.join(" ")}>
                <Link href="/"><p className="logoNavbar">pxseu</p></Link>
                <nav className={ smallScreen ? "hidden" : "navigation"}>
                    <Link href="/about"><a>About</a></Link>
                    <Link href="/projects"><a>Projects</a></Link>
                </nav>
                <p className={ smallScreen ? "navigation navIcon" : "hidden"} onClick={ () => setNavToggle(true) }>
                    <i className="fas fa-bars"></i>
                </p>
            </header>
            <div className={navToggle ? "navOverlay show" : "navOverlay"}>
                <a className="closebtn" onClick={ () => setNavToggle(false) }>&times;</a>
                <div className="navOverlay-content">
                    <Link href="/about"><a>About</a></Link>
                    <Link href="/projects"><a>Projects</a></Link>
                </div>
            </div>
        </>
    )
};

export default Navbar;