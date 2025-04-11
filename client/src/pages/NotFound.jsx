import { Link } from "react-router";

export default function NotFound() {
    return (
        <section className="min-h-screen flex items-center justify-center bg-[#f8f8f8] px-4">
            <div className="text-center">
                <h1 className="text-8xl font-extrabold text-[#E9762B] mb-6">404</h1>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Page not found</h2>
                <p className="text-lg text-gray-600 mb-8">Sorry, the page you're looking for doesn't exist.</p>
                <Link
                    to="/"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-[#E9762B] to-[#f79d4d] text-white font-medium rounded-lg hover:scale-105 transition"
                >
                    Back to Home
                </Link>
            </div>
        </section>
    );
}