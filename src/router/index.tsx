// src/router/index.tsx
import { createBrowserRouter, RouterProvider, NavLink } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ProjectsPage from "@/pages/ProjectsPage";
import ContactPage from "@/pages/ContactPage";
import SkillsPage from "@/pages/SkillsPage";
import ExperiencePage from "@/pages/ExperiencePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "skills", element: <SkillsPage /> },
      { path: "experience", element: <ExperiencePage /> },
      { path: "contact", element: <ContactPage /> },
    ],
  },
  {
    path: "*",
    element: (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-6"
        style={{ background: "#050816" }}
      >
        <div className="text-8xl font-900 gradient-text-blue">404</div>
        <p className="text-[#64748B] text-lg">Page not found</p>
        <NavLink
          to="/"
          className="btn-primary px-6 py-3 text-sm"
        >
          Go Home
        </NavLink>
      </div>
    ),
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}