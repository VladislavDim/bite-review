import { useLocation, Link } from 'react-router';
import heroImage from '../../assets/images/InfoCenter.png';


export default function TopInfoBar() {
    const { pathname } = useLocation();
    const showHeader = ['/about', '/contact', '/privacy'].includes(pathname);

    if (!showHeader) return null;

    const titleMap = {
        '/about': 'About BiteReview',
        '/contact': 'Contact Us',
        '/privacy': 'Privacy Policy',
    };

    return (
        <div className="relative h-[350px] w-full">
            {/* Background image */}
            <img
                src={heroImage}
                alt="Header background"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30 z-10" />

            {/* Title in the image */}
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center z-20">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
                    {titleMap[pathname]}
                </h1>
            </div>

            {/* NavBar */}
            <div className="absolute left-1/2 bottom-[-38px] transform -translate-x-1/2 z-30">
                <div className="bg-white border border-gray-300 rounded-lg shadow-lg px-10 py-4 flex gap-10 text-base font-medium text-gray-700">
                    <Link
                        to="/about"
                        className={`hover:text-orange-500 transition ${pathname === '/about' ? 'text-orange-500 font-semibold' : ''
                            }`}
                    >
                        About BiteReview
                    </Link>
                    <Link
                        to="/contact"
                        className={`hover:text-orange-500 transition ${pathname === '/contact' ? 'text-orange-500 font-semibold' : ''
                            }`}
                    >
                        Contact Us
                    </Link>
                    <Link
                        to="/privacy"
                        className={`hover:text-orange-500 transition ${pathname === '/privacy' ? 'text-orange-500 font-semibold' : ''
                            }`}
                    >
                        Privacy Policy
                    </Link>
                </div>
            </div>
        </div>
    );
}