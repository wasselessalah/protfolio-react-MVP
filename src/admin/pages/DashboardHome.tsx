// src/admin/pages/DashboardHome.tsx
import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/api.service';
import { FolderKanban, Zap, Award, BookOpen, MessageSquare, TrendingUp, Briefcase } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function DashboardHome() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: dashboardService.getStats,
  });

  if (isLoading) return <div className="text-slate-400">Loading dashboard data...</div>;
  if (error) return <div className="text-red-400">Error loading dashboard data</div>;

  const stats = data?.data?.stats;
  const charts = data?.data?.charts;

  const statCards = [
    { label: 'Total Projects', value: stats?.totalProjects || 0, icon: <FolderKanban size={24} className="text-blue-500" />, bg: 'rgba(59,130,246,0.1)' },
    { label: 'Featured Projects', value: stats?.featuredProjects || 0, icon: <Star size={24} className="text-yellow-500" />, bg: 'rgba(234,179,8,0.1)' },
    { label: 'Total Skills', value: stats?.totalSkills || 0, icon: <Zap size={24} className="text-purple-500" />, bg: 'rgba(168,85,247,0.1)' },
    { label: 'Experiences', value: stats?.totalExperiences || 0, icon: <Briefcase size={24} className="text-orange-500" />, bg: 'rgba(249,115,22,0.1)' },
    { label: 'Certificates', value: stats?.totalCertificates || 0, icon: <Award size={24} className="text-emerald-500" />, bg: 'rgba(16,185,129,0.1)' },
    { label: 'Published Blogs', value: stats?.publishedBlogs || 0, icon: <BookOpen size={24} className="text-cyan-500" />, bg: 'rgba(6,182,212,0.1)' },
    { label: 'Unread Messages', value: stats?.unreadMessages || 0, icon: <MessageSquare size={24} className="text-red-500" />, bg: 'rgba(239,68,68,0.1)' },
  ];

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#14b8a6', '#f59e0b'];

  return (
    <div className="fade-in">
      <div className="section-header">
        <div>
          <h1 className="section-title">Overview</h1>
          <p className="section-subtitle">Welcome back! Here's what's happening with your portfolio.</p>
        </div>
      </div>

      <div className="stats-grid">
        {statCards.map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="stat-card-icon" style={{ background: stat.bg }}>
              {stat.icon}
            </div>
            <div>
              <div className="stat-card-value">{stat.value}</div>
              <div className="stat-card-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="admin-card">
          <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
            <TrendingUp size={16} /> Projects by Category
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts?.projectsByCategory || []} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="_id" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="admin-card">
          <h3 className="text-sm font-semibold text-slate-300 mb-4">Projects by Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={charts?.projectsByStatus || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="_id"
                >
                  {(charts?.projectsByStatus || []).map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {(charts?.projectsByStatus || []).map((entry: any, index: number) => (
              <div key={entry._id} className="flex items-center gap-2 text-xs text-slate-400">
                <div className="w-3 h-3 rounded-full" style={{ background: COLORS[index % COLORS.length] }}></div>
                {entry._id} ({entry.count})
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const Star = ({ size, className }: { size: number, className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)
