// src/components/layout/Navbar.tsx
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";

const navLinks = [
  { label: "Home",     path: "/" },
  { label: "About",    path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Contact",  path: "/contact" },
];

export default function Navbar() {
  const [isOpen,     setIsOpen]     = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();
  const { theme } = useTheme();

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setIsOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-white text-gray-900",
        isScrolled && (theme === "dark" ? "shadow-lg shadow-black/30" : "shadow-md")
      )}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          className={cn(
            "text-2xl font-bold transition-colors",
            theme === "dark" ? "text-blue-400" : "text-blue-600"
          )}
        >
          Wassel<span className={theme === "dark" ? "text-gray-400" : "text-gray-400"}>.</span>
        </NavLink>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={path === "/"}
                className={({ isActive }) =>
                  cn(
                    "text-sm font-medium transition-colors hover:text-blue-500",
                    isActive
                      ? theme === "dark"
                        ? "text-blue-400 border-b-2 border-blue-400 pb-1"
                        : "text-blue-600 border-b-2 border-blue-600 pb-1"
                      : theme === "dark"
                      ? "text-gray-400"
                      : "text-gray-600"
                  )
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Theme Toggle + Mobile Button */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            className={cn(
              "md:hidden text-2xl transition-colors",
              theme === "dark" ? "text-gray-400" : "text-gray-700"
            )}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className={cn(
            "md:hidden border-t px-6 py-4 flex flex-col gap-4 transition-colors",
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-100"
          )}
        >
          {navLinks.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                cn(
                  "text-base font-medium py-2 border-b transition-colors",
                  theme === "dark"
                    ? isActive
                      ? "text-blue-400 border-blue-400"
                      : "text-gray-400 border-gray-700 hover:text-blue-400"
                    : isActive
                    ? "text-blue-600 border-blue-600"
                    : "text-gray-700 border-gray-100 hover:text-blue-600"
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}