import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, ArrowUpRight, Menu, X, FileText } from 'lucide-react';
import type { ProfileData } from '../utils/portfolioLogic';

interface NavbarProps {
  profile: ProfileData;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  onOpenResume,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Section spy
      const sections = ['about', 'projects', 'skills', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'My Story', href: '#about', id: 'about' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Certifications', href: '#skills', id: 'skills' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-nav py-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Wordmark */}
          <a
            href="#top"
            className="group flex items-center gap-3 text-white transition-opacity hover:opacity-95"
            aria-label={`${profile.fullName} Home`}
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-[#1E293B] to-[#0A0E1A] border border-[#3B82F6]/30 text-white font-mono font-bold text-sm shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:border-[#3B82F6] transition-colors">
              <span className="text-[#60A5FA]">S</span>
              <span className="text-white">.</span>
              <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] opacity-0 group-hover:opacity-20 blur transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-tight text-white group-hover:text-[#93C5FD] transition-colors">
                {profile.fullName}
              </span>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#94A3B8]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#10B981]" />
                </span>
                <span>BLUE TEAM DEFENDER</span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav
            className="hidden md:flex items-center gap-1 p-1 rounded-full bg-[#0B1120]/80 border border-white/5 backdrop-blur-md shadow-inner"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1D4ED8]/60 to-[#0284C7]/60 border border-[#38BDF8]/40 shadow-[0_0_12px_rgba(56,189,248,0.25)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Quick Resume Button */}
            <button
              type="button"
              onClick={onOpenResume}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-[#CBD5E1] bg-[#0F172A]/80 hover:bg-[#1E293B] border border-white/10 hover:border-[#38BDF8]/40 transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Résumé</span>
            </button>

            {/* Let's Talk CTA */}
            <a
              href="#contact"
              className="relative group inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium text-white bg-gradient-to-r from-[#2563EB] to-[#0284C7] hover:from-[#1D4ED8] hover:to-[#0369A1] shadow-[0_0_18px_rgba(37,99,235,0.35)] transition-all overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-1">
                Let&apos;s Talk
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>

          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              className="p-2 rounded-lg text-white bg-[#0F172A] border border-white/10"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] z-40 p-4 bg-[#090D18]/95 backdrop-blur-2xl border-b border-[#1E293B] shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#E2E8F0] hover:bg-[#1E293B] hover:text-[#60A5FA] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 mt-1 border-t border-white/10 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="w-full py-2.5 rounded-xl text-xs font-mono font-medium text-white bg-[#1E293B] flex items-center justify-center gap-2 border border-white/10"
                >
                  <FileText className="w-4 h-4 text-[#38BDF8]" />
                  <span>View Official Résumé (PDF)</span>
                </button>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-xl text-xs font-medium text-white bg-gradient-to-r from-[#2563EB] to-[#0284C7] flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
