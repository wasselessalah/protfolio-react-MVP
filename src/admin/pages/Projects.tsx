// src/admin/pages/Projects.tsx
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService } from '../services/api.service';
import { Project } from '../types';
import Modal from '../components/ui/Modal';
import { Plus, Edit2, Trash2, Copy, Search, Star, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import TagInput from '../components/ui/TagInput';
import ImageUpload from '../components/ui/ImageUpload';

function ProjectForm({ initial, onSave, onCancel, loading }: {
  initial?: Partial<Project>;
  onSave: (data: Partial<Project>) => void;
  onCancel: () => void;
  loading?: boolean;
}) {
  const [form, setForm] = useState<Partial<Project>>(initial || {
    title: '', slug: '', description: '', fullDescription: '', category: 'Web App',
    status: 'In Progress', featured: false, gallery: [], technologies: [], skills: [],
    features: [], challenges: [], solutions: [], tags: [], role: 'Full Stack Developer',
    team: 'Solo', duration: '', year: new Date().getFullYear().toString(),
    displayOrder: 0, archived: false,
  });

  const [activeTab, setActiveTab] = useState<'basic' | 'content' | 'links' | 'media'>('basic');

  function set<K extends keyof Project>(key: K, val: Project[K]) {
    setForm(p => {
      const next = { ...p, [key]: val };
      if (key === 'title' && !initial?._id) {
        next.slug = (val as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      }
      return next;
    });
  }

  const tabStyle = (active: boolean) => ({
    padding: '8px 16px', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer', border: 'none',
    background: active ? 'var(--admin-primary)' : 'transparent',
    color: active ? 'white' : 'var(--admin-text-muted)',
    transition: 'all 0.2s',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 4, overflowX: 'auto' }}>
        <button type="button" style={tabStyle(activeTab === 'basic')} onClick={() => setActiveTab('basic')}>Basic Info</button>
        <button type="button" style={tabStyle(activeTab === 'content')} onClick={() => setActiveTab('content')}>Content & Tech</button>
        <button type="button" style={tabStyle(activeTab === 'media')} onClick={() => setActiveTab('media')}>Media</button>
        <button type="button" style={tabStyle(activeTab === 'links')} onClick={() => setActiveTab('links')}>Links</button>
      </div>

      <div style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: 8 }}>
        {activeTab === 'basic' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="grid-2" style={{ gap: 12 }}>
              <div>
                <label className="admin-label">Project Title *</label>
                <input className="admin-input" value={form.title || ''} onChange={(e) => set('title', e.target.value)} required />
              </div>
              <div>
                <label className="admin-label">Slug</label>
                <input className="admin-input" value={form.slug || ''} onChange={(e) => set('slug', e.target.value)} />
              </div>
            </div>
            
            <div>
              <label className="admin-label">Short Description *</label>
              <textarea className="admin-input" rows={2} value={form.description || ''} onChange={(e) => set('description', e.target.value)} required />
            </div>

            <div className="grid-3" style={{ gap: 12 }}>
              <div>
                <label className="admin-label">Category</label>
                <select className="admin-input" value={form.category || 'Web App'} onChange={(e) => set('category', e.target.value)}>
                  {['AI', 'Web App', 'Dashboard', 'CMS', 'E-Commerce', 'Portfolio', 'Mobile', 'Other'].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="admin-label">Status</label>
                <select className="admin-input" value={form.status || 'In Progress'} onChange={(e) => set('status', e.target.value as Project['status'])}>
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Draft">Draft</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
              <div>
                <label className="admin-label">Year</label>
                <input className="admin-input" value={form.year || ''} onChange={(e) => set('year', e.target.value)} />
              </div>
            </div>

            <div className="grid-2" style={{ gap: 12 }}>
              <div>
                <label className="admin-label">Role</label>
                <input className="admin-input" value={form.role || ''} onChange={(e) => set('role', e.target.value)} />
              </div>
              <div>
                <label className="admin-label">Duration</label>
                <input className="admin-input" value={form.duration || ''} onChange={(e) => set('duration', e.target.value)} placeholder="e.g. 3 months" />
              </div>
            </div>

            <div className="grid-2" style={{ gap: 12 }}>
              <label className="admin-toggle">
                <input type="checkbox" checked={form.featured || false} onChange={(e) => set('featured', e.target.checked)} />
                <div className="admin-toggle-track"><div className="admin-toggle-thumb" /></div>
                <span style={{ marginLeft: 10, fontSize: 14, color: 'var(--admin-text-muted)' }}>Featured Project</span>
              </label>
              <div>
                <label className="admin-label">Display Order</label>
                <input className="admin-input" type="number" value={form.displayOrder ?? 0} onChange={(e) => set('displayOrder', Number(e.target.value))} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label className="admin-label">Full Description (Markdown)</label>
              <textarea className="admin-input" rows={6} value={form.fullDescription || ''} onChange={(e) => set('fullDescription', e.target.value)} style={{ fontFamily: 'monospace' }} />
            </div>
            
            <TagInput label="Technologies" value={form.technologies || []} onChange={(v) => set('technologies', v)} placeholder="React, Node.js..." />
            <TagInput label="Key Features" value={form.features || []} onChange={(v) => set('features', v)} placeholder="User Auth, Real-time Chat..." />
            <TagInput label="Challenges" value={form.challenges || []} onChange={(v) => set('challenges', v)} />
            <TagInput label="Solutions" value={form.solutions || []} onChange={(v) => set('solutions', v)} />
            <TagInput label="Tags (SEO)" value={form.tags || []} onChange={(v) => set('tags', v)} />
          </div>
        )}

        {activeTab === 'media' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <ImageUpload
              label="Thumbnail Image"
              value={form.thumbnail}
              onChange={(url) => set('thumbnail', url)}
              folder="portfolio/projects"
              aspect="16/9"
            />
            
            <div>
              <label className="admin-label">Gallery Images (add URLs for now)</label>
              <TagInput
                value={form.gallery || []}
                onChange={(v) => set('gallery', v)}
                placeholder="https://... (Press Enter to add)"
              />
              <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                {(form.gallery || []).map((url, i) => (
                  <div key={i} style={{ width: 60, height: 40, borderRadius: 4, overflow: 'hidden' }}>
                    <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'links' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label className="admin-label">Live URL</label>
              <input className="admin-input" type="url" value={form.liveUrl || ''} onChange={(e) => set('liveUrl', e.target.value)} placeholder="https://..." />
            </div>
            <div>
              <label className="admin-label">GitHub Repository URL</label>
              <input className="admin-input" type="url" value={form.githubUrl || ''} onChange={(e) => set('githubUrl', e.target.value)} placeholder="https://github.com/..." />
            </div>
            <div>
              <label className="admin-label">Case Study / External Post URL</label>
              <input className="admin-input" type="url" value={form.caseStudyUrl || ''} onChange={(e) => set('caseStudyUrl', e.target.value)} placeholder="https://..." />
            </div>
            <div>
              <label className="admin-label">Figma Design URL</label>
              <input className="admin-input" type="url" value={form.figmaUrl || ''} onChange={(e) => set('figmaUrl', e.target.value)} placeholder="https://figma.com/..." />
            </div>
            <div>
              <label className="admin-label">Video Demo URL (YouTube/Vimeo)</label>
              <input className="admin-input" type="url" value={form.videoUrl || ''} onChange={(e) => set('videoUrl', e.target.value)} placeholder="https://youtube.com/..." />
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--glass-border)' }}>
        <button className="btn-ghost-admin btn-admin" onClick={onCancel}>Cancel</button>
        <button className="btn-primary-admin btn-admin" onClick={() => onSave(form)} disabled={loading || !form.title || !form.description}>
          {loading ? <Loader2 size={14} className="animate-spin" /> : null} Save Project
        </button>
      </div>
    </div>
  );
}

export default function Projects() {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['projects', search],
    queryFn: () => projectService.getAll({ search }),
  });

  const deleteMutation = useMutation({
    mutationFn: projectService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project deleted');
    },
  });

  const duplicateMutation = useMutation({
    mutationFn: projectService.duplicate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project duplicated');
    },
  });

  const projects = data?.data || [];

  return (
    <div className="fade-in">
      <div className="section-header flex flex-wrap gap-4">
        <div>
          <h1 className="section-title">Projects</h1>
          <p className="section-subtitle">Manage your portfolio projects</p>
        </div>
        
        <div className="flex items-center gap-3 ml-auto">
          <div className="admin-search w-64">
            <Search size={16} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button 
            className="btn-primary-admin"
            onClick={() => {
              setEditingProject(null);
              setIsModalOpen(true);
            }}
          >
            <Plus size={16} /> New Project
          </button>
        </div>
      </div>

      <div className="admin-card overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center p-8"><Loader2 className="animate-spin text-indigo-500" /></div>
        ) : projects.length === 0 ? (
          <div className="empty-state">
            <FolderKanban className="empty-state-icon mx-auto" />
            <div className="empty-state-title">No projects found</div>
            <p>Get started by creating a new project.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Category</th>
                <th>Status</th>
                <th>Tech</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project: Project) => (
                <tr key={project._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-800 border border-[var(--glass-border)] flex items-center justify-center overflow-hidden">
                        {project.thumbnail ? (
                          <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
                        ) : (
                          <FolderKanban size={18} className="text-slate-500" />
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-white flex items-center gap-2">
                          {project.title}
                          {project.featured && <Star size={12} className="text-yellow-500 fill-yellow-500" />}
                        </div>
                        <div className="text-xs text-slate-400">{project.year} • {project.role}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-purple">{project.category}</span>
                  </td>
                  <td>
                    <span className={`badge ${
                      project.status === 'Completed' ? 'badge-green' :
                      project.status === 'In Progress' ? 'badge-blue' :
                      project.status === 'Draft' ? 'badge-gray' : 'badge-red'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {project.technologies.slice(0, 3).map((t, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                          {t}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => duplicateMutation.mutate(project._id)}
                        title="Duplicate"
                        className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-white/5 transition-colors"
                      >
                        <Copy size={16} />
                      </button>
                      <button 
                        onClick={() => {
                          setEditingProject(project);
                          setIsModalOpen(true);
                        }}
                        title="Edit"
                        className="p-1.5 text-blue-400 hover:text-blue-300 rounded hover:bg-blue-500/10 transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => {
                          if(confirm('Are you sure you want to delete this project?')) {
                            deleteMutation.mutate(project._id);
                          }
                        }}
                        title="Delete"
                        className="p-1.5 text-red-400 hover:text-red-300 rounded hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? 'Edit Project' : 'New Project'}
        size="lg"
      >
        <ProjectForm
          initial={editingProject || undefined}
          onSave={(data) => {
            if (editingProject) {
              projectService.update(editingProject._id, data).then(() => {
                queryClient.invalidateQueries({ queryKey: ['projects'] });
                toast.success('Project updated');
                setIsModalOpen(false);
              }).catch((err: any) => toast.error(err.response?.data?.message || 'Failed to update'));
            } else {
              projectService.create(data).then(() => {
                queryClient.invalidateQueries({ queryKey: ['projects'] });
                toast.success('Project created');
                setIsModalOpen(false);
              }).catch((err: any) => toast.error(err.response?.data?.message || 'Failed to create'));
            }
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

const FolderKanban = ({ size = 24, className = "" }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/><path d="M8 10v6"/><path d="M12 10v6"/><path d="M16 10v6"/></svg>
)
