import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Mail,
  Linkedin,
  Github,
  Shield,
  MapPin,
  ArrowUpRight,
  Copy,
  Check,
  Send,
  Radio,
  Clock,
  Phone,
} from 'lucide-react';
import type { ProfileData } from '../utils/portfolioLogic';
import { validateContactDispatch } from '../utils/portfolioLogic';

interface ContactSectionProps {
  profile: ProfileData;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const reduceMotion = useReducedMotion();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [form, setForm] = useState({
    senderName: '',
    senderEmail: '',
    organization: '',
    inquiryType: 'SOC Analyst / Blue Team Role',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactDispatch(form);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const subject = encodeURIComponent(`${form.inquiryType} — ${form.senderName}`);
    const body = encodeURIComponent(
      `Hello Sharabu,\n\nFrom: ${form.senderName}\nEmail: ${form.senderEmail}\nOrganization: ${form.organization || 'Independent'}\nOpportunity: ${form.inquiryType}\n\nMessage:\n${form.message}\n`
    );

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#030509] border-t border-white/5">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[500px] radial-glow-blue pointer-events-none opacity-20 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Left Column: Direct Reach & Availability (lg:col-span-5) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#38BDF8] uppercase">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                <span>08. Let&apos;s Connect</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Get in Touch with <br />
                <span className="text-gradient-cyan">Sharabu Eswarachari</span>
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                I am actively looking for SOC Analyst, Junior Security Engineer, and Blue Team roles (Remote or Onsite). Feel free to reach out directly via email, phone, LinkedIn, or the form here.
              </p>
            </div>

            {/* Email Direct Action Card */}
            <div className="p-5 rounded-2xl bg-[#090E1A] border border-white/10 space-y-3">
              <span className="text-xs font-mono text-[#94A3B8] block">DIRECT EMAIL ADDRESS</span>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="text-base sm:text-lg font-mono font-bold text-white hover:text-[#38BDF8] transition-colors break-all"
                >
                  {profile.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-[#CBD5E1] bg-[#141E33] hover:bg-[#1E2E4F] border border-white/10 transition-colors cursor-pointer shrink-0"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#10B981]" />
                      <span className="text-[#10B981]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {profile.phone && (
                <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
                  <Phone className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <a href={`tel:${profile.phone}`} className="hover:text-white transition-colors">
                    {profile.phone}
                  </a>
                </div>
              )}
            </div>

            {/* Social Channels */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#64748B] block uppercase tracking-wider">
                Professional Profiles:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-[#070A12] border border-white/5 hover:border-[#38BDF8]/40 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2 text-xs font-mono text-[#E2E8F0]">
                    <Linkedin className="w-4 h-4 text-[#0077B5]" />
                    <span>LinkedIn</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#64748B] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-[#070A12] border border-white/5 hover:border-[#38BDF8]/40 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2 text-xs font-mono text-[#E2E8F0]">
                    <Github className="w-4 h-4 text-white" />
                    <span>GitHub</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#64748B] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                {profile.credlyUrl && (
                  <a
                    href={profile.credlyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-[#070A12] border border-white/5 hover:border-[#38BDF8]/40 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono text-[#E2E8F0]">
                      <Shield className="w-4 h-4 text-[#F59E0B]" />
                      <span>Credly</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#64748B] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                )}
              </div>
            </div>

            {/* Tactical Location Pill */}
            <div className="p-3.5 rounded-xl bg-[#070A12] border border-white/5 flex items-center gap-3 text-xs font-mono text-[#94A3B8]">
              <MapPin className="w-4 h-4 text-[#38BDF8] shrink-0" />
              <span>{profile.location}</span>
            </div>
          </motion.div>

          {/* Right Column: Dispatch Form (lg:col-span-7) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-2xl glass-panel border border-[#1E293B] space-y-5"
              noValidate
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono text-[#94A3B8]">
                <span className="text-white font-medium">SEND A MESSAGE</span>
                <span className="text-[#38BDF8]">OPEN TO IMMEDIATE JOINING</span>
              </div>

              {sent && (
                <div className="p-3.5 rounded-xl bg-[#10B981]/20 border border-[#10B981]/40 text-xs text-[#E2E8F0] flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span>
                    Your mail client has been opened with your pre-populated message ready to send!
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono text-[#CBD5E1] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.senderName}
                    onChange={(e) => setForm({ ...form, senderName: e.target.value })}
                    placeholder="e.g., Alex Mercer"
                    className="w-full px-3.5 py-2.5 text-xs font-sans rounded-xl bg-[#070B14] border border-white/10 text-white placeholder-[#64748B] focus:outline-none focus:border-[#38BDF8]"
                  />
                  {errors.senderName && (
                    <p className="text-[11px] text-[#F87171] mt-1" role="alert">
                      {errors.senderName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono text-[#CBD5E1] mb-1.5">
                    Your Work / Personal Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.senderEmail}
                    onChange={(e) => setForm({ ...form, senderEmail: e.target.value })}
                    placeholder="alex@enterprise.com"
                    className="w-full px-3.5 py-2.5 text-xs font-sans rounded-xl bg-[#070B14] border border-white/10 text-white placeholder-[#64748B] focus:outline-none focus:border-[#38BDF8]"
                  />
                  {errors.senderEmail && (
                    <p className="text-[11px] text-[#F87171] mt-1" role="alert">
                      {errors.senderEmail}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-org" className="block text-xs font-mono text-[#CBD5E1] mb-1.5">
                    Company / Organization (Optional)
                  </label>
                  <input
                    id="contact-org"
                    type="text"
                    value={form.organization}
                    onChange={(e) => setForm({ ...form, organization: e.target.value })}
                    placeholder="e.g., Cyber Defense Labs"
                    className="w-full px-3.5 py-2.5 text-xs font-sans rounded-xl bg-[#070B14] border border-white/10 text-white placeholder-[#64748B] focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>

                <div>
                  <label htmlFor="contact-inquiry" className="block text-xs font-mono text-[#CBD5E1] mb-1.5">
                    Opportunity / Inquiry Type
                  </label>
                  <select
                    id="contact-inquiry"
                    value={form.inquiryType}
                    onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs font-sans rounded-xl bg-[#070B14] border border-white/10 text-white focus:outline-none focus:border-[#38BDF8]"
                  >
                    <option value="SOC Analyst / Blue Team Role">SOC Analyst / Blue Team Role</option>
                    <option value="Junior Security Engineer">Junior Security Engineer</option>
                    <option value="Threat Hunting / Incident Response">Threat Hunting / IR</option>
                    <option value="General Technical Inquiry">General Technical Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-mono text-[#CBD5E1] mb-1.5">
                  Brief Message *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me a little about the team, tech stack, or role..."
                  className="w-full px-3.5 py-2.5 text-xs font-sans rounded-xl bg-[#070B14] border border-white/10 text-white placeholder-[#64748B] focus:outline-none focus:border-[#38BDF8] resize-vertical"
                />
                {errors.message && (
                  <p className="text-[11px] text-[#F87171] mt-1" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-[11px] text-[#64748B] font-mono leading-relaxed">
                  Opens your email app with the message pre-formatted.
                </p>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-xs text-white bg-gradient-to-r from-[#2563EB] to-[#0284C7] hover:from-[#1D4ED8] hover:to-[#0369A1] shadow-[0_0_20px_rgba(37,99,235,0.35)] transition-all cursor-pointer whitespace-nowrap"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{sent ? 'Re-open Email App' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
