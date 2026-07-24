// src/admin/pages/Certificates.tsx
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { certificateService } from '../services/api.service';
import { Certificate } from '../types';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Loader2, Award, ExternalLink, Star } from 'lucide-react';
import Modal from '../components/ui/Modal';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import TagInput from '../components/ui/TagInput';
import ImageUpload from '../components/ui/ImageUpload';

function CertificateForm({ initial, onSave, onCancel, loading }: {
  initial?: Partial<Certificate>;
  onSave: (data: Partial<Certificate>) => void;
  onCancel: () => void;
  loading?: boolean;
}) {
  const [form, setForm] = useState<Partial<Certificate>>(initial || {
    name: '', issuer: '', skills: [], featured: false, displayOrder: 0,
  });

  function set<K extends keyof Certificate>(key: K, val: Certificate[K]) {
    setForm(p => ({ ...p, [key]: val }));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <ImageUpload
        label="Certificate Image"
        value={form.image}
        onChange={(url) => set('image', url)}
        folder="portfolio/certificates"
        aspect="16/9"
        hint="Certificate preview image"
      />

      <div className="grid-2" style={{ gap: 12 }}>
        <div>
          <label className="admin-label">Certificate Name *</label>
          <input className="admin-input" value={form.name || ''} onChange={(e) => set('name', e.target.value)} required />
        </div>
        <div>
          <label className="admin-label">Issuer / Organization *</label>
          <input className="admin-input" value={form.issuer || ''} onChange={(e) => set('issuer', e.target.value)} required />
        </div>
      </div>

      <div className="grid-2" style={{ gap: 12 }}>
        <div>
          <label className="admin-label">Issue Date *</label>
          <input className="admin-input" type="date" value={form.issueDate ? form.issueDate.split('T')[0] : ''} onChange={(e) => set('issueDate', e.target.value)} />
        </div>
        <div>
          <label className="admin-label">Expiry Date (optional)</label>
          <input className="admin-input" type="date" value={form.expiryDate ? form.expiryDate.split('T')[0] : ''} onChange={(e) => set('expiryDate', e.target.value)} />
        </div>
      </div>

      <div className="grid-2" style={{ gap: 12 }}>
        <div>
          <label className="admin-label">Credential ID</label>
          <input className="admin-input" value={form.credentialId || ''} onChange={(e) => set('credentialId', e.target.value)} />
        </div>
        <div>
          <label className="admin-label">Credential URL</label>
          <input className="admin-input" type="url" value={form.credentialUrl || ''} onChange={(e) => set('credentialUrl', e.target.value)} placeholder="https://..." />
        </div>
      </div>

      <TagInput label="Skills Covered" value={form.skills || []} onChange={(v) => set('skills', v)} placeholder="React, TypeScript..." />

      <div className="grid-2" style={{ gap: 12 }}>
        <label className="admin-toggle">
          <input type="checkbox" checked={form.featured || false} onChange={(e) => set('featured', e.target.checked)} />
          <div className="admin-toggle-track"><div className="admin-toggle-thumb" /></div>
          <span style={{ marginLeft: 10, fontSize: 14, color: 'var(--admin-text-muted)' }}>Featured certificate</span>
        </label>
        <div>
          <label className="admin-label">Display Order</label>
          <input className="admin-input" type="number" value={form.displayOrder ?? 0} onChange={(e) => set('displayOrder', Number(e.target.value))} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
        <button className="btn-ghost-admin btn-admin" onClick={onCancel}>Cancel</button>
        <button className="btn-primary-admin btn-admin" onClick={() => onSave(form)} disabled={loading || !form.name || !form.issuer}>
          {loading ? <Loader2 size={14} className="animate-spin" /> : null} Save Certificate
        </button>
      </div>
    </div>
  );
}

export default function CertificatesPage() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Certificate | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-certificates'],
    queryFn: certificateService.getAll,
  });
  const items: Certificate[] = (data?.data as Certificate[]) || [];

  const create = useMutation({
    mutationFn: certificateService.create,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-certificates'] }); toast.success('Certificate added!'); setModalOpen(false); },
    onError: () => toast.error('Failed to add certificate'),
  });
  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Certificate> }) => certificateService.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-certificates'] }); toast.success('Certificate updated!'); setEditing(null); setModalOpen(false); },
    onError: () => toast.error('Failed to update'),
  });
  const remove = useMutation({
    mutationFn: certificateService.delete,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-certificates'] }); toast.success('Certificate deleted'); setDeleteId(null); },
    onError: () => toast.error('Failed to delete'),
  });

  return (
    <div className="fade-in">
      <div className="section-header">
        <div>
          <h1 className="section-title">Certificates</h1>
          <p className="section-subtitle">{items.length} certificate{items.length !== 1 ? 's' : ''}</p>
        </div>
        <button className="btn-primary-admin btn-admin" onClick={() => { setEditing(null); setModalOpen(true); }}>
          <Plus size={14} /> Add Certificate
        </button>
      </div>

      {isLoading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {[1,2,3].map(i => <div key={i} className="admin-card skeleton" style={{ height: 180 }} />)}
        </div>
      ) : items.length === 0 ? (
        <div className="admin-card empty-state">
          <Award className="empty-state-icon" size={48} />
          <div className="empty-state-title">No certificates added yet</div>
          <button className="btn-primary-admin btn-admin" style={{ marginTop: 16 }} onClick={() => setModalOpen(true)}>
            <Plus size={14} /> Add Certificate
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {items.map(item => (
            <div key={item._id} className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
              {item.image && (
                <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              <div style={{ padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--admin-text)' }}>{item.name}</span>
                      {item.featured && <Star size={12} color="#f59e0b" fill="#f59e0b" />}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--admin-primary)', marginTop: 2 }}>{item.issuer}</div>
                    <div style={{ fontSize: 11, color: 'var(--admin-text-muted)', marginTop: 4 }}>
                      {item.issueDate && new Date(item.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      {item.credentialId && <span> · #{item.credentialId}</span>}
                    </div>
                  </div>
                  {item.credentialUrl && (
                    <a href={item.credentialUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--admin-text-muted)', flexShrink: 0 }}>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
                {item.skills?.length > 0 && (
                  <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {item.skills.slice(0, 4).map(s => (
                      <span key={s} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 20, background: 'rgba(99,102,241,0.1)', color: 'var(--admin-primary)', border: '1px solid rgba(99,102,241,0.2)' }}>{s}</span>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <button className="btn-ghost-admin btn-admin" style={{ flex: 1, justifyContent: 'center' }} onClick={() => { setEditing(item); setModalOpen(true); }}><Edit2 size={13} /> Edit</button>
                  <button className="btn-danger-admin btn-admin" style={{ padding: '6px 10px' }} onClick={() => setDeleteId(item._id)}><Trash2 size={13} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} title={editing ? 'Edit Certificate' : 'Add Certificate'} size="lg">
        <CertificateForm
          initial={editing || undefined}
          onSave={(data) => editing ? update.mutate({ id: editing._id, data }) : create.mutate(data)}
          onCancel={() => { setModalOpen(false); setEditing(null); }}
          loading={create.isPending || update.isPending}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Certificate"
        message="Are you sure you want to delete this certificate?"
        onConfirm={() => deleteId && remove.mutate(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
