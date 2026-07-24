// src/admin/pages/Messages.tsx
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messageService } from '../services/api.service';
import { Message } from '../types';
import toast from 'react-hot-toast';
import { Trash2, Loader2, Mail, MailOpen, Archive, Search, CheckCircle, Reply, AlertTriangle } from 'lucide-react';
import ConfirmDialog from '../components/ui/ConfirmDialog';

function MessageDetail({ message, onClose, onStatusChange, updating }: {
  message: Message;
  onClose: () => void;
  onStatusChange: (status: Message['status']) => void;
  updating: boolean;
}) {
  const [reply, setReply] = useState(message.reply || '');

  const statusColors: Record<Message['status'], string> = {
    unread: 'badge-blue', read: 'badge-gray', replied: 'badge-green', archived: 'badge-yellow', spam: 'badge-red',
  };

  return (
    <div style={{
      position: 'fixed', right: 0, top: 0, bottom: 0, width: 520,
      background: 'var(--admin-surface)', borderLeft: '1px solid var(--glass-border)',
      display: 'flex', flexDirection: 'column', zIndex: 60, boxShadow: '-20px 0 60px rgba(0,0,0,0.4)',
    }}>
      {/* Header */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--admin-text)', marginBottom: 4 }}>{message.subject}</div>
          <div style={{ fontSize: 13, color: 'var(--admin-text-muted)', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <span><strong style={{ color: 'var(--admin-text)' }}>{message.name}</strong> &lt;{message.email}&gt;</span>
            <span className={`badge ${statusColors[message.status]}`}>{message.status}</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--admin-text-dim)', marginTop: 4 }}>
            {new Date(message.createdAt).toLocaleString()}
          </div>
        </div>
        <button className="btn-ghost-admin btn-admin" style={{ padding: '6px 10px', flexShrink: 0 }} onClick={onClose}>✕</button>
      </div>

      {/* Message body */}
      <div style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: 16,
          border: '1px solid var(--glass-border)', fontSize: 14, color: 'var(--admin-text-muted)',
          lineHeight: 1.7, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
        }}>
          {message.message}
        </div>

        {message.reply && (
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--admin-primary)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Reply size={12} /> Your Reply {message.repliedAt && `· ${new Date(message.repliedAt).toLocaleDateString()}`}
            </div>
            <div style={{
              background: 'rgba(99,102,241,0.1)', borderRadius: 10, padding: 16,
              border: '1px solid rgba(99,102,241,0.2)', fontSize: 13, color: 'var(--admin-text-muted)',
              lineHeight: 1.7, whiteSpace: 'pre-wrap',
            }}>
              {message.reply}
            </div>
          </div>
        )}
      </div>

      {/* Reply + Actions */}
      <div style={{ padding: '16px 24px', borderTop: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div>
          <textarea
            className="admin-input"
            rows={3}
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Type your reply..."
            style={{ resize: 'vertical' }}
          />
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            className="btn-primary-admin btn-admin"
            disabled={!reply.trim() || updating}
            onClick={() => onStatusChange('replied')}
          >
            {updating ? <Loader2 size={13} className="animate-spin" /> : <Reply size={13} />} Send Reply
          </button>
          <button className="btn-ghost-admin btn-admin" onClick={() => onStatusChange('read')} disabled={updating}>
            <CheckCircle size={13} /> Mark Read
          </button>
          <button className="btn-ghost-admin btn-admin" onClick={() => onStatusChange('archived')} disabled={updating}>
            <Archive size={13} /> Archive
          </button>
          <button className="btn-ghost-admin btn-admin" onClick={() => onStatusChange('spam')} disabled={updating}>
            <AlertTriangle size={13} /> Spam
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MessagesPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['admin-messages', search, statusFilter],
    queryFn: () => messageService.getAll({ search: search || undefined, status: statusFilter || undefined }),
  });
  const messages: Message[] = (data?.data as Message[]) || [];
  const unreadCount = messages.filter(m => m.status === 'unread').length;

  const updateMsg = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Message> }) => messageService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-messages'] });
      toast.success('Message updated');
      if (selectedMsg) setSelectedMsg(prev => prev ? { ...prev, ...(updateMsg.variables as { id: string; data: Partial<Message> }).data } : null);
    },
    onError: () => toast.error('Failed to update message'),
  });

  const deleteMsg = useMutation({
    mutationFn: messageService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-messages'] });
      toast.success('Message deleted');
      setDeleteId(null);
      if (selectedMsg?._id === deleteId) setSelectedMsg(null);
    },
    onError: () => toast.error('Failed to delete'),
  });

  function handleSelect(msg: Message) {
    setSelectedMsg(msg);
    setReplyText(msg.reply || '');
    if (msg.status === 'unread') {
      updateMsg.mutate({ id: msg._id, data: { status: 'read' } });
    }
  }

  function handleStatusChange(status: Message['status']) {
    if (!selectedMsg) return;
    const update: Partial<Message> = { status };
    if (status === 'replied' && replyText.trim()) {
      update.reply = replyText;
      update.repliedAt = new Date().toISOString();
    }
    updateMsg.mutate({ id: selectedMsg._id, data: update });
  }

  const statusIcon = (status: Message['status']) => {
    if (status === 'unread') return <Mail size={14} color="var(--admin-info)" />;
    if (status === 'replied') return <Reply size={14} color="var(--admin-success)" />;
    if (status === 'archived') return <Archive size={14} color="var(--admin-warning)" />;
    if (status === 'spam') return <AlertTriangle size={14} color="var(--admin-danger)" />;
    return <MailOpen size={14} color="var(--admin-text-dim)" />;
  };

  return (
    <div className="fade-in" style={{ position: 'relative' }}>
      <div className="section-header">
        <div>
          <h1 className="section-title">Messages</h1>
          <p className="section-subtitle">{unreadCount} unread · {messages.length} total</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div className="admin-search" style={{ flex: 1, minWidth: 200 }}>
          <Search size={15} color="var(--admin-text-dim)" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search messages..." />
        </div>
        {(['', 'unread', 'read', 'replied', 'archived', 'spam'] as const).map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`btn-admin ${statusFilter === s ? 'btn-primary-admin' : 'btn-ghost-admin'}`}
            style={{ padding: '6px 12px', fontSize: 12, textTransform: 'capitalize' }}>
            {s === '' ? 'All' : s}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[1,2,3,4,5].map(i => <div key={i} className="admin-card skeleton" style={{ height: 64, margin: 0 }} />)}
        </div>
      ) : messages.length === 0 ? (
        <div className="admin-card empty-state">
          <Mail className="empty-state-icon" size={48} />
          <div className="empty-state-title">No messages yet</div>
          <p>Contact form submissions will appear here</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {messages.map(msg => (
            <div
              key={msg._id}
              onClick={() => handleSelect(msg)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
                borderRadius: 10, cursor: 'pointer', transition: 'all 0.15s',
                background: selectedMsg?._id === msg._id
                  ? 'rgba(99,102,241,0.1)'
                  : msg.status === 'unread' ? 'rgba(59,130,246,0.05)' : 'rgba(255,255,255,0.02)',
                border: selectedMsg?._id === msg._id
                  ? '1px solid rgba(99,102,241,0.3)'
                  : '1px solid var(--glass-border)',
              }}
            >
              <div style={{ flexShrink: 0 }}>{statusIcon(msg.status)}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{
                    fontWeight: msg.status === 'unread' ? 600 : 500,
                    fontSize: 13, color: 'var(--admin-text)',
                  }}>{msg.name}</span>
                  <span style={{ fontSize: 11, color: 'var(--admin-text-dim)' }}>·</span>
                  <span style={{ fontSize: 12, color: 'var(--admin-text-muted)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {msg.subject}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--admin-text-dim)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {msg.message.slice(0, 80)}{msg.message.length > 80 ? '...' : ''}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                <span style={{ fontSize: 11, color: 'var(--admin-text-dim)' }}>
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
                <button
                  className="btn-danger-admin btn-admin"
                  style={{ padding: '4px 8px' }}
                  onClick={(e) => { e.stopPropagation(); setDeleteId(msg._id); }}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Panel */}
      {selectedMsg && (
        <>
          <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 55 }}
            onClick={() => setSelectedMsg(null)}
          />
          <MessageDetail
            message={selectedMsg}
            onClose={() => setSelectedMsg(null)}
            onStatusChange={handleStatusChange}
            updating={updateMsg.isPending}
          />
        </>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Message"
        message="Are you sure you want to permanently delete this message?"
        onConfirm={() => deleteId && deleteMsg.mutate(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
