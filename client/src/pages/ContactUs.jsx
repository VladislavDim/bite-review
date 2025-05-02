import {
    FaEnvelope,
    FaGithub,
    FaInstagram,
    FaLinkedin
} from "react-icons/fa";

export default function ContactUs() {
    return (
        <section className="bg-white text-gray-800 pt-30 pb-16 px-4">
            <div className="max-w-3xl mx-auto text-center">

                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    We’d love to hear from you! Whether you have a question, feedback, or partnership idea – just reach out.
                </p>

                <div className="flex flex-col gap-6 items-center text-lg text-gray-700 mb-10">
                    <div className="flex items-center gap-4">
                        <FaEnvelope className="text-orange-500 text-xl" />
                        <a href="mailto:gumumpo6@gmail.com" className="hover:text-orange-500 transition">
                            gumumpo6@gmail.com
                        </a>
                    </div>
                </div>

                <div className="flex justify-center gap-6 text-2xl text-gray-600">
                    <a href="https://github.com/VladislavDim" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition">
                        <FaGithub />
                    </a>
                    <a href="https://www.instagram.com/gumumpo6/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition">
                        <FaInstagram />
                    </a>
                    <a href="https://www.linkedin.com/in/gumumpo6" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition">
                        <FaLinkedin />
                    </a>
                </div>
            </div>
        </section>
    );
}
