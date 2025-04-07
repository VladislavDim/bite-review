import { FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1f1f1f] text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Copyright text */}
        <p className="text-sm mb-4 md:mb-0">&copy; 2025 BiteReview. All rights reserved.</p>

        {/* Navigation links */}
        <div className="flex gap-6 text-sm mb-4 md:mb-0">
          <a href="/about" className="hover:underline text-gray-300 hover:text-white transition">About</a>
          <a href="/contact" className="hover:underline text-gray-300 hover:text-white transition">Contact</a>
          <a href="/privacy" className="hover:underline text-gray-300 hover:text-white transition">Privacy</a>
        </div>

        {/* Social icons */}
        <div className="flex gap-4 text-xl">
          <a href="#" className="hover:text-orange-400 transition"><FaFacebookF /></a>
          <a href="#" className="hover:text-orange-400 transition"><FaInstagram /></a>
          <a href="#" className="hover:text-orange-400 transition"><FaGithub /></a>
        </div>
      </div>
    </footer>
  );
}