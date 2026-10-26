import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Award,
  FileCheck2,
  Sparkles,
  ArrowUpRight,
  Eye,
} from 'lucide-react';
import { INITIAL_SKILLS } from '../data/blueTeamData';
import type { CertificationItem, ProfileData } from '../utils/portfolioLogic';
import type { ViewerDocument } from './ResumeViewerModal';

interface SkillsCertSectionProps {
  profile: ProfileData;
  certifications: CertificationItem[];
  onOpenViewerDoc: (doc: ViewerDocument) => void;
}

export const SkillsCertSection: React.FC<SkillsCertSectionProps> = ({
  profile,
  certifications,
  onOpenViewerDoc,
}) => {
  const reduceMotion = useReducedMotion();

  const handleOpenCertificate = (cert: CertificationItem) => {
    onOpenViewerDoc({
      title: `${cert.name} (${cert.code})`,
      subtitle: `${cert.issuer} · Credential ID: ${cert.credentialId}`,
      url: cert.certificateAssetUrl || cert.previewImageUrl,
      type: cert.assetType || (cert.certificateAssetUrl?.endsWith('.pdf') ? 'pdf' : 'image'),
      downloadFilename: `${cert.code}_Certificate.pdf`,
    });
  };

  return (
    <section id="skills" className="relative py-24 sm:py-32 bg-[#05070D] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#38BDF8] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
              <span>02 // Verified industry credentials &amp; core skills</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
              What I bring to <br />
              <span className="text-gradient-cyan">a security team.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl leading-relaxed">
              Spotting real threats · Cutting through false alarms · Clear communication for both technical and non-technical teams.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {profile.credlyUrl && (
              <a
                href={profile.credlyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono font-medium text-[#F59E0B] bg-[#161208] border border-[#F59E0B]/30 hover:border-[#F59E0B] transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verify Credly Transcripts</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* 1. Defensive Capability Domains */}
        <div className="mb-6">
          <div className="text-xs font-mono text-[#10B981]">07. CORE SKILLS &amp; DEFENSE COVERAGE</div>
          <h3 className="mt-2 text-2xl sm:text-3xl font-display font-bold text-white">How I cover different parts of a company</h3>
          <p className="mt-2 text-sm text-[#94A3B8]">Combining email security, workstation monitoring, and network checks helps teams spot threats sooner.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {INITIAL_SKILLS.map((skill, idx) => (
            <motion.div
              key={skill.id}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 sm:p-7 rounded-2xl glass-panel border border-white/5 hover:border-[#38BDF8]/30 transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#38BDF8] font-bold">
                    DOMAIN 0{idx + 1}
                  </span>
                  <span className="text-[11px] font-mono text-[#94A3B8]">
                    {skill.verifiedDetections}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight font-display">
                  {skill.domain}
                </h3>
                <p className="text-xs text-[#94A3B8]">
                  {skill.subtitle}
                </p>

                <ul className="space-y-2 pt-2 text-xs text-[#CBD5E1]">
                  {skill.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] mt-0.5 shrink-0" />
                      <span className="leading-relaxed">{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tools Stack */}
              <div className="pt-4 border-t border-white/5">
                <div className="text-[10px] font-mono text-[#64748B] mb-2 uppercase">
                  Primary Toolsets:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skill.tools.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#090E1A] text-[#93C5FD] border border-[#38BDF8]/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 2. Official Certifications Ledger */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#10B981]">
                <Award className="w-4 h-4" />
                <span>02. VERIFIED INDUSTRY CREDENTIALS</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight mt-1">
                Official Certifications ({certifications.length})
              </h3>
            </div>
            <p className="text-xs font-mono text-[#94A3B8]">
              All 8 official certificates are displayed below for easy verification. Click any certificate to view or download the full document.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {certifications.map((cert, index) => (
              <motion.article
                key={cert.id}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="group rounded-xl glass-panel border border-white/5 hover:border-[#38BDF8]/40 transition-all flex flex-col justify-between overflow-hidden"
              >
                {/* Certificate Preview Image */}
                <button
                  type="button"
                  onClick={() => handleOpenCertificate(cert)}
                  className="relative w-full h-36 bg-[#070A12] border-b border-white/5 overflow-hidden group/btn cursor-pointer block text-left"
                >
                  <img
                    src={cert.previewImageUrl}
                    alt={`${cert.name} preview`}
                    className="w-full h-full object-cover object-center opacity-85 group-hover/btn:scale-105 group-hover/btn:opacity-100 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-black/80 text-[#38BDF8] border border-[#38BDF8]/40 backdrop-blur-md">
                      {cert.code}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/80 text-white border border-white/20 backdrop-blur-md opacity-0 group-hover/btn:opacity-100 transition-opacity">
                      <Eye className="w-3 h-3 text-[#38BDF8]" />
                      <span>Inspect</span>
                    </span>
                  </div>
                </button>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="text-[10px] font-mono text-[#94A3B8]">
                      {cert.issuer}
                    </div>
                    <div className="text-[10px] font-mono text-[#64748B] mt-1">
                      {cert.issuedDate}
                    </div>
                    <h4 className="text-sm font-bold text-white mt-1 group-hover:text-[#93C5FD] transition-colors leading-snug">
                      {cert.name}
                    </h4>
                    <p className="text-[11px] text-[#94A3B8] mt-1.5 line-clamp-2 leading-relaxed">
                      {cert.focusArea}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#64748B]">
                      <span>ID:</span>
                      <span className="text-[#CBD5E1] truncate max-w-[130px]">
                        {cert.credentialId}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        onClick={() => handleOpenCertificate(cert)}
                        className="text-[11px] font-mono text-[#38BDF8] hover:text-[#93C5FD] transition-colors cursor-pointer inline-flex items-center gap-1"
                      >
                        <FileCheck2 className="w-3 h-3" />
                        <span>View Artifact</span>
                      </button>

                      {cert.verifiedUrl && (
                        <a
                          href={cert.verifiedUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] font-mono text-[#94A3B8] hover:text-white transition-colors inline-flex items-center gap-1"
                        >
                          <span>Verify</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
