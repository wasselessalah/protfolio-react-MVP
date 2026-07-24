// src/admin/components/layout/AdminLayout.tsx
import { useState, useEffect } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useAuthStore } from '../../store/authStore';
import { Toaster } from 'react-hot-toast';
import '../../admin.css';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  if (isLoading) {
    return (
      <div className="admin-root flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return (
    <div className="admin-root">
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: 'var(--admin-surface)',
            color: 'var(--admin-text)',
            border: '1px solid var(--glass-border)',
            borderRadius: '8px',
          },
          success: {
            iconTheme: { primary: 'var(--admin-success)', secondary: '#fff' }
          },
          error: {
            iconTheme: { primary: 'var(--admin-danger)', secondary: '#fff' }
          }
        }} 
      />
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`admin-sidebar-wrapper ${sidebarOpen ? 'open' : ''} md:block`}>
        <Sidebar />
      </div>

      <div className="admin-main">
        <Topbar 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          sidebarOpen={sidebarOpen} 
        />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
