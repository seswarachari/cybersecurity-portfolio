import React from 'react';
import { ArrowUp, Shield, FileText } from 'lucide-react';
import type { ProfileData } from '../utils/portfolioLogic';

interface FooterProps {
  profile: ProfileData;
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 bg-[#020306] border-t border-white/5 text-[#94A3B8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Wordmark & Status */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#0A0F1D] border border-white/10 text-white font-mono font-bold text-xs">
              <span className="text-[#38BDF8]">S</span>.
            </div>
            <div>
              <div className="font-display font-bold text-sm text-white">
                {profile.fullName}
              </div>
              <div className="text-[10px] font-mono text-[#64748B]">
                Blue Team Defense · SOC Operations · Threat Hunting
              </div>
            </div>
          </div>

          {/* Operational Beacon */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#080D1A] border border-white/5 text-[11px] font-mono text-[#94A3B8]">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>ALL SYSTEMS GREEN // DEFCON 5</span>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <button
              type="button"
              onClick={onOpenResume}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Résumé (PDF)</span>
            </button>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#38BDF8]" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-[#64748B]">
          <span>
            © {new Date().getFullYear()} {profile.fullName}. Crafted with precision and human intent.
          </span>
          <span>
            B.Tech Cyber Security · CompTIA CSAP, CySA+, Security+
          </span>
        </div>
      </div>
    </footer>
  );
};
