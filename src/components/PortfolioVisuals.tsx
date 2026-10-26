import React from 'react';

interface PortraitVisualProps {
  portraitDataUrl: string | null;
  preset: 'editorial-dark' | 'soc-architect' | 'minimal-monochrome';
  fullName: string;
  roleTitle: string;
  onUploadClick: () => void;
}

export const DefenderPortraitVisual: React.FC<PortraitVisualProps> = ({
  portraitDataUrl,
  preset,
  fullName,
  roleTitle,
  onUploadClick,
}) => {
  const bgGradient =
    preset === 'editorial-dark'
      ? 'from-[#0D1527] via-[#090E1A] to-[#05070E]'
      : preset === 'soc-architect'
      ? 'from-[#0E1930] via-[#0B1222] to-[#060911]'
      : 'from-[#141619] via-[#0D0E11] to-[#07080A]';

  const accentStroke =
    preset === 'editorial-dark'
      ? '#38BDF8'
      : preset === 'soc-architect'
      ? '#60A5FA'
      : '#9CA3AF';

  return (
    <div
      className={`relative w-full h-full min-h-[420px] lg:h-full rounded-2xl overflow-hidden border border-[#1E293B] bg-gradient-to-b ${bgGradient} flex flex-col justify-between shadow-xl group`}
    >
      {portraitDataUrl ? (
        <img
          src={portraitDataUrl}
          alt={`${fullName} — ${roleTitle}`}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
        />
      ) : (
        <svg
          viewBox="0 0 600 760"
          className="absolute inset-0 w-full h-full object-cover"
          role="img"
          aria-label={`Portrait illustration for ${fullName}`}
        >
          <defs>
            <radialGradient id="studioLight" cx="50%" cy="32%" r="60%">
              <stop offset="0%" stopColor={accentStroke} stopOpacity="0.22" />
              <stop offset="55%" stopColor="#1E293B" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#05070B" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E2636" />
              <stop offset="100%" stopColor="#0B0F17" />
            </linearGradient>
          </defs>
          <rect width="600" height="760" fill="url(#studioLight)" />
          <path
            d="M95 760 C105 565 180 485 300 485 C420 485 495 565 505 760 Z"
            fill="url(#suitGrad)"
          />
          <path
            d="M218 265 C218 192 252 152 300 152 C348 152 382 192 382 265 C382 342 350 422 300 422 C250 422 218 342 218 265 Z"
            fill="#1A2333"
          />
        </svg>
      )}

      {/* Clean Top Bar: Availability & Photo Upload */}
      <div className="relative z-10 p-5 flex items-center justify-between bg-gradient-to-b from-black/70 via-black/25 to-transparent">
        <span className="text-xs font-medium text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
          <span>Available for Immediate Joining</span>
        </span>
        <button
          type="button"
          onClick={onUploadClick}
          className="px-3 py-1.5 text-xs font-medium text-white bg-black/60 hover:bg-[#3B82F6] border border-white/20 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          {portraitDataUrl ? 'Change Photo' : 'Upload Photo'}
        </button>
      </div>

      {/* Bottom Scrim & Human Identity Caption */}
      <div className="relative z-10 p-6 pt-20 bg-gradient-to-t from-[#050811] via-[#050811]/85 to-transparent">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-[#93C5FD] mb-1">
              B.Tech in Cyber Security
            </p>
            <h2 className="text-xl font-bold text-white tracking-tight font-display">
              {fullName}
            </h2>
            <p className="text-sm text-[#D1D5DB] mt-0.5">{roleTitle}</p>
          </div>
          <div className="text-right text-xs text-[#94A3B8] shrink-0">
            <div className="text-white font-medium">Tirupati, India</div>
            <div>Remote / Onsite</div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CaseStudyArtworkProps {
  visualType: 'siem' | 'forensics' | 'hunting' | 'soar';
  mitreIds: string[];
  previewImageUrl?: string;
}

export const CaseStudyArtwork: React.FC<CaseStudyArtworkProps> = ({
  visualType,
  previewImageUrl,
}) => {
  return (
    <div className="relative w-full h-44 overflow-hidden bg-[#080D1A] border-b border-[#1E293B]">
      {previewImageUrl ? (
        <div className="relative w-full h-full">
          <img
            src={previewImageUrl}
            alt="Project Visual Preview"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080D1A] via-[#080D1A]/30 to-transparent" />
        </div>
      ) : visualType === 'siem' ? (
        <svg
          viewBox="0 0 640 220"
          className="w-full h-full object-cover"
          aria-hidden="true"
        >
          <rect width="640" height="220" fill="#080D1A" />
          <path
            d="M110 110 L320 110 L530 110"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          <rect
            x="36"
            y="72"
            width="156"
            height="76"
            rx="12"
            fill="#0F172A"
            stroke="#293B5F"
            strokeWidth="1.5"
          />
          <text
            x="114"
            y="104"
            fill="#93C5FD"
            fontSize="12"
            fontWeight="600"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            1. Collect Activity
          </text>
          <text
            x="114"
            y="126"
            fill="#CBD5E1"
            fontSize="11"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            Windows &amp; Login Logs
          </text>

          <rect
            x="242"
            y="72"
            width="156"
            height="76"
            rx="12"
            fill="#0F172A"
            stroke="#3B82F6"
            strokeWidth="1.5"
          />
          <text
            x="320"
            y="104"
            fill="#38BDF8"
            fontSize="12"
            fontWeight="600"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            2. Spot Unusual Behavior
          </text>
          <text
            x="320"
            y="126"
            fill="#CBD5E1"
            fontSize="11"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            Custom Wazuh Alert Rules
          </text>

          <rect
            x="448"
            y="72"
            width="156"
            height="76"
            rx="12"
            fill="#0F172A"
            stroke="#10B981"
            strokeWidth="1.5"
          />
          <text
            x="526"
            y="104"
            fill="#10B981"
            fontSize="12"
            fontWeight="600"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            3. Clear SOC Report
          </text>
          <text
            x="526"
            y="126"
            fill="#CBD5E1"
            fontSize="11"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            Automated Action Summary
          </text>
        </svg>
      ) : visualType === 'forensics' ? (
        <svg
          viewBox="0 0 640 220"
          className="w-full h-full object-cover"
          aria-hidden="true"
        >
          <rect width="640" height="220" fill="#080D1A" />
          <path d="M180 110 L460 110" stroke="#3B82F6" strokeWidth="2" />
          <rect
            x="44"
            y="64"
            width="230"
            height="92"
            rx="12"
            fill="#0F172A"
            stroke="#293B5F"
            strokeWidth="1.5"
          />
          <text
            x="159"
            y="96"
            fill="#93C5FD"
            fontSize="12"
            fontWeight="600"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            Check 1: Known Rule Match
          </text>
          <text
            x="159"
            y="120"
            fill="#CBD5E1"
            fontSize="11"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            Watches for built-in Windows tools
          </text>
          <text
            x="159"
            y="138"
            fill="#94A3B8"
            fontSize="11"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            used in unusual ways
          </text>

          <rect
            x="366"
            y="64"
            width="230"
            height="92"
            rx="12"
            fill="#0F172A"
            stroke="#38BDF8"
            strokeWidth="1.5"
          />
          <text
            x="481"
            y="96"
            fill="#38BDF8"
            fontSize="12"
            fontWeight="600"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            Check 2: AI Behavior Score
          </text>
          <text
            x="481"
            y="120"
            fill="#CBD5E1"
            fontSize="11"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            Flags disguised commands that
          </text>
          <text
            x="481"
            y="138"
            fill="#10B981"
            fontSize="11"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            regular antivirus misses
          </text>
        </svg>
      ) : visualType === 'hunting' ? (
        <svg
          viewBox="0 0 640 220"
          className="w-full h-full object-cover"
          aria-hidden="true"
        >
          <rect width="640" height="220" fill="#080D1A" />
          <line
            x1="56"
            y1="168"
            x2="584"
            y2="168"
            stroke="#263349"
            strokeWidth="1.5"
          />
          {[96, 162, 228, 294, 360, 426, 492, 548].map((x, idx) => (
            <rect
              key={x}
              x={x}
              y={idx % 2 === 0 ? 76 : 86}
              width="24"
              height={idx % 2 === 0 ? 92 : 82}
              rx="5"
              fill="#2563EB"
              fillOpacity="0.7"
              stroke="#60A5FA"
              strokeWidth="1"
            />
          ))}
          <text
            x="320"
            y="48"
            fill="#93C5FD"
            fontSize="12"
            fontWeight="600"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            CICIoT2023 · 92.27% Test Accuracy (5 Classes)
          </text>
        </svg>
      ) : (
        <svg
          viewBox="0 0 640 220"
          className="w-full h-full object-cover"
          aria-hidden="true"
        >
          <rect width="640" height="220" fill="#080D1A" />
          <path d="M160 110 L480 110" stroke="#3B82F6" strokeWidth="2" />
          <rect
            x="36"
            y="72"
            width="156"
            height="76"
            rx="12"
            fill="#0F172A"
            stroke="#293B5F"
            strokeWidth="1.5"
          />
          <text
            x="114"
            y="104"
            fill="#93C5FD"
            fontSize="12"
            fontWeight="600"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            1. Check Sender &amp; Links
          </text>
          <text
            x="114"
            y="126"
            fill="#CBD5E1"
            fontSize="11"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            Spots forged addresses
          </text>

          <rect
            x="242"
            y="72"
            width="156"
            height="76"
            rx="12"
            fill="#0F172A"
            stroke="#3B82F6"
            strokeWidth="1.5"
          />
          <text
            x="320"
            y="104"
            fill="#38BDF8"
            fontSize="12"
            fontWeight="600"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            2. Analyze Wording
          </text>
          <text
            x="320"
            y="126"
            fill="#CBD5E1"
            fontSize="11"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            Flags urgent scam pressure
          </text>

          <rect
            x="448"
            y="72"
            width="156"
            height="76"
            rx="12"
            fill="#0F172A"
            stroke="#10B981"
            strokeWidth="1.5"
          />
          <text
            x="526"
            y="104"
            fill="#10B981"
            fontSize="12"
            fontWeight="600"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            3. Safe Decision
          </text>
          <text
            x="526"
            y="126"
            fill="#CBD5E1"
            fontSize="11"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            0 False Positives · 30 Benign Test Emails
          </text>
        </svg>
      )}
    </div>
  );
};
