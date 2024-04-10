// React imports
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
import { GET_PROFILE } from '../../utils/queries';

// Navbar
export default function Nav() {
    const { data, loading, error } = useQuery(GET_PROFILE);
    const [isOpen, setIsOpen] = useState(false);

    const isLoggedIn = Auth.loggedIn();  // Check if user is logged in
    const userAvatar = data?.me?.avatarColor || '#F2E7DC';
    const initials = data?.me?.username[0].toUpperCase() || '';

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);
    const handleLogOut = () => {
        setIsOpen(false);
        Auth.logout();
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" onClick={closeMenu}>
                    <img src='/hamsterbrainsmall.png' alt='Logo' />
                </Link>

                <div className='titleAvatar'>
                    <Link to="/" onClick={closeMenu}>
                        <h3 className="quicksand font50">Hamster Brain</h3>
                    </Link>
                    {isLoggedIn && (
                        <div className="navAvatar" style={{ backgroundColor: userAvatar }}>
                            {initials}
                        </div>
                    )}
                </div>

                <div>
                    <div className='burgerBox'>
                        <div className={`menu-toggle ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                    </div>
                    <ul className={`nav-links ${isOpen ? 'open' : 'closed'}`}>
                        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                        {!isLoggedIn ? (
                            <>
                                <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
                                <li><Link to="/signup" onClick={closeMenu}>SignUp</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/" onClick={handleLogOut}>Logout</Link></li>
                                <li><Link to="/profile" onClick={closeMenu}>Profile</Link></li>
                                <li><Link to="/planner" onClick={closeMenu}>Planner</Link></li>
                                <li><Link to="/tasks" onClick={closeMenu}>Tasks</Link></li>
                                <li><Link to="/community" onClick={closeMenu}>Social</Link></li>
                            </>
                        )}
                        <li><Link to="/how-it-works" onClick={closeMenu}>How It Works</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}