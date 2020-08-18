import Link from 'next/link'

const Navbar = () => {
     const navbarClasses=[ 'navbar' ];

    return (
        <header className={ navbarClasses.join(" ")}>
            <p className="logoNavbar">pxseu</p>

            <nav className="navigation">
                <Link href="/"><a>Home</a></Link>
                <Link href="/about"><a>About</a></Link>
                <Link href="/projects"><a>Projects</a></Link>
            </nav>

        </header>
    )
};
export default Navbar;