// src/admin/pages/Education.tsx
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { educationService } from '../services/api.service';
import { Education } from '../types';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Loader2, GraduationCap, MapPin, Calendar } from 'lucide-react';
import Modal from '../components/ui/Modal';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import TagInput from '../components/ui/TagInput';
import ImageUpload from '../components/ui/ImageUpload';

function EducationForm({ initial, onSave, onCancel, loading }: {
  initial?: Partial<Education>;
  onSave: (data: Partial<Education>) => void;
  onCancel: () => void;
  loading?: boolean;
}) {
  const [form, setForm] = useState<Partial<Education>>(initial || {
    institution: '', degree: '', field: '', location: '', description: '',
    current: false, activities: [], displayOrder: 0,
  });

  function set<K extends keyof Education>(key: K, val: Education[K]) {
    setForm(p => ({ ...p, [key]: val }));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <ImageUpload
        label="Institution Logo"
        value={form.logo}
        onChange={(url) => set('logo', url)}
        folder="portfolio/education"
        aspect="1/1"
        hint="Square logo recommended"
      />

      <div className="grid-2" style={{ gap: 12 }}>
        <div>
          <label className="admin-label">Institution *</label>
          <input className="admin-input" value={form.institution || ''} onChange={(e) => set('institution', e.target.value)} required />
        </div>
        <div>
          <label className="admin-label">Degree *</label>
          <input className="admin-input" value={form.degree || ''} onChange={(e) => set('degree', e.target.value)} placeholder="Bachelor's, Master's..." required />
        </div>
      </div>

      <div className="grid-2" style={{ gap: 12 }}>
        <div>
          <label className="admin-label">Field of Study *</label>
          <input className="admin-input" value={form.field || ''} onChange={(e) => set('field', e.target.value)} placeholder="Computer Science..." required />
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

      <div className="grid-2" style={{ gap: 12 }}>
        <label className="admin-toggle">
          <input type="checkbox" checked={form.current || false} onChange={(e) => { set('current', e.target.checked); if (e.target.checked) set('endDate', undefined); }} />
          <div className="admin-toggle-track"><div className="admin-toggle-thumb" /></div>
          <span style={{ marginLeft: 10, fontSize: 14, color: 'var(--admin-text-muted)' }}>Currently studying</span>
        </label>
        <div>
          <label className="admin-label">Grade / GPA (optional)</label>
          <input className="admin-input" value={form.grade || ''} onChange={(e) => set('grade', e.target.value)} placeholder="3.8/4.0, Distinction..." />
        </div>
      </div>

      <div>
        <label className="admin-label">Description</label>
        <textarea className="admin-input" rows={3} value={form.description || ''} onChange={(e) => set('description', e.target.value)} style={{ resize: 'vertical' }} />
      </div>

      <TagInput label="Activities & Clubs" value={form.activities || []} onChange={(v) => set('activities', v)} placeholder="Programming Club, Research..." />

      <div>
        <label className="admin-label">Display Order</label>
        <input className="admin-input" type="number" value={form.displayOrder ?? 0} onChange={(e) => set('displayOrder', Number(e.target.value))} />
      </div>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
        <button className="btn-ghost-admin btn-admin" onClick={onCancel}>Cancel</button>
        <button className="btn-primary-admin btn-admin" onClick={() => onSave(form)} disabled={loading || !form.institution || !form.degree}>
          {loading ? <Loader2 size={14} className="animate-spin" /> : null} Save Education
        </button>
      </div>
    </div>
  );
}

export default function EducationPage() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Education | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-education'],
    queryFn: educationService.getAll,
  });
  const items: Education[] = (data?.data as Education[]) || [];

  const create = useMutation({
    mutationFn: educationService.create,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-education'] }); toast.success('Education entry added!'); setModalOpen(false); },
    onError: () => toast.error('Failed to add education'),
  });
  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Education> }) => educationService.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-education'] }); toast.success('Education updated!'); setEditing(null); setModalOpen(false); },
    onError: () => toast.error('Failed to update'),
  });
  const remove = useMutation({
    mutationFn: educationService.delete,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-education'] }); toast.success('Education deleted'); setDeleteId(null); },
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
          <h1 className="section-title">Education</h1>
          <p className="section-subtitle">{items.length} education entr{items.length !== 1 ? 'ies' : 'y'}</p>
        </div>
        <button className="btn-primary-admin btn-admin" onClick={() => { setEditing(null); setModalOpen(true); }}>
          <Plus size={14} /> Add Education
        </button>
      </div>

      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[1,2].map(i => <div key={i} className="admin-card skeleton" style={{ height: 100 }} />)}
        </div>
      ) : items.length === 0 ? (
        <div className="admin-card empty-state">
          <GraduationCap className="empty-state-icon" size={48} />
          <div className="empty-state-title">No education added yet</div>
          <button className="btn-primary-admin btn-admin" style={{ marginTop: 16 }} onClick={() => setModalOpen(true)}>
            <Plus size={14} /> Add Education
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
                {item.logo ? <img src={item.logo} alt={item.institution} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <GraduationCap size={20} color="var(--admin-text-dim)" />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 600, fontSize: 15, color: 'var(--admin-text)' }}>{item.degree} in {item.field}</span>
                  {item.current && <span className="badge badge-green" style={{ fontSize: 11 }}>Current</span>}
                </div>
                <div style={{ fontSize: 13, color: 'var(--admin-primary)', marginTop: 2 }}>{item.institution}</div>
                <div style={{ fontSize: 12, color: 'var(--admin-text-muted)', marginTop: 4, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {item.location && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={11} />{item.location}</span>}
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Calendar size={11} /> {formatDate(item.startDate)} – {item.current ? 'Present' : formatDate(item.endDate)}
                  </span>
                  {item.grade && <span>Grade: {item.grade}</span>}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                <button className="btn-ghost-admin btn-admin" style={{ padding: '6px 10px' }} onClick={() => { setEditing(item); setModalOpen(true); }}><Edit2 size={14} /></button>
                <button className="btn-danger-admin btn-admin" style={{ padding: '6px 10px' }} onClick={() => setDeleteId(item._id)}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} title={editing ? 'Edit Education' : 'Add Education'} size="lg">
        <EducationForm
          initial={editing || undefined}
          onSave={(data) => editing ? update.mutate({ id: editing._id, data }) : create.mutate(data)}
          onCancel={() => { setModalOpen(false); setEditing(null); }}
          loading={create.isPending || update.isPending}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Education Entry"
        message="Are you sure you want to delete this education entry?"
        onConfirm={() => deleteId && remove.mutate(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
