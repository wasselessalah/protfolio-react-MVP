// src/admin/pages/Socials.tsx
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { socialService } from '../services/api.service';
import { Social } from '../types';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Loader2, Share2, ExternalLink } from 'lucide-react';
import Modal from '../components/ui/Modal';
import ConfirmDialog from '../components/ui/ConfirmDialog';

function SocialForm({ initial, onSave, onCancel, loading }: {
  initial?: Partial<Social>;
  onSave: (data: Partial<Social>) => void;
  onCancel: () => void;
  loading?: boolean;
}) {
  const [form, setForm] = useState<Partial<Social>>(initial || {
    platform: '', url: '', icon: 'FiGithub', username: '', visible: true, displayOrder: 0,
  });

  function set<K extends keyof Social>(key: K, val: Social[K]) {
    setForm(p => ({ ...p, [key]: val }));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div className="grid-2" style={{ gap: 12 }}>
        <div>
          <label className="admin-label">Platform Name *</label>
          <input className="admin-input" value={form.platform || ''} onChange={(e) => set('platform', e.target.value)} placeholder="GitHub, LinkedIn..." required />
        </div>
        <div>
          <label className="admin-label">Username</label>
          <input className="admin-input" value={form.username || ''} onChange={(e) => set('username', e.target.value)} placeholder="@username" />
        </div>
      </div>

      <div>
        <label className="admin-label">Profile URL *</label>
        <input className="admin-input" type="url" value={form.url || ''} onChange={(e) => set('url', e.target.value)} placeholder="https://..." required />
      </div>

      <div className="grid-2" style={{ gap: 12 }}>
        <div>
          <label className="admin-label">Icon Name (React Icons)</label>
          <input className="admin-input" value={form.icon || ''} onChange={(e) => set('icon', e.target.value)} placeholder="FiGithub, FaLinkedin..." />
          <p style={{ fontSize: 11, color: 'var(--admin-text-dim)', marginTop: 4 }}>Must match a react-icons name (e.g. FiTwitter, FiInstagram)</p>
        </div>
        <div>
          <label className="admin-label">Display Order</label>
          <input className="admin-input" type="number" value={form.displayOrder ?? 0} onChange={(e) => set('displayOrder', Number(e.target.value))} />
        </div>
      </div>

      <label className="admin-toggle" style={{ marginTop: 8 }}>
        <input type="checkbox" checked={form.visible ?? true} onChange={(e) => set('visible', e.target.checked)} />
        <div className="admin-toggle-track"><div className="admin-toggle-thumb" /></div>
        <span style={{ marginLeft: 10, fontSize: 14, color: 'var(--admin-text-muted)' }}>Visible on website</span>
      </label>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
        <button className="btn-ghost-admin btn-admin" onClick={onCancel}>Cancel</button>
        <button className="btn-primary-admin btn-admin" onClick={() => onSave(form)} disabled={loading || !form.platform || !form.url}>
          {loading ? <Loader2 size={14} className="animate-spin" /> : null} Save Social Link
        </button>
      </div>
    </div>
  );
}

export default function SocialsPage() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Social | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-socials'],
    queryFn: socialService.getAll,
  });
  const items: Social[] = (data?.data as Social[]) || [];

  const create = useMutation({
    mutationFn: socialService.create,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-socials'] }); toast.success('Link added!'); setModalOpen(false); },
    onError: () => toast.error('Failed to add link'),
  });
  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Social> }) => socialService.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-socials'] }); toast.success('Link updated!'); setEditing(null); setModalOpen(false); },
    onError: () => toast.error('Failed to update'),
  });
  const remove = useMutation({
    mutationFn: socialService.delete,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-socials'] }); toast.success('Link deleted'); setDeleteId(null); },
    onError: () => toast.error('Failed to delete'),
  });

  return (
    <div className="fade-in">
      <div className="section-header">
        <div>
          <h1 className="section-title">Social Links</h1>
          <p className="section-subtitle">Manage your social media presence</p>
        </div>
        <button className="btn-primary-admin btn-admin" onClick={() => { setEditing(null); setModalOpen(true); }}>
          <Plus size={14} /> Add Link
        </button>
      </div>

      {isLoading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {[1,2,3,4].map(i => <div key={i} className="admin-card skeleton" style={{ height: 100 }} />)}
        </div>
      ) : items.length === 0 ? (
        <div className="admin-card empty-state">
          <Share2 className="empty-state-icon" size={48} />
          <div className="empty-state-title">No social links added</div>
          <button className="btn-primary-admin btn-admin" style={{ marginTop: 16 }} onClick={() => setModalOpen(true)}>
            <Plus size={14} /> Add Your First Link
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {items.map(item => (
            <div key={item._id} className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 16, color: 'var(--admin-text)' }}>{item.icon.substring(0,2) || '🔗'}</span>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--admin-text)' }}>{item.platform}</div>
                    <div style={{ fontSize: 12, color: 'var(--admin-text-muted)' }}>{item.username || item.platform}</div>
                  </div>
                </div>
                {!item.visible && <span className="badge badge-gray" style={{ fontSize: 10 }}>Hidden</span>}
              </div>
              
              <a href={item.url} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: 'var(--admin-primary)', display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
                <ExternalLink size={12} /> {item.url.replace(/^https?:\/\/(www\.)?/, '')}
              </a>

              <div style={{ display: 'flex', gap: 8, marginTop: 'auto', paddingTop: 12, borderTop: '1px solid var(--glass-border)' }}>
                <button className="btn-ghost-admin btn-admin" style={{ flex: 1, justifyContent: 'center', padding: '6px' }} onClick={() => { setEditing(item); setModalOpen(true); }}><Edit2 size={14} /></button>
                <button className="btn-danger-admin btn-admin" style={{ padding: '6px 12px' }} onClick={() => setDeleteId(item._id)}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} title={editing ? 'Edit Social Link' : 'Add Social Link'}>
        <SocialForm
          initial={editing || undefined}
          onSave={(data) => editing ? update.mutate({ id: editing._id, data }) : create.mutate(data)}
          onCancel={() => { setModalOpen(false); setEditing(null); }}
          loading={create.isPending || update.isPending}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Link"
        message="Are you sure you want to remove this social link?"
        onConfirm={() => deleteId && remove.mutate(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
