// src/components/shared/ScrollTopButton.tsx
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export default function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  const toggleVisibility = () => {
    setIsVisible(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-8 right-8 p-3 rounded-full transition-all duration-300 hover:scale-110 z-40",
          theme === "dark"
            ? "bg-blue-600 text-white hover:bg-blue-500"
            : "bg-blue-600 text-white hover:bg-blue-700"
        )}
        aria-label="Scroll to top"
      >
        <FaArrowUp size={20} />
      </button>
    )
  );
}