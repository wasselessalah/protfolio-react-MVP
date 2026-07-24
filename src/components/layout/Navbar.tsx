// src/components/layout/Navbar.tsx
import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome, FiUser, FiFolder, FiZap, FiBriefcase,
  FiMail, FiGithub, FiLinkedin, FiTwitter, FiMenu, FiX, FiDownload
} from "react-icons/fi";
import { information } from "@/data/information";

const navLinks = [
  { label: "Home",       path: "/",           icon: FiHome },
  { label: "About",      path: "/about",       icon: FiUser },
  { label: "Projects",   path: "/projects",    icon: FiFolder },
  { label: "Skills",     path: "/skills",      icon: FiZap },
  { label: "Experience", path: "/experience",  icon: FiBriefcase },
  { label: "Contact",    path: "/contact",     icon: FiMail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { personal } = information;

  // Close sidebar on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  // Close on escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo / Profile Mini */}
      <div className="p-6 border-b border-[rgba(59,130,246,0.1)]">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 group w-full"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-[rgba(59,130,246,0.3)] group-hover:ring-[rgba(59,130,246,0.6)] transition-all duration-300">
              <img src={personal.avatar} alt={personal.name} className="w-full h-full object-cover" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 online-dot w-3 h-3" />
          </div>
          <div className="text-left">
            <p className="text-sm font-700 text-white leading-none">Wassel</p>
            <p className="text-xs text-[#64748B] mt-0.5 leading-none">@essalah</p>
          </div>
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scroll">
        {navLinks.map(({ label, path, icon: Icon }) => {
          const isActive = path === "/" ? pathname === "/" : pathname.startsWith(path);
          return (
            <NavLink
              key={path}
              to={path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-500 transition-all duration-200 group ${
                isActive
                  ? "bg-[rgba(59,130,246,0.15)] text-[#3B82F6] border border-[rgba(59,130,246,0.25)]"
                  : "text-[#64748B] hover:text-[#94A3B8] hover:bg-[rgba(255,255,255,0.04)]"
              }`}
            >
              <Icon size={18} className={isActive ? "text-[#3B82F6]" : "text-[#475569] group-hover:text-[#64748B]"} />
              <span>{label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-[#3B82F6]"
                />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Social Links */}
      <div className="px-6 py-4 border-t border-[rgba(59,130,246,0.1)]">
        <p className="text-[10px] font-700 uppercase tracking-widest text-[#334155] mb-3">Connect with me</p>
        <div className="flex items-center gap-2">
          {[
            { href: personal.social.github, icon: FiGithub, label: "GitHub" },
            { href: personal.social.linkedin, icon: FiLinkedin, label: "LinkedIn" },
            { href: personal.social.twitter, icon: FiTwitter, label: "Twitter" },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[#475569] hover:text-[#3B82F6] hover:bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.08)] hover:border-[rgba(59,130,246,0.25)] transition-all duration-200"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        <a
          href="/resume.pdf"
          download
          className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 btn-primary text-sm rounded-xl"
        >
          <FiDownload size={15} />
          Download Resume
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="sidebar-nav hidden lg:flex">
        <SidebarContent />
      </aside>

      {/* Mobile Top Bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14 glass border-b border-[rgba(59,130,246,0.1)]">
        <button onClick={() => navigate("/")} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg overflow-hidden ring-1 ring-[rgba(59,130,246,0.3)]">
            <img src={personal.avatar} alt={personal.name} className="w-full h-full object-cover" />
          </div>
          <span className="text-sm font-700 text-white">Wassel<span className="gradient-text-blue">.</span></span>
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-[#64748B] hover:text-white hover:bg-[rgba(59,130,246,0.1)] transition-all duration-200"
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="lg:hidden sidebar-nav fixed flex z-50 open"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
