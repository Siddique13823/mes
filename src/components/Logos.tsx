import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showSubtitle?: boolean;
}

/**
 * Logo 1: Primary Visual Emblem
 * Green circular emblem with a gold border, crossed swords, and a golden crest.
 * Symbol of Bangladesh Armed Forces / Defence & Civil Government Service.
 */
export const LogoPrimary: React.FC<LogoProps> = ({ className = '', size = 56, showSubtitle = false }) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm select-none"
        aria-label="Bangladesh Armed Forces & Civil Government Emblem (Green circular emblem with gold border, crossed swords, and golden crest)"
      >
        <defs>
          {/* Gold Gradient */}
          <linearGradient id="goldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="35%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#AA7C11" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="bladeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#E2E8F0" />
            <stop offset="70%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
          <radialGradient id="greenField" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0B5345" />
            <stop offset="75%" stopColor="#064E3B" />
            <stop offset="100%" stopColor="#022C22" />
          </radialGradient>
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#78350F" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Outer Gold Border Ring */}
        <circle cx="100" cy="100" r="96" fill="url(#goldGrad1)" stroke="#854D0E" strokeWidth="2" />
        <circle cx="100" cy="100" r="91" fill="#78350F" opacity="0.3" />
        
        {/* Inner Gold Beaded Rim */}
        <circle cx="100" cy="100" r="88" fill="url(#greenField)" stroke="url(#goldGrad1)" strokeWidth="3" />
        <circle cx="100" cy="100" r="83" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2,2" opacity="0.8" />

        {/* Golden Laurel Wreath Leaves (Left & Right) */}
        <g stroke="url(#goldGrad1)" strokeWidth="1.5" fill="url(#goldGrad1)" opacity="0.95">
          {/* Left Wreath */}
          <path d="M 38 120 C 32 95 45 60 72 44" fill="none" strokeWidth="2.5" />
          <path d="M 38 118 Q 44 112 40 106 Q 34 112 38 118 Z" />
          <path d="M 34 102 Q 40 96 36 90 Q 30 96 34 102 Z" />
          <path d="M 36 84 Q 44 80 40 72 Q 32 78 36 84 Z" />
          <path d="M 44 68 Q 52 64 50 56 Q 40 62 44 68 Z" />
          <path d="M 58 54 Q 66 50 64 42 Q 54 48 58 54 Z" />
          {/* Right Wreath */}
          <path d="M 162 120 C 168 95 155 60 128 44" fill="none" strokeWidth="2.5" />
          <path d="M 162 118 Q 156 112 160 106 Q 166 112 162 118 Z" />
          <path d="M 166 102 Q 160 96 164 90 Q 170 96 166 102 Z" />
          <path d="M 164 84 Q 156 80 160 72 Q 168 78 164 84 Z" />
          <path d="M 156 68 Q 148 64 150 56 Q 160 62 156 68 Z" />
          <path d="M 142 54 Q 134 50 136 42 Q 146 48 142 54 Z" />
        </g>

        {/* Crossed Ceremonial Swords */}
        <g filter="url(#goldGlow)">
          {/* Sword 1: Top-Left to Bottom-Right */}
          {/* Blade */}
          <path d="M 55 55 L 140 140 L 143 137 L 58 52 Z" fill="url(#bladeGrad1)" stroke="#64748B" strokeWidth="0.5" />
          <path d="M 55 55 L 53 50 L 58 52 Z" fill="#F8FAFC" />
          <line x1="56" y1="53" x2="141" y2="138" stroke="#94A3B8" strokeWidth="0.8" />
          {/* Crossguard */}
          <path d="M 132 147 L 148 131 L 146 129 L 130 145 Z" fill="url(#goldGrad1)" stroke="#854D0E" strokeWidth="0.5" />
          <circle cx="131" cy="146" r="2.5" fill="url(#goldGrad1)" />
          <circle cx="147" cy="130" r="2.5" fill="url(#goldGrad1)" />
          {/* Hilt & Pommel */}
          <path d="M 140 140 L 152 152" stroke="url(#goldGrad1)" strokeWidth="4" strokeLinecap="round" />
          <circle cx="153" cy="153" r="4.5" fill="url(#goldGrad1)" stroke="#854D0E" strokeWidth="1" />

          {/* Sword 2: Top-Right to Bottom-Left */}
          {/* Blade */}
          <path d="M 145 55 L 60 140 L 57 137 L 142 52 Z" fill="url(#bladeGrad1)" stroke="#64748B" strokeWidth="0.5" />
          <path d="M 145 55 L 147 50 L 142 52 Z" fill="#F8FAFC" />
          <line x1="144" y1="53" x2="59" y2="138" stroke="#94A3B8" strokeWidth="0.8" />
          {/* Crossguard */}
          <path d="M 68 147 L 52 131 L 54 129 L 70 145 Z" fill="url(#goldGrad1)" stroke="#854D0E" strokeWidth="0.5" />
          <circle cx="69" cy="146" r="2.5" fill="url(#goldGrad1)" />
          <circle cx="53" cy="130" r="2.5" fill="url(#goldGrad1)" />
          {/* Hilt & Pommel */}
          <path d="M 60 140 L 48 152" stroke="url(#goldGrad1)" strokeWidth="4" strokeLinecap="round" />
          <circle cx="47" cy="153" r="4.5" fill="url(#goldGrad1)" stroke="#854D0E" strokeWidth="1" />
        </g>

        {/* Central Golden Crest & Emblem at Apex */}
        <g filter="url(#goldGlow)">
          {/* Golden Star / Crest */}
          <polygon
            points="100,26 104,36 115,37 107,45 109,56 100,50 91,56 93,45 85,37 96,36"
            fill="url(#goldGrad1)"
            stroke="#854D0E"
            strokeWidth="0.8"
          />
          {/* Central Water Lily / Shapla Crest Petals */}
          <path d="M 100 82 C 94 92 88 104 100 115 C 112 104 106 92 100 82 Z" fill="url(#goldGrad1)" />
          <path d="M 97 90 C 86 96 82 106 94 113 C 94 104 96 97 97 90 Z" fill="url(#goldGrad1)" opacity="0.9" />
          <path d="M 103 90 C 114 96 118 106 106 113 C 106 104 104 97 103 90 Z" fill="url(#goldGrad1)" opacity="0.9" />
          {/* Base ribbon arc */}
          <path d="M 82 118 Q 100 126 118 118 Q 112 124 100 124 Q 88 124 82 118 Z" fill="url(#goldGrad1)" />
        </g>

        {/* Circular Inscription Arc */}
        <text fill="url(#goldGrad1)" fontSize="8.5" fontWeight="700" letterSpacing="1.2" textAnchor="middle">
          <textPath href="#circlePathTop" startOffset="50%">
            গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
          </textPath>
        </text>
        <text fill="url(#goldGrad1)" fontSize="7.5" fontWeight="600" letterSpacing="1.5" textAnchor="middle">
          <textPath href="#circlePathBottom" startOffset="50%">
            DEFENCE CIVIL PAY &middot; 2026
          </textPath>
        </text>

        {/* Text Paths */}
        <path id="circlePathTop" d="M 28 100 A 72 72 0 0 1 172 100" fill="none" />
        <path id="circlePathBottom" d="M 170 105 A 70 70 0 0 1 30 105" fill="none" />
      </svg>

      {showSubtitle && (
        <div className="flex flex-col">
          <span className="text-sm font-bold text-emerald-950 leading-tight tracking-tight">
            বেসামরিক বেতন নির্ধারণ ২০২৬
          </span>
          <span className="text-xs text-slate-500 font-medium">
            Government of Bangladesh Pay Order
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * Logo 2: Military Engineer Services (MES) Emblem
 * Circular MES emblem with navy/crimson rings, golden engineering gear,
 * castle battlement insignia, compass dividers, and MES banner.
 */
export const LogoMES: React.FC<LogoProps> = ({ className = '', size = 56, showSubtitle = false }) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm select-none"
        aria-label="Military Engineer Services (MES) Bangladesh Emblem"
      >
        <defs>
          <linearGradient id="mesGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="40%" stopColor="#EAB308" />
            <stop offset="80%" stopColor="#CA8A04" />
            <stop offset="100%" stopColor="#854D0E" />
          </linearGradient>
          <linearGradient id="mesNavy" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="60%" stopColor="#0F2B48" />
            <stop offset="100%" stopColor="#0B192C" />
          </linearGradient>
          <linearGradient id="mesMaroon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#991B1B" />
            <stop offset="60%" stopColor="#7F1D1D" />
            <stop offset="100%" stopColor="#450A0A" />
          </linearGradient>
          <filter id="mesShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#0F172A" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Outer Golden Engineering Cogwheel Ring */}
        <g fill="url(#mesGold)" stroke="#78350F" strokeWidth="1">
          {/* 16 Gear Teeth */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 360) / 16;
            return (
              <rect
                key={i}
                x="94"
                y="3"
                width="12"
                height="10"
                rx="1.5"
                transform={`rotate(${angle} 100 100)`}
              />
            );
          })}
          <circle cx="100" cy="100" r="90" fill="url(#mesGold)" />
        </g>

        {/* Deep Maroon Ring */}
        <circle cx="100" cy="100" r="82" fill="url(#mesMaroon)" stroke="#78350F" strokeWidth="2" />

        {/* Deep Navy Inner Disc */}
        <circle cx="100" cy="100" r="66" fill="url(#mesNavy)" stroke="url(#mesGold)" strokeWidth="2.5" />
        <circle cx="100" cy="100" r="61" fill="none" stroke="#FDE047" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" />

        {/* Upper Inscription on Maroon Ring */}
        <text fill="url(#mesGold)" fontSize="9" fontWeight="800" letterSpacing="1.8" textAnchor="middle">
          <textPath href="#mesTopArc" startOffset="50%">
            MILITARY ENGINEER SERVICES
          </textPath>
        </text>

        {/* Lower Inscription on Maroon Ring */}
        <text fill="#FEF08A" fontSize="8" fontWeight="700" letterSpacing="2" textAnchor="middle">
          <textPath href="#mesBottomArc" startOffset="50%">
            BANGLADESH &middot; MES
          </textPath>
        </text>

        {/* Central Military Engineer Symbols: Castle Tower & Drafting Divider/Anchor */}
        <g filter="url(#mesShadow)">
          {/* Engineering Drafting Dividers / Compass (Crossed behind Castle) */}
          <path d="M 100 68 L 68 126 L 73 129 L 100 74 Z" fill="url(#mesGold)" />
          <path d="M 100 68 L 132 126 L 127 129 L 100 74 Z" fill="url(#mesGold)" />
          <circle cx="100" cy="68" r="4.5" fill="url(#mesGold)" stroke="#78350F" strokeWidth="1" />
          <circle cx="100" cy="68" r="2" fill="#0F2B48" />

          {/* Historic Crenellated Castle Fort (Military Engineers Crest) */}
          {/* Base Wall */}
          <path
            d="M 76 128 L 76 96 L 124 96 L 124 128 Z"
            fill="url(#mesGold)"
            stroke="#78350F"
            strokeWidth="1.2"
          />
          {/* 3 Turret Battlements / Crenellations */}
          {/* Left Turret */}
          <rect x="74" y="86" width="12" height="12" fill="url(#mesGold)" stroke="#78350F" strokeWidth="1" />
          <rect x="74" y="83" width="3" height="4" fill="url(#mesGold)" />
          <rect x="83" y="83" width="3" height="4" fill="url(#mesGold)" />
          {/* Middle Turret (Taller) */}
          <rect x="92" y="80" width="16" height="18" fill="url(#mesGold)" stroke="#78350F" strokeWidth="1" />
          <rect x="92" y="76" width="4" height="5" fill="url(#mesGold)" />
          <rect x="104" y="76" width="4" height="5" fill="url(#mesGold)" />
          {/* Right Turret */}
          <rect x="114" y="86" width="12" height="12" fill="url(#mesGold)" stroke="#78350F" strokeWidth="1" />
          <rect x="114" y="83" width="3" height="4" fill="url(#mesGold)" />
          <rect x="123" y="83" width="3" height="4" fill="url(#mesGold)" />

          {/* Castle Gateway / Arched Doorway */}
          <path
            d="M 94 128 L 94 112 C 94 107 106 107 106 112 L 106 128 Z"
            fill="#0F2B48"
            stroke="#78350F"
            strokeWidth="1"
          />
          {/* Masonry horizontal lines */}
          <line x1="77" y1="105" x2="123" y2="105" stroke="#78350F" strokeWidth="0.8" opacity="0.6" />
          <line x1="77" y1="116" x2="93" y2="116" stroke="#78350F" strokeWidth="0.8" opacity="0.6" />
          <line x1="107" y1="116" x2="123" y2="116" stroke="#78350F" strokeWidth="0.8" opacity="0.6" />

          {/* Golden Ribbon Banner at bottom */}
          <path
            d="M 64 136 Q 100 144 136 136 L 138 144 Q 100 152 62 144 Z"
            fill="url(#mesGold)"
            stroke="#78350F"
            strokeWidth="0.8"
          />
          <text
            x="100"
            y="142.5"
            fill="#78350F"
            fontSize="5.8"
            fontWeight="900"
            letterSpacing="1"
            textAnchor="middle"
          >
            ENGINEERING SERVICES
          </text>
        </g>

        {/* Text Paths */}
        <path id="mesTopArc" d="M 30 96 A 74 74 0 0 1 170 96" fill="none" />
        <path id="mesBottomArc" d="M 166 104 A 74 74 0 0 1 34 104" fill="none" />
      </svg>

      {showSubtitle && (
        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-900 leading-tight tracking-tight">
            মিলিটারি ইঞ্জিনিয়ার সার্ভিসেস (MES)
          </span>
          <span className="text-xs text-slate-500 font-medium">
            Military Engineer Services, Bangladesh
          </span>
        </div>
      )}
    </div>
  );
};

export const CombinedHeaderLogos: React.FC<{ isCompact?: boolean }> = ({ isCompact = false }) => {
  return (
    <div className="flex items-center gap-3">
      <LogoPrimary size={isCompact ? 40 : 48} />
      <div className="h-8 w-px bg-slate-300 dark:bg-slate-700" />
      <LogoMES size={isCompact ? 40 : 48} />
    </div>
  );
};
