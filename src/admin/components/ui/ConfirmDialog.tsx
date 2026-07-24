// src/admin/components/ui/ConfirmDialog.tsx
import { Trash2, AlertTriangle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}

export default function ConfirmDialog({
  isOpen,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  onConfirm,
  onCancel,
  danger = true,
}: Props) {
  if (!isOpen) return null;
  return (
    <div className="admin-modal-overlay" onClick={onCancel}>
      <div className="admin-modal" style={{ maxWidth: 420 }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: danger ? 'rgba(239,68,68,0.12)' : 'rgba(99,102,241,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            {danger ? <AlertTriangle size={22} color="var(--admin-danger)" /> : <AlertTriangle size={22} color="var(--admin-primary)" />}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--admin-text)' }}>{title}</div>
            <div style={{ fontSize: 13, color: 'var(--admin-text-muted)', marginTop: 2 }}>{message}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button className="btn-ghost-admin btn-admin" onClick={onCancel}>Cancel</button>
          <button
            className={`btn-admin ${danger ? 'btn-danger-admin' : 'btn-primary-admin'}`}
            onClick={onConfirm}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            {danger && <Trash2 size={14} />}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
