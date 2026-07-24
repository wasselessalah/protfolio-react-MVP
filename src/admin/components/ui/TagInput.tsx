// src/admin/components/ui/TagInput.tsx
import { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';

interface Props {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  label?: string;
}

export default function TagInput({ value, onChange, placeholder = 'Add item...', label }: Props) {
  const [input, setInput] = useState('');

  function add() {
    const trimmed = input.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInput('');
  }

  function remove(tag: string) {
    onChange(value.filter((t) => t !== tag));
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      add();
    }
    if (e.key === 'Backspace' && !input && value.length) {
      onChange(value.slice(0, -1));
    }
  }

  return (
    <div>
      {label && <label className="admin-label">{label}</label>}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 6, padding: '8px 10px',
        background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)',
        borderRadius: 8, cursor: 'text', minHeight: 42,
        transition: 'border-color 0.2s',
      }}
        onClick={(e) => (e.currentTarget.querySelector('input') as HTMLInputElement)?.focus()}
      >
        {value.map((tag) => (
          <span key={tag} style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            background: 'rgba(99,102,241,0.15)', color: 'var(--admin-primary)',
            border: '1px solid rgba(99,102,241,0.3)', borderRadius: 20,
            padding: '2px 10px', fontSize: 12, fontWeight: 500,
          }}>
            {tag}
            <button
              type="button"
              onClick={() => remove(tag)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: 0, lineHeight: 1, display: 'flex' }}
            >
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          onBlur={add}
          placeholder={value.length === 0 ? placeholder : ''}
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: 'var(--admin-text)', fontSize: 14, fontFamily: 'inherit',
            minWidth: 120, padding: '2px 4px',
          }}
        />
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); add(); }}
          disabled={!input.trim()}
          style={{
            background: 'var(--admin-primary)', color: 'white', border: 'none',
            borderRadius: 6, padding: '2px 10px', fontSize: 12, fontWeight: 500,
            cursor: input.trim() ? 'pointer' : 'not-allowed',
            opacity: input.trim() ? 1 : 0.5,
            transition: 'all 0.2s',
          }}
        >
          Add
        </button>
      </div>
      <p style={{ fontSize: 11, color: 'var(--admin-text-dim)', marginTop: 4 }}>Press Enter or comma to add</p>
    </div>
  );
}
