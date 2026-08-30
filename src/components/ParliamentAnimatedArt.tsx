import React, { useState } from 'react';

interface ParliamentAnimatedArtProps {
  className?: string;
}

export const ParliamentAnimatedArt: React.FC<ParliamentAnimatedArtProps> = ({ className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`parliament-interactive-wrap ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        userSelect: 'none'
      }}
    >
      {/* Ambient Radial Golden Glow Aura */}
      <div 
        style={{
          position: 'absolute',
          width: '260px',
          height: '140px',
          background: isHovered 
            ? 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.45) 0%, rgba(251, 191, 36, 0.2) 45%, rgba(0, 0, 0, 0) 70%)'
            : 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.28) 0%, rgba(251, 191, 36, 0.12) 50%, rgba(0, 0, 0, 0) 75%)',
          filter: 'blur(16px)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'none',
          zIndex: 0
        }} 
      />

      {/* Floating Animated Shimmer Light Particles */}
      <div className="particle-wrap" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
        <span className="gold-particle p1" />
        <span className="gold-particle p2" />
        <span className="gold-particle p3" />
        <span className="gold-particle p4" />
      </div>

      {/* High-Precision Interactive Animated Parliament & Rashtrapati Bhavan SVG */}
      <svg 
        viewBox="0 0 520 220" 
        style={{
          width: '100%',
          maxWidth: '380px',
          height: 'auto',
          maxHeight: '140px',
          position: 'relative',
          zIndex: 2,
          transition: 'transform 0.4s ease-out',
          transform: isHovered ? 'scale(1.03) translateY(-2px)' : 'scale(1)',
          filter: isHovered 
            ? 'drop-shadow(0 0 20px rgba(245, 158, 11, 0.65)) drop-shadow(0 0 4px #fbbf24)'
            : 'drop-shadow(0 0 12px rgba(245, 158, 11, 0.4))'
        }}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#fbbf24" stopOpacity="1" />
            <stop offset="70%" stopColor="#fef08a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.85" />
          </linearGradient>

          <linearGradient id="pillarShimmer" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
            <stop offset="50%" stopColor="#fef08a" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#b45309" stopOpacity="0.6" />
          </linearGradient>

          <linearGradient id="flagSaffron" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff9933" />
            <stop offset="100%" stopColor="#ff7700" />
          </linearGradient>

          <linearGradient id="flagGreen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#138808" />
            <stop offset="100%" stopColor="#0d6105" />
          </linearGradient>

          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ========================================================
            RIGHT: RASHTRAPATI BHAVAN MAIN DOME & FLAGGED SPIRE
            ======================================================== */}
        <g className="rashtrapati-structure">
          {/* Flagpole */}
          <line x1="390" y1="12" x2="390" y2="48" stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="390" cy="12" r="2.5" fill="#fef08a" />

          {/* Animated Tricolor Flag on Top Spire */}
          <g className="waving-flag-group" transform="translate(390, 14)">
            <path 
              d="M 0,0 C 10,-3 20,3 32,0 C 32,4 32,5 32,7 C 20,10 10,4 0,7 Z" 
              fill="url(#flagSaffron)" 
            />
            <path 
              d="M 0,7 C 10,4 20,10 32,7 C 32,11 32,12 32,14 C 20,17 10,11 0,14 Z" 
              fill="#ffffff" 
            />
            <path 
              d="M 0,14 C 10,11 20,17 32,14 C 32,18 32,19 32,21 C 20,24 10,18 0,21 Z" 
              fill="url(#flagGreen)" 
            />
            {/* Ashoka Chakra in Flag */}
            <circle cx="16" cy="10.5" r="2.2" stroke="#000088" strokeWidth="0.8" fill="none" />
          </g>

          {/* Rashtrapati Central Dome */}
          <path 
            d="M 352 68 C 352 38, 428 38, 428 68 Z" 
            stroke="url(#goldStrokeGrad)" 
            strokeWidth="2.5" 
            fill="rgba(245, 158, 11, 0.08)"
            filter="url(#neonGlow)"
            className="dome-pulsing-stroke"
          />
          <path d="M 360 68 C 360 46, 420 46, 420 68 Z" stroke="#fef08a" strokeWidth="1.2" />
          <path d="M 370 68 C 370 54, 410 54, 410 68 Z" stroke="#fbbf24" strokeWidth="1.2" strokeDasharray="3 2" />

          {/* Dome Drum & Cornice Bands */}
          <rect x="346" y="68" width="88" height="7" rx="1.5" stroke="#fbbf24" strokeWidth="1.6" fill="rgba(245, 158, 11, 0.15)" />
          <rect x="340" y="75" width="100" height="7" rx="1.5" stroke="#fbbf24" strokeWidth="1.6" />
          <line x1="352" y1="75" x2="352" y2="82" stroke="#fbbf24" strokeWidth="1.2" />
          <line x1="364" y1="75" x2="364" y2="82" stroke="#fbbf24" strokeWidth="1.2" />
          <line x1="376" y1="75" x2="376" y2="82" stroke="#fbbf24" strokeWidth="1.2" />
          <line x1="390" y1="75" x2="390" y2="82" stroke="#fbbf24" strokeWidth="1.2" />
          <line x1="404" y1="75" x2="404" y2="82" stroke="#fbbf24" strokeWidth="1.2" />
          <line x1="416" y1="75" x2="416" y2="82" stroke="#fbbf24" strokeWidth="1.2" />
          <line x1="428" y1="75" x2="428" y2="82" stroke="#fbbf24" strokeWidth="1.2" />

          {/* Main Classical Portico Facade */}
          <rect x="310" y="82" width="180" height="6" stroke="#fbbf24" strokeWidth="1.6" />
          <line x1="315" y1="88" x2="315" y2="135" stroke="url(#pillarShimmer)" strokeWidth="2.2" />
          <line x1="327" y1="88" x2="327" y2="135" stroke="url(#pillarShimmer)" strokeWidth="2.2" />
          <line x1="339" y1="88" x2="339" y2="135" stroke="url(#pillarShimmer)" strokeWidth="2.2" />
          <line x1="351" y1="88" x2="351" y2="135" stroke="url(#pillarShimmer)" strokeWidth="2.2" />
          <line x1="363" y1="88" x2="363" y2="135" stroke="url(#pillarShimmer)" strokeWidth="2.2" />
          <line x1="375" y1="88" x2="375" y2="135" stroke="url(#pillarShimmer)" strokeWidth="2.5" />
          <line x1="387" y1="88" x2="387" y2="135" stroke="url(#pillarShimmer)" strokeWidth="2.5" />
          <line x1="399" y1="88" x2="399" y2="135" stroke="url(#pillarShimmer)" strokeWidth="2.5" />
          <line x1="411" y1="88" x2="411" y2="135" stroke="url(#pillarShimmer)" strokeWidth="2.5" />
          <line x1="423" y1="88" x2="423" y2="135" stroke="url(#pillarShimmer)" strokeWidth="2.2" />
          <line x1="435" y1="88" x2="435" y2="135" stroke="url(#pillarShimmer)" strokeWidth="2.2" />
          <line x1="447" y1="88" x2="447" y2="135" stroke="url(#pillarShimmer)" strokeWidth="2.2" />
          <line x1="459" y1="88" x2="459" y2="135" stroke="url(#pillarShimmer)" strokeWidth="2.2" />
          <line x1="471" y1="88" x2="471" y2="135" stroke="url(#pillarShimmer)" strokeWidth="2.2" />
          <line x1="483" y1="88" x2="483" y2="135" stroke="url(#pillarShimmer)" strokeWidth="2.2" />

          {/* Grand Steps Plinth */}
          <rect x="300" y="135" width="200" height="5" stroke="#fbbf24" strokeWidth="1.5" />
          <rect x="290" y="140" width="220" height="5" stroke="#fbbf24" strokeWidth="1.5" />
        </g>

        {/* ========================================================
            LEFT: CIRCULAR INDIAN PARLIAMENT (SANVIDHAN SADAN / SANSAD)
            ======================================================== */}
        <g className="parliament-circular-colonnade">
          {/* Small Dome with Flag on Circular Parliament */}
          <path d="M 125 72 C 125 58, 165 58, 165 72 Z" stroke="url(#goldStrokeGrad)" strokeWidth="1.8" />
          <line x1="145" y1="46" x2="145" y2="58" stroke="#fbbf24" strokeWidth="1.6" />
          <polygon points="145,46 157,49 145,52" fill="#ff9933" />

          {/* Circular Parliament Tiers */}
          <ellipse cx="145" cy="74" rx="90" ry="16" stroke="#fbbf24" strokeWidth="1.8" fill="rgba(245, 158, 11, 0.08)" />
          <ellipse cx="145" cy="84" rx="100" ry="18" stroke="#fbbf24" strokeWidth="1.8" />
          <ellipse cx="145" cy="94" rx="108" ry="20" stroke="#fbbf24" strokeWidth="1.8" />

          {/* 144 Colonnade Pillars Array (Curved Perspective) */}
          <line x1="48" y1="94" x2="48" y2="135" stroke="url(#pillarShimmer)" strokeWidth="2.2" />
          <line x1="58" y1="96" x2="58" y2="137" stroke="url(#pillarShimmer)" strokeWidth="2.2" />
          <line x1="69" y1="98" x2="69" y2="139" stroke="url(#pillarShimmer)" strokeWidth="2.2" />
          <line x1="81" y1="100" x2="81" y2="141" stroke="url(#pillarShimmer)" strokeWidth="2.2" />
          <line x1="94" y1="102" x2="94" y2="143" stroke="url(#pillarShimmer)" strokeWidth="2.2" />
          <line x1="107" y1="103" x2="107" y2="144" stroke="url(#pillarShimmer)" strokeWidth="2.2" />
          <line x1="120" y1="104" x2="120" y2="145" stroke="url(#pillarShimmer)" strokeWidth="2.2" />
          <line x1="133" y1="104" x2="133" y2="145" stroke="url(#pillarShimmer)" strokeWidth="2.4" />
          <line x1="145" y1="104" x2="145" y2="145" stroke="url(#pillarShimmer)" strokeWidth="2.4" />
          <line x1="157" y1="104" x2="157" y2="145" stroke="url(#pillarShimmer)" strokeWidth="2.4" />
          <line x1="170" y1="103" x2="170" y2="144" stroke="url(#pillarShimmer)" strokeWidth="2.2" />
          <line x1="183" y1="102" x2="183" y2="143" stroke="url(#pillarShimmer)" strokeWidth="2.2" />
          <line x1="196" y1="100" x2="196" y2="141" stroke="url(#pillarShimmer)" strokeWidth="2.2" />
          <line x1="208" y1="98" x2="208" y2="139" stroke="url(#pillarShimmer)" strokeWidth="2.2" />
          <line x1="219" y1="96" x2="219" y2="137" stroke="url(#pillarShimmer)" strokeWidth="2.2" />
          <line x1="230" y1="94" x2="230" y2="135" stroke="url(#pillarShimmer)" strokeWidth="2.2" />

          {/* Base Plinth */}
          <ellipse cx="145" cy="144" rx="114" ry="18" stroke="#fbbf24" strokeWidth="1.8" />
          <ellipse cx="145" cy="149" rx="122" ry="19" stroke="#fbbf24" strokeWidth="1.8" />

          {/* Central Portico Gate */}
          <path d="M 125 125 L 125 152 L 165 152 L 165 125 Z" stroke="#fbbf24" strokeWidth="1.8" fill="rgba(245, 158, 11, 0.2)" />
        </g>

        {/* ========================================================
            FOREGROUND: ASHOKA STAMBHA PILLAR & LAWNS
            ======================================================== */}
        <g className="ashoka-pillar-foreground">
          {/* Central Ashoka Column */}
          <line x1="390" y1="115" x2="390" y2="152" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" />
          <polygon points="386,115 394,115 392,110 388,110" fill="#fbbf24" />
          <circle cx="390" cy="108" r="2.5" fill="#fef08a" />
          <circle cx="390" cy="153" r="5" stroke="#fbbf24" strokeWidth="1.4" />

          {/* Courtyard Geometry & Perspective Pathways */}
          <line x1="145" y1="152" x2="10" y2="195" stroke="#fbbf24" strokeWidth="1.4" opacity="0.75" />
          <line x1="145" y1="152" x2="180" y2="195" stroke="#fbbf24" strokeWidth="1.4" opacity="0.75" />
          <line x1="390" y1="152" x2="300" y2="195" stroke="#fbbf24" strokeWidth="1.4" opacity="0.75" />
          <line x1="390" y1="152" x2="510" y2="195" stroke="#fbbf24" strokeWidth="1.4" opacity="0.75" />

          {/* Fountains */}
          <ellipse cx="115" cy="175" rx="14" ry="5" stroke="#fbbf24" strokeWidth="1.2" />
          <ellipse cx="330" cy="170" rx="14" ry="5" stroke="#fbbf24" strokeWidth="1.2" />
          <ellipse cx="460" cy="175" rx="14" ry="5" stroke="#fbbf24" strokeWidth="1.2" />
        </g>

        {/* ========================================================
            BOTTOM EMBLEM: ASHOKA LIONS & RIBBON BANNER
            ======================================================== */}
        <g transform="translate(260, 182)">
          {/* Golden Ashoka Lion Capital Vector Silhouette */}
          <path 
            d="M -12,0 C -12,-8 -6,-14 0,-14 C 6,-14 12,-8 12,0 Z" 
            stroke="#fbbf24" 
            strokeWidth="1.4" 
            fill="rgba(245, 158, 11, 0.25)" 
          />
          <line x1="-10" y1="0" x2="10" y2="0" stroke="#fbbf24" strokeWidth="1.4" />
          
          {/* Satyameva Jayate Banner Text */}
          <text 
            x="0" 
            y="12" 
            textAnchor="middle" 
            fill="#fbbf24" 
            fontSize="7.5px" 
            fontWeight="800" 
            letterSpacing="1.5px"
            fontFamily="'Outfit', sans-serif"
          >
            INDIAN PARLIAMENT HOUSE &amp; RASHTRAPATI BHAVAN
          </text>
        </g>
      </svg>
    </div>
  );
};
