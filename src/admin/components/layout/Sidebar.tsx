// src/admin/components/layout/Sidebar.tsx
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';
import {
  LayoutDashboard, User, FolderKanban, Zap, Briefcase,
  GraduationCap, Award, BookOpen, MessageSquare, Share2,
  Image, Settings, LogOut, Sparkles,
  Home, FileText,
} from 'lucide-react';

interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
  badge?: number;
}

interface NavGroup {
  section: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    section: 'Main',
    items: [
      { label: 'Dashboard', to: '/admin', icon: <LayoutDashboard size={16} /> },
    ],
  },
  {
    section: 'Content',
    items: [
      { label: 'Hero Section', to: '/admin/hero', icon: <Home size={16} /> },
      { label: 'About', to: '/admin/about', icon: <User size={16} /> },
      { label: 'Projects', to: '/admin/projects', icon: <FolderKanban size={16} /> },
      { label: 'Resume / CV', to: '/admin/resume', icon: <FileText size={16} /> },
      { label: 'Skills', to: '/admin/skills', icon: <Zap size={16} /> },
      { label: 'Experience', to: '/admin/experience', icon: <Briefcase size={16} /> },
      { label: 'Education', to: '/admin/education', icon: <GraduationCap size={16} /> },
      { label: 'Certificates', to: '/admin/certificates', icon: <Award size={16} /> },
      { label: 'Blog', to: '/admin/blog', icon: <BookOpen size={16} /> },
    ],
  },
  {
    section: 'Communication',
    items: [
      { label: 'Messages', to: '/admin/messages', icon: <MessageSquare size={16} /> },
      { label: 'Social Links', to: '/admin/socials', icon: <Share2 size={16} /> },
    ],
  },
  {
    section: 'System',
    items: [
      { label: 'Media Library', to: '/admin/media', icon: <Image size={16} /> },
      { label: 'Settings', to: '/admin/settings', icon: <Settings size={16} /> },
    ],
  },
];

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'A';

  return (
    <aside className="admin-sidebar">
      {/* Logo */}
      <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid var(--glass-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Sparkles size={18} color="white" />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--admin-text)' }}>Portfolio CMS</div>
            <div style={{ fontSize: 11, color: 'var(--admin-text-muted)' }}>Admin Dashboard</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {navGroups.map((group) => (
          <div key={group.section}>
            <div className="sidebar-section-label">{group.section}</div>
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/admin'}
                className={({ isActive }) =>
                  `admin-sidebar-link${isActive ? ' active' : ''}`
                }
              >
                {item.icon}
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span style={{
                    background: 'var(--admin-danger)',
                    color: 'white',
                    fontSize: 11,
                    fontWeight: 700,
                    borderRadius: 10,
                    padding: '1px 7px',
                  }}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* User + Logout */}
      <div style={{ padding: '16px', borderTop: '1px solid var(--glass-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div className="admin-avatar">{initials}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--admin-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.name || 'Admin'}
            </div>
            <div style={{ fontSize: 11, color: 'var(--admin-text-muted)', textTransform: 'capitalize' }}>
              {user?.role || 'admin'}
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="btn-ghost-admin btn-admin"
          style={{ width: '100%', justifyContent: 'center', gap: 8 }}
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </aside>
  );
}
