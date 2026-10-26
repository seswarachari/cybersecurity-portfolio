import React, { useEffect, useRef, useState } from 'react';
import type { CaseStudyProject, CertificationItem, ProfileData } from './utils/portfolioLogic';
import {
  DEFAULT_PROFILE,
  INITIAL_CERTIFICATIONS,
  INITIAL_PROJECTS,
} from './data/blueTeamData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsCertSection } from './components/SkillsCertSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ResumeViewerModal, type ViewerDocument } from './components/ResumeViewerModal';
import { CustomizePortfolioModal } from './components/CustomizePortfolioModal';

const STORAGE_KEYS = {
  PROFILE: 'eswara_blueteam_profile_v7',
  PROJECTS: 'eswara_blueteam_projects_v7',
  CERTS: 'eswara_blueteam_certs_v7',
  CERT_COPY_REVISION: 'eswara_blueteam_cert_copy_revision',
};

export default function App() {
  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [projects, setProjects] = useState<CaseStudyProject[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (!saved) return INITIAL_PROJECTS;
      const parsed = JSON.parse(saved) as CaseStudyProject[];
      return parsed.map((project) => {
        const verified = INITIAL_PROJECTS.find((p) => p.id === project.id);
        return verified
          ? {
              ...project,
              whatIBuilt: verified.whatIBuilt,
              summary: verified.summary,
              impactMetric: verified.impactMetric,
              architectureSummary: verified.architectureSummary,
            }
          : project;
      });
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [certifications, setCertifications] = useState<CertificationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CERTS);
      if (!saved) return INITIAL_CERTIFICATIONS;
      const parsed = JSON.parse(saved) as CertificationItem[];
      const copyRevision = localStorage.getItem(STORAGE_KEYS.CERT_COPY_REVISION);
      const updatedIds = new Set(['comptia-csap', 'comptia-cysa-plus', 'comptia-sec-plus']);
      const reusedGoogleUrl = 'https://www.credly.com/badges/a7a84b44-434e-48ce-8b12-c119a855dcb7/linked_in_profile';
      const refreshed = parsed.map((certification) => {
        const updatedCopy = INITIAL_CERTIFICATIONS.find((item) => item.id === certification.id);
        if (!updatedCopy) return certification;
        const next = { ...certification };
        if (updatedIds.has(certification.id) && certification.verifiedUrl === reusedGoogleUrl) {
          next.verifiedUrl = undefined;
        }
        if (copyRevision !== '1' && updatedIds.has(certification.id)) {
          next.focusArea = updatedCopy.focusArea;
          next.coreCompetencies = updatedCopy.coreCompetencies;
        }
        return next;
      });
      localStorage.setItem(STORAGE_KEYS.CERT_COPY_REVISION, '2');
      return refreshed;
    } catch {
      return INITIAL_CERTIFICATIONS;
    }
  });

  const [activeProject, setActiveProject] = useState<CaseStudyProject | null>(null);
  const [activeViewerDoc, setActiveViewerDoc] = useState<ViewerDocument | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [customizerTab, setCustomizerTab] = useState<
    'checklist' | 'profile' | 'add-project' | 'add-cert'
  >('profile');
  const [scrollProgress, setScrollProgress] = useState(0);

  const heroFileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch {
      /* Storage unavailable */
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch {
      /* Storage unavailable */
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CERTS, JSON.stringify(certifications));
    } catch {
      /* Storage unavailable */
    }
  }, [certifications]);

  // Viewport scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const range = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(range > 0 ? window.scrollY / range : 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const openResume = () => {
    setActiveViewerDoc({
      title: `${profile.fullName} — Official Resume (PDF)`,
      subtitle:
        'B.Tech in Cyber Security · CompTIA Security Analytics Professional (CSAP)',
      url: profile.resumePdfUrl,
      type: 'pdf',
      downloadFilename: 'Sharabu_Eswarachari_Resume.pdf',
    });
  };

  const handleResetDefaults = () => {
    setProfile(DEFAULT_PROFILE);
    setProjects(INITIAL_PROJECTS);
    setCertifications(INITIAL_CERTIFICATIONS);
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
  };

  const handleHeroPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setProfile((prev) => ({ ...prev, portraitDataUrl: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-[#05070D] text-[#E2E8F0] selection:bg-[#3B82F6]/30 selection:text-[#60A5FA] relative">
      {/* Viewport Top Scroll Progress Bar */}
      <div
        className="top-scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      {/* Hidden File Input for Headshot Photo Upload */}
      <input
        ref={heroFileInputRef}
        type="file"
        accept="image/*"
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only"
        onChange={handleHeroPhotoUpload}
      />

      {/* Global Navigation */}
      <Navbar
        profile={profile}
        onOpenResume={openResume}
        onOpenCustomizer={() => {
          setCustomizerTab('profile');
          setIsCustomizerOpen(true);
        }}
      />

      {/* Main Sections Flow */}
      <main>
        {/* Section 0: Hero Stage */}
        <Hero
          profile={profile}
          onOpenResume={openResume}
          onTriggerPhotoUpload={() => heroFileInputRef.current?.click()}
        />

        {/* Section 1: About & Context */}
        <AboutSection profile={profile} />

        {/* Section 2: Selected Work & Open Architectures */}
        <ProjectsSection
          projects={projects}
          onSelectProject={(project) => setActiveProject(project)}
        />

        {/* Section 4: Capabilities & Verified Credentials */}
        <SkillsCertSection
          profile={profile}
          certifications={certifications}
          onOpenViewerDoc={(doc) => setActiveViewerDoc(doc)}
        />

        {/* Section 5: Dispatch Center / Contact */}
        <ContactSection profile={profile} />
      </main>

      {/* Global Footer */}
      <Footer profile={profile} onOpenResume={openResume} />

      {/* Overlays / Modals */}
      <CaseStudyModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />

      <ResumeViewerModal
        isOpen={Boolean(activeViewerDoc)}
        document={activeViewerDoc}
        onClose={() => setActiveViewerDoc(null)}
      />

      <CustomizePortfolioModal
        isOpen={isCustomizerOpen}
        initialTab={customizerTab}
        profile={profile}
        onUpdateProfile={setProfile}
        onAddProject={(newProj) => setProjects((prev) => [newProj, ...prev])}
        onAddCertification={(newCert) => setCertifications((prev) => [newCert, ...prev])}
        onResetDefaults={handleResetDefaults}
        onClose={() => setIsCustomizerOpen(false)}
      />

    </div>
  );
}
