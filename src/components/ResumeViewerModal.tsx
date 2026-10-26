import React, { useState, useEffect } from 'react';
import { X, Download, ExternalLink, FileText, Image as ImageIcon } from 'lucide-react';

export interface ViewerDocument {
  title: string;
  subtitle?: string;
  url: string;
  type: 'pdf' | 'image';
  downloadFilename?: string;
  secondaryImages?: Array<{
    label: string;
    url: string;
  }>;
}

interface ResumeViewerModalProps {
  isOpen: boolean;
  document: ViewerDocument | null;
  onClose: () => void;
}

export const ResumeViewerModal: React.FC<ResumeViewerModalProps> = ({
  isOpen,
  document,
  onClose,
}) => {
  const [activeImageUrl, setActiveImageUrl] = useState<string>('');

  useEffect(() => {
    if (document) {
      setActiveImageUrl(document.url);
    }
  }, [document]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !document) return null;

  const currentUrl =
    document.type === 'image' && activeImageUrl ? activeImageUrl : document.url;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="document-modal-title"
    >
      {/* Click outside to close backdrop */}
      <div
        className="fixed inset-0 -z-10"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-5xl h-[90vh] bg-[#070B14] border border-[#38BDF8]/30 rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_35px_rgba(56,189,248,0.15)] flex flex-col">
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-white/10 bg-[#050811]">
          <div className="flex items-center gap-2.5 min-w-0">
            {document.type === 'pdf' ? (
              <FileText className="w-4 h-4 text-[#38BDF8] shrink-0" />
            ) : (
              <ImageIcon className="w-4 h-4 text-[#38BDF8] shrink-0" />
            )}
            <div className="truncate">
              <h2
                id="document-modal-title"
                className="text-sm sm:text-base font-bold text-white tracking-tight truncate font-display"
              >
                {document.title}
              </h2>
              {document.subtitle && (
                <p className="text-xs font-mono text-[#94A3B8] truncate">
                  {document.subtitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={currentUrl}
              download={document.downloadFilename || true}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-white bg-[#1D4ED8] hover:bg-[#2563EB] rounded-lg transition-colors whitespace-nowrap shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </a>
            <a
              href={currentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-[#CBD5E1] hover:text-white bg-[#0F172A] hover:bg-[#1E293B] border border-white/10 rounded-lg transition-colors whitespace-nowrap"
            >
              <span>New Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close document viewer"
              className="p-1.5 text-[#94A3B8] hover:text-white bg-[#0F172A] hover:bg-[#1E293B] border border-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Optional Multi-Image Switcher */}
        {document.secondaryImages && document.secondaryImages.length > 1 && (
          <div className="flex items-center gap-2 px-6 py-2 bg-[#060910] border-b border-white/5 overflow-x-auto text-xs font-mono">
            <span className="text-[#64748B] shrink-0 mr-1">Evidence Captures:</span>
            {document.secondaryImages.map((img) => (
              <button
                key={img.url}
                type="button"
                onClick={() => setActiveImageUrl(img.url)}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  activeImageUrl === img.url
                    ? 'bg-[#1D4ED8] text-white font-medium'
                    : 'bg-[#0E1626] text-[#94A3B8] hover:text-white'
                }`}
              >
                {img.label}
              </button>
            ))}
          </div>
        )}

        {/* Document Display Area */}
        <div className="flex-1 bg-[#030509] overflow-auto flex items-center justify-center p-3 sm:p-5">
          {document.type === 'pdf' ? (
            <iframe
              src={currentUrl}
              title={document.title}
              className="w-full h-full border-0 rounded-xl bg-[#080D1A]"
            />
          ) : (
            <img
              src={currentUrl}
              alt={document.title}
              className="max-w-full max-h-full object-contain rounded-xl border border-white/10 shadow-2xl"
            />
          )}
        </div>
      </div>
    </div>
  );
};
