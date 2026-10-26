import React from 'react';
import {
  Activity,
  AlertTriangle,
  AtSign,
  Check,
  CircleDot,
  FileText,
  Laptop,
  Mail,
  PanelsTopLeft,
  Radar,
  Router,
  ShieldCheck,
  Siren,
  UserRound,
  Wifi,
} from 'lucide-react';

interface ProjectVisualProps {
  projectId: string;
  number: string;
}

const VisualLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="pv-label">{children}</span>
);

export const ProjectVisual: React.FC<ProjectVisualProps> = ({ projectId, number }) => {
  if (projectId === 'agenttesla-malware-dynamic-analysis') {
    return (
      <div className="project-visual pv-evidence" role="img" aria-label="Real ANY.RUN screenshot from the AgentTesla investigation">
        <img src="/assets/aistudio/1771326015554_39223381.jpeg" alt="AgentTesla process tree in ANY.RUN" loading="lazy" />
        <span className="pv-corner">{number} · REAL CASE</span>
        <span className="pv-caption"><ShieldCheck size={13} /> Traced in a safe lab</span>
      </div>
    );
  }

  if (projectId === 'email-phishing-sandbox-triage') {
    return (
      <div className="project-visual pv-phishing" role="img" aria-label="An email is checked for a fake sender and link, then safe mail is kept and risky mail is blocked">
        <div className="pv-scene-head"><span>{number} · EMAIL CHECK</span><span>REAL MAIL IN</span></div>
        <div className="pv-mail-card"><Mail size={31} /><div><strong>New message</strong><span>Check before opening</span></div><span className="pv-dot" /></div>
        <div className="pv-checks"><div><AtSign size={17} /><span>Fake sender?</span></div><div><AlertTriangle size={17} /><span>Risky link?</span></div></div>
        <div className="pv-decision"><span><Check size={14} /> Keep safe mail</span><span><ShieldCheck size={14} /> Block scams</span></div>
      </div>
    );
  }

  if (projectId === 'wazuh-siem-detection-lab') {
    return (
      <div className="project-visual pv-monitor" role="img" aria-label="Windows activity is watched, suspicious activity raises an alert, and a clear report is created">
        <div className="pv-scene-head"><span>{number} · WINDOWS WATCH</span><span>WAZUH</span></div>
        <div className="pv-monitor-flow">
          <div><Laptop size={27} /><VisualLabel>PC activity</VisualLabel></div><i />
          <div className="pv-monitor-alert"><Siren size={27} /><VisualLabel>Odd activity</VisualLabel></div><i />
          <div><FileText size={27} /><VisualLabel>Clear report</VisualLabel></div>
        </div>
        <p className="pv-footnote">Finds risky logins, hidden scripts, and unusual downloads.</p>
      </div>
    );
  }

  if (projectId === 'iot-malware-ensemble-dnn') {
    return (
      <div className="project-visual pv-iot" role="img" aria-label="Smart devices send network activity to an AI check that spots attacks">
        <div className="pv-scene-head"><span>{number} · SMART DEVICE SAFETY</span><span>92.27% TEST</span></div>
        <div className="pv-iot-scene">
          <div className="pv-device-cloud"><Router size={26} /><Wifi size={18} /><Laptop size={22} /><span>Smart devices</span></div>
          <div className="pv-packet-line"><b /><b /><b /></div>
          <div className="pv-radar"><Radar size={35} /><span>AI check</span></div>
          <span className="pv-threat-tag"><ShieldCheck size={13} /> Attack found</span>
        </div>
        <p className="pv-footnote">Spots botnets, floods, and scans on home and office devices.</p>
      </div>
    );
  }

  if (projectId === 'lolbins-hybrid-detection-engine') {
    return (
      <div className="project-visual pv-windows" role="img" aria-label="A trusted Windows tool is used in an unusual way, so the project flags it">
        <div className="pv-scene-head"><span>{number} · WINDOWS TOOL CHECK</span><span>RULE + BEHAVIOR</span></div>
        <div className="pv-windows-scene">
          <div className="pv-window-icon"><PanelsTopLeft size={31} /><span>Built-in tool</span></div>
          <div className="pv-odd-use"><Activity size={23} /><span>Used in a<br />strange way</span></div>
          <div className="pv-flag"><AlertTriangle size={24} /><span>Flag it</span></div>
        </div>
        <p className="pv-footnote">Catches attackers hiding behind tools already on Windows.</p>
      </div>
    );
  }

  if (projectId === 'c2-beaconing-detection-engine') {
    return (
      <div className="project-visual pv-beacon" role="img" aria-label="A computer makes the same quiet call every 60 seconds; the repeating pattern reveals a hidden connection">
        <div className="pv-scene-head"><span>{number} · HIDDEN CHECK-IN</span><span>NETWORK WATCH</span></div>
        <div className="pv-beacon-scene"><div className="pv-laptop-mini"><Laptop size={28} /><span>PC</span></div><div className="pv-pulse-line"><span /><span /><span /><span /><span /><small>same call every 60 sec</small></div><div className="pv-server"><CircleDot size={24} /><span>Unknown<br />server</span></div></div>
        <p className="pv-footnote">Finds malware hiding in normal web traffic.</p>
      </div>
    );
  }

  return (
    <div className="project-visual pv-risk" role="img" aria-label="Company assets are checked, risks are ranked on a simple five by five grid, and fixes are tracked">
      <div className="pv-scene-head"><span>{number} · COMPANY RISK</span><span>5 × 5 PRIORITY</span></div>
      <div className="pv-risk-scene"><div className="pv-assets"><span><Laptop size={16} /> Staff laptops</span><span><UserRound size={16} /> User accounts</span><span><Router size={16} /> Office network</span></div><div className="pv-risk-matrix" aria-hidden="true">{Array.from({ length: 25 }, (_, index) => <i key={index} className={index === 3 || index === 9 || index === 14 || index === 19 || index === 24 ? 'is-risk' : ''} />)}</div><div className="pv-fix"><ShieldCheck size={20} /><span>Fix top risks</span></div></div>
      <p className="pv-footnote">Turns a risk list into clear next steps for a team.</p>
    </div>
  );
};
