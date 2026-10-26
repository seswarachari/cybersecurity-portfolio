import React, { useState } from 'react';
import { X, Upload, CheckCircle2, Plus, RotateCcw, Shield, Award, User, ListChecks } from 'lucide-react';
import {
  validateNewProjectInput,
  type CaseStudyProject,
  type CertificationItem,
  type NewProjectInput,
  type ProfileData,
  type ProjectCategory,
} from '../utils/portfolioLogic';
import { WHAT_WE_NEED_CHECKLIST } from '../data/blueTeamData';

interface CustomizePortfolioModalProps {
  isOpen: boolean;
  initialTab?: 'checklist' | 'profile' | 'add-project' | 'add-cert';
  profile: ProfileData;
  onUpdateProfile: (updated: ProfileData) => void;
  onAddProject: (project: CaseStudyProject) => void;
  onAddCertification: (cert: CertificationItem) => void;
  onResetDefaults: () => void;
  onClose: () => void;
}

export const CustomizePortfolioModal: React.FC<CustomizePortfolioModalProps> = ({
  isOpen,
  initialTab = 'profile',
  profile,
  onUpdateProfile,
  onAddProject,
  onAddCertification,
  onResetDefaults,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<
    'checklist' | 'profile' | 'add-project' | 'add-cert'
  >(initialTab);

  const [draftProfile, setDraftProfile] = useState<ProfileData>(profile);
  const [profileSavedBanner, setProfileSavedBanner] = useState(false);

  const [projectInput, setProjectInput] = useState<NewProjectInput>({
    title: '',
    category: 'SIEM & Detection',
    timeline: '2026',
    environment: 'Wazuh / Splunk SOC Lab',
    mitreTechniqueIds: 'T1059.001, T1105',
    summary: '',
    impactMetric: '',
    toolsUsed: '',
  });
  const [projectErrors, setProjectErrors] = useState<Record<string, string>>({});
  const [projectSuccess, setProjectSuccess] = useState(false);

  const [certCode, setCertCode] = useState('');
  const [certName, setCertName] = useState('');
  const [certIssuer, setCertIssuer] = useState('');
  const [certDate, setCertDate] = useState('Active · Verified');
  const [certId, setCertId] = useState('');
  const [certFocus, setCertFocus] = useState('');
  const [certError, setCertError] = useState('');
  const [certSuccess, setCertSuccess] = useState(false);

  React.useEffect(() => {
    setDraftProfile(profile);
  }, [profile]);

  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const updated = { ...draftProfile, portraitDataUrl: reader.result };
        setDraftProfile(updated);
        onUpdateProfile(updated);
        setProfileSavedBanner(true);
        setTimeout(() => setProfileSavedBanner(false), 2500);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftProfile.fullName.trim() || !draftProfile.roleTitle.trim()) {
      return;
    }
    onUpdateProfile(draftProfile);
    setProfileSavedBanner(true);
    setTimeout(() => setProfileSavedBanner(false), 2500);
  };

  const handleAddProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateNewProjectInput(projectInput);
    if (!validation.valid) {
      setProjectErrors(validation.errors);
      setProjectSuccess(false);
      return;
    }

    setProjectErrors({});
    const tools = projectInput.toolsUsed
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const techniques = projectInput.mitreTechniqueIds
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const slug = projectInput.title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-');

    const newProject: CaseStudyProject = {
      id: `custom-${Date.now()}`,
      title: projectInput.title.trim(),
      repoName: `seswarachari/${slug}`,
      repoUrl: 'https://github.com/seswarachari',
      category: projectInput.category,
      timeline: projectInput.timeline.trim() || '2026',
      environment: projectInput.environment.trim() || 'Blue Team Lab',
      mitreTactics: ['Detection Engineering', 'Defensive Operations'],
      mitreTechniqueIds: techniques.length > 0 ? techniques : ['T1059'],
      summary: projectInput.summary.trim(),
      impactMetric: projectInput.impactMetric.trim(),
      threatScenario: projectInput.summary.trim(),
      architectureSummary: `Configured telemetry pipeline using ${tools.join(', ')}.`,
      toolsUsed: tools,
      repoFiles: ['README.md', 'src/', 'rules/'],
      featured: false,
      visualType:
        projectInput.category === 'Threat Hunting & ML'
          ? 'hunting'
          : projectInput.category === 'Phishing & SOAR' ||
            projectInput.category === 'GRC & Risk Platform'
          ? 'soar'
          : 'siem',
      detectionRules: {
        primaryLabel: 'Wazuh XML / Sigma',
        wazuhOrPrimary: `<!-- Custom Detection Logic for ${projectInput.title.trim()} -->\n<rule id="100099" level="12">\n  <if_sid>61603</if_sid>\n  <description>${projectInput.title.trim()}</description>\n</rule>`,
        kql: `SecurityEvent\n| where EventID in (4624, 4688, 4769)\n| summarize count() by Account, Computer, bin(TimeGenerated, 5m)`,
        thirdLabel: 'Splunk SPL',
        sigmaOrPython: `index=main sourcetype="security:telemetry"\n| stats count by user, host, EventCode`,
      },
    };

    onAddProject(newProject);
    setProjectSuccess(true);
    setProjectInput({
      title: '',
      category: 'SIEM & Detection',
      timeline: '2026',
      environment: 'Wazuh / Splunk SOC Lab',
      mitreTechniqueIds: 'T1059.001',
      summary: '',
      impactMetric: '',
      toolsUsed: '',
    });
    setTimeout(() => setProjectSuccess(false), 3000);
  };

  const handleAddCertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (certCode.trim().length < 2 || certName.trim().length < 4 || certIssuer.trim().length < 2) {
      setCertError('Please provide Certification Code, Full Name, and Issuing Organization.');
      return;
    }
    setCertError('');
    const newCert: CertificationItem = {
      id: `cert-${Date.now()}`,
      code: certCode.trim(),
      name: certName.trim(),
      issuer: certIssuer.trim(),
      issuedDate: certDate.trim() || 'Active · Verified',
      credentialId: certId.trim() || 'CREDLY-VERIFIED',
      focusArea: certFocus.trim() || 'Defensive Security Operations',
      verifiedUrl: 'https://www.linkedin.com/in/eswara-chari-51553322a',
      coreCompetencies: ['Blue Team Defense', 'SOC Operations', 'Incident Triage'],
      previewImageUrl: '/assets/aistudio/cert_comptia_csap.png',
    };
    onAddCertification(newCert);
    setCertSuccess(true);
    setCertCode('');
    setCertName('');
    setCertIssuer('');
    setCertId('');
    setCertFocus('');
    setTimeout(() => setCertSuccess(false), 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="customizer-modal-title"
    >
      <div
        className="fixed inset-0 -z-10"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-4xl bg-[#080D1A] border border-[#38BDF8]/30 rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_35px_rgba(56,189,248,0.15)] my-6 flex flex-col max-h-[90vh]">
        {/* Title Bar */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-white/10 bg-[#050811]">
          <div>
            <h2
              id="customizer-modal-title"
              className="text-lg font-bold text-white tracking-tight font-display"
            >
              Portfolio Customization Studio
            </h2>
            <p className="text-xs text-[#94A3B8] font-mono mt-0.5">
              Update headshot, bio, add case studies, or register new certifications
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close portfolio studio"
            className="p-1.5 text-[#94A3B8] hover:text-white bg-[#111827] hover:bg-[#1F2937] border border-white/10 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div
          className="flex items-center gap-2 px-6 py-3 border-b border-white/10 bg-[#060A14] overflow-x-auto text-xs font-mono"
          role="tablist"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-[#1D4ED8] text-white font-medium'
                : 'text-[#94A3B8] hover:text-white bg-[#0A0F1D]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile &amp; Portrait</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'add-project'}
            onClick={() => setActiveTab('add-project')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'add-project'
                ? 'bg-[#1D4ED8] text-white font-medium'
                : 'text-[#94A3B8] hover:text-white bg-[#0A0F1D]'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Add Blue Team Case Study</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'add-cert'}
            onClick={() => setActiveTab('add-cert')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'add-cert'
                ? 'bg-[#1D4ED8] text-white font-medium'
                : 'text-[#94A3B8] hover:text-white bg-[#0A0F1D]'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Add Certification</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'checklist'}
            onClick={() => setActiveTab('checklist')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'checklist'
                ? 'bg-[#1D4ED8] text-white font-medium'
                : 'text-[#94A3B8] hover:text-white bg-[#0A0F1D]'
            }`}
          >
            <ListChecks className="w-3.5 h-3.5" />
            <span>Resume &amp; Sync Ledger</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {activeTab === 'checklist' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-xl font-bold text-white font-display">
                    Synced Resume, LinkedIn &amp; GitHub Records
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-1 font-mono">
                    All 6 GitHub repos, CompTIA certificates, and Sure ProED records are synchronized below.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('profile')}
                  className="px-4 py-2 text-xs font-mono font-medium text-white bg-[#1D4ED8] hover:bg-[#2563EB] rounded-lg transition-colors cursor-pointer"
                >
                  Upload Headshot
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {WHAT_WE_NEED_CHECKLIST.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-xl bg-[#060A14] border border-white/5 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-[#38BDF8] uppercase">
                        {item.category}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#CBD5E1] mt-2 leading-relaxed">
                        {item.details}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-white/5 text-[11px] font-mono text-[#94A3B8]">
                      Status: <span className="text-[#10B981]">{item.example}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              {profileSavedBanner && (
                <div className="p-3.5 rounded-xl bg-[#10B981]/20 border border-[#10B981]/40 text-xs text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span>Profile and portrait updated across your portfolio.</span>
                </div>
              )}

              {/* Headshot Upload Row */}
              <div className="p-5 rounded-xl bg-[#060A14] border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Portrait Photograph
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-1">
                    Upload your headshot image (JPG, PNG, WebP) to update the Hero card.
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <label
                    htmlFor="portrait-file-upload"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium text-white bg-[#1D4ED8] hover:bg-[#2563EB] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Choose Photo File</span>
                  </label>
                  <input
                    id="portrait-file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoFileChange}
                    className="sr-only"
                  />
                  {draftProfile.portraitDataUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        const cleared = { ...draftProfile, portraitDataUrl: null };
                        setDraftProfile(cleared);
                        onUpdateProfile(cleared);
                      }}
                      className="px-3 py-2 text-xs font-mono text-[#CBD5E1] bg-[#111827] hover:bg-[#1F2937] border border-white/10 rounded-lg cursor-pointer"
                    >
                      Reset Photo
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="input-fullname" className="block text-xs font-mono text-[#CBD5E1] mb-1.5">
                    Full Name
                  </label>
                  <input
                    id="input-fullname"
                    type="text"
                    value={draftProfile.fullName}
                    onChange={(e) =>
                      setDraftProfile({ ...draftProfile, fullName: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-xs font-sans bg-[#05070D] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>

                <div>
                  <label htmlFor="input-roletitle" className="block text-xs font-mono text-[#CBD5E1] mb-1.5">
                    Target Blue Team Title
                  </label>
                  <input
                    id="input-roletitle"
                    type="text"
                    value={draftProfile.roleTitle}
                    onChange={(e) =>
                      setDraftProfile({ ...draftProfile, roleTitle: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-xs font-sans bg-[#05070D] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>

                <div>
                  <label htmlFor="input-email" className="block text-xs font-mono text-[#CBD5E1] mb-1.5">
                    Contact Email
                  </label>
                  <input
                    id="input-email"
                    type="email"
                    value={draftProfile.email}
                    onChange={(e) =>
                      setDraftProfile({ ...draftProfile, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-xs font-sans bg-[#05070D] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>

                <div>
                  <label htmlFor="input-location" className="block text-xs font-mono text-[#CBD5E1] mb-1.5">
                    Location &amp; Availability
                  </label>
                  <input
                    id="input-location"
                    type="text"
                    value={draftProfile.location}
                    onChange={(e) =>
                      setDraftProfile({ ...draftProfile, location: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-xs font-sans bg-[#05070D] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="input-headline" className="block text-xs font-mono text-[#CBD5E1] mb-1.5">
                  Hero Headline Statement
                </label>
                <input
                  id="input-headline"
                  type="text"
                  value={draftProfile.headline}
                  onChange={(e) =>
                    setDraftProfile({ ...draftProfile, headline: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-xs font-sans bg-[#05070D] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div>
                <label htmlFor="input-bio" className="block text-xs font-mono text-[#CBD5E1] mb-1.5">
                  Executive Bio
                </label>
                <textarea
                  id="input-bio"
                  rows={3}
                  value={draftProfile.bio}
                  onChange={(e) =>
                    setDraftProfile({ ...draftProfile, bio: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-xs font-sans bg-[#05070D] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#38BDF8] resize-vertical"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <button
                  type="button"
                  onClick={onResetDefaults}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono text-[#94A3B8] hover:text-white bg-[#111827] rounded-lg transition-colors cursor-pointer border border-white/5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore Factory Defaults</span>
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-mono font-medium text-white bg-[#1D4ED8] hover:bg-[#2563EB] rounded-lg transition-colors cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          )}

          {activeTab === 'add-project' && (
            <form onSubmit={handleAddProjectSubmit} className="space-y-4" noValidate>
              {projectSuccess && (
                <div className="p-3.5 rounded-xl bg-[#10B981]/20 border border-[#10B981]/40 text-xs text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span>Case study added to your Blue Team portfolio grid.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="proj-title" className="block text-xs font-mono text-[#CBD5E1] mb-1.5">
                    Project or Lab Title *
                  </label>
                  <input
                    id="proj-title"
                    type="text"
                    placeholder="e.g., Splunk Brute-Force & Lateral Movement Hunt"
                    value={projectInput.title}
                    onChange={(e) =>
                      setProjectInput({ ...projectInput, title: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-xs font-sans bg-[#05070D] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                  {projectErrors.title && (
                    <p className="text-[11px] text-[#F87171] mt-1" role="alert">
                      {projectErrors.title}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="proj-category" className="block text-xs font-mono text-[#CBD5E1] mb-1.5">
                    Defensive Domain
                  </label>
                  <select
                    id="proj-category"
                    value={projectInput.category}
                    onChange={(e) =>
                      setProjectInput({
                        ...projectInput,
                        category: e.target.value as Exclude<ProjectCategory, 'All'>,
                      })
                    }
                    className="w-full px-3.5 py-2 text-xs font-sans bg-[#05070D] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#38BDF8]"
                  >
                    <option value="SIEM & Detection">SIEM &amp; Detection</option>
                    <option value="Threat Hunting & ML">Threat Hunting &amp; ML</option>
                    <option value="Phishing & SOAR">Phishing &amp; SOAR</option>
                    <option value="GRC & Risk Platform">GRC &amp; Risk Platform</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="proj-mitre" className="block text-xs font-mono text-[#CBD5E1] mb-1.5">
                    MITRE ATT&amp;CK Technique IDs
                  </label>
                  <input
                    id="proj-mitre"
                    type="text"
                    placeholder="e.g., T1059.001, T1105"
                    value={projectInput.mitreTechniqueIds}
                    onChange={(e) =>
                      setProjectInput({
                        ...projectInput,
                        mitreTechniqueIds: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 text-xs font-sans bg-[#05070D] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>

                <div>
                  <label htmlFor="proj-tools" className="block text-xs font-mono text-[#CBD5E1] mb-1.5">
                    Tools &amp; Platforms (comma-separated) *
                  </label>
                  <input
                    id="proj-tools"
                    type="text"
                    placeholder="e.g., Splunk, Wazuh, Sysmon, Volatility 3"
                    value={projectInput.toolsUsed}
                    onChange={(e) =>
                      setProjectInput({ ...projectInput, toolsUsed: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-xs font-sans bg-[#05070D] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                  {projectErrors.toolsUsed && (
                    <p className="text-[11px] text-[#F87171] mt-1" role="alert">
                      {projectErrors.toolsUsed}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="proj-impact" className="block text-xs font-mono text-[#CBD5E1] mb-1.5">
                  Measurable Outcome / Impact Metric *
                </label>
                <input
                  id="proj-impact"
                  type="text"
                  placeholder="e.g., 92.27% Ensemble Accuracy across 5 traffic classes"
                  value={projectInput.impactMetric}
                  onChange={(e) =>
                    setProjectInput({ ...projectInput, impactMetric: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-xs font-sans bg-[#05070D] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#38BDF8]"
                />
                {projectErrors.impactMetric && (
                  <p className="text-[11px] text-[#F87171] mt-1" role="alert">
                    {projectErrors.impactMetric}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="proj-summary" className="block text-xs font-mono text-[#CBD5E1] mb-1.5">
                  Technical Summary &amp; Approach *
                </label>
                <textarea
                  id="proj-summary"
                  rows={3}
                  placeholder="Describe the attack scenario, telemetry ingested, and detection logic..."
                  value={projectInput.summary}
                  onChange={(e) =>
                    setProjectInput({ ...projectInput, summary: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-xs font-sans bg-[#05070D] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#38BDF8] resize-vertical"
                />
                {projectErrors.summary && (
                  <p className="text-[11px] text-[#F87171] mt-1" role="alert">
                    {projectErrors.summary}
                  </p>
                )}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono font-medium text-white bg-[#1D4ED8] hover:bg-[#2563EB] rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Case Study</span>
                </button>
              </div>
            </form>
          )}

          {activeTab === 'add-cert' && (
            <form onSubmit={handleAddCertSubmit} className="space-y-4" noValidate>
              {certSuccess && (
                <div className="p-3.5 rounded-xl bg-[#10B981]/20 border border-[#10B981]/40 text-xs text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span>Certification added to your verification ledger.</span>
                </div>
              )}

              {certError && (
                <p className="text-xs text-[#F87171]" role="alert">
                  {certError}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cert-code" className="block text-xs font-mono text-[#CBD5E1] mb-1.5">
                    Short Code (e.g., BTL1, SC-200) *
                  </label>
                  <input
                    id="cert-code"
                    type="text"
                    placeholder="e.g., BTL1"
                    value={certCode}
                    onChange={(e) => setCertCode(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs font-sans bg-[#05070D] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>

                <div>
                  <label htmlFor="cert-name" className="block text-xs font-mono text-[#CBD5E1] mb-1.5">
                    Full Certification Title *
                  </label>
                  <input
                    id="cert-name"
                    type="text"
                    placeholder="e.g., Blue Team Level 1"
                    value={certName}
                    onChange={(e) => setCertName(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs font-sans bg-[#05070D] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>

                <div>
                  <label htmlFor="cert-issuer" className="block text-xs font-mono text-[#CBD5E1] mb-1.5">
                    Issuing Body *
                  </label>
                  <input
                    id="cert-issuer"
                    type="text"
                    placeholder="e.g., Security Blue Team"
                    value={certIssuer}
                    onChange={(e) => setCertIssuer(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs font-sans bg-[#05070D] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>

                <div>
                  <label htmlFor="cert-id" className="block text-xs font-mono text-[#CBD5E1] mb-1.5">
                    Credential ID / Verification Code
                  </label>
                  <input
                    id="cert-id"
                    type="text"
                    placeholder="e.g., CREDLY-VERIFIED"
                    value={certId}
                    onChange={(e) => setCertId(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs font-sans bg-[#05070D] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="cert-focus" className="block text-xs font-mono text-[#CBD5E1] mb-1.5">
                  Defensive Focus Area
                </label>
                <input
                  id="cert-focus"
                  type="text"
                  placeholder="e.g., Threat Hunting · DFIR · SIEM Detection Engineering"
                  value={certFocus}
                  onChange={(e) => setCertFocus(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs font-sans bg-[#05070D] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono font-medium text-white bg-[#1D4ED8] hover:bg-[#2563EB] rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Certification</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
