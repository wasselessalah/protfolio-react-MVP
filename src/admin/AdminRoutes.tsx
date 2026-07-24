// src/admin/AdminRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout';
import Login from './pages/Login';
import DashboardHome from './pages/DashboardHome';
import Projects from './pages/Projects';

import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Education from './pages/Education';
import Certificates from './pages/Certificates';
import Blog from './pages/Blog';
import Messages from './pages/Messages';
import About from './pages/About';
import Hero from './pages/Hero';
import Socials from './pages/Socials';

// Placeholder for remaining pages
const Placeholder = ({ name }: { name: string }) => (
  <div className="fade-in">
    <div className="section-header">
      <h1 className="section-title">{name}</h1>
    </div>
    <div className="admin-card text-center py-20 text-slate-400">
      {name} management coming soon...
    </div>
  </div>
);

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="projects" element={<Projects />} />
        <Route path="skills" element={<Skills />} />
        <Route path="experience" element={<Experience />} />
        <Route path="education" element={<Education />} />
        <Route path="certificates" element={<Certificates />} />
        <Route path="blog" element={<Blog />} />
        <Route path="messages" element={<Messages />} />
        <Route path="about" element={<About />} />
        <Route path="hero" element={<Hero />} />
        <Route path="socials" element={<Socials />} />
        <Route path="media" element={<Placeholder name="Media Library" />} />
        <Route path="settings" element={<Placeholder name="Settings" />} />
      </Route>
    </Routes>
  );
}
