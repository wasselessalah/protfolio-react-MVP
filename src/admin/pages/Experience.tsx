// src/admin/pages/Experience.tsx
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { experienceService } from '../services/api.service';
import { Experience } from '../types';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Loader2, Briefcase, MapPin, Calendar } from 'lucide-react';
import Modal from '../components/ui/Modal';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import TagInput from '../components/ui/TagInput';
import ImageUpload from '../components/ui/ImageUpload';

function ExperienceForm({ initial, onSave, onCancel, loading }: {
  initial?: Partial<Experience>;
  onSave: (data: Partial<Experience>) => void;
  onCancel: () => void;
  loading?: boolean;
}) {
  const [form, setForm] = useState<Partial<Experience>>(initial || {
    company: '', position: '', location: '', description: '',
    type: 'Full-time', current: false, technologies: [], achievements: [], displayOrder: 0,
  });

  function set<K extends keyof Experience>(key: K, val: Experience[K]) {
    setForm(p => ({ ...p, [key]: val }));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Company Logo */}
      <ImageUpload
        label="Company Logo"
        value={form.logo}
        onChange={(url) => set('logo', url)}
        folder="portfolio/experience"
        aspect="1/1"
        hint="Square logo recommended"
      />

      <div className="grid-2" style={{ gap: 12 }}>
        <div>
          <label className="admin-label">Company *</label>
          <input className="admin-input" value={form.company || ''} onChange={(e) => set('company', e.target.value)} required />
        </div>
        <div>
          <label className="admin-label">Position / Role *</label>
          <input className="admin-input" value={form.position || ''} onChange={(e) => set('position', e.target.value)} required />
        </div>
      </div>

      <div className="grid-2" style={{ gap: 12 }}>
        <div>
          <label className="admin-label">Type</label>
          <select className="admin-input" value={form.type || 'Full-time'} onChange={(e) => set('type', e.target.value as Experience['type'])}>
            {['Full-time', 'Part-time', 'Freelance', 'Internship', 'Contract'].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="admin-label">Location</label>
          <input className="admin-input" value={form.location || ''} onChange={(e) => set('location', e.target.value)} />
        </div>
      </div>

      <div className="grid-2" style={{ gap: 12 }}>
        <div>
          <label className="admin-label">Start Date *</label>
          <input className="admin-input" type="date" value={form.startDate ? form.startDate.split('T')[0] : ''} onChange={(e) => set('startDate', e.target.value)} />
        </div>
        <div>
          <label className="admin-label">End Date</label>
          <input className="admin-input" type="date" value={form.endDate ? form.endDate.split('T')[0] : ''} disabled={form.current} onChange={(e) => set('endDate', e.target.value)} />
        </div>
      </div>

      <label className="admin-toggle">
        <input type="checkbox" checked={form.current || false} onChange={(e) => { set('current', e.target.checked); if (e.target.checked) set('endDate', undefined); }} />
        <div className="admin-toggle-track"><div className="admin-toggle-thumb" /></div>
        <span style={{ marginLeft: 10, fontSize: 14, color: 'var(--admin-text-muted)' }}>Currently working here</span>
      </label>

      <div>
        <label className="admin-label">Description *</label>
        <textarea className="admin-input" rows={4} value={form.description || ''} onChange={(e) => set('description', e.target.value)} style={{ resize: 'vertical' }} />
      </div>

      <TagInput label="Technologies Used" value={form.technologies || []} onChange={(v) => set('technologies', v)} placeholder="React, Node.js..." />
      <TagInput label="Key Achievements" value={form.achievements || []} onChange={(v) => set('achievements', v)} placeholder="Increased performance by 40%..." />

      <div>
        <label className="admin-label">Display Order</label>
        <input className="admin-input" type="number" value={form.displayOrder ?? 0} onChange={(e) => set('displayOrder', Number(e.target.value))} />
      </div>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
        <button className="btn-ghost-admin btn-admin" onClick={onCancel}>Cancel</button>
        <button className="btn-primary-admin btn-admin" onClick={() => onSave(form)} disabled={loading || !form.company || !form.position}>
          {loading ? <Loader2 size={14} className="animate-spin" /> : null} Save Experience
        </button>
      </div>
    </div>
  );
}

export default function ExperiencePage() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-experience'],
    queryFn: () => experienceService.getAll(),
  });
  const items: Experience[] = (data?.data as Experience[]) || [];

  const create = useMutation({
    mutationFn: experienceService.create,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-experience'] }); toast.success('Experience added!'); setModalOpen(false); },
    onError: () => toast.error('Failed to add experience'),
  });
  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Experience> }) => experienceService.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-experience'] }); toast.success('Experience updated!'); setEditing(null); setModalOpen(false); },
    onError: () => toast.error('Failed to update experience'),
  });
  const remove = useMutation({
    mutationFn: experienceService.delete,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-experience'] }); toast.success('Experience deleted'); setDeleteId(null); },
    onError: () => toast.error('Failed to delete'),
  });

  function formatDate(d?: string) {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }

  return (
    <div className="fade-in">
      <div className="section-header">
        <div>
          <h1 className="section-title">Experience</h1>
          <p className="section-subtitle">{items.length} work experience{items.length !== 1 ? 's' : ''}</p>
        </div>
        <button className="btn-primary-admin btn-admin" onClick={() => { setEditing(null); setModalOpen(true); }}>
          <Plus size={14} /> Add Experience
        </button>
      </div>

      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[1,2,3].map(i => <div key={i} className="admin-card skeleton" style={{ height: 100 }} />)}
        </div>
      ) : items.length === 0 ? (
        <div className="admin-card empty-state">
          <Briefcase className="empty-state-icon" size={48} />
          <div className="empty-state-title">No experience added yet</div>
          <button className="btn-primary-admin btn-admin" style={{ marginTop: 16 }} onClick={() => setModalOpen(true)}>
            <Plus size={14} /> Add Experience
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map(item => (
            <div key={item._id} className="admin-card" style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{
                width: 48, height: 48, borderRadius: 10, flexShrink: 0,
                background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
              }}>
                {item.logo ? <img src={item.logo} alt={item.company} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <Briefcase size={20} color="var(--admin-text-dim)" />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 600, fontSize: 15, color: 'var(--admin-text)' }}>{item.position}</span>
                  <span style={{ fontSize: 13, color: 'var(--admin-primary)' }}>@ {item.company}</span>
                  <span className="badge badge-blue" style={{ fontSize: 11 }}>{item.type}</span>
                  {item.current && <span className="badge badge-green" style={{ fontSize: 11 }}>Current</span>}
                </div>
                <div style={{ fontSize: 12, color: 'var(--admin-text-muted)', marginTop: 4, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {item.location && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={11} />{item.location}</span>}
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Calendar size={11} /> {formatDate(item.startDate)} – {item.current ? 'Present' : formatDate(item.endDate)}
                  </span>
                </div>
                {item.technologies?.length > 0 && (
                  <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {item.technologies.slice(0, 6).map(t => (
                      <span key={t} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: 'rgba(99,102,241,0.1)', color: 'var(--admin-primary)', border: '1px solid rgba(99,102,241,0.2)' }}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                <button className="btn-ghost-admin btn-admin" style={{ padding: '6px 10px' }} onClick={() => { setEditing(item); setModalOpen(true); }}><Edit2 size={14} /></button>
                <button className="btn-danger-admin btn-admin" style={{ padding: '6px 10px' }} onClick={() => setDeleteId(item._id)}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} title={editing ? 'Edit Experience' : 'Add Experience'} size="lg">
        <ExperienceForm
          initial={editing || undefined}
          onSave={(data) => editing ? update.mutate({ id: editing._id, data }) : create.mutate(data)}
          onCancel={() => { setModalOpen(false); setEditing(null); }}
          loading={create.isPending || update.isPending}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Experience"
        message="Are you sure you want to delete this experience entry?"
        onConfirm={() => deleteId && remove.mutate(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
