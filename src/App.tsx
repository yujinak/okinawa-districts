import { useState, useEffect } from 'react';
import { okinawaDistricts } from './data/districtData';
import type { District } from './data/districtData';
import { useOkinawaTime } from './hooks/useOkinawaTime';
import { MapSection } from './components/MapSection';
import { Dashboard } from './components/Dashboard';
import { Slideshow } from './components/Slideshow';
import { RoutePlanner } from './components/RoutePlanner';
import { TechSpec } from './components/TechSpec';

function App() {
  const [selectedDistrict, setSelectedDistrict] = useState<District>(okinawaDistricts[2]); // Default to Shimajiri / Naha
  const [hoveredDistrict, setHoveredDistrict] = useState<District | null>(null);

  // Live Local Japan Standard Time Clock
  const { timeString, dateString, period } = useOkinawaTime();

  // Dynamically update the root CSS variables whenever selectedDistrict changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--active-color-hsl', selectedDistrict.themeColor);
  }, [selectedDistrict]);

  // Determine a greeting based on JST period and active district
  const getGreetingContext = () => {
    if (period === 'morning') return 'Good morning! Kariyushi morning greetings from Okinawa.';
    if (period === 'afternoon') return 'Good afternoon! Wishing you a peaceful day.';
    return 'Good evening! Exploring Ryukyu skies.';
  };

  return (
    <div className={`app-container d-${selectedDistrict.id}`}>
      {/* HEADER SECTION */}
      <header 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          borderBottom: '1px solid var(--border-color)', 
          paddingBottom: '1.25rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          {/* <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="badge badge-active">Ryukyu Archipelago Explorer</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>v1.0.0</span>
          </div> */}
          <h1 
            style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: '2.5rem', 
              fontWeight: 800, 
              letterSpacing: '-0.03em', 
              margin: '0.5rem 0 0.25rem 0',
              lineHeight: '1.1'
            }}
          >
            <span className="text-gradient">Distritos de Okinawa</span>
          </h1>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            {/* getGreetingContext() */}
          </p>
        </div>

        {/* Local JST Clock Display */}
        <div 
          className="glass-card" 
          style={{ 
            padding: '0.6rem 1rem', 
            borderRadius: '10px', 
            textAlign: 'right', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            borderColor: 'var(--active-border)',
            boxShadow: `0 0 15px hsla(${selectedDistrict.themeColor}, 0.05)`
          }}
        >
          <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
            Okinawa JST Time
          </span>
          <span 
            style={{ 
              fontSize: '1.2rem', 
              fontWeight: 700, 
              color: 'var(--active-color)', 
              fontFamily: 'var(--font-heading)',
              textShadow: '0 0 10px var(--active-glow)',
              lineHeight: '1.2'
            }}
          >
            {timeString}
          </span>
          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
            {dateString}
          </span>
        </div>
      </header>

      {/* DASHBOARD GRID BODY */}
      <main className="dashboard-grid">
        {/* Left Side: Map Overlay */}
        <MapSection
          selectedDistrict={selectedDistrict}
          hoveredDistrict={hoveredDistrict}
          onSelectDistrict={setSelectedDistrict}
          onHoverDistrict={setHoveredDistrict}
        />

        {/* Right Side: Media Slideshow & Stats Dashboard 
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Slideshow selectedDistrict={hoveredDistrict || selectedDistrict} />
          <Dashboard selectedDistrict={selectedDistrict} />
        </div>
          */}

        {/* Bottom Full-Width Components
        <RoutePlanner />
         */}
      </main>
      
      <footer style={{ marginTop: '3rem', padding: '1.5rem 0', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          © 2026 Okinawa Districts. Desenvolvido sem fins comerciais.
        </p>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Made by <strong style={{ color: 'var(--active-color)' }}><a target='_blank' href='https://github.com/yujinak'>yujinak</a></strong>
        </p>
      </footer>
    </div>
  );
}

export default App;
