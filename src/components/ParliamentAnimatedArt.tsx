import React, { useState } from 'react';
import parliamentImg from '../assets/parliament_glow.jpg';

interface ParliamentAnimatedArtProps {
  className?: string;
}

export const ParliamentAnimatedArt: React.FC<ParliamentAnimatedArtProps> = ({ className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`parliament-interactive-art ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '440px',
        width: '100%',
        minHeight: '130px',
        userSelect: 'none',
        overflow: 'visible'
      }}
    >
      {/* 1. Ambient Golden Glow Halo Backdrop */}
      <div 
        style={{
          position: 'absolute',
          inset: '-10px',
          background: isHovered 
            ? 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.45) 0%, rgba(251, 191, 36, 0.2) 50%, rgba(0, 0, 0, 0) 75%)'
            : 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.3) 0%, rgba(251, 191, 36, 0.1) 50%, rgba(0, 0, 0, 0) 75%)',
          filter: 'blur(16px)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'none',
          zIndex: 0
        }} 
      />

      {/* 2. Floating Golden Sparks / Light Particles */}
      <div className="particle-wrap" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
        <span className="gold-particle p1" />
        <span className="gold-particle p2" />
        <span className="gold-particle p3" />
        <span className="gold-particle p4" />
      </div>

      {/* 3. The Core Parliament Artwork - Seamlessly Blended using screen blend */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          transition: 'transform 0.4s ease-out, filter 0.4s ease-out',
          transform: isHovered ? 'scale(1.03) translateY(-2px)' : 'scale(1)',
          filter: isHovered 
            ? 'drop-shadow(0 0 16px rgba(245, 158, 11, 0.65)) drop-shadow(0 0 4px #fbbf24) brightness(1.15)'
            : 'drop-shadow(0 0 10px rgba(245, 158, 11, 0.4)) brightness(1.05)'
        }}
      >
        <img 
          src={parliamentImg} 
          alt="Indian Parliament & Rashtrapati Bhavan"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '135px',
            objectFit: 'contain',
            mixBlendMode: 'screen',
            maskImage: 'radial-gradient(ellipse 98% 90% at 50% 50%, black 80%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 98% 90% at 50% 50%, black 80%, transparent 100%)',
            display: 'block'
          }}
        />

        {/* 4. Animated Diagonal Golden Shimmer Light Beam Sweep */}
        <div className="shimmer-sweep-beam" />

        {/* 5. Animated Waving Indian Tricolor Flag Overlay on Top Spire */}
        <div 
          className="flag-waving-container"
          style={{
            position: 'absolute',
            top: '3%',
            right: '25%',
            pointerEvents: 'none',
            zIndex: 4
          }}
        >
          <svg width="34" height="24" viewBox="0 0 34 24" fill="none">
            <g className="waving-flag-group">
              <path 
                d="M 0,1 C 9,-2 18,4 30,1 C 30,5 30,6 30,8 C 18,11 9,5 0,8 Z" 
                fill="#ff9933" 
              />
              <path 
                d="M 0,8 C 9,5 18,11 30,8 C 30,12 30,13 30,15 C 18,18 9,12 0,15 Z" 
                fill="#ffffff" 
              />
              <path 
                d="M 0,15 C 9,12 18,18 30,15 C 30,19 30,20 30,22 C 18,25 9,19 0,22 Z" 
                fill="#138808" 
              />
              <circle cx="15" cy="11.5" r="2.2" stroke="#000088" strokeWidth="0.8" fill="none" />
            </g>
          </svg>
        </div>

        {/* 6. Pulsing Golden Beacon at Top Spire Apex */}
        <div 
          style={{
            position: 'absolute',
            top: '4%',
            right: '27.5%',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#fbbf24',
            boxShadow: '0 0 12px #fbbf24, 0 0 20px #f59e0b',
            animation: 'beaconPulse 2s infinite ease-in-out',
            pointerEvents: 'none',
            zIndex: 5
          }}
        />
      </div>
    </div>
  );
};
