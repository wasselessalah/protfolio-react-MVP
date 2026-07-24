// src/admin/pages/Skills.tsx
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { skillService } from '../services/api.service';
import { Skill, SkillCategory } from '../types';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Loader2, ChevronDown, ChevronUp, Star } from 'lucide-react';
import Modal from '../components/ui/Modal';
import ConfirmDialog from '../components/ui/ConfirmDialog';

// ─── Category Form ───────────────────────────────────────────────────────────
function CategoryForm({ initial, onSave, onCancel, loading }: {
  initial?: Partial<SkillCategory>;
  onSave: (data: Partial<SkillCategory>) => void;
  onCancel: () => void;
  loading?: boolean;
}) {
  const [form, setForm] = useState<Partial<SkillCategory>>(initial || {
    name: '', icon: '⚡', color: '#6366f1', bgColor: 'rgba(99,102,241,0.1)', displayOrder: 0,
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <label className="admin-label">Category Name *</label>
        <input className="admin-input" value={form.name || ''} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} required />
      </div>
      <div className="grid-2" style={{ gap: 12 }}>
        <div>
          <label className="admin-label">Icon (emoji)</label>
          <input className="admin-input" value={form.icon || ''} onChange={(e) => setForm(p => ({ ...p, icon: e.target.value }))} placeholder="⚡" />
        </div>
        <div>
          <label className="admin-label">Display Order</label>
          <input className="admin-input" type="number" value={form.displayOrder ?? 0} onChange={(e) => setForm(p => ({ ...p, displayOrder: Number(e.target.value) }))} />
        </div>
      </div>
      <div className="grid-2" style={{ gap: 12 }}>
        <div>
          <label className="admin-label">Color</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="color" value={form.color || '#6366f1'} onChange={(e) => setForm(p => ({ ...p, color: e.target.value }))} style={{ width: 42, height: 38, borderRadius: 6, border: '1px solid var(--glass-border)', cursor: 'pointer', background: 'none' }} />
            <input className="admin-input" value={form.color || ''} onChange={(e) => setForm(p => ({ ...p, color: e.target.value }))} style={{ flex: 1 }} />
          </div>
        </div>
        <div>
          <label className="admin-label">Background Color</label>
          <input className="admin-input" value={form.bgColor || ''} onChange={(e) => setForm(p => ({ ...p, bgColor: e.target.value }))} placeholder="rgba(99,102,241,0.1)" />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
        <button className="btn-ghost-admin btn-admin" onClick={onCancel}>Cancel</button>
        <button className="btn-primary-admin btn-admin" onClick={() => form.name && onSave(form)} disabled={loading || !form.name}>
          {loading ? <Loader2 size={14} className="animate-spin" /> : null} Save Category
        </button>
      </div>
    </div>
  );
}

// ─── Skill Form ───────────────────────────────────────────────────────────────
function SkillForm({ initial, categories, onSave, onCancel, loading }: {
  initial?: Partial<Skill>;
  categories: SkillCategory[];
  onSave: (data: Partial<Skill>) => void;
  onCancel: () => void;
  loading?: boolean;
}) {
  const [form, setForm] = useState<Partial<Skill>>(initial || {
    name: '', icon: '🔧', color: '#FFFFFF', level: 'Intermediate', percentage: 50,
    years: 1, projects: 0, featured: false, displayOrder: 0,
    categoryId: categories[0]?._id || '',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div className="grid-2" style={{ gap: 12 }}>
        <div>
          <label className="admin-label">Skill Name *</label>
          <input className="admin-input" value={form.name || ''} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} required />
        </div>
        <div>
          <label className="admin-label">Category *</label>
          <select className="admin-input" value={typeof form.categoryId === 'string' ? form.categoryId : (form.categoryId as SkillCategory)?._id || ''} onChange={(e) => setForm(p => ({ ...p, categoryId: e.target.value }))}>
            {categories.map(c => <option key={c._id} value={c._id}>{c.icon} {c.name}</option>)}
          </select>
        </div>
      </div>
      <div className="grid-2" style={{ gap: 12 }}>
        <div>
          <label className="admin-label">Icon (emoji or logo URL)</label>
          <input className="admin-input" value={form.icon || ''} onChange={(e) => setForm(p => ({ ...p, icon: e.target.value }))} />
        </div>
        <div>
          <label className="admin-label">Color</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="color" value={form.color || '#FFFFFF'} onChange={(e) => setForm(p => ({ ...p, color: e.target.value }))} style={{ width: 42, height: 38, borderRadius: 6, border: '1px solid var(--glass-border)', cursor: 'pointer', background: 'none' }} />
            <input className="admin-input" value={form.color || ''} onChange={(e) => setForm(p => ({ ...p, color: e.target.value }))} style={{ flex: 1 }} />
          </div>
        </div>
      </div>
      <div className="grid-3" style={{ gap: 12 }}>
        <div>
          <label className="admin-label">Level</label>
          <select className="admin-input" value={form.level || 'Intermediate'} onChange={(e) => setForm(p => ({ ...p, level: e.target.value as Skill['level'] }))}>
            {['Beginner','Intermediate','Advanced','Expert'].map(l => <option key={l}>{l}</option>)}
          </select>
        </div>
        <div>
          <label className="admin-label">Proficiency %</label>
          <input className="admin-input" type="number" min={0} max={100} value={form.percentage ?? 50} onChange={(e) => setForm(p => ({ ...p, percentage: Number(e.target.value) }))} />
        </div>
        <div>
          <label className="admin-label">Years Used</label>
          <input className="admin-input" type="number" min={0} value={form.years ?? 1} onChange={(e) => setForm(p => ({ ...p, years: Number(e.target.value) }))} />
        </div>
      </div>
      <div className="grid-2" style={{ gap: 12 }}>
        <div>
          <label className="admin-label">Projects Used In</label>
          <input className="admin-input" type="number" min={0} value={form.projects ?? 0} onChange={(e) => setForm(p => ({ ...p, projects: Number(e.target.value) }))} />
        </div>
        <div>
          <label className="admin-label">Display Order</label>
          <input className="admin-input" type="number" value={form.displayOrder ?? 0} onChange={(e) => setForm(p => ({ ...p, displayOrder: Number(e.target.value) }))} />
        </div>
      </div>
      <label className="admin-toggle">
        <input type="checkbox" checked={form.featured || false} onChange={(e) => setForm(p => ({ ...p, featured: e.target.checked }))} />
        <div className="admin-toggle-track"><div className="admin-toggle-thumb" /></div>
        <span style={{ marginLeft: 10, fontSize: 14, color: 'var(--admin-text-muted)' }}>Featured skill</span>
      </label>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
        <button className="btn-ghost-admin btn-admin" onClick={onCancel}>Cancel</button>
        <button className="btn-primary-admin btn-admin" onClick={() => form.name && onSave(form)} disabled={loading || !form.name}>
          {loading ? <Loader2 size={14} className="animate-spin" /> : null} Save Skill
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SkillsPage() {
  const queryClient = useQueryClient();
  const [catModalOpen, setCatModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<SkillCategory | null>(null);
  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'skill' | 'cat'; id: string } | null>(null);
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set());

  const { data: catData, isLoading: catLoading } = useQuery({
    queryKey: ['admin-skill-categories'],
    queryFn: skillService.getCategories,
  });
  const { data: skillData, isLoading: skillLoading } = useQuery({
    queryKey: ['admin-skills'],
    queryFn: () => skillService.getAll({ limit: 200 }),
  });

  const categories: SkillCategory[] = (catData?.data as SkillCategory[]) || [];
  const skills: Skill[] = (skillData?.data as Skill[]) || [];

  const createCat = useMutation({
    mutationFn: skillService.createCategory,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-skill-categories'] }); toast.success('Category created!'); setCatModalOpen(false); },
    onError: () => toast.error('Failed to create category'),
  });
  const updateCat = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<SkillCategory> }) => skillService.updateCategory(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-skill-categories'] }); toast.success('Category updated!'); setEditingCat(null); setCatModalOpen(false); },
    onError: () => toast.error('Failed to update category'),
  });
  const deleteCat = useMutation({
    mutationFn: (id: string) => skillService.deleteCategory(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-skill-categories', 'admin-skills'] }); toast.success('Category deleted'); setDeleteTarget(null); },
    onError: () => toast.error('Failed to delete category'),
  });
  const createSkill = useMutation({
    mutationFn: skillService.create,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-skills'] }); toast.success('Skill created!'); setSkillModalOpen(false); },
    onError: () => toast.error('Failed to create skill'),
  });
  const updateSkill = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Skill> }) => skillService.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-skills'] }); toast.success('Skill updated!'); setEditingSkill(null); setSkillModalOpen(false); },
    onError: () => toast.error('Failed to update skill'),
  });
  const deleteSkill = useMutation({
    mutationFn: (id: string) => skillService.delete(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-skills'] }); toast.success('Skill deleted'); setDeleteTarget(null); },
    onError: () => toast.error('Failed to delete skill'),
  });

  function toggleCat(id: string) {
    setExpandedCats(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const isLoading = catLoading || skillLoading;

  return (
    <div className="fade-in">
      <div className="section-header">
        <div>
          <h1 className="section-title">Skills</h1>
          <p className="section-subtitle">{skills.length} skills across {categories.length} categories</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-ghost-admin btn-admin" onClick={() => { setEditingCat(null); setCatModalOpen(true); }}>
            <Plus size={14} /> New Category
          </button>
          <button className="btn-primary-admin btn-admin" onClick={() => { setEditingSkill(null); setSkillModalOpen(true); }}>
            <Plus size={14} /> Add Skill
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="admin-card" style={{ textAlign: 'center', padding: 40 }}>
          <Loader2 className="animate-spin" style={{ margin: '0 auto', color: 'var(--admin-primary)' }} />
        </div>
      ) : categories.length === 0 ? (
        <div className="admin-card empty-state">
          <div className="empty-state-title">No categories yet</div>
          <p>Create your first skill category to get started</p>
          <button className="btn-primary-admin btn-admin" style={{ marginTop: 16 }} onClick={() => setCatModalOpen(true)}>
            <Plus size={14} /> Create Category
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {categories.map((cat) => {
            const catSkills = skills.filter(s => {
              const catId = typeof s.categoryId === 'string' ? s.categoryId : (s.categoryId as SkillCategory)?._id;
              return catId === cat._id;
            });
            const expanded = expandedCats.has(cat._id);

            return (
              <div key={cat._id} className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
                {/* Category Header */}
                <div
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '16px 20px', cursor: 'pointer',
                    borderBottom: expanded ? '1px solid var(--glass-border)' : 'none',
                  }}
                  onClick={() => toggleCat(cat._id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{
                      width: 38, height: 38, borderRadius: 10, display: 'flex',
                      alignItems: 'center', justifyContent: 'center', fontSize: 18,
                      background: cat.bgColor, border: `1px solid ${cat.color}30`,
                    }}>{cat.icon}</span>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--admin-text)', fontSize: 15 }}>{cat.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--admin-text-muted)' }}>{catSkills.length} skills</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button
                      className="btn-ghost-admin btn-admin" style={{ padding: '6px 10px' }}
                      onClick={(e) => { e.stopPropagation(); setEditingCat(cat); setCatModalOpen(true); }}
                    ><Edit2 size={14} /></button>
                    <button
                      className="btn-danger-admin btn-admin" style={{ padding: '6px 10px' }}
                      onClick={(e) => { e.stopPropagation(); setDeleteTarget({ type: 'cat', id: cat._id }); }}
                    ><Trash2 size={14} /></button>
                    {expanded ? <ChevronUp size={16} color="var(--admin-text-muted)" /> : <ChevronDown size={16} color="var(--admin-text-muted)" />}
                  </div>
                </div>

                {/* Skills List */}
                {expanded && (
                  <div style={{ padding: '12px 20px' }}>
                    {catSkills.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--admin-text-dim)', fontSize: 14 }}>
                        No skills in this category yet
                      </div>
                    ) : (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
                        {catSkills.map(skill => (
                          <div key={skill._id} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '10px 14px', borderRadius: 8,
                            background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)',
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <span style={{ fontSize: 20 }}>{skill.icon}</span>
                              <div>
                                <div style={{ fontWeight: 500, fontSize: 13, color: 'var(--admin-text)', display: 'flex', alignItems: 'center', gap: 4 }}>
                                  {skill.name}
                                  {skill.featured && <Star size={10} color="#f59e0b" fill="#f59e0b" />}
                                </div>
                                <div style={{ fontSize: 11, color: 'var(--admin-text-dim)' }}>
                                  {skill.level} • {skill.percentage}%
                                </div>
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: 4 }}>
                              <button className="btn-ghost-admin btn-admin" style={{ padding: '4px 8px' }}
                                onClick={() => { setEditingSkill(skill); setSkillModalOpen(true); }}>
                                <Edit2 size={12} />
                              </button>
                              <button className="btn-danger-admin btn-admin" style={{ padding: '4px 8px' }}
                                onClick={() => setDeleteTarget({ type: 'skill', id: skill._id })}>
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <button
                      className="btn-ghost-admin btn-admin"
                      style={{ marginTop: 12, fontSize: 13, padding: '6px 12px' }}
                      onClick={() => { setEditingSkill({ categoryId: cat._id } as Skill); setSkillModalOpen(true); }}
                    >
                      <Plus size={13} /> Add skill to {cat.name}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Category Modal */}
      <Modal isOpen={catModalOpen} onClose={() => { setCatModalOpen(false); setEditingCat(null); }}
        title={editingCat ? 'Edit Category' : 'New Skill Category'}>
        <CategoryForm
          initial={editingCat || undefined}
          onSave={(data) => editingCat ? updateCat.mutate({ id: editingCat._id, data }) : createCat.mutate(data)}
          onCancel={() => { setCatModalOpen(false); setEditingCat(null); }}
          loading={createCat.isPending || updateCat.isPending}
        />
      </Modal>

      {/* Skill Modal */}
      <Modal isOpen={skillModalOpen} onClose={() => { setSkillModalOpen(false); setEditingSkill(null); }}
        title={editingSkill?._id ? 'Edit Skill' : 'Add Skill'}>
        <SkillForm
          initial={editingSkill || undefined}
          categories={categories}
          onSave={(data) => editingSkill?._id ? updateSkill.mutate({ id: editingSkill._id, data }) : createSkill.mutate(data)}
          onCancel={() => { setSkillModalOpen(false); setEditingSkill(null); }}
          loading={createSkill.isPending || updateSkill.isPending}
        />
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title={`Delete ${deleteTarget?.type === 'cat' ? 'Category' : 'Skill'}`}
        message={deleteTarget?.type === 'cat'
          ? 'This will delete the category. Skills in this category will become uncategorized.'
          : 'Are you sure you want to delete this skill?'}
        confirmText="Delete"
        onConfirm={() => {
          if (!deleteTarget) return;
          if (deleteTarget.type === 'cat') deleteCat.mutate(deleteTarget.id);
          else deleteSkill.mutate(deleteTarget.id);
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
