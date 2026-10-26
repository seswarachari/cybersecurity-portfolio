import React, { useEffect, useState } from 'react';
import type { CaseStudyProject, CertificationItem } from './utils/portfolioLogic';
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

export default function App() {
  const profile = DEFAULT_PROFILE;
  const projects = INITIAL_PROJECTS;
  const certifications = INITIAL_CERTIFICATIONS;

  const [activeProject, setActiveProject] = useState<CaseStudyProject | null>(null);
  const [activeViewerDoc, setActiveViewerDoc] = useState<ViewerDocument | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  return (
    <div className="min-h-screen bg-[#05070D] text-[#E2E8F0] selection:bg-[#3B82F6]/30 selection:text-[#60A5FA] relative">
      {/* Viewport Top Scroll Progress Bar */}
      <div
        className="top-scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      {/* Global Navigation */}
      <Navbar
        profile={profile}
        onOpenResume={openResume}
      />

      {/* Main Sections Flow */}
      <main>
        {/* Section 0: Hero Stage */}
        <Hero
          profile={profile}
          onOpenResume={openResume}
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

    </div>
  );
}
