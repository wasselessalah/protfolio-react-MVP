// src/admin/pages/About.tsx
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { aboutService } from '../services/api.service';
import { About } from '../types';
import toast from 'react-hot-toast';
import { Save, User, Mail, Phone, MapPin, Briefcase, BookOpen, RefreshCw } from 'lucide-react';
import TagInput from '../components/ui/TagInput';
import ImageUpload from '../components/ui/ImageUpload';

type FormData = Partial<About>;

export default function AboutPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-about'],
    queryFn: aboutService.get,
  });

  const about = data?.data;

  const [form, setForm] = useState<FormData>({});
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (about) {
      setForm(about);
    }
  }, [about]);

  const mutation = useMutation({
    mutationFn: (body: FormData) => aboutService.update(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-about'] });
      toast.success('Profile updated successfully!');
      setDirty(false);
    },
    onError: () => toast.error('Failed to update profile'),
  });

  function set<K extends keyof FormData>(key: K, val: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: val }));
    setDirty(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate(form);
  }

  if (isLoading) {
    return (
      <div className="fade-in">
        <div className="section-header"><div className="skeleton" style={{ height: 28, width: 180 }} /></div>
        {[1,2,3].map(i => <div key={i} className="admin-card skeleton" style={{ height: 120, marginBottom: 16 }} />)}
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="section-header">
        <div>
          <h1 className="section-title">Profile / About</h1>
          <p className="section-subtitle">Manage your professional profile information</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {dirty && (
            <button className="btn-ghost-admin btn-admin" onClick={() => { setForm(about || {}); setDirty(false); }}>
              <RefreshCw size={14} /> Discard
            </button>
          )}
          <button
            form="about-form"
            type="submit"
            className="btn-primary-admin btn-admin"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" /> Saving...</> : <><Save size={14} /> Save Changes</>}
          </button>
        </div>
      </div>

      <form id="about-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Identity */}
        <div className="admin-card">
          <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--admin-text)' }}>
            <User size={16} style={{ color: 'var(--admin-primary)' }} /> Identity
          </h2>
          <div className="grid-3" style={{ gap: 16 }}>
            <div>
              <label className="admin-label">Full Name *</label>
              <input className="admin-input" value={form.name || ''} onChange={(e) => set('name', e.target.value)} required />
            </div>
            <div>
              <label className="admin-label">Professional Title *</label>
              <input className="admin-input" value={form.title || ''} onChange={(e) => set('title', e.target.value)} required />
            </div>
            <div>
              <label className="admin-label">Subtitle / Tagline</label>
              <input className="admin-input" value={form.subtitle || ''} onChange={(e) => set('subtitle', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="admin-card">
          <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 20, color: 'var(--admin-text)' }}>
            📸 Photos
          </h2>
          <div className="grid-2" style={{ gap: 20 }}>
            <div>
              <ImageUpload
                label="Profile Photo"
                value={form.avatar}
                onChange={(url) => set('avatar', url)}
                folder="portfolio/about"
                aspect="1/1"
                hint="Square image recommended"
              />
              {form.avatar && (
                <div style={{ marginTop: 8 }}>
                  <label className="admin-label">Or paste URL</label>
                  <input className="admin-input" value={form.avatar} onChange={(e) => set('avatar', e.target.value)} />
                </div>
              )}
            </div>
            <div>
              <ImageUpload
                label="Cover / Banner Image"
                value={form.coverImage}
                onChange={(url) => set('coverImage', url)}
                folder="portfolio/about"
                aspect="16/9"
                hint="16:9 ratio recommended"
              />
              {form.coverImage && (
                <div style={{ marginTop: 8 }}>
                  <label className="admin-label">Or paste URL</label>
                  <input className="admin-input" value={form.coverImage} onChange={(e) => set('coverImage', e.target.value)} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="admin-card">
          <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--admin-text)' }}>
            <Mail size={16} style={{ color: 'var(--admin-primary)' }} /> Contact Information
          </h2>
          <div className="grid-3" style={{ gap: 16 }}>
            <div>
              <label className="admin-label"><Mail size={12} style={{ display: 'inline', marginRight: 4 }} />Email</label>
              <input className="admin-input" type="email" value={form.email || ''} onChange={(e) => set('email', e.target.value)} />
            </div>
            <div>
              <label className="admin-label"><Phone size={12} style={{ display: 'inline', marginRight: 4 }} />Phone</label>
              <input className="admin-input" type="tel" value={form.phone || ''} onChange={(e) => set('phone', e.target.value)} />
            </div>
            <div>
              <label className="admin-label"><MapPin size={12} style={{ display: 'inline', marginRight: 4 }} />Location</label>
              <input className="admin-input" value={form.location || ''} onChange={(e) => set('location', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Bios */}
        <div className="admin-card">
          <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--admin-text)' }}>
            <BookOpen size={16} style={{ color: 'var(--admin-primary)' }} /> Bio & Description
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label className="admin-label">Short Bio</label>
              <textarea
                className="admin-input"
                rows={2}
                value={form.shortBio || ''}
                onChange={(e) => set('shortBio', e.target.value)}
                style={{ resize: 'vertical' }}
                placeholder="A brief one-liner about yourself"
              />
            </div>
            <div>
              <label className="admin-label">Long Bio / About Me</label>
              <textarea
                className="admin-input"
                rows={8}
                value={form.longBio || ''}
                onChange={(e) => set('longBio', e.target.value)}
                style={{ resize: 'vertical' }}
                placeholder="Write your full story. Separate paragraphs with blank lines."
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="admin-card">
          <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--admin-text)' }}>
            <Briefcase size={16} style={{ color: 'var(--admin-primary)' }} /> Professional Info
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="grid-3" style={{ gap: 16 }}>
              <div>
                <label className="admin-label">Years of Experience</label>
                <input className="admin-input" value={form.yearsOfExperience || ''} onChange={(e) => set('yearsOfExperience', e.target.value)} placeholder="e.g. 3+" />
              </div>
              <div>
                <label className="admin-label">Total Projects</label>
                <input className="admin-input" value={form.totalProjects || ''} onChange={(e) => set('totalProjects', e.target.value)} placeholder="e.g. 20+" />
              </div>
              <div>
                <label className="admin-label">Availability</label>
                <select className="admin-input" value={form.availability || 'Available'} onChange={(e) => set('availability', e.target.value as About['availability'])}>
                  <option value="Available">Available</option>
                  <option value="Busy">Busy</option>
                  <option value="Not Available">Not Available</option>
                </select>
              </div>
            </div>
            <div>
              <label className="admin-label">Resume URL</label>
              <input className="admin-input" type="url" value={form.resumeUrl || ''} onChange={(e) => set('resumeUrl', e.target.value)} placeholder="https://..." />
            </div>
            <TagInput
              label="Technologies / Tech Stack"
              value={form.technologies || []}
              onChange={(v) => set('technologies', v)}
              placeholder="React, TypeScript, Node.js..."
            />
          </div>
        </div>
      </form>
    </div>
  );
}
