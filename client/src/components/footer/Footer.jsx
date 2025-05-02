import { FaInstagram, FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-[#1f1f1f] text-white py-8">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">

                {/* Copyright text */}
                <div className="md:w-1/3 text-center md:text-left mb-4 md:mb-0">
                    <p className="text-sm">&copy; 2025 BiteReview. All rights reserved.</p>
                </div>

                {/* Navigation links */}
                <div className="md:w-1/3 flex justify-center mb-4 md:mb-0">
                    <div className="flex gap-6 text-sm">
                        <a href="/about" className="hover:underline text-gray-300 hover:text-white transition">About</a>
                        <a href="/contact" className="hover:underline text-gray-300 hover:text-white transition">Contact</a>
                        <a href="/privacy" className="hover:underline text-gray-300 hover:text-white transition">Privacy</a>
                    </div>
                </div>

                {/* Social icons */}
                <div className="md:w-1/3 flex justify-center md:justify-end gap-4 text-xl">
                    <a
                        href="https://www.linkedin.com/in/gumumpo6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-orange-400 transition"
                    ><FaLinkedinIn /></a>
                    <a
                        href="https://www.instagram.com/gumumpo6/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-orange-400 transition"
                    ><FaInstagram /></a>
                    <a
                        href="https://github.com/VladislavDim"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-orange-400 transition"
                    ><FaGithub /></a>
                </div>
            </div>
        </footer>
    );
}