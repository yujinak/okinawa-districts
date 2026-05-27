import React, { useState } from 'react';

export const TechSpec: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="recruiter-expander" style={{ border: '1px solid var(--border-color)', marginTop: '2rem' }}>
      <div 
        className="recruiter-header" 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '1rem 1.5rem', 
          cursor: 'pointer',
          background: 'rgba(10, 15, 28, 0.95)',
          userSelect: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.25rem' }}>💼</span>
          <div>
            <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-heading)', color: '#fff', fontWeight: 700 }}>Developer Tech Spec & Recruiter Portal</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Click to inspect project architecture, performance decisions, and professional bio</p>
          </div>
        </div>
        <div style={{ color: 'var(--active-color)', fontSize: '0.8rem', fontWeight: 600 }}>
          {isOpen ? 'Close Spec [-]' : 'Open Spec [+]'}
        </div>
      </div>

      <div className={`recruiter-content ${isOpen ? 'open' : ''}`} style={{
        maxHeight: isOpen ? '1500px' : '0px',
        overflow: 'hidden',
        transition: 'all 0.4s ease-in-out',
        background: 'rgba(5, 7, 15, 0.98)',
        padding: isOpen ? '1.5rem' : '0 1.5rem'
      }}>
        {isOpen && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
            
            {/* Section 1: Architecture & Performance */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--active-color)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.25rem' }}>
                  ⚙️ Architectural Engineering
                </h4>
                <ul style={{ listStyleType: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <li>
                    <strong style={{ color: '#fff' }}>React & TypeScript:</strong> Type-safe state management controlling interactive overlays, maps, and active itineraries seamlessly.
                  </li>
                  <li>
                    <strong style={{ color: '#fff' }}>Custom SVG Vectorization:</strong> Zero-dependency inline vectors allowing lightweight load sizes, fluid scaling, and infinite crispness.
                  </li>
                  <li>
                    <strong style={{ color: '#fff' }}>Advanced State Machine:</strong> Multi-stop route planner running dynamic calculations for travel time, distance, and custom relaxation coefficients.
                  </li>
                </ul>
              </div>

              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--active-color)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.25rem' }}>
                  ⚡ Performance Optimization
                </h4>
                <ul style={{ listStyleType: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <li>
                    <strong style={{ color: '#fff' }}>Fluid 60FPS UI:</strong> Hand-crafted HSL variables powering hardware-accelerated transitions and responsive borders directly on native layers.
                  </li>
                  <li>
                    <strong style={{ color: '#fff' }}>Zero-Lag Mapping:</strong> Lightweight vector geometry bypassing external web-mapping tile server overhead (Leaflet, Mapbox) completely.
                  </li>
                  <li>
                    <strong style={{ color: '#fff' }}>Clean Core Bundle:</strong> Designed with zero bloatware or heavy charting dependencies, prioritizing raw frontend engineering speed.
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 2: Relocation Bio Pitch */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1.25rem',
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '1.25rem'
            }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--active-color) 0%, #1e1b4b 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.75rem',
                  boxShadow: '0 0 15px var(--active-glow)'
                }}>
                  👨‍💻
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>Full-Stack / Frontend Engineer</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>2 Years Experience • Specialized in Modern React, TypeScript, and High-Performance UI systems</p>
                </div>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                "As an engineer with two years of hands-on experience building reactive web interfaces, I enjoy turning complex data into sleek, highly interactive visual experiences. I designed this Okinawan District Hub to showcase my command over vanilla CSS variables, responsive grid architectures, complex SVG state animations, and clean React engineering. 
                <br />
                <strong style={{ color: '#fff' }}>I am currently seeking a new developer position and am fully prepared to relocate.</strong> If you are looking for an agile developer who takes pride in pixel-perfect execution, performance optimization, and robust logic, let's connect!"
              </p>

              {/* Action Buttons to Recruiters */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                <a 
                  href="mailto:gyujigam@example.com?subject=Inquiry regarding Okinawa Districts Portfolio" 
                  style={{ textDecoration: 'none' }}
                >
                  <button className="glow-btn" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                    📧 Email Me Direct
                  </button>
                </a>
                
                <button 
                  onClick={() => alert("Candidate's Resume: You can customize this link to lead to your Google Drive or PDF resume!")}
                  className="badge badge-active" 
                  style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', cursor: 'pointer', background: 'rgba(255,255,255,0.03)' }}
                >
                  📄 Access My Resume
                </button>

                <button 
                  onClick={() => alert("LinkedIn Profile: You can customize this link in TechSpec.tsx to lead directly to your LinkedIn profile!")}
                  className="badge" 
                  style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', cursor: 'pointer', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
                >
                  🔗 LinkedIn Profile
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
