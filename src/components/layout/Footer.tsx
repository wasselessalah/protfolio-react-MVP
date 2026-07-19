import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo */}
        <span className="text-white text-xl font-bold">
          Wassel<span className="text-blue-500">.</span>
        </span>

        {/* Links */}
        <ul className="flex gap-6 text-sm">
          <li><NavLink to="/"         className="hover:text-white transition">Home</NavLink></li>
          <li><NavLink to="/about"    className="hover:text-white transition">About</NavLink></li>
          <li><NavLink to="/projects" className="hover:text-white transition">Projects</NavLink></li>
          <li><NavLink to="/contact"  className="hover:text-white transition">Contact</NavLink></li>
        </ul>

        {/* Socials */}
        <div className="flex gap-4 text-xl">
          <a href="https://github.com"   target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><FaGithub /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><FaLinkedin /></a>
          <a href="https://twitter.com"  target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><FaTwitter /></a>
        </div>
      </div>

      <p className="text-center text-xs text-gray-600 mt-8">
        © {new Date().getFullYear()} Wassel. All rights reserved.
      </p>
    </footer>
  );
}