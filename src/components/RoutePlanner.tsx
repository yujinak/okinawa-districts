import React, { useState, useEffect } from 'react';
import { roadTripStops, okinawaDistricts } from '../data/districtData';
import type { RouteStop } from '../data/districtData';

export const RoutePlanner: React.FC = () => {
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(roadTripStops.length - 1);
  const [activeStops, setActiveStops] = useState<RouteStop[]>([]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationProgress, setSimulationProgress] = useState<number>(0);
  const [currentSimulatedStopIndex, setCurrentSimulatedStopIndex] = useState<number>(-1);

  // Re-calculate the active route whenever start or end stops change
  useEffect(() => {
    let start = Math.min(startIndex, endIndex);
    let end = Math.max(startIndex, endIndex);
    setActiveStops(roadTripStops.slice(start, end + 1));
  }, [startIndex, endIndex]);

  // Trip calculations
  const totalDriveTimeMin = activeStops.reduce((acc, stop, idx) => {
    // Skip the first stop's time since it's the starting point
    if (idx === 0) return acc;
    return acc + stop.travelTimeMin;
  }, 0);

  const averageScenicRating = activeStops.length > 0 
    ? activeStops.reduce((acc, stop) => acc + stop.scenicRating, 0) / activeStops.length 
    : 0;

  // Calculate a relaxation score out of 100 based on scenic beauty and driving pace
  const relaxationScore = Math.min(
    100,
    Math.round((averageScenicRating / 5) * 85 + (activeStops.length * 3))
  );

  // Trigger Road Trip Simulation
  const handleStartSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationProgress(0);
    setCurrentSimulatedStopIndex(0);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isSimulating) {
      interval = setInterval(() => {
        setSimulationProgress((prev) => {
          const next = prev + 2;
          if (next >= 100) {
            clearInterval(interval);
            setIsSimulating(false);
            setCurrentSimulatedStopIndex(activeStops.length - 1);
            return 100;
          }
          
          // Calculate which stop we are currently "at" in the progress
          const stopIndex = Math.floor((next / 100) * activeStops.length);
          setCurrentSimulatedStopIndex(Math.min(stopIndex, activeStops.length - 1));
          
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isSimulating, activeStops]);

  return (
    <div className="glass-card active-district" id="roadtrip-route-planner-card" style={{ gridColumn: '1 / -1' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <span className="badge badge-active" style={{ fontSize: '0.7rem' }}>Portfolio State Machine</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginTop: '0.25rem' }}>Okinawan Road Trip Route Builder</h2>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {/* Active Status Badge */}
          {isSimulating ? (
            <span className="badge" style={{ borderColor: 'var(--active-color)', color: 'var(--active-color)', background: 'hsla(var(--active-color-hsl), 0.1)', animation: 'pulse-glow 1.5s infinite' }}>
              🚗 Navigating Route: {simulationProgress}%
            </span>
          ) : (
            <span className="badge" style={{ color: 'var(--text-secondary)' }}>Ready for Departure</span>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
        {/* Step 1: Configure Stops */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          {/* Start Point Select */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Starting Station</label>
            <select
              value={startIndex}
              onChange={(e) => setStartIndex(Number(e.target.value))}
              disabled={isSimulating}
              style={{
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '0.6rem 0.8rem',
                color: '#fff',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-sans)',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              {roadTripStops.map((stop, idx) => (
                <option key={stop.id} value={idx}>
                  {idx + 1}. {stop.name} ({stop.districtId.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          {/* End Point Select */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Destination Station</label>
            <select
              value={endIndex}
              onChange={(e) => setEndIndex(Number(e.target.value))}
              disabled={isSimulating}
              style={{
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '0.6rem 0.8rem',
                color: '#fff',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-sans)',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              {roadTripStops.map((stop, idx) => (
                <option key={stop.id} value={idx}>
                  {idx + 1}. {stop.name} ({stop.districtId.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          {/* Action Button */}
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button
              onClick={handleStartSimulation}
              disabled={isSimulating || startIndex === endIndex}
              className="glow-btn"
              style={{ width: '100%', display: 'flex', justifyItems: 'center', justifyContent: 'center', gap: '0.5rem', alignItems: 'center' }}
            >
              <span>{isSimulating ? '🚗 Simulation Running...' : '🚀 Depart Scenic Road Trip'}</span>
            </button>
          </div>
        </div>

        {/* Step 2: Route Dashboard KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          {/* Stops Count */}
          <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>Waypoints</span>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-heading)' }}>{activeStops.length} Stops</span>
          </div>
          {/* Driving Time */}
          <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>Travel Estimate</span>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--active-color)', fontFamily: 'var(--font-heading)' }}>
              {totalDriveTimeMin === 0 ? '0' : `${Math.floor(totalDriveTimeMin / 60) > 0 ? `${Math.floor(totalDriveTimeMin / 60)}h ` : ''}${totalDriveTimeMin % 60}m`}
            </span>
          </div>
          {/* Relaxation Score */}
          <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>Scenic Relaxation Score</span>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981', fontFamily: 'var(--font-heading)', textShadow: '0 0 10px rgba(16, 185, 129, 0.2)' }}>
              {relaxationScore} / 100
            </span>
          </div>
        </div>

        {/* Step 3: Scenic Route Trail Timeline */}
        <div style={{ padding: '0.5rem 0' }}>
          {/* Progress Bar Track */}
          {isSimulating && (
            <div style={{ width: '100%', height: '4px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '2px', marginBottom: '1.5rem', overflow: 'hidden' }}>
              <div style={{ width: `${simulationProgress}%`, height: '100%', background: 'var(--active-color)', transition: 'width 0.1s linear', boxShadow: '0 0 10px var(--active-color)' }} />
            </div>
          )}

          {/* Timeline Visual Container */}
          <div style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            paddingLeft: '1.5rem',
            borderLeft: '2px solid rgba(255,255,255,0.08)'
          }}>
            {activeStops.map((stop, idx) => {
              const district = okinawaDistricts.find(d => d.id === stop.districtId);
              const isPassed = currentSimulatedStopIndex >= idx;
              const isCurrent = currentSimulatedStopIndex === idx;

              return (
                <div
                  key={stop.id}
                  style={{
                    position: 'relative',
                    padding: '0.8rem 1rem',
                    background: isCurrent ? `hsla(${district?.themeColor || '0, 0%, 50%'}, 0.08)` : 'rgba(255,255,255,0.01)',
                    border: isCurrent 
                      ? `1px solid hsl(${district?.themeColor || '0, 0%, 50%'})` 
                      : (isPassed ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.03)'),
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    boxShadow: isCurrent ? `0 0 15px hsla(${district?.themeColor || '0,0%,50%'}, 0.1)` : 'none',
                    opacity: isPassed || !isSimulating ? 1 : 0.4
                  }}
                >
                  {/* Glowing Timeline Dot */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-32px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      background: isPassed ? `hsl(${district?.themeColor || '0,0%,100%'})` : '#16171d',
                      border: '2px solid rgba(255,255,255,0.15)',
                      boxShadow: isPassed ? `0 0 8px hsl(${district?.themeColor})` : 'none',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {isCurrent && (
                      <div style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#fff',
                        animation: 'pulse-glow 1s infinite alternate'
                      }} />
                    )}
                  </div>

                  {/* Stop Information details */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <h4 style={{ color: isCurrent ? '#fff' : 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {stop.name}
                        <span 
                          className="badge" 
                          style={{ 
                            fontSize: '0.55rem', 
                            padding: '0.1rem 0.4rem', 
                            borderColor: `hsla(${district?.themeColor}, 0.3)`, 
                            color: `hsl(${district?.themeColor})`, 
                            background: `hsla(${district?.themeColor}, 0.05)` 
                          }}
                        >
                          {district?.name.split(' ')[0]}
                        </span>
                      </h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem', lineHeight: '1.4' }}>{stop.description}</p>
                    </div>

                    <div style={{ textAlign: 'right', fontSize: '0.75rem' }}>
                      <div style={{ color: '#fff', fontWeight: 600 }}>
                        {idx === 0 ? '🚀 Departure' : `⏱️ +${stop.travelTimeMin}m drive`}
                      </div>
                      <div style={{ color: 'var(--text-glow)', fontSize: '0.65rem', marginTop: '0.15rem' }}>
                        {'⭐'.repeat(stop.scenicRating)} Scenic
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 5px var(--active-color); }
          100% { box-shadow: 0 0 15px var(--active-color); }
        }
      `}</style>
    </div>
  );
};
