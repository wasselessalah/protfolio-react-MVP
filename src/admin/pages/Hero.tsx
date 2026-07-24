// src/admin/pages/Hero.tsx
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { heroService } from '../services/api.service';
import { Hero } from '../types';
import toast from 'react-hot-toast';
import { Save, Zap, RefreshCw } from 'lucide-react';
import TagInput from '../components/ui/TagInput';

type FormData = Partial<Hero>;

export default function HeroPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-hero'],
    queryFn: heroService.get,
  });

  const hero = data?.data;
  const [form, setForm] = useState<FormData>({});
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (hero) setForm(hero);
  }, [hero]);

  const mutation = useMutation({
    mutationFn: (body: FormData) => heroService.update(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-hero'] });
      toast.success('Hero section updated!');
      setDirty(false);
    },
    onError: () => toast.error('Failed to update Hero section'),
  });

  function set<K extends keyof FormData>(key: K, val: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: val }));
    setDirty(true);
  }

  if (isLoading) {
    return <div className="fade-in"><div className="admin-card skeleton" style={{ height: 400 }} /></div>;
  }

  return (
    <div className="fade-in">
      <div className="section-header">
        <div>
          <h1 className="section-title">Hero Section</h1>
          <p className="section-subtitle">Customize your portfolio's hero / landing section</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {dirty && (
            <button className="btn-ghost-admin btn-admin" onClick={() => { setForm(hero || {}); setDirty(false); }}>
              <RefreshCw size={14} /> Discard
            </button>
          )}
          <button
            className="btn-primary-admin btn-admin"
            onClick={() => mutation.mutate(form)}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" /> Saving...</> : <><Save size={14} /> Save Changes</>}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Main Content */}
        <div className="admin-card">
          <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--admin-text)' }}>
            <Zap size={16} style={{ color: 'var(--admin-primary)' }} /> Hero Content
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="grid-2" style={{ gap: 16 }}>
              <div>
                <label className="admin-label">Greeting Text</label>
                <input className="admin-input" value={form.greeting || ''} onChange={(e) => set('greeting', e.target.value)} placeholder="Hello, I'm" />
              </div>
              <div>
                <label className="admin-label">Name *</label>
                <input className="admin-input" value={form.name || ''} onChange={(e) => set('name', e.target.value)} placeholder="Your Name" />
              </div>
            </div>
            <TagInput
              label="Animated Titles (will rotate)"
              value={form.titles || []}
              onChange={(v) => set('titles', v)}
              placeholder="Full Stack Developer, React Expert..."
            />
            <div>
              <label className="admin-label">Description / Tagline</label>
              <textarea
                className="admin-input"
                rows={3}
                value={form.description || ''}
                onChange={(e) => set('description', e.target.value)}
                style={{ resize: 'vertical' }}
                placeholder="A compelling description about yourself and what you do"
              />
            </div>
            <TagInput
              label="Badges (shown under your name)"
              value={form.badges || []}
              onChange={(v) => set('badges', v)}
              placeholder="Open to Work, Available, etc."
            />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="admin-card">
          <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 20, color: 'var(--admin-text)' }}>
            🔗 Call-to-Action Buttons
          </h2>
          <div className="grid-2" style={{ gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div>
                <label className="admin-label">Primary Button Text</label>
                <input className="admin-input" value={form.ctaPrimary || ''} onChange={(e) => set('ctaPrimary', e.target.value)} placeholder="View Projects" />
              </div>
              <div>
                <label className="admin-label">Primary Button URL</label>
                <input className="admin-input" value={form.ctaPrimaryUrl || ''} onChange={(e) => set('ctaPrimaryUrl', e.target.value)} placeholder="#projects or /projects" />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div>
                <label className="admin-label">Secondary Button Text</label>
                <input className="admin-input" value={form.ctaSecondary || ''} onChange={(e) => set('ctaSecondary', e.target.value)} placeholder="Download CV" />
              </div>
              <div>
                <label className="admin-label">Secondary Button URL</label>
                <input className="admin-input" value={form.ctaSecondaryUrl || ''} onChange={(e) => set('ctaSecondaryUrl', e.target.value)} placeholder="#contact or /resume" />
              </div>
            </div>
          </div>
        </div>

        {/* Background */}
        <div className="admin-card">
          <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16, color: 'var(--admin-text)' }}>
            🎨 Background Style
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {(['aurora', 'gradient', 'particles', 'none'] as Hero['backgroundType'][]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => set('backgroundType', type)}
                style={{
                  padding: '14px 10px', borderRadius: 10, border: '2px solid',
                  borderColor: form.backgroundType === type ? 'var(--admin-primary)' : 'var(--glass-border)',
                  background: form.backgroundType === type ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.02)',
                  color: form.backgroundType === type ? 'var(--admin-primary)' : 'var(--admin-text-muted)',
                  cursor: 'pointer', fontWeight: 600, textTransform: 'capitalize', fontSize: 14,
                  transition: 'all 0.2s',
                }}
              >
                {type === 'aurora' ? '🌌' : type === 'gradient' ? '🎨' : type === 'particles' ? '✨' : '⬛'}
                <br />{type}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
