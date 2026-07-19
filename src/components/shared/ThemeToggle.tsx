// src/components/shared/ThemeToggle.tsx
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-all duration-300 ${
        theme === "dark"
          ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
          : "bg-gray-800 text-yellow-400 hover:bg-gray-700"
      }`}
      aria-label="Toggle theme"
    >
      {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
    </button>
  );
}