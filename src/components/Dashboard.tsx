import React from 'react';
import type { District } from '../data/districtData';

interface DashboardProps {
  selectedDistrict: District;
}

// A reusable Radial Progress Ring component to show off premium visual design
const RadialProgressRing: React.FC<{ value: number; label: string; color: string }> = ({
  value,
  label,
  color,
}) => {
  // SVG Ring Calculations
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      <div className="radial-chart">
        <svg viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={radius} className="bg-ring" />
          <circle
            cx="40"
            cy="40"
            r={radius}
            className="progress-ring"
            style={{
              stroke: color,
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>
        <span className="radial-label">{value}%</span>
      </div>
      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
    </div>
  );
};

export const Dashboard: React.FC<DashboardProps> = ({ selectedDistrict }) => {
  return (
    <div className={`glass-card active-district`} id="district-data-dashboard">
      {/* Header Info */}
      <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 className="text-gradient" style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', lineHeight: '1.1' }}>
              {selectedDistrict.name}
            </h1>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem', fontFamily: 'var(--font-heading)' }}>
              Pronounced: <span style={{ color: '#fff', fontStyle: 'italic' }}>{selectedDistrict.pronunciation}</span> • Administrative Center: <span style={{ color: '#fff' }}>{selectedDistrict.capital}</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className="text-jp" style={{ fontSize: '1.6rem', color: 'rgba(255, 255, 255, 0.15)', display: 'block', lineHeight: '1' }}>
              {selectedDistrict.japaneseName.split(' ')[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Dialect Greeting Section */}
      <div style={{
        background: `linear-gradient(90deg, hsla(${selectedDistrict.themeColor}, 0.12) 0%, transparent 100%)`,
        borderLeft: `3px solid hsl(${selectedDistrict.themeColor})`,
        padding: '0.75rem 1rem',
        borderRadius: '0 8px 8px 0',
        marginBottom: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.1em', display: 'block' }}>Regional Greeting</span>
          <span className="text-jp" style={{ fontSize: '1.4rem', color: '#fff', letterSpacing: '0.05em' }}>{selectedDistrict.greeting}</span>
        </div>
        <span className="badge badge-active" style={{ fontSize: '0.7rem' }}>{selectedDistrict.greetingTranslation}</span>
      </div>

      {/* Description */}
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
        {selectedDistrict.description}
      </p>

      {/* SVG Radial Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', padding: '1rem 0', borderBlock: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
        <RadialProgressRing value={selectedDistrict.stats.forestCoverage} label="Forest Cover" color={`hsl(${selectedDistrict.themeColor})`} />
        <RadialProgressRing value={selectedDistrict.stats.tourismIndex} label="Tourism Density" color={`hsl(${selectedDistrict.themeColor})`} />
        <RadialProgressRing value={selectedDistrict.stats.longevityScore} label="Longevity Index" color={`hsl(${selectedDistrict.themeColor})`} />
      </div>

      {/* Specialties & Secrets Accordions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
        
        {/* Culinary Corner */}
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', color: '#fff', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🥣</span> Gastronomy & Superfoods
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {selectedDistrict.culinarySpecialties.map((spec, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '0.75rem', background: 'rgba(255,255,255,0.02)', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '1.5rem' }}>{spec.emoji}</span>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>{spec.name}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.15rem', lineHeight: '1.4' }}>{spec.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Longevity Secrets */}
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', color: '#fff', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🧿</span> Pillars of Longevity (Blue Zone)
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.6rem' }}>
            {selectedDistrict.longevitySecrets.map((secret, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '0.75rem', background: 'rgba(255,255,255,0.02)', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '1.3rem' }}>{secret.icon}</span>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>{secret.title}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.15rem', lineHeight: '1.4' }}>{secret.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ryukyu Philosophical Quote */}
        <div style={{
          background: 'rgba(0,0,0,0.3)',
          border: '1px dashed var(--border-color)',
          borderRadius: '12px',
          padding: '1rem',
          marginTop: '0.5rem',
          position: 'relative'
        }}>
          <span style={{ position: 'absolute', top: '-10px', left: '15px', background: '#090a0f', padding: '0 8px', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: `hsl(${selectedDistrict.themeColor})`, fontWeight: 600 }}>Ryukyu Wisdom</span>
          <blockquote style={{ fontSize: '0.9rem', color: '#fff', fontStyle: 'italic', margin: '0.25rem 0', fontFamily: 'var(--font-jp)', lineHeight: '1.5' }}>
            "{selectedDistrict.dialectQuote.phrase}"
          </blockquote>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.5rem' }}>
            Translation: "{selectedDistrict.dialectQuote.translation}"
          </div>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.25rem', lineHeight: '1.4' }}>
            {selectedDistrict.dialectQuote.meaning}
          </p>
        </div>
      </div>
    </div>
  );
};
