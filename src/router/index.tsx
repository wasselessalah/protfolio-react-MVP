import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ProjectsPage from "@/pages/ProjectsPage";
import ContactPage from "@/pages/ContactPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,          // ← Layout wraps all pages
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "contact", element: <ContactPage /> },
    ],
  },
  {
    path: "*",                    // ← 404 Not Found
    element: (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-gray-500 mt-4">Page not found</p>
        <a href="/" className="mt-6 text-blue-600 hover:underline">
          Go back home hello chat 
    

        </a>
        
      </div>
    ),
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}