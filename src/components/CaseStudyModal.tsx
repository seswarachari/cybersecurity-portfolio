import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Copy,
  Check,
  Terminal,
  Cpu,
  ArrowUpRight,
  FolderGit2,
  Code2,
} from 'lucide-react';
import type { CaseStudyProject } from '../utils/portfolioLogic';
import { LAB_WRITEUP_VAULT } from '../data/blueTeamData';

const PROJECT_STORIES: Record<string, { flow: string[] }> = {
  'email-phishing-sandbox-triage': {
    flow: ['Add an email', 'Check sender and links', 'Show a risk score'],
  },
  'wazuh-siem-detection-lab': {
    flow: ['Watch PC activity', 'Flag unusual behavior', 'Create a clear report'],
  },
  'agenttesla-malware-dynamic-analysis': {
    flow: ['Open the file safely', 'Track what it does', 'Record the findings'],
  },
  'iot-malware-ensemble-dnn': {
    flow: ['Read device traffic', 'Compare nine models', 'Flag five attack types'],
  },
  'lolbins-hybrid-detection-engine': {
    flow: ['Watch built-in tools', 'Spot unusual use', 'Raise an alert'],
  },
  'c2-beaconing-detection-engine': {
    flow: ['Track network calls', 'Find repeating patterns', 'Flag a hidden link'],
  },
  'secureassess-risk-platform': {
    flow: ['List company assets', 'Rank each risk', 'Create a clear report'],
  },
};

const PROJECT_ARCHITECTURE_IMAGES: Record<string, { src: string; alt: string; stages: string[] }> = {
  'email-phishing-sandbox-triage': {
    src: '/assets/project-architectures/phishing-screening.webp',
    alt: 'An email is parsed, checked for sender, link, and attachment risks, scored, then marked safe or blocked.',
    stages: ['Email', 'Parse', 'Check sender, links & files', 'Score risk', 'Safe or block'],
  },
  'wazuh-siem-detection-lab': {
    src: '/assets/project-architectures/wazuh-siem-monitoring.webp',
    alt: 'Endpoint logs flow into SIEM detection, an analyst reviews an alert, and a report is created.',
    stages: ['PC activity', 'Collect logs', 'Match alert rules', 'Review alert', 'Write report'],
  },
  'agenttesla-malware-dynamic-analysis': {
    src: '/assets/project-architectures/agenttesla-analysis.webp',
    alt: 'A sample runs in an isolated sandbox, its behavior and network activity are observed, and findings are recorded.',
    stages: ['Sample file', 'Safe sandbox', 'Watch behavior', 'Check network', 'Record findings'],
  },
  'iot-malware-ensemble-dnn': {
    src: '/assets/project-architectures/iot-traffic-detection.webp',
    alt: 'IoT traffic is prepared, analyzed by parallel machine learning models, and classified by a combined vote.',
    stages: ['Device traffic', 'Prepare data', 'Compare models', 'Combine results', 'Classify threat'],
  },
  'lolbins-hybrid-detection-engine': {
    src: '/assets/project-architectures/lolbins-endpoint-detection.webp',
    alt: 'Windows utility behavior is inspected by detection rules, then suspicious use raises an analyst alert.',
    stages: ['Windows activity', 'Check tool use', 'Apply rules & ML', 'Raise alert', 'Review'],
  },
  'c2-beaconing-detection-engine': {
    src: '/assets/project-architectures/c2-beacon-detection.webp',
    alt: 'Repeated workstation check-ins are analyzed for a regular pattern, flagged, and blocked.',
    stages: ['Network calls', 'Measure timing', 'Find a pattern', 'Flag beacon', 'Block link'],
  },
  'secureassess-risk-platform': {
    src: '/assets/project-architectures/secureassess-risk-flow.webp',
    alt: 'Company assets and controls are checked, risks are ranked, and a remediation report is created.',
    stages: ['List assets', 'Check controls', 'Rank risks', 'Plan fixes', 'Create report'],
  },
};

interface CaseStudyModalProps {
  project: CaseStudyProject | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
}) => {
  const [ruleFormat, setRuleFormat] = useState<'primary' | 'kql' | 'third'>('primary');
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const activeRuleText =
    ruleFormat === 'primary'
      ? project.detectionRules.wazuhOrPrimary
      : ruleFormat === 'kql'
      ? project.detectionRules.kql
      : project.detectionRules.sigmaOrPython;
  const evidenceImages = project.id === 'agenttesla-malware-dynamic-analysis'
    ? LAB_WRITEUP_VAULT.find((report) => report.id === 'agenttesla-anyrun-case-study')?.secondaryImages ?? []
    : [];
  const story = PROJECT_STORIES[project.id] ?? {
    flow: ['Add the data', 'Check for risk', 'Show the result'],
  };
  const architectureImage = PROJECT_ARCHITECTURE_IMAGES[project.id];

  const handleCopyRule = async () => {
    try {
      await navigator.clipboard.writeText(activeRuleText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-modal-title"
    >
      {/* Click outside to close backdrop */}
      <div
        className="fixed inset-0 -z-10"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-4xl bg-[#080D1A] border border-[#38BDF8]/30 rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_35px_rgba(56,189,248,0.15)] my-6 flex flex-col max-h-[90vh]">
        {/* Top Modal Header */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-white/10 bg-[#050812]">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#94A3B8]">
            <span className="text-[#38BDF8] font-bold">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.repoName}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#93C5FD] bg-[#0E1B33] px-2 py-0.5 rounded border border-[#38BDF8]/20">
              Project overview
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-white bg-[#1D4ED8] hover:bg-[#2563EB] rounded-lg transition-colors whitespace-nowrap shadow-sm"
              >
                <span>GitHub Repo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study details"
              className="p-1.5 text-[#94A3B8] hover:text-white bg-[#111827] hover:bg-[#1F2937] rounded-lg transition-colors cursor-pointer border border-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
          {/* Title & Metadata */}
          <div>
            <h2
              id="case-study-modal-title"
              className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display"
            >
                {project.title}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-[#94A3B8]">
              <span>Tools: <strong className="text-[#CBD5E1]">{project.toolsUsed.slice(0, 3).join(' · ')}</strong></span>
              <span className="text-[#10B981] font-bold">Result: {project.impactMetric}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <section className="p-5 bg-[#060A14] border border-white/5 space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wide text-[#7DD3FC]">The problem</h3>
              <p className="text-sm text-[#CBD5E1] leading-relaxed">{project.problemStatement}</p>
            </section>
            <section className="p-5 bg-[#060A14] border border-white/5 space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wide text-[#9FE5CC]">What I built</h3>
              <p className="text-sm text-[#CBD5E1] leading-relaxed">{project.whatIBuilt}</p>
            </section>
          </div>

          {evidenceImages.length > 0 && (
            <section aria-label="Malware investigation evidence" className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xs font-mono tracking-[.12em] uppercase text-[#9FE5CC]">Evidence from the investigation</h3>
                <span className="text-[10px] font-mono text-[#64748B]">ANY.RUN · 03 FRAMES</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {evidenceImages.map((image, index) => (
                  <a key={image.url} href={image.url} target="_blank" rel="noopener noreferrer" className="group overflow-hidden border border-white/10 bg-[#050811]">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={image.url} alt={image.label} loading="lazy" className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-[1.03] transition duration-500" />
                    </div>
                    <div className="flex items-center justify-between gap-2 px-3 py-2 text-[10px] font-mono text-[#A8B6CC]">
                      <span className="truncate">0{index + 1} / {image.label}</span>
                      <ArrowUpRight className="w-3 h-3 shrink-0 text-[#7CD7B8]" />
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          <section className="p-5 sm:p-6 rounded-xl bg-[#060A14] border border-white/5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#10B981]">
              <Cpu className="w-4 h-4" />
              <span>HOW IT WORKS</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {story.flow.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.12 }}
                  className="flex items-center gap-3 sm:block p-3 bg-[#0B1220] border border-white/10 min-h-14"
                >
                  <span className="flex items-center justify-center w-7 h-7 shrink-0 text-xs font-mono text-[#9FE5CC] border border-[#9FE5CC]/30 rounded-full">{index + 1}</span>
                  <span className="text-sm text-[#E2E8F0]">{step}</span>
                </motion.div>
              ))}
            </div>
          </section>

          <details className="rounded-xl bg-[#050811] border border-white/5">
            <summary className="cursor-pointer list-none flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm text-[#A8B6CC]">
              <span>Technical notes</span><span className="text-xs text-[#64748B]">Threat coverage · architecture · tools</span>
            </summary>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 pb-4 text-sm text-[#CBD5E1]">
              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-wide text-[#7DD3FC]">Threat coverage</h3>
                <p className="leading-relaxed">{project.threatScenario}</p>
                <p className="text-xs text-[#64748B]">MITRE ATT&amp;CK: {project.mitreTechniqueIds.join(' · ')}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-wide text-[#9FE5CC]">Full architecture</h3>
                <p className="leading-relaxed">{project.architectureSummary}</p>
                <p className="text-xs text-[#64748B]">Tools: {project.toolsUsed.join(' · ')}</p>
              </div>
              {architectureImage && (
                <figure className="md:col-span-2 overflow-hidden border border-[#38BDF8]/15 bg-[#080D1A]">
                  <div className="aspect-[16/7] sm:aspect-[16/6] overflow-hidden">
                    <img
                      src={architectureImage.src}
                      alt={architectureImage.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="border-t border-white/5 px-3 py-3">
                    <p className="mb-2 text-[10px] font-mono tracking-[.12em] text-[#64748B]">PROJECT FLOW · STEP NAMES</p>
                    <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-xs text-[#B9C7D9]">
                      {architectureImage.stages.map((stage, index) => (
                        <li key={stage} className="inline-flex items-center gap-2">
                          <span className="text-[#7DD3FC]">{String(index + 1).padStart(2, '0')}</span>
                          <span>{stage}</span>
                          {index < architectureImage.stages.length - 1 && <span aria-hidden="true" className="text-[#38BDF8]/50">→</span>}
                        </li>
                      ))}
                    </ol>
                  </figcaption>
                </figure>
              )}
            </div>
          </details>

          {project.repoFiles && project.repoFiles.length > 0 && (
            <details className="group rounded-xl bg-[#050811] border border-white/5">
              <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm text-[#A8B6CC]">
                <FolderGit2 className="w-4 h-4 text-[#38BDF8]" />
                Explore project files
                <span className="ml-auto text-xs text-[#64748B]">{project.repoFiles.length} items</span>
              </summary>
              <div className="flex flex-wrap gap-2 px-4 pb-4 text-xs font-mono text-[#CBD5E1]">
                {project.repoFiles.map((file) => <span key={file} className="bg-[#0C1222] px-2 py-1 rounded border border-white/5">{file}</span>)}
              </div>
            </details>
          )}

          {/* Interactive Code & Detection Rule Inspector */}
          <details className="rounded-xl bg-[#04060B] border border-white/10 overflow-hidden">
            <summary className="cursor-pointer list-none flex items-center gap-2 px-4 py-3 text-sm text-[#A8B6CC]">
              <Code2 className="w-4 h-4 text-[#38BDF8]" />
              View detection rules and code
              <span className="ml-auto text-xs text-[#64748B]">For technical review</span>
            </summary>
            <div>
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-white/10 bg-[#080D1A]">
              <div className="flex items-center gap-2 text-xs font-mono text-white">
                <Terminal className="w-4 h-4 text-[#38BDF8]" />
                <span>Detection rules &amp; queries</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Format Tabs */}
                <div
                  className="flex items-center gap-1 p-1 bg-[#05070D] rounded-lg border border-white/10"
                  role="tablist"
                  aria-label="Detection rule format"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={ruleFormat === 'primary'}
                    onClick={() => setRuleFormat('primary')}
                    className={`px-2.5 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                      ruleFormat === 'primary'
                        ? 'bg-[#1D4ED8] text-white font-medium'
                        : 'text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    {project.detectionRules.primaryLabel}
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={ruleFormat === 'kql'}
                    onClick={() => setRuleFormat('kql')}
                    className={`px-2.5 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                      ruleFormat === 'kql'
                        ? 'bg-[#1D4ED8] text-white font-medium'
                        : 'text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    KQL (Sentinel)
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={ruleFormat === 'third'}
                    onClick={() => setRuleFormat('third')}
                    className={`px-2.5 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                      ruleFormat === 'third'
                        ? 'bg-[#1D4ED8] text-white font-medium'
                        : 'text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    {project.detectionRules.thirdLabel}
                  </button>
                </div>

                {/* Copy Button */}
                <button
                  type="button"
                  onClick={handleCopyRule}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[#CBD5E1] bg-[#111A2E] hover:bg-[#1A2847] border border-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#10B981]" />
                      <span className="text-[#10B981]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <pre className="p-5 text-xs font-mono text-[#93C5FD] overflow-x-auto leading-relaxed bg-[#030509]">
              <code>{activeRuleText}</code>
            </pre>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};
