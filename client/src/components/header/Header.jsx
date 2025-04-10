import './Header.css';
import logo from '../../assets/images/LogoSite.png';
import { Link, useLocation } from 'react-router';
import { useUserContext } from '../../contexts/UserContext';
import { FaUser, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

export default function Header() {
    const location = useLocation();
    const { username, email } = useUserContext();

    const isLoggedIn = !!email; // или !!accessToken ако използваш такъв
    const isActive = (path) => location.pathname === path;

    return (
        <header className="header-gradient py-6 text-white shadow-md">
            <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between">
                {/* Logo + Title */}
                <Link to="/" className="logo-brand-wrapper">
                    <img src={logo} alt="BiteReview Logo" className="w-10 h-10" />
                    <h1 className="text-2xl md:text-3xl font-bold text-white">BiteReview</h1>
                </Link>

                {/* Navigation */}
                <nav>
                    <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 text-lg font-semibold text-white">
                        {!isLoggedIn ? (
                            <>
                                <li>
                                    <Link
                                        to="/login"
                                        className={`nav-link flex items-center gap-2 ${isActive('/login') ? 'active' : ''}`}
                                    >
                                        <FaSignInAlt />
                                        <span>Login</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/register"
                                        className={`nav-link flex items-center gap-2 ${isActive('/register') ? 'active' : ''}`}
                                    >
                                        <FaUserPlus />
                                        <span>Sign Up</span>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link
                                    to="/profile"
                                    className={`nav-link flex items-center gap-2 hover:no-underline ${isActive('/profile') ? 'active' : ''}`}
                                >
                                    <FaUser />
                                    <span>{username ? ` ${username}` : ''}</span>
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
