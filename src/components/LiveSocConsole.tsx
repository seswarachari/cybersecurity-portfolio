import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Code2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { LIVE_SIEM_LOGS } from '../data/blueTeamData';

interface LiveSocConsoleProps {
  onSendToTriage?: (payload: string) => void;
}

export const LiveSocConsole: React.FC<LiveSocConsoleProps> = () => {
  const [selectedEventId, setSelectedEventId] = useState<string>(
    LIVE_SIEM_LOGS[0].id
  );
  const [showTechnicalLog, setShowTechnicalLog] = useState<boolean>(false);

  const activeEvent =
    LIVE_SIEM_LOGS.find((e) => e.id === selectedEventId) || LIVE_SIEM_LOGS[0];

  return (
    <div className="rounded-2xl bg-[#090F1D] border border-[#1E293B] overflow-hidden shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column: 4 Real-World Scenarios to Choose From */}
        <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#1E293B] p-6 bg-[#070C17] flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <p className="text-xs font-medium text-[#93C5FD]">
              Select a Real Scenario From My Work:
            </p>

            <div className="space-y-2.5">
              {LIVE_SIEM_LOGS.map((scenario, idx) => {
                const isSelected = scenario.id === activeEvent.id;
                return (
                  <button
                    key={scenario.id}
                    type="button"
                    onClick={() => setSelectedEventId(scenario.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#111D35] border-[#3B82F6] shadow-md'
                        : 'bg-[#090F1D] border-[#1E293B] hover:border-[#334155]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs text-[#94A3B8]">
                      <span className="font-medium text-[#93C5FD]">
                        Case 0{idx + 1} · {scenario.mitreTactic}
                      </span>
                      <span className="text-xs text-[#CBD5E1]">
                        {isSelected ? 'Viewing →' : 'Read Story'}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-semibold text-white mt-1.5 leading-snug">
                      {scenario.plainTitle || scenario.summary}
                    </h3>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#090F1D] border border-[#1E293B] text-xs text-[#94A3B8] leading-relaxed">
            <strong className="text-white block mb-1">
              Why this matters for your team:
            </strong>
            Security tools generate thousands of alerts every day. My job as a SOC Analyst is to calmly investigate the evidence, confirm what is real, and take clear action to protect the business.
          </div>
        </div>

        {/* Right Column: Clear, Step-by-Step Story Walkthrough */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            {/* Story Header */}
            <div className="border-b border-[#1E293B] pb-5">
              <div className="text-xs font-medium text-[#60A5FA]">
                {activeEvent.timestamp} · {activeEvent.hostOrSrc}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1.5 font-display">
                {activeEvent.plainTitle || activeEvent.summary}
              </h3>
              <p className="text-sm sm:text-base text-[#D1D5DB] mt-2.5 leading-relaxed">
                {activeEvent.plainStory}
              </p>
            </div>

            {/* 4-Step Investigation Story */}
            {activeEvent.investigationSteps && (
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#93C5FD]">
                  How I Handled This Step-by-Step:
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {activeEvent.investigationSteps.map((step) => (
                    <div
                      key={step}
                      className="p-3.5 rounded-xl bg-[#070B14] border border-[#1E293B] flex items-start gap-3"
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

            {/* Plain-English Summary Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {Object.entries(activeEvent.decodedFields).map(([label, value]) => (
                <div
                  key={label}
                  className="p-3.5 rounded-xl bg-[#070B14] border border-[#1E293B]"
                >
                  <span className="text-xs text-[#94A3B8] block">{label}</span>
                  <span className="text-xs sm:text-sm font-medium text-white mt-0.5 block">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Outcome + Optional Technical Log Accordion for Technical Interviewers */}
          <div className="pt-4 border-t border-[#1E293B] space-y-4">
            <div className="p-4 rounded-xl bg-[#0D192E] border border-[#253B63] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#60A5FA] shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <span className="font-semibold text-white block">
                  Final Action Taken to Protect the Organization:
                </span>
                <span className="text-[#D1D5DB] mt-0.5 block leading-relaxed">
                  {activeEvent.playbookAction}
                </span>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => setShowTechnicalLog((prev) => !prev)}
                className="inline-flex items-center gap-2 text-xs font-medium text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
              >
                <Code2 className="w-3.5 h-3.5 text-[#60A5FA]" />
                <span>
                  {showTechnicalLog
                    ? 'Hide Raw Technical Log'
                    : 'View Raw SIEM Log (Optional — For Technical Interviewers)'}
                </span>
                {showTechnicalLog ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>

              {showTechnicalLog && (
                <pre className="mt-2.5 p-3.5 rounded-xl bg-[#050811] border border-[#1E293B] text-[11px] font-mono text-[#93C5FD] overflow-x-auto whitespace-pre-wrap break-all leading-relaxed">
                  {activeEvent.rawLog}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
