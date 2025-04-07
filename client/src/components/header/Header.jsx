import './Header.css';
import logo from '../../assets/images/Logo.png';
import { Link, useLocation } from 'react-router';

export default function Header({ user }) {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <header className="header-gradient py-6 text-white shadow-md">
            <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between">
                {/* Logo + Title */}
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <img src={logo} alt="BiteReview Logo" className="w-10 h-10" />
                    <h1 className="text-2xl md:text-3xl font-bold text-white">BiteReview</h1>
                </div>

                {/* Navigation - always visible */}
                <nav>
                    <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 text-lg font-semibold text-white">
                        <li><Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link></li>
                        <li><Link to="/restaurants" className={`nav-link ${isActive('/restaurants') ? 'active' : ''}`}>Restaurants</Link></li>
                        <li><Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>My Profile</Link></li>
                        {!user ? (
                            <>
                                <li><Link to="/login" className={`nav-link ${isActive('/login') ? 'active' : ''}`}>Login</Link></li>
                                <li><Link to="/register" className={`nav-link ${isActive('/register') ? 'active' : ''}`}>Register</Link></li>
                            </>
                        ) : (
                            <li><span className="text-white font-semibold">Welcome, {user.name}</span></li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
