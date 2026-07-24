// src/admin/pages/Blog.tsx
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { blogService } from '../services/api.service';
import { Blog } from '../types';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Loader2, BookOpen, Eye, Star, Search, Globe, Archive, FileText } from 'lucide-react';
import Modal from '../components/ui/Modal';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import TagInput from '../components/ui/TagInput';
import ImageUpload from '../components/ui/ImageUpload';

function BlogForm({ initial, onSave, onCancel, loading }: {
  initial?: Partial<Blog>;
  onSave: (data: Partial<Blog>) => void;
  onCancel: () => void;
  loading?: boolean;
}) {
  const [form, setForm] = useState<Partial<Blog>>(initial || {
    title: '', excerpt: '', content: '', category: 'General',
    tags: [], status: 'Draft', featured: false,
  });
  const [activeTab, setActiveTab] = useState<'content' | 'seo'>('content');

  function set<K extends keyof Blog>(key: K, val: Blog[K]) {
    setForm(p => ({ ...p, [key]: val }));
  }

  const tabStyle = (active: boolean) => ({
    padding: '8px 16px', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer', border: 'none',
    background: active ? 'var(--admin-primary)' : 'transparent',
    color: active ? 'white' : 'var(--admin-text-muted)',
    transition: 'all 0.2s',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 4 }}>
        <button type="button" style={tabStyle(activeTab === 'content')} onClick={() => setActiveTab('content')}>Content</button>
        <button type="button" style={tabStyle(activeTab === 'seo')} onClick={() => setActiveTab('seo')}>SEO</button>
      </div>

      {activeTab === 'content' && (
        <>
          <ImageUpload label="Featured Image" value={form.featuredImage} onChange={(url) => set('featuredImage', url)} folder="portfolio/blog" aspect="16/9" />

          <div>
            <label className="admin-label">Title *</label>
            <input className="admin-input" value={form.title || ''} onChange={(e) => set('title', e.target.value)} required placeholder="Your blog post title" />
          </div>

          <div>
            <label className="admin-label">Excerpt / Summary *</label>
            <textarea className="admin-input" rows={2} value={form.excerpt || ''} onChange={(e) => set('excerpt', e.target.value)} style={{ resize: 'vertical' }} placeholder="Brief summary that appears in list views" />
          </div>

          <div>
            <label className="admin-label">Content (Markdown supported) *</label>
            <textarea
              className="admin-input"
              rows={14}
              value={form.content || ''}
              onChange={(e) => set('content', e.target.value)}
              style={{ resize: 'vertical', fontFamily: 'monospace', fontSize: 13 }}
              placeholder="# Your Blog Post&#10;&#10;Write your content here using **Markdown** formatting..."
            />
          </div>

          <div className="grid-2" style={{ gap: 12 }}>
            <div>
              <label className="admin-label">Category</label>
              <input className="admin-input" value={form.category || ''} onChange={(e) => set('category', e.target.value)} placeholder="Technology, Career..." />
            </div>
            <div>
              <label className="admin-label">Status</label>
              <select className="admin-input" value={form.status || 'Draft'} onChange={(e) => set('status', e.target.value as Blog['status'])}>
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>

          <TagInput label="Tags" value={form.tags || []} onChange={(v) => set('tags', v)} placeholder="react, typescript, fullstack..." />

          <label className="admin-toggle">
            <input type="checkbox" checked={form.featured || false} onChange={(e) => set('featured', e.target.checked)} />
            <div className="admin-toggle-track"><div className="admin-toggle-thumb" /></div>
            <span style={{ marginLeft: 10, fontSize: 14, color: 'var(--admin-text-muted)' }}>Featured post</span>
          </label>
        </>
      )}

      {activeTab === 'seo' && (
        <>
          <div>
            <label className="admin-label">SEO Title</label>
            <input className="admin-input" value={form.seoTitle || ''} onChange={(e) => set('seoTitle', e.target.value)} placeholder="Defaults to post title" />
            <p style={{ fontSize: 11, color: 'var(--admin-text-dim)', marginTop: 4 }}>{(form.seoTitle || form.title || '').length}/60 chars</p>
          </div>
          <div>
            <label className="admin-label">SEO Description</label>
            <textarea className="admin-input" rows={3} value={form.seoDescription || ''} onChange={(e) => set('seoDescription', e.target.value)} style={{ resize: 'vertical' }} placeholder="Defaults to excerpt" />
            <p style={{ fontSize: 11, color: 'var(--admin-text-dim)', marginTop: 4 }}>{(form.seoDescription || '').length}/160 chars</p>
          </div>
        </>
      )}

      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
        <button className="btn-ghost-admin btn-admin" onClick={onCancel}>Cancel</button>
        <button className="btn-primary-admin btn-admin" onClick={() => onSave(form)} disabled={loading || !form.title || !form.excerpt || !form.content}>
          {loading ? <Loader2 size={14} className="animate-spin" /> : null} Save Post
        </button>
      </div>
    </div>
  );
}

export default function BlogPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Blog | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-blogs', search, statusFilter],
    queryFn: () => blogService.getAll({ search: search || undefined, status: statusFilter || undefined }),
  });
  const items: Blog[] = (data?.data as Blog[]) || [];

  const create = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-blogs'] }); toast.success('Blog post created!'); setModalOpen(false); },
    onError: () => toast.error('Failed to create post'),
  });
  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Blog> }) => blogService.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-blogs'] }); toast.success('Post updated!'); setEditing(null); setModalOpen(false); },
    onError: () => toast.error('Failed to update post'),
  });
  const remove = useMutation({
    mutationFn: blogService.delete,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-blogs'] }); toast.success('Post deleted'); setDeleteId(null); },
    onError: () => toast.error('Failed to delete'),
  });

  const statusBadge = (status: Blog['status']) => {
    const map = { Published: 'badge-green', Draft: 'badge-gray', Archived: 'badge-red' };
    return <span className={`badge ${map[status]}`}>{status}</span>;
  };

  return (
    <div className="fade-in">
      <div className="section-header">
        <div>
          <h1 className="section-title">Blog</h1>
          <p className="section-subtitle">{items.length} post{items.length !== 1 ? 's' : ''}</p>
        </div>
        <button className="btn-primary-admin btn-admin" onClick={() => { setEditing(null); setModalOpen(true); }}>
          <Plus size={14} /> New Post
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div className="admin-search" style={{ flex: 1, minWidth: 200 }}>
          <Search size={15} color="var(--admin-text-dim)" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search posts..." />
        </div>
        {(['', 'Draft', 'Published', 'Archived'] as const).map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`btn-admin ${statusFilter === s ? 'btn-primary-admin' : 'btn-ghost-admin'}`}
            style={{ padding: '8px 14px', fontSize: 13 }}>
            {s === '' ? 'All' : s}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[1,2,3].map(i => <div key={i} className="admin-card skeleton" style={{ height: 80 }} />)}
        </div>
      ) : items.length === 0 ? (
        <div className="admin-card empty-state">
          <BookOpen className="empty-state-icon" size={48} />
          <div className="empty-state-title">No blog posts yet</div>
          <button className="btn-primary-admin btn-admin" style={{ marginTop: 16 }} onClick={() => setModalOpen(true)}>
            <Plus size={14} /> Write First Post
          </button>
        </div>
      ) : (
        <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Post</th>
                <th>Category</th>
                <th>Status</th>
                <th>Views</th>
                <th>Read Time</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(post => (
                <tr key={post._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 8, overflow: 'hidden', background: 'var(--admin-surface-2)', flexShrink: 0 }}>
                        {post.featuredImage
                          ? <img src={post.featuredImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FileText size={16} color="var(--admin-text-dim)" /></div>}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--admin-text)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                          {post.title}
                          {post.featured && <Star size={11} color="#f59e0b" fill="#f59e0b" />}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--admin-text-dim)', marginTop: 2 }}>{new Date(post.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge badge-purple">{post.category}</span></td>
                  <td>{statusBadge(post.status)}</td>
                  <td><span style={{ fontSize: 13, color: 'var(--admin-text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}><Eye size={13} />{post.views}</span></td>
                  <td><span style={{ fontSize: 13, color: 'var(--admin-text-muted)' }}>{post.readTime} min</span></td>
                  <td>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                      {post.status === 'Draft' && (
                        <button className="btn-success-admin btn-admin" style={{ padding: '4px 10px', fontSize: 12 }}
                          onClick={() => update.mutate({ id: post._id, data: { status: 'Published' } })}>
                          <Globe size={12} /> Publish
                        </button>
                      )}
                      {post.status === 'Published' && (
                        <button className="btn-ghost-admin btn-admin" style={{ padding: '4px 10px', fontSize: 12 }}
                          onClick={() => update.mutate({ id: post._id, data: { status: 'Archived' } })}>
                          <Archive size={12} /> Archive
                        </button>
                      )}
                      <button className="btn-ghost-admin btn-admin" style={{ padding: '4px 8px' }} onClick={() => { setEditing(post); setModalOpen(true); }}><Edit2 size={13} /></button>
                      <button className="btn-danger-admin btn-admin" style={{ padding: '4px 8px' }} onClick={() => setDeleteId(post._id)}><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} title={editing ? 'Edit Post' : 'New Blog Post'} size="lg">
        <BlogForm
          initial={editing || undefined}
          onSave={(data) => editing ? update.mutate({ id: editing._id, data }) : create.mutate(data)}
          onCancel={() => { setModalOpen(false); setEditing(null); }}
          loading={create.isPending || update.isPending}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Blog Post"
        message="This will permanently delete the blog post. This action cannot be undone."
        onConfirm={() => deleteId && remove.mutate(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
