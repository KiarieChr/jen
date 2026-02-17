import React from 'react';

const AttendanceTrendChart = () => {
    // Mock data points for spline
    // Using a simple cubic bezier path for the wave look
    const width = 1000;
    const height = 300;

    // Path definition mimicking the wave in the image
    const pathD = `
        M 0,200 
        C 150,100 350,100 500,200 
        S 850,300 1000,150 
        V 300 H 0 Z
    `;

    // Stroke path (top line)
    const strokeD = `
        M 0,200 
        C 150,100 350,100 500,200 
        S 850,300 1000,150
    `;

    return (
        <div style={{
            background: '#1A1625',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.05)',
            position: 'relative',
            overflow: 'hidden',
            height: '100%'
        }}>
            <h3 style={{ color: '#22c1e6', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                Attendance Trend (Last 6 Months)
            </h3>

            <div style={{ position: 'relative', height: '200px', width: '100%' }}>
                <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                    <defs>
                        <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(34, 193, 230, 0.4)" />
                            <stop offset="100%" stopColor="rgba(34, 193, 230, 0)" />
                        </linearGradient>
                    </defs>
                    {/* Fill */}
                    <path d={pathD} fill="url(#trendGradient)" />
                    {/* Line */}
                    <path d={strokeD} fill="none" stroke="#22c1e6" strokeWidth="4" strokeLinecap="round" />
                </svg>

                {/* Labels */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', color: '#64748b', fontSize: '0.75rem' }}>
                    <span>Sep</span>
                    <span>Oct</span>
                    <span>Nov</span>
                    <span>Dec</span>
                    <span>Jan</span>
                </div>
            </div>
        </div>
    );
};

export default AttendanceTrendChart;
