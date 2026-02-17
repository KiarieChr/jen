import React from 'react';

const ParticipationHealthChart = () => {
    // Gauge chart calculation
    // Half circle (180 deg)
    const radius = 80;
    const stroke = 12;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const offset = circumference - (82 / 100) * (circumference / 2); // 82% filled on half circle? 
    // Actually standard gauge usually goes 0 to 100 on a 180 arc.

    // Simpler SVG arc approach

    return (
        <div style={{
            background: '#1A1625',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%'
        }}>
            <h3 style={{ width: '100%', color: '#22c1e6', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '1.5rem', textAlign: 'left' }}>
                My Participation Health
            </h3>

            <div style={{ position: 'relative', width: '200px', height: '120px', display: 'flex', justifyContent: 'center' }}>
                <svg width="200" height="120" viewBox="0 0 200 120">
                    {/* Background Arc */}
                    <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" strokeLinecap="round" />
                    {/* Active Arc (82%) */}
                    {/* Calculate end point for 82% of 180 degrees = 147.6 degrees. Start is -180 (left). End is -32.4? */}
                    {/* svg path arc command: A rx ry x-axis-rotation large-arc-flag sweep-flag x y */}
                    {/* It's easier to use dasharray for progress */}
                    <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#22c1e6" strokeWidth="12" strokeLinecap="round" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.82)} />
                </svg>

                <div style={{ position: 'absolute', bottom: '0', textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#22c1e6', lineHeight: 1 }}>82%</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#eff3c1', marginTop: '0.25rem' }}>Growing</div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', marginTop: '0.1rem' }}>Healthy</div>
                </div>
            </div>
        </div>
    );
};

export default ParticipationHealthChart;
