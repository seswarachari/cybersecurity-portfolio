import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowDown,
  ArrowUpRight,
  FileText,
  Shield,
  Radio,
  MapPin,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import type { ProfileData } from '../utils/portfolioLogic';
import { INITIAL_CERTIFICATIONS } from '../data/blueTeamData';

const certificationRoadmap = [
  {
    id: 'google-cybersecurity',
    image: '/assets/achievement-orbit/google-cybersecurity.webp',
    issuer: 'Google / Coursera',
  },
  {
    id: 'comptia-sec-plus',
    image: '/assets/achievement-orbit/comptia-security-plus.webp',
    issuer: 'CompTIA',
  },
  {
    id: 'comptia-cysa-plus',
    image: '/assets/achievement-orbit/comptia-cysa-plus.webp',
    issuer: 'CompTIA',
  },
  {
    id: 'comptia-csap',
    image: '/assets/achievement-orbit/comptia-csap.png',
    issuer: 'CompTIA',
  },
].map((roadmapItem) => {
  const credential = INITIAL_CERTIFICATIONS.find(({ id }) => id === roadmapItem.id);
  return {
    ...roadmapItem,
    name: credential?.name ?? roadmapItem.id,
    verificationUrl: roadmapItem.id === 'google-cybersecurity' ? credential?.verifiedUrl : undefined,
  };
});

interface HeroProps {
  profile: ProfileData;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  profile,
  onOpenResume,
}) => {
  const reduceMotion = useReducedMotion();
  const [istTime, setIstTime] = useState('');
  const [selectedCredential, setSelectedCredential] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Live IST Clock (Tirupati, India UTC+5:30)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setIstTime(now.toLocaleTimeString('en-US', options) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 3D Tilt on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || reduceMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = -((y - centerY) / centerY) * 6;
    const rotY = ((x - centerX) / centerX) * 6;
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const metrics = [
    { label: 'Web Security Labs Solved', val: '102+', sub: 'PortSwigger Academy' },
    { label: 'False Positives on Benign Mail', val: '0%', sub: '0 / 30 benign emails' },
    { label: 'Industry Certifications', val: '8x', sub: 'Industry-recognized' },
    { label: 'IoT Traffic Test Accuracy', val: '92.27%', sub: '5 classes · 80/20' },
  ];

  return (
    <section
      id="top"
      className="relative min-h-[92vh] pt-28 pb-16 lg:pt-36 lg:pb-24 flex flex-col justify-center overflow-hidden cyber-grid-pattern"
    >
      {/* Ambient Moving Radial Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] radial-glow-blue pointer-events-none opacity-60 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[400px] radial-glow-cyan pointer-events-none opacity-40 blur-3xl" />
      <div className="absolute top-10 left-10 w-[400px] h-[300px] radial-glow-emerald pointer-events-none opacity-25 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Mission Narrative & Typography */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Tactical Status Pill */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B1222]/90 border border-[#38BDF8]/30 backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.15)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
              </span>
              <span className="text-[11px] font-mono font-medium text-[#93C5FD] tracking-wide">
                OPERATIONAL · BLUE TEAM &amp; SOC ANALYST
              </span>
              <span className="text-white/20 hidden sm:inline">|</span>
              <span className="text-[11px] font-mono text-[#94A3B8] hidden sm:inline flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#38BDF8]" />
                Tirupati, AP, India
              </span>
            </motion.div>

            {/* Monumental Headline */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05]">
                Cyber Security Analyst <br className="hidden sm:inline" />
                <span className="text-gradient-cyan">
                  Blue Team &amp; SOC Operations
                </span>
              </h1>
            </motion.div>

            {/* Role & Mission Summary */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-3 max-w-2xl"
            >
              <p className="text-base sm:text-lg font-medium text-[#93C5FD] flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>CompTIA Security+ · CompTIA CySA+ · CompTIA Security Analytics Professional (CSAP)</span>
              </p>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                {profile.headline}
              </p>
              <p className="text-xs sm:text-sm text-[#CBD5E1] font-mono leading-relaxed bg-[#0A0F1D]/60 p-3 rounded-xl border border-white/5">
                <span className="text-[#38BDF8] font-bold">&gt;</span> B.Tech in Cyber Security · SOC Intern @ Sure ProED
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#about"
                className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-[#2563EB] to-[#0284C7] hover:from-[#1D4ED8] hover:to-[#0369A1] shadow-[0_0_24px_rgba(37,99,235,0.4)] transition-all overflow-hidden"
              >
                <span>Read My Journey</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>

              <button
                type="button"
                onClick={onOpenResume}
                className="group inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-mono text-sm font-medium text-[#E2E8F0] bg-[#0E1626] hover:bg-[#152036] border border-white/10 hover:border-[#38BDF8]/50 shadow-sm transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#38BDF8]" />
                <span>View Official Résumé</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#94A3B8] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              {profile.credlyUrl && (
                <a
                  href={profile.credlyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#94A3B8] hover:text-[#38BDF8] transition-colors py-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Verify on Credly</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </motion.div>

            {/* Metrics Bento Row */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10"
            >
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-3.5 rounded-xl bg-[#090E1A]/80 border border-white/5 hover:border-[#38BDF8]/30 transition-colors"
                >
                  <div className="text-xl sm:text-2xl font-bold font-mono text-white text-gradient-cyan">
                    {m.val}
                  </div>
                  <div className="text-[11px] font-semibold text-[#CBD5E1] mt-0.5 leading-snug">
                    {m.label}
                  </div>
                  <div className="text-[10px] text-[#64748B] mt-1 font-mono truncate">
                    {m.sub}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: 3D Holographic Portrait Card */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="achievement-orbit-stage relative w-full max-w-md">
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                  transition: 'transform 0.15s ease-out',
                }}
                className="relative w-full rounded-2xl p-2 bg-gradient-to-b from-[#1E293B]/60 via-[#0F172A]/80 to-[#0A0E1A] border border-[#38BDF8]/30 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(56,189,248,0.15)] group"
              >
              {/* Corner HUD Brackets */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#38BDF8] z-20 pointer-events-none" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#38BDF8] z-20 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#38BDF8] z-20 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#38BDF8] z-20 pointer-events-none" />

              {/* Top HUD Telemetry Strip */}
              <div className="relative z-10 px-4 py-2.5 mb-2 rounded-xl bg-[#070A12]/90 border border-white/10 flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
                <div className="flex items-center gap-1.5 text-[#38BDF8]">
                  <Radio className="w-3.5 h-3.5 animate-pulse text-[#10B981]" />
                  <span>TEL // 13°37&apos;N 79°25&apos;E</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#CBD5E1]">
                  <Clock className="w-3 h-3 text-[#94A3B8]" />
                  <span>{istTime || '10:30 AM IST'}</span>
                </div>
              </div>

              {/* Portrait Frame */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#070B14] border border-white/5">
                <img
                  src={
                    profile.portraitDataUrl ||
                    '/assets/aistudio/Screenshot_2026-10-25_at_7.32.55_PM_3e1d5418.png'
                  }
                  alt={`${profile.fullName} — Cyber Security Analyst`}
                  className="w-full h-full object-cover object-top filter contrast-[1.04] brightness-95 group-hover:scale-105 transition-transform duration-700"
                />

                {/* Scanline & Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06080F] via-[#06080F]/40 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,7,13,0.85)_100%)] pointer-events-none" />

                {/* Tactical Target Indicator */}
                <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-md bg-[#05070D]/80 border border-[#38BDF8]/40 backdrop-blur-md text-[10px] font-mono text-[#38BDF8] flex items-center gap-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                  <span>DEFCON 5 // NORMAL OPS</span>
                </div>

                {/* Floating Bottom Card Over Scrim */}
                <div className="absolute bottom-3 inset-x-3 z-10 p-3.5 rounded-xl bg-[#070D1A]/90 border border-[#38BDF8]/30 backdrop-blur-md shadow-xl">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="text-[10px] font-mono text-[#38BDF8] uppercase tracking-wider">
                        Cyber Security Analyst
                      </div>
                      <div className="font-display font-bold text-base text-white tracking-tight">
                        {profile.fullName}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-mono text-[#10B981] font-semibold">
                        READY TO JOIN
                      </div>
                      <div className="text-[10px] font-mono text-[#94A3B8]">
                        SOC / Blue Team
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-end text-[10px] font-mono text-[#94A3B8]">
                    <span className="text-[#38BDF8]">B.Tech Cyber Security</span>
                  </div>
                </div>
              </div>
              </div>

              <div className={`credential-roadmap${reduceMotion ? ' is-static' : ''}`} aria-label="Certification roadmap">
                <div className="credential-roadmap-track">
                  <div
                    className="credential-roadmap-line"
                    aria-hidden="true"
                  />
                  {certificationRoadmap.map((credential, index) => (
                    <motion.div
                      key={credential.id}
                      className="credential-roadmap-milestone"
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.9, y: 5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.38, delay: reduceMotion ? 0 : 0.28 + index * 0.3, ease: 'easeOut' }}
                    >
                      <button
                        type="button"
                        className="credential-roadmap-badge"
                        aria-label={`Show details for ${credential.name}`}
                        aria-expanded={selectedCredential === credential.id}
                        onClick={() => setSelectedCredential(selectedCredential === credential.id ? null : credential.id)}
                      >
                        <span className="credential-roadmap-logo">
                          <img src={credential.image} alt="" loading="lazy" />
                        </span>
                        <span className="credential-roadmap-node" aria-hidden="true" />
                      </button>
                      <span className="credential-roadmap-mobile-step" aria-hidden="true">0{index + 1}</span>
                    </motion.div>
                  ))}
                </div>
                <AnimatePresence initial={false}>
                  {selectedCredential && (() => {
                    const credential = certificationRoadmap.find(({ id }) => id === selectedCredential);
                    if (!credential) return null;
                    return (
                      <motion.div
                        key={credential.id}
                        className="credential-roadmap-detail"
                        role="region"
                        aria-label={`${credential.name} details`}
                        initial={reduceMotion ? false : { opacity: 0, y: -4, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -4, height: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.2 }}
                      >
                        <div className="credential-roadmap-detail-copy">
                          <strong>{credential.name}</strong>
                          <span>Issued by {credential.issuer}</span>
                        </div>
                        {credential.verificationUrl && (
                          <a href={credential.verificationUrl} target="_blank" rel="noreferrer">
                            Verify <ExternalLink size={12} />
                          </a>
                        )}
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>
              </div>

              <motion.a
                href="/assets/aistudio/8b01fde1-6f39-408b-aafe-d0e8d006faef_d8bc23e9.png"
                target="_blank"
                rel="noreferrer"
                aria-label="View LetsDefend SOC Analyst Learning Path certificate. 25 modules completed."
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.7 }}
                className="achievement-letsdefend group/achievement"
              >
                <img
                  src="/assets/aistudio/8b01fde1-6f39-408b-aafe-d0e8d006faef_d8bc23e9.png"
                  alt="LetsDefend SOC Analyst certificate emblem"
                  loading="lazy"
                />
                <span className="achievement-letsdefend-copy">
                  <span className="achievement-letsdefend-kicker">LETSDEFEND · ACHIEVEMENT</span>
                  <strong>SOC Analyst Learning Path</strong>
                  <span className="achievement-letsdefend-status">25 modules completed · Certificate</span>
                  <span className="achievement-letsdefend-detail">Hands-on alert triage, phishing investigation, malware analysis, and incident response.</span>
                </span>
                <span className="achievement-letsdefend-action">View Achievement <ArrowUpRight size={14} /></span>
              </motion.a>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
