import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Shield,
  Briefcase,
  GraduationCap,
  Terminal,
  CheckCircle2,
  Cpu,
} from 'lucide-react';
import { EXPERIENCE_TIMELINE, EDUCATION_HISTORY, CYBER_RANGES, STORY_CHAPTERS } from '../data/blueTeamData';
import type { ProfileData } from '../utils/portfolioLogic';

interface AboutSectionProps {
  profile: ProfileData;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#05070D] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#38BDF8] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
            <span>01. My Story &amp; Background</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Why I Chose Cyber Security <br />
            <span className="text-gradient-cyan">&amp; My Journey So Far</span>
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-3xl leading-relaxed">
            Instead of just listing tools, here is how I grew from a Computer Science student into a certified SOC Analyst ready to help protect your organization.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card 1: The Bio & Mission (lg:col-span-7) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 p-6 sm:p-8 rounded-2xl glass-panel relative overflow-hidden flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8]">
                <Shield className="w-4 h-4" />
                <span>MY STORY &amp; BACKGROUND</span>
              </div>
              <p className="text-base sm:text-lg text-[#F1F5F9] leading-relaxed font-sans">
                {profile.bio}
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
              <div>
                <span className="text-xs font-mono text-[#38BDF8] block">ACADEMIC RESULT</span>
                <span className="text-xl font-bold font-mono text-white mt-0.5 block">8.0 CGPA</span>
                <span className="text-[11px] text-[#64748B]">B.Tech Cyber Security</span>
              </div>
              <div>
                <span className="text-xs font-mono text-[#10B981] block">LABS SOLVED</span>
                <span className="text-xl font-bold font-mono text-white mt-0.5 block">102 Labs</span>
                <span className="text-[11px] text-[#64748B]">PortSwigger Academy</span>
              </div>
              <div>
                <span className="text-xs font-mono text-[#F59E0B] block">SOC MODULES</span>
                <span className="text-xl font-bold font-mono text-white mt-0.5 block">25 Modules</span>
                <span className="text-[11px] text-[#64748B]">LetsDefend &amp; Live Labs</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Academic & Institutional Foundation (lg:col-span-5) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 p-6 sm:p-8 rounded-2xl glass-panel relative overflow-hidden flex flex-col justify-between space-y-6"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-[#93C5FD]">
              <GraduationCap className="w-4 h-4 text-[#38BDF8]" />
              <span>EDUCATION</span>
            </div>
            <div className="space-y-3">
              {EDUCATION_HISTORY.map((item) => (
                <div key={item.id} className="p-4 rounded-xl bg-[#070A14] border border-white/5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight">{item.degree}</h3>
                      <p className="text-xs text-[#94A3B8] mt-1">{item.institution}</p>
                    </div>
                    <span className="text-[10px] font-mono text-[#38BDF8]">{item.score}</span>
                  </div>
                  <p className="text-[10px] font-mono text-[#64748B] mt-2">{item.period} · {item.location}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 3: Experience Field Notes (lg:col-span-6) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 p-6 sm:p-8 rounded-2xl glass-panel relative overflow-hidden space-y-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8]">
                <Briefcase className="w-4 h-4" />
                <span>FIELD NOTES // INDUSTRY EXPERIENCE</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
                VERIFIED INTERNSHIPS
              </span>
            </div>

            <div className="space-y-6">
              {EXPERIENCE_TIMELINE.map((item, idx) => (
                <div
                  key={item.id}
                  className={`relative pl-6 border-l-2 ${
                    idx === 0 ? 'border-[#38BDF8]' : 'border-white/10'
                  } space-y-2`}
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#05070D] border-2 border-[#38BDF8] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <h4 className="text-base font-bold text-white">{item.role}</h4>
                    <span className="text-xs font-mono text-[#38BDF8]">{item.period}</span>
                  </div>
                  <div className="text-xs font-mono text-[#94A3B8]">
                    {item.company} · {item.mode}
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#CBD5E1] pt-1">
                    {item.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <span className="text-[#38BDF8] mt-1 shrink-0">›</span>
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {item.tools.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0D1527] text-[#93C5FD] border border-[#38BDF8]/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 4: Cyber Range & Hands-On Testing (lg:col-span-6) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 p-6 sm:p-8 rounded-2xl glass-panel relative overflow-hidden space-y-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-[#10B981]">
                <Terminal className="w-4 h-4" />
                <span>PRACTICAL CYBER RANGES &amp; CTF LABS</span>
              </div>
              <span className="text-[10px] font-mono text-[#94A3B8]">100% PRACTICAL RIGOR</span>
            </div>

            <div className="space-y-4">
              {CYBER_RANGES.map((range) => (
                <div
                  key={range.id}
                  className="p-4 rounded-xl bg-[#090E1A] border border-white/5 hover:border-[#10B981]/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">{range.platform}</span>
                    <span className="text-xs font-mono font-semibold text-[#10B981]">
                      {range.metric}
                    </span>
                  </div>
                  <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                    {range.summary}
                  </p>
                  <div className="mt-2 pt-2 border-t border-white/5 flex flex-wrap gap-1.5">
                    {range.skillsValidated.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-mono text-[#CBD5E1] bg-[#0F172A] px-2 py-0.5 rounded border border-white/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8] mb-4">
            <Cpu className="w-4 h-4" />
            <span>MY PATH INTO CYBER SECURITY</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {STORY_CHAPTERS.map((chapter, index) => (
              <motion.article
                key={chapter.id}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="p-5 sm:p-6 rounded-xl bg-[#070A14] border border-white/5 hover:border-[#38BDF8]/30 transition-colors space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-[#38BDF8]">0{index + 1} · {chapter.period}</span>
                </div>
                <h4 className="text-sm font-bold text-white leading-snug">{chapter.title}</h4>
                <p className="text-xs font-medium text-[#93C5FD] leading-relaxed">{chapter.subtitle}</p>
                <p className="text-sm text-[#CBD5E1] leading-relaxed">{chapter.story}</p>
                <p className="text-xs text-[#94A3B8] leading-relaxed"><strong className="text-white">Key Takeaway:</strong> {chapter.takeaway}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
