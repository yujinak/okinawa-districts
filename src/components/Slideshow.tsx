import React, { useState, useEffect } from 'react';
import type { District } from '../data/districtData';

interface SlideshowProps {
  selectedDistrict: District;
}

export const Slideshow: React.FC<SlideshowProps> = ({ selectedDistrict }) => {
  const [imageError, setImageError] = useState(false);

  // Reset the image error state whenever the selected district changes
  useEffect(() => {
    setImageError(false);
  }, [selectedDistrict]);

  return (
    <div className={`glass-card active-district`} style={{ padding: 0, height: '260px' }} id="district-slideshow-card">
      {/* If the image loads successfully, show it; otherwise, fall back to a breathtaking animated HSL gradient */}
      {!imageError ? (
        <img
          src={selectedDistrict.imagePath}
          alt={selectedDistrict.name}
          onError={() => setImageError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'all 0.5s ease',
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, 
              rgba(10, 15, 30, 0.95) 0%, 
              hsla(${selectedDistrict.themeColor}, 0.15) 50%, 
              rgba(5, 7, 15, 0.98) 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Ambient Glowing Orbs in the background */}
          <div
            style={{
              position: 'absolute',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: `hsl(${selectedDistrict.themeColor})`,
              filter: 'blur(70px)',
              opacity: 0.25,
              animation: 'float-orb 8s infinite alternate ease-in-out',
            }}
          />
          <div style={{ zIndex: 1, textAlign: 'center', padding: '1.5rem' }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '0.5rem', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.2))' }}>
              {selectedDistrict.id === 'kunigami' ? '🌳' : 
               selectedDistrict.id === 'nakagami' ? '🏺' : 
               selectedDistrict.id === 'shimajiri' ? '🏯' : 
               selectedDistrict.id === 'miyako' ? '🏖️' : '🛶'}
            </span>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 600, color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {selectedDistrict.name.split(' ')[0]} Landscape
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Geographic visual asset simulation
            </div>
          </div>
        </div>
      )}

      {/* Decorative Widescreen overlay and district title */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(5,7,15,0.95) 0%, rgba(5,7,15,0.4) 40%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Caption overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: '15px',
          left: '20px',
          right: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          pointerEvents: 'none',
        }}
      >
        <div>
          <span
            className="badge badge-active"
            style={{
              fontSize: '0.6rem',
              padding: '0.2rem 0.6rem',
              marginBottom: '4px',
              background: `hsla(${selectedDistrict.themeColor}, 0.2)`,
              borderColor: `hsla(${selectedDistrict.themeColor}, 0.4)`,
              color: `hsl(${selectedDistrict.themeColor})`,
            }}
          >
            {selectedDistrict.id.toUpperCase()} VISUAL
          </span>
          <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
            Exploring {selectedDistrict.name.split(' ')[0]}
          </h3>
        </div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', textShadow: '0 1px 2px #000' }}>
          Okinawa Prefecture
        </div>
      </div>

      {/* Embedded slide float animation */}
      <style>{`
        @keyframes float-orb {
          0% { transform: translate(-20px, -20px) scale(0.9); }
          100% { transform: translate(20px, 20px) scale(1.1); }
        }
      `}</style>
    </div>
  );
};
