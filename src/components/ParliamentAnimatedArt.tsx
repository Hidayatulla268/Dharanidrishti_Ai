import React, { useRef, useEffect, useState } from 'react';
import parliamentImg from '../assets/parliament_glow.jpg';

interface ParliamentAnimatedArtProps {
  className?: string;
}

export const ParliamentAnimatedArt: React.FC<ParliamentAnimatedArtProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Process the image on a transparent Canvas to strip 100% of dark background pixels
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = parliamentImg;

    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.naturalWidth || 800;
      canvas.height = img.naturalHeight || 450;

      // Draw image onto canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Extract pixel buffer
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Background Chroma/Luminance Removal: Turn any dark/gray pixels into 100% transparent alpha
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Calculate gold/amber luminance
        const maxVal = Math.max(r, g, b);
        const minVal = Math.min(r, g, b);
        const isGoldLine = (r > 60 && g > 45) && (maxVal - minVal > 15 || maxVal > 80);

        // Thresholding
        const brightness = (r * 0.35 + g * 0.55 + b * 0.1);

        if (brightness < 48 || !isGoldLine) {
          // 100% Transparent
          data[i + 3] = 0;
        } else {
          // Normalize alpha based on line brightness
          const alpha = Math.min(255, Math.pow((brightness - 40) / 190, 0.85) * 255);
          data[i + 3] = alpha;

          // Boost golden neon vibrancy on lines
          data[i] = Math.min(255, Math.round(r * 1.25 + 20));     // Red
          data[i + 1] = Math.min(255, Math.round(g * 1.15 + 10)); // Green
          data[i + 2] = Math.min(255, Math.round(b * 0.6));       // Blue
        }
      }

      ctx.putImageData(imgData, 0, 0);
      setIsLoaded(true);
    };
  }, []);

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
        maxWidth: '420px',
        width: '100%',
        minHeight: '130px',
        userSelect: 'none',
        overflow: 'visible'
      }}
    >
      {/* 1. Subtle Radial Golden Glow Behind the Golden Lines */}
      <div 
        style={{
          position: 'absolute',
          inset: '-10px',
          background: isHovered 
            ? 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.35) 0%, rgba(251, 191, 36, 0.15) 50%, transparent 75%)'
            : 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.22) 0%, rgba(251, 191, 36, 0.08) 50%, transparent 75%)',
          filter: 'blur(16px)',
          transition: 'all 0.5s ease-out',
          pointerEvents: 'none',
          zIndex: 0
        }} 
      />

      {/* 2. Floating Golden Sparks & Light Particles */}
      <div className="particle-wrap" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
        <span className="gold-particle p1" />
        <span className="gold-particle p2" />
        <span className="gold-particle p3" />
        <span className="gold-particle p4" />
      </div>

      {/* 3. Pure Transparent Canvas with Golden Architectural CAD Lines */}
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
            ? 'drop-shadow(0 0 14px rgba(245, 158, 11, 0.75)) drop-shadow(0 0 3px #fbbf24)'
            : 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.45))',
          opacity: isLoaded ? 1 : 0.4
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '135px',
            objectFit: 'contain',
            display: 'block'
          }}
        />

        {/* 4. Animated Diagonal Light Sweep Beam across the golden colonnades */}
        <div className="shimmer-sweep-beam" />

        {/* 5. Animated Waving Indian Tricolor Flag on Rashtrapati Bhavan Spire */}
        <div 
          className="flag-waving-container"
          style={{
            position: 'absolute',
            top: '4%',
            right: '25.5%',
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

        {/* 6. Glowing Golden Beacon Pulse at Spire Tip */}
        <div 
          style={{
            position: 'absolute',
            top: '4.5%',
            right: '28%',
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: '#fbbf24',
            boxShadow: '0 0 10px #fbbf24, 0 0 18px #f59e0b',
            animation: 'beaconPulse 2.2s infinite ease-in-out',
            pointerEvents: 'none',
            zIndex: 5
          }}
        />
      </div>
    </div>
  );
};
