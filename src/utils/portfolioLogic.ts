export type ProjectCategory =
  | 'All'
  | 'SIEM & Detection'
  | 'Threat Hunting & ML'
  | 'Phishing & SOAR'
  | 'GRC & Risk Platform';

export interface DetectionRuleSet {
  wazuhOrPrimary: string;
  primaryLabel: string;
  kql: string;
  sigmaOrPython: string;
  thirdLabel: string;
}

export interface CaseStudyProject {
  id: string;
  title: string;
  repoName: string;
  repoUrl: string;
  category: Exclude<ProjectCategory, 'All'>;
  timeline: string;
  environment: string;
  mitreTactics: string[];
  mitreTechniqueIds: string[];
  problemStatement?: string;
  whatIBuilt?: string;
  summary: string;
  impactMetric: string;
  threatScenario: string;
  architectureSummary: string;
  toolsUsed: string[];
  repoFiles: string[];
  featured?: boolean;
  visualType: 'siem' | 'forensics' | 'hunting' | 'soar';
  previewImageUrl?: string;
  detectionRules: DetectionRuleSet;
}

export interface StoryChapter {
  id: string;
  stepNumber: string;
  period: string;
  title: string;
  subtitle: string;
  story: string;
  takeaway: string;
}

export interface CertificationItem {
  id: string;
  code: string;
  name: string;
  issuer: string;
  issuedDate: string;
  credentialId: string;
  focusArea: string;
  verifiedUrl?: string;
  coreCompetencies: string[];
  previewImageUrl: string;
  certificateAssetUrl?: string;
  assetType?: 'pdf' | 'image';
  badgeImageUrl?: string;
  verificationCode?: string;
}

export interface LabWriteupReport {
  id: string;
  title: string;
  category: string;
  pagesOrFormat: string;
  documentUrl: string;
  documentType: 'pdf' | 'image';
  previewImageUrl?: string;
  summary: string;
  vulnerabilitiesCovered: string[];
  secondaryImages?: Array<{
    label: string;
    url: string;
  }>;
}

export interface SkillDomain {
  id: string;
  domain: string;
  subtitle: string;
  yearsExperience: string;
  verifiedDetections: string;
  tools: string[];
  capabilities: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  mode: string;
  highlights: string[];
  tools: string[];
}

export interface CyberRangeItem {
  id: string;
  platform: string;
  track: string;
  metric: string;
  summary: string;
  skillsValidated: string[];
  proofImageUrl?: string;
  proofLabel?: string;
  secondaryImages?: Array<{
    label: string;
    url: string;
  }>;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  score: string;
}

export interface TelemetrySource {
  id: string;
  name: string;
  category: string;
  coverageWeight: number;
  mttdReductionMinutes: number;
  mitreTacticsCovered: string[];
  description: string;
}

export interface SiemLogEvent {
  id: string;
  timestamp: string;
  source:
    | 'WAZUH-SIEM'
    | 'ANY.RUN-SANDBOX'
    | 'ZEEK-PCAP-ML'
    | 'STELLAR-XDR'
    | 'PHISH-SOAR'
    | 'SPLUNK-SOC'
    | 'CICIOT-DNN';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO';
  ruleId: string;
  mitreId: string;
  mitreTactic: string;
  hostOrSrc: string;
  plainTitle?: string;
  plainStory?: string;
  investigationSteps?: string[];
  summary: string;
  rawLog: string;
  decodedFields: Record<string, string>;
  playbookAction: string;
}

export interface ProfileData {
  fullName: string;
  roleTitle: string;
  location: string;
  clearanceOrStatus: string;
  yearsInSecOps: string;
  headline: string;
  bio: string;
  email: string;
  phone: string;
  githubHandle: string;
  githubUrl: string;
  linkedinHandle: string;
  linkedinUrl: string;
  credlyUrl?: string;
  resumePdfUrl: string;
  portraitDataUrl: string | null;
  portraitStylePreset: 'editorial-dark' | 'soc-architect' | 'minimal-monochrome';
}

export interface NewProjectInput {
  title: string;
  category: Exclude<ProjectCategory, 'All'>;
  timeline: string;
  environment: string;
  mitreTechniqueIds: string;
  summary: string;
  impactMetric: string;
  toolsUsed: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export interface LiveTriageResult {
  verdict: 'MALICIOUS' | 'SUSPICIOUS' | 'BENIGN';
  riskScore: number;
  matchedRuleId: string;
  mitreTechnique: string;
  engineLayer: string;
  indicators: string[];
  recommendedAction: string;
}

export function filterProjects(
  projects: CaseStudyProject[],
  category: ProjectCategory,
  searchQuery: string
): CaseStudyProject[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesCategory = category === 'All' || project.category === category;
    if (!matchesCategory) return false;

    if (!normalizedQuery) return true;

    const searchableText = [
      project.title,
      project.repoName,
      project.category,
      project.summary,
      project.problemStatement || '',
      project.whatIBuilt || '',
      project.impactMetric,
      project.environment,
      ...project.toolsUsed,
      ...project.mitreTactics,
      ...project.mitreTechniqueIds,
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

export function filterSiemLogs(
  logs: SiemLogEvent[],
  severityFilter: 'ALL' | 'CRITICAL' | 'HIGH' | 'MEDIUM',
  query: string
): SiemLogEvent[] {
  const normalized = query.trim().toLowerCase();
  return logs.filter((log) => {
    if (severityFilter !== 'ALL' && log.severity !== severityFilter) {
      return false;
    }
    if (!normalized) return true;
    const hay = [
      log.source,
      log.ruleId,
      log.mitreId,
      log.mitreTactic,
      log.hostOrSrc,
      log.plainTitle || '',
      log.plainStory || '',
      log.summary,
      log.rawLog,
    ]
      .join(' ')
      .toLowerCase();
    return hay.includes(normalized);
  });
}

export function calculateDefensiveReadiness(
  allSources: TelemetrySource[],
  activeSourceIds: string[]
): {
  coverageScore: number;
  estimatedMttdMinutes: number;
  coveredTactics: string[];
  activeSourceCount: number;
  readinessTier: string;
} {
  const baselineMttd = 42.0;
  const selected = allSources.filter((s) => activeSourceIds.includes(s.id));

  const rawWeight = selected.reduce((sum, item) => sum + item.coverageWeight, 0);
  const coverageScore = Math.min(100, Math.max(0, Math.round(rawWeight)));

  const totalReduction = selected.reduce(
    (sum, item) => sum + item.mttdReductionMinutes,
    0
  );
  const estimatedMttdMinutes = Number(
    Math.max(3.5, baselineMttd - totalReduction).toFixed(1)
  );

  const tacticSet = new Set<string>();
  selected.forEach((source) => {
    source.mitreTacticsCovered.forEach((t) => tacticSet.add(t));
  });

  let readinessTier = 'Baseline Visibility';
  if (coverageScore >= 85) {
    readinessTier = 'Autonomous SOC Grade';
  } else if (coverageScore >= 60) {
    readinessTier = 'Proactive Threat Hunting';
  } else if (coverageScore >= 35) {
    readinessTier = 'Managed SIEM Operations';
  }

  return {
    coverageScore,
    estimatedMttdMinutes,
    coveredTactics: Array.from(tacticSet),
    activeSourceCount: selected.length,
    readinessTier,
  };
}

export function evaluateTelemetryPayload(rawInput: string): LiveTriageResult {
  const text = rawInput.trim();
  const lower = text.toLowerCase();

  if (!text) {
    return {
      verdict: 'BENIGN',
      riskScore: 0,
      matchedRuleId: 'No Activity Entered',
      mitreTechnique: 'None',
      engineLayer: 'Idle',
      indicators: ['Select a sample scenario above to see how the alert is analyzed.'],
      recommendedAction: 'Choose one of the sample security events to view the step-by-step response.',
    };
  }

  const indicators: string[] = [];
  let riskScore = 10;
  let matchedRuleId = 'Standard System Activity';
  let mitreTechnique = 'Normal Administration';
  let engineLayer = 'Baseline Monitoring';

  if (lower.includes('certutil') && (lower.includes('-urlcache') || lower.includes('-split'))) {
    riskScore = 94;
    matchedRuleId = 'Suspicious File Download via Built-In Windows Tool (Wazuh Rule 100010)';
    mitreTechnique = 'T1105 — Unauthorized File Download';
    engineLayer = 'Endpoint Process Monitoring (Wazuh + Behavioral Check)';
    indicators.push('A built-in Windows certificate tool (certutil.exe) was used to download an external program.');
    indicators.push('The downloaded file was saved in a public folder to hide from normal security checks.');
  } else if (
    lower.includes('powershell') &&
    (lower.includes('-enc') || lower.includes('-encodedcommand') || lower.includes('-w hidden'))
  ) {
    riskScore = 92;
    matchedRuleId = 'Hidden & Scrambled PowerShell Command (Wazuh Rule 100030)';
    mitreTechnique = 'T1059.001 — Hidden Script Execution';
    engineLayer = 'Endpoint Script Monitoring';
    indicators.push('PowerShell was launched with a hidden window so the user would not see it running.');
    indicators.push('The command text was scrambled (Base64 encoded) to disguise what it was doing.');
  } else if (
    lower.includes('agenttesla') ||
    lower.includes('smtp.godforeu.com') ||
    lower.includes('208.91.199.225') ||
    (lower.includes('schtasks') && lower.includes('updates'))
  ) {
    riskScore = 98;
    matchedRuleId = 'Password-Stealing Malware & Data Leak (AgentTesla Sandbox Alert)';
    mitreTechnique = 'T1053.005 — Automatic Startup Task & Outbound Data Theft';
    engineLayer = 'Malware Sandbox & Network Monitoring';
    indicators.push('The program created a hidden scheduled task so it restarts every time the computer turns on.');
    indicators.push('It attempted to secretly email stolen browser passwords to an external server (208.91.199.225).');
  } else if (
    lower.includes('spf=fail') ||
    lower.includes('dmarc=fail') ||
    lower.includes('urgent') ||
    lower.includes('verify your account')
  ) {
    riskScore = 89;
    matchedRuleId = 'Spoofed Phishing Email Attempting Credential Theft';
    mitreTechnique = 'T1566.001 — Phishing Email Lure';
    engineLayer = 'Email Phishing Sandbox';
    indicators.push('The sender address failed email authenticity checks (spoofed lookalike domain).');
    indicators.push('Uses urgent pressure language ("Verify your account within 2 hours") to trick employees.');
  } else if (
    lower.includes('mshta') ||
    lower.includes('rundll32') ||
    lower.includes('regsvr32') ||
    lower.includes('mimikatz') ||
    lower.includes('sekurlsa')
  ) {
    riskScore = 96;
    matchedRuleId = 'Attempt to Extract Saved Windows Passwords (Credential Dumping)';
    mitreTechnique = 'T1003.001 — Password Memory Access';
    engineLayer = 'Open XDR & Endpoint Protection';
    indicators.push('A system utility was used to copy sensitive Windows login memory (LSASS).');
    indicators.push('High-risk behavior associated with attackers trying to steal administrator access.');
  } else if (lower.includes('jitter') || lower.includes('beacon') || lower.includes('interval')) {
    riskScore = 86;
    matchedRuleId = 'Automated Secret Check-In to External Server (C2 Beacon)';
    mitreTechnique = 'T1071.001 — Covert Network Communication';
    engineLayer = 'Network Traffic Pattern Analyzer';
    indicators.push('An internal computer is contacting the same unfamiliar external IP every 60 seconds like clockwork.');
    indicators.push('This regular heartbeat pattern indicates an automated backdoor awaiting remote commands.');
  } else {
    riskScore = 14;
    matchedRuleId = 'Safe Everyday IT Command';
    mitreTechnique = 'No Threat Detected';
    engineLayer = 'Standard Security Check (Clean)',
    indicators.push('Normal system administration command with no suspicious behavior.');
  }

  const verdict: LiveTriageResult['verdict'] =
    riskScore >= 80 ? 'MALICIOUS' : riskScore >= 45 ? 'SUSPICIOUS' : 'BENIGN';

  const recommendedAction =
    verdict === 'MALICIOUS'
      ? 'Isolate the affected computer from the network, block the external address, and reset affected user passwords.'
      : verdict === 'SUSPICIOUS'
      ? 'Check with the employee or IT administrator to confirm whether this action was planned.'
      : 'No action needed — log as normal daily activity.';

  return {
    verdict,
    riskScore,
    matchedRuleId,
    mitreTechnique,
    engineLayer,
    indicators,
    recommendedAction,
  };
}

export function validateNewProjectInput(input: NewProjectInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input.title || input.title.trim().length < 4) {
    errors.title = 'Project title must be at least 4 characters.';
  }
  if (!input.summary || input.summary.trim().length < 15) {
    errors.summary = 'Please provide a summary of at least 15 characters.';
  }
  if (!input.impactMetric || input.impactMetric.trim().length < 5) {
    errors.impactMetric =
      'Include a measurable outcome (e.g. "92.27% accuracy across 5 traffic classes").';
  }
  if (!input.toolsUsed || input.toolsUsed.trim().length < 2) {
    errors.toolsUsed = 'Specify at least one tool (e.g. Wazuh, Splunk, Python).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateContactDispatch(input: {
  senderName: string;
  senderEmail: string;
  organization: string;
  inquiryType: string;
  message: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input.senderName || input.senderName.trim().length < 2) {
    errors.senderName = 'Please enter your full name.';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.senderEmail || !emailRegex.test(input.senderEmail.trim())) {
    errors.senderEmail = 'Please enter a valid work or personal email address.';
  }
  if (!input.message || input.message.trim().length < 10) {
    errors.message = 'Brief message must be at least 10 characters.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
