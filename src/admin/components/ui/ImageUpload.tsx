// src/admin/components/ui/ImageUpload.tsx
import { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { uploadService } from '../../services/api.service';
import toast from 'react-hot-toast';

interface Props {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  hint?: string;
  aspect?: string; // e.g. "16/9" or "1/1"
}

export default function ImageUpload({
  value,
  onChange,
  folder = 'portfolio/gallery',
  label,
  hint,
  aspect = '16/9',
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(value);

  async function handleFile(file: File) {
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be under 10MB');
      return;
    }
    // Local preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    setUploading(true);
    try {
      const response = await uploadService.upload(file, folder);
      const url = (response as { data: { url: string } }).data?.url || (response as { url: string }).url;
      onChange(url);
      setPreview(url);
      toast.success('Image uploaded!');
    } catch {
      toast.error('Upload failed. Please try again.');
      setPreview(value);
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function clear() {
    setPreview(undefined);
    onChange('');
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div>
      {label && <label className="admin-label">{label}</label>}
      <div
        style={{
          position: 'relative', borderRadius: 10, overflow: 'hidden',
          border: '2px dashed var(--glass-border)',
          transition: 'border-color 0.2s',
          aspectRatio: aspect.replace('/', ' / '),
          background: 'rgba(255,255,255,0.02)',
          cursor: uploading ? 'wait' : 'pointer',
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => !uploading && inputRef.current?.click()}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
              opacity: 0, transition: 'opacity 0.2s', display: 'flex',
              alignItems: 'center', justifyContent: 'center', gap: 12,
            }}
              className="image-overlay"
            >
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                className="btn-admin btn-ghost-admin"
                style={{ padding: '8px 16px' }}
              >
                <Upload size={14} /> Replace
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); clear(); }}
                className="btn-admin btn-danger-admin"
                style={{ padding: '8px 16px' }}
              >
                <X size={14} /> Remove
              </button>
            </div>
          </>
        ) : (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', height: '100%', gap: 8,
            color: 'var(--admin-text-dim)', padding: 20,
          }}>
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: 'var(--admin-primary)' }} />
                <span style={{ fontSize: 13 }}>Uploading...</span>
              </>
            ) : (
              <>
                <ImageIcon size={32} strokeWidth={1} />
                <span style={{ fontSize: 13, fontWeight: 500 }}>Drop image or click to upload</span>
                {hint && <span style={{ fontSize: 11 }}>{hint}</span>}
              </>
            )}
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
      />
      <style>{`.image-overlay:hover { opacity: 1 !important; } `}</style>
    </div>
  );
}
