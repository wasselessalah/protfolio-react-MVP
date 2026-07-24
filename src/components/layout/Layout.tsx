// src/components/layout/Layout.tsx
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AuroraBackground from "@/components/shared/AuroraBackground";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <div className="min-h-screen" style={{ background: "#050816" }}>
      {/* Aurora + Grid background (fixed, behind everything) */}
      <AuroraBackground />
      <div className="grid-overlay" />

      {/* Sidebar */}
      <Navbar />

      {/* Page content — offset by sidebar width */}
      <div className="main-content">
        <main className="relative z-10 pt-14 lg:pt-0 min-h-screen">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}