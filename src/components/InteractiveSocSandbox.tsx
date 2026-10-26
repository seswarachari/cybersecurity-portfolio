import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ShieldCheck,
  CheckCircle2,
  Code2,
  ChevronDown,
  ChevronUp,
  Terminal,
  AlertTriangle,
  Radio,
  Copy,
  Check,
  Server,
  Activity,
} from 'lucide-react';
import { LIVE_SIEM_LOGS } from '../data/blueTeamData';

export const InteractiveSocSandbox: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState<string>(LIVE_SIEM_LOGS[0].id);
  const [showRawLog, setShowRawLog] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const activeEvent =
    LIVE_SIEM_LOGS.find((e) => e.id === selectedId) || LIVE_SIEM_LOGS[0];

  const handleCopyLog = async () => {
    try {
      await navigator.clipboard.writeText(activeEvent.rawLog);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="investigation" className="relative py-24 sm:py-32 bg-[#03060C] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#10B981] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            <span>03 // Interactive SOC Console &amp; Triage Simulator</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
            From raw signal <br />
            <span className="text-gradient-emerald">to verified containment.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-3xl leading-relaxed">
            Real telemetry from my SOC homelab and ANY.RUN sandbox investigations. Select any scenario below to walk through my 4-step triage methodology and see how threats are neutralized.
          </p>
        </div>

        {/* The Live Console Shell */}
        <div className="rounded-2xl glass-panel border border-[#1E293B] overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)]">
          {/* Top Console Titlebar */}
          <div className="px-6 py-3.5 bg-[#070A12] border-b border-[#1E293B] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2.5 text-white font-medium">
              <Terminal className="w-4 h-4 text-[#10B981]" />
              <span>DEFENSIVE SIEM WORKSTATION // LIVE TRIAGE ENGINE</span>
            </div>
            <div className="flex items-center gap-3 text-[#94A3B8]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span className="text-[#10B981]">SYSTEMS SYNCHRONIZED</span>
              </span>
              <span>4 REAL SCENARIOS LOADED</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: 4 Scenario Switchers (lg:col-span-5) */}
            <div className="lg:col-span-5 p-6 bg-[#060912] border-b lg:border-b-0 lg:border-r border-[#1E293B] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="text-[11px] font-mono text-[#93C5FD] uppercase tracking-wider block">
                  Select Investigation Scenario:
                </span>

                <div className="space-y-3">
                  {LIVE_SIEM_LOGS.map((item, idx) => {
                    const isSelected = item.id === activeEvent.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedId(item.id)}
                        className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#0E1A33] border-[#3B82F6] shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                            : 'bg-[#080D1A] border-white/5 hover:border-white/15'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
                          <span className="text-[#38BDF8] font-bold">
                            CASE 0{idx + 1} · {item.source}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              item.severity === 'CRITICAL'
                                ? 'bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30'
                                : 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30'
                            }`}
                          >
                            {item.severity}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-white mt-2 leading-snug">
                          {item.plainTitle || item.summary}
                        </h4>

                        <div className="mt-2 text-xs text-[#94A3B8] flex items-center justify-between">
                          <span>MITRE {item.mitreId}</span>
                          <span className="text-[#38BDF8] font-mono">
                            {isSelected ? 'Active →' : 'Examine'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Recruiter / Hiring Manager Callout */}
              <div className="p-4 rounded-xl bg-[#080D1A] border border-white/5 text-xs text-[#94A3B8] leading-relaxed">
                <strong className="text-white block mb-1">
                  Why this matters for your SOC team:
                </strong>
                Security software generates thousands of alerts per shift. My value is knowing how to calmly confirm malicious behavior, minimize false positive disruptions, and isolate root causes fast.
              </div>
            </div>

            {/* Right Column: Step-by-Step Investigation Walkthrough (lg:col-span-7) */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                {/* Header Strip */}
                <div className="border-b border-white/10 pb-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#38BDF8] mb-1.5">
                    <span>{activeEvent.timestamp}</span>
                    <span className="text-[#94A3B8]">Host: {activeEvent.hostOrSrc}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                    {activeEvent.plainTitle || activeEvent.summary}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#CBD5E1] mt-2 leading-relaxed">
                    {activeEvent.plainStory}
                  </p>
                </div>

                {/* 4-Step Investigation Trail */}
                {activeEvent.investigationSteps && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#93C5FD]">
                      Step-by-Step Forensic Investigation:
                    </h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {activeEvent.investigationSteps.map((step) => (
                        <div
                          key={step}
                          className="p-3.5 rounded-xl bg-[#080D1A] border border-white/5 flex items-start gap-3"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                          <p className="text-xs sm:text-sm text-[#E2E8F0] leading-relaxed">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Decoded Telemetry Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {Object.entries(activeEvent.decodedFields).map(([label, value]) => (
                    <div
                      key={label}
                      className="p-3.5 rounded-xl bg-[#080D1A] border border-white/5"
                    >
                      <span className="text-[11px] font-mono text-[#94A3B8] block">{label}</span>
                      <span className="text-xs sm:text-sm font-semibold text-white mt-1 block">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Playbook Outcome & Collapsible Technical Log */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                <div className="p-4 rounded-xl bg-[#0B1A30] border border-[#1E3A8A] flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <span className="font-bold text-white block">
                      Playbook Response Action Executed:
                    </span>
                    <span className="text-[#CBD5E1] mt-0.5 block leading-relaxed">
                      {activeEvent.playbookAction}
                    </span>
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => setShowRawLog((prev) => !prev)}
                    className="inline-flex items-center gap-2 text-xs font-mono text-[#94A3B8] hover:text-[#38BDF8] transition-colors cursor-pointer"
                  >
                    <Code2 className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>
                      {showRawLog
                        ? 'Collapse Raw SIEM Event'
                        : 'View Raw SIEM / Sandbox Telemetry Payload (For Technical Interviewers)'}
                    </span>
                    {showRawLog ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {showRawLog && (
                    <div className="relative mt-2.5">
                      <button
                        type="button"
                        onClick={handleCopyLog}
                        className="absolute top-2 right-2 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#161F33] text-[10px] font-mono text-[#CBD5E1] hover:text-white border border-white/10 cursor-pointer"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3 h-3 text-[#10B981]" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Log</span>
                          </>
                        )}
                      </button>
                      <pre className="p-4 rounded-xl bg-[#04060B] border border-white/10 text-[11px] font-mono text-[#93C5FD] overflow-x-auto whitespace-pre-wrap break-all leading-relaxed">
                        {activeEvent.rawLog}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
