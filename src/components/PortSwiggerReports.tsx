import React from 'react';
import { ArrowDownToLine, ArrowUpRight, BookOpen } from 'lucide-react';
import { LAB_WRITEUP_VAULT } from '../data/blueTeamData';

const REPORT_META: Record<string, { topic: string; labs: number; preview: string }> = {
  'portswigger-serverside-access-ssrf-pdf': {
    topic: 'Account Permission Controls · Admin Panel Protection · Cloud Server Security (SSRF)', labs: 14,
    preview: '/assets/portswigger/server-side.jpg',
  },
  'portswigger-prototype-pollution-rce-pdf': {
    topic: 'Node.js Server Protection · Browser Security · Safe Input Validation', labs: 9,
    preview: '/assets/portswigger/prototype-pollution.jpg',
  },
  'portswigger-file-upload-webshell-pdf': {
    topic: 'Safe File Upload Checks · Blocking Disguised Scripts · Web Server Hardening', labs: 6,
    preview: '/assets/portswigger/file-upload.jpg',
  },
  'portswigger-path-traversal-bypass-pdf': {
    topic: 'Server File Privacy · URL Input Validation · Access Restriction Controls', labs: 6,
    preview: '/assets/portswigger/path-traversal.jpg',
  },
  'portswigger-sqli-websockets-cache-pdf': {
    topic: 'Database Security (SQL Injection) · Real-Time WebSockets Security · Web Cache Protection', labs: 22,
    preview: '/assets/portswigger/websockets-cache-sqli.jpg',
  },
};

export const PortSwiggerReports: React.FC = () => {
  const reports = LAB_WRITEUP_VAULT.filter((report) => report.id.startsWith('portswigger-'));
  const coveredLabs = reports.reduce((total, report) => total + (REPORT_META[report.id]?.labs ?? 0), 0);

  return (
    <section className="report-shelf" aria-labelledby="reports-title">
      <div className="report-shelf-heading">
        <div>
          <p className="section-eyebrow"><span>FIELD NOTES</span> PortSwigger Academy</p>
          <h3 id="reports-title">Written Security Guides &amp; Investigation Reports (6)</h3>
          <p>Six guides and reports: 73 pages of PortSwigger remediation guides plus the AgentTesla investigation report.</p>
        </div>
        <div className="report-stats" aria-label={`${coveredLabs} labs documented across ${reports.length} reports`}>
          <span><strong>{coveredLabs}</strong> labs documented</span>
          <span><strong>{reports.length}</strong> illustrated reports</span>
        </div>
      </div>

      <div className="report-grid">
        {reports.map((report, index) => {
          const meta = REPORT_META[report.id];
          if (!meta) return null;
          return (
            <a
              key={report.id}
              className="report-card"
              href={report.documentUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${report.title} PDF, ${meta.labs} labs, ${report.pagesOrFormat}`}
            >
              <div className="report-image-wrap">
                <img src={meta.preview} alt={`${meta.title} report page preview`} loading="lazy" />
                <span className="report-image-number">0{index + 1}</span>
                <span className="report-open"><ArrowUpRight size={15} /> Open report</span>
              </div>
              <div className="report-card-copy">
                <div className="report-meta"><span>{meta.labs} labs</span><span>{report.pagesOrFormat.replace('-Page Illustrated PDF', ' pages')}</span></div>
                <h4>{report.title}</h4>
                <p>{report.summary}</p>
                <p>{meta.topic}</p>
                <span className="report-download"><BookOpen size={14} /> Read illustrated report <ArrowDownToLine size={14} /></span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};
