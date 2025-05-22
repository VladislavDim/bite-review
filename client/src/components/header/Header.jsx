import './Header.css';
import logo from '../../assets/images/LogoSite.png';
import { Link, useLocation } from 'react-router';
import { useUserContext } from '../../contexts/UserContext';
import { FaUser, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const { username, email, avatar } = useUserContext();
    const isLoggedIn = !!email;
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const avatarWrapperRef = useRef(null);

    const isLoggedIn = !!email; // или !!accessToken ако използваш такъв
    const isActive = (path) => location.pathname === path;

    
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target) &&
                avatarWrapperRef.current && !avatarWrapperRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };

        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);

    const handleNavigate = (path) => {
        setMenuOpen(false);
        navigate(path);
    };

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
                            <li className="relative" ref={avatarWrapperRef}>
                                <button
                                    onClick={() => setMenuOpen(prev => !prev)}
                                    className="flex items-center gap-2 focus:outline-none group"
                                >
                                    <span className="text-sm sm:text-base text-white transition group-hover:drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
                                        {username}
                                    </span>
                                    <img
                                        src={`${baseUrl}${avatar}` || '/default-avatar.png'}
                                        alt="avatar"
                                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white object-cover transition-transform duration-200 group-hover:scale-110 group-hover:drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
                                    />
                                </button>


                                {/* Dropdown */}
                                {menuOpen && (
                                    <ul
                                        ref={menuRef}
                                        className="absolute right-0 mt-3 w-56 bg-white bg-opacity-90 backdrop-blur-md shadow-2xl rounded-xl overflow-hidden z-50 animate-fade-in"
                                    >
                                        <DropdownItem
                                            text="Explore"
                                            path="/restaurants"
                                            isActive={isActive}
                                            onClick={handleNavigate}
                                        />
                                        <DropdownItem
                                            text="My Restaurants"
                                            path="/my-restaurants"
                                            isActive={isActive}
                                            onClick={handleNavigate}
                                        />
                                        <DropdownItem
                                            text="My Profile"
                                            path="/profile"
                                            isActive={isActive}
                                            onClick={handleNavigate}
                                        />
                                        <DropdownItem
                                            text="Settings"
                                            path="/profile/edit"
                                            isActive={isActive}
                                            onClick={handleNavigate}
                                        />
                                        <DropdownItem
                                            text="Logout"
                                            path="/logout"
                                            isActive={() => false}
                                            onClick={handleNavigate}
                                        />
                                    </ul>

                                )}
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

function DropdownItem({ text, path, isActive, onClick }) {
    const active = isActive(path);

    return (
        <li
            onClick={() => onClick(path)}
            className={`
                relative px-4 py-3 cursor-pointer transition-all duration-200
                ${active
                    ? 'text-orange-600 font-semibold bg-white'
                    : 'text-gray-800 hover:bg-orange-100'}
                group
            `}
        >
            {active && (
                <span className="absolute right-0 top-0 h-full w-1 bg-orange-500 rounded-r-sm"></span>
            )}
            <span className="block text-sm sm:text-base tracking-wide">
                {text}
            </span>
        </li>
    );
}