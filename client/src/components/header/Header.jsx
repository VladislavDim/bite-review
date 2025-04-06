
export default function Header({
    user
}) {

    return (

        <header className="bg-white shadow-md py-4">
            <div className="container mx-auto flex items-center flex-wrap-nowrap">
                <img src="/images/Logo.png" alt="BiteReview Logo" className="w-10 h-10 mr-2" />
                <h1 className="text-3xl font-bold text-gray-800">BiteReview</h1>
                <nav className="ml-auto">
                    <ul className="flex space-x-8 text-lg font-semibold text-gray-600">
                        <li>
                            <a href="#home" className="hover:text-[#E9762B] transition-colors">Home</a>
                        </li>
                        <li>
                            <a href="#restaurants" className="hover:text-[#E9762B] transition-colors">Restaurants</a>
                        </li>
                        <li>
                            <a href="#profile" className="hover:text-[#E9762B] transition-colors">My Profile</a>
                        </li>
                        <li>
                            <a href="#login" className="hover:text-[#E9762B] transition-colors">Login</a>
                        </li>
                        <li>
                            <a href="#register" className="hover:text-[#E9762B] transition-colors">Register</a>
                        </li>
                        {user && (
                            <li>
                                <span className="text-gray-800 font-semibold">Welcome, {user.name}</span>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}