import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiMongodb, SiTailwindcss } from 'react-icons/si';

export default function About() {
  return (
    <section className="bg-white text-gray-800 pt-30 py-16 px-4 ">
      <div className="max-w-4xl mx-auto text-center">

        {/* Description */}
        <p className="text-xl text-gray-700 mb-6 leading-relaxed">
          BiteReview is a community-driven platform that helps people discover and rate restaurants with confidence.
          Our mission is to provide transparent, high-quality feedback about dining experiences — directly from real customers.
        </p>

        <p className="text-lg text-gray-600 leading-relaxed">
          Built with passion using modern technologies like React and Node.js, BiteReview is designed to support both
          food lovers and business owners by fostering trust and visibility in the food scene.
        </p>

        {/* Technologies */}
        <div className="flex justify-center gap-8 mt-10 text-gray-600 text-sm md:text-base">
          <span className="flex items-center gap-2">
            <FaReact className="text-xl text-blue-500" /> React
          </span>
          <span className="flex items-center gap-2">
            <FaNodeJs className="text-xl text-green-600" /> Node.js
          </span>
          <span className="flex items-center gap-2">
            <SiMongodb className="text-xl text-green-700" /> MongoDB
          </span>
          <span className="flex items-center gap-2">
            <SiTailwindcss className="text-xl text-sky-500" /> Tailwind
          </span>
        </div>

        {/* Quote */}
        <blockquote className="italic text-gray-500 mt-12 text-lg">
          “Great food deserves honest reviews.” – The BiteReview Team
        </blockquote>
      </div>
    </section>
  );
}
