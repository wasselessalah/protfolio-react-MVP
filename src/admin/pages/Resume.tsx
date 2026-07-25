// src/admin/pages/Resume.tsx
import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { resumeService } from '../services/api.service';
import { Resume } from '../types';
import toast from 'react-hot-toast';
import { FileText, Upload, Trash2, CheckCircle, Download, Loader2 } from 'lucide-react';
import ConfirmDialog from '../components/ui/ConfirmDialog';

export default function ResumePage() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-resumes'],
    queryFn: resumeService.getAll,
  });
  const resumes = (data?.data as Resume[]) || [];

  const uploadMutation = useMutation({
    mutationFn: resumeService.upload,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-resumes'] });
      toast.success('Resume uploaded successfully');
      if (fileInputRef.current) fileInputRef.current.value = '';
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to upload resume');
      if (fileInputRef.current) fileInputRef.current.value = '';
    },
  });

  const activateMutation = useMutation({
    mutationFn: resumeService.activate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-resumes'] });
      toast.success('Resume activated');
    },
    onError: () => toast.error('Failed to activate resume'),
  });

  const deleteMutation = useMutation({
    mutationFn: resumeService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-resumes'] });
      toast.success('Resume deleted');
      setDeleteId(null);
    },
    onError: () => toast.error('Failed to delete resume'),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      toast.error('Only PDF files are allowed');
      e.target.value = '';
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File must be less than 10MB');
      e.target.value = '';
      return;
    }

    uploadMutation.mutate(file);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="fade-in">
      <div className="section-header">
        <div>
          <h1 className="section-title">Resume / CV</h1>
          <p className="section-subtitle">Manage your downloadable resume files</p>
        </div>
        <button
          className="btn-primary-admin btn-admin"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploadMutation.isPending}
        >
          {uploadMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
          Upload New CV (PDF)
        </button>
        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>

      <div className="admin-card overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center p-8"><Loader2 className="animate-spin text-indigo-500" /></div>
        ) : resumes.length === 0 ? (
          <div className="empty-state">
            <FileText className="empty-state-icon mx-auto" />
            <div className="empty-state-title">No resumes found</div>
            <p>Upload your first PDF resume to get started.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Size</th>
                <th>Uploaded</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {resumes.map((resume) => (
                <tr key={resume._id} style={{ opacity: resume.isActive ? 1 : 0.6 }}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${resume.isActive ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-400'}`}>
                        <FileText size={18} />
                      </div>
                      <div>
                        <div className="font-semibold text-white">{resume.originalName}</div>
                        <div className="text-xs text-slate-400 font-mono">{resume.filename}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-sm text-slate-400">{formatSize(resume.size)}</td>
                  <td className="text-sm text-slate-400">
                    {new Date(resume.uploadedAt).toLocaleDateString()}
                  </td>
                  <td>
                    {resume.isActive ? (
                      <span className="badge badge-green flex items-center gap-1 w-max">
                        <CheckCircle size={12} /> Active
                      </span>
                    ) : (
                      <span className="badge badge-gray w-max">Archived</span>
                    )}
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-2">
                      {!resume.isActive && (
                        <button
                          onClick={() => activateMutation.mutate(resume._id)}
                          title="Set as Active"
                          className="p-1.5 text-slate-400 hover:text-green-400 rounded hover:bg-green-500/10 transition-colors"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                      <a
                        href={resume.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Download / View"
                        className="p-1.5 text-slate-400 hover:text-blue-400 rounded hover:bg-blue-500/10 transition-colors"
                      >
                        <Download size={16} />
                      </a>
                      <button
                        onClick={() => setDeleteId(resume._id)}
                        title="Delete"
                        className="p-1.5 text-red-400 hover:text-red-300 rounded hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Resume"
        message="Are you sure you want to delete this resume? If it is active, the next most recent one will become active."
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
