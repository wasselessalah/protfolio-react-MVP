// src/admin/components/layout/Topbar.tsx

import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Menu, X, ExternalLink } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const routeLabels: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/hero': 'Hero Section',
  '/admin/about': 'About',
  '/admin/projects': 'Projects',
  '/admin/projects/new': 'New Project',
  '/admin/skills': 'Skills',
  '/admin/experience': 'Experience',
  '/admin/education': 'Education',
  '/admin/certificates': 'Certificates',
  '/admin/blog': 'Blog',
  '/admin/messages': 'Messages',
  '/admin/socials': 'Social Links',
  '/admin/media': 'Media Library',
  '/admin/settings': 'Settings',
};

interface TopbarProps {
  onToggleSidebar?: () => void;
  sidebarOpen?: boolean;
}

export default function Topbar({ onToggleSidebar, sidebarOpen }: TopbarProps) {
  const location = useLocation();
  const { user } = useAuthStore();
  const currentLabel = routeLabels[location.pathname] || 'Admin';
  const initials = user?.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || 'A';

  return (
    <header className="admin-topbar">
      {/* Mobile menu toggle */}
      <button
        onClick={onToggleSidebar}
        className="btn-ghost-admin btn-admin"
        style={{ display: 'none', padding: 8, borderRadius: 8 }}
        id="sidebar-toggle"
      >
        {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Breadcrumb */}
      <div className="breadcrumb" style={{ flex: 1 }}>
        <Link to="/admin" style={{ color: 'var(--admin-text-muted)', textDecoration: 'none' }}>
          Dashboard
        </Link>
        {location.pathname !== '/admin' && (
          <>
            <ChevronRight size={14} className="breadcrumb-sep" />
            <span className="breadcrumb-current">{currentLabel}</span>
          </>
        )}
      </div>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* View portfolio */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost-admin btn-admin"
          style={{ gap: 6, fontSize: 13, padding: '6px 12px' }}
        >
          <ExternalLink size={13} />
          View Site
        </a>

        {/* Avatar */}
        <div className="admin-avatar" title={user?.name || 'Admin'}>
          {initials}
        </div>
      </div>
    </header>
  );
}
