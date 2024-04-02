// React imports
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Navbar
export default function Nav() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    // const isLoggedIn = /* finish later once backend up */;

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" onClick={closeMenu}>
                    <img src='' alt='Logo' />
                </Link>
                <div>
                    <h3 className="white">Hamster Brain</h3>
                </div>
                <div>
                    <div className='burgerBox'>
                        <div className={`menu-toggle ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                    </div>
                    <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
                        <li>
                            <Link to="/" onClick={closeMenu}>Home</Link>
                        </li>
                        {/* Conditional rendering based on `isLoggedIn` */}
                        {/* {!isLoggedIn ? ( */}
                            {/* <> */}
                                <li>
                                    <Link to="/login" onClick={closeMenu}>Login</Link>
                                </li>
                                <li>
                                    <Link to="/signup" onClick={closeMenu}>SignUp</Link>
                                </li>
                            {/* </> */}
                        {/* ) :( */}
                            {/* <> */}
                                <li>
                                    <Link to="#" onClick={closeMenu}>Logout</Link>
                                </li>
                            {/* </> */}
                        {/* )} */}
                        <li>
                            <Link to="/profile" onClick={closeMenu}>Profile</Link>
                        </li>
                        <li>
                            <Link to="/how-it-works" onClick={closeMenu}>How It Works</Link>
                        </li>
                        <li>
                            <Link to="/planner" onClick={closeMenu}>Planner</Link>
                        </li>
                        <li>
                            <Link to="/tasks" onClick={closeMenu}>Tasks</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}