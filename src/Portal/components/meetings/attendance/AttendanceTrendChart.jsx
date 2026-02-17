import React from 'react';

// Simple SVG Line Chart
const AttendanceTrendChart = () => {
    const data = [45, 52, 49, 60, 58, 65, 70, 68, 75, 82, 80, 85];
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Normalize data for SVG coordinates (0-100 height)
    const max = Math.max(...data) * 1.1;
    const points = data.map((val, idx) => {
        const x = (idx / (data.length - 1)) * 100;
        const y = 100 - (val / max) * 100;
        return `${x},${y}`;
    }).join(' ');

    return (
        <div style={{
            background: '#1A1625',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div>
                    <h3 style={{ margin: 0, color: '#eff3c1', fontSize: '1rem' }}>Attendance Trend</h3>
                    <p style={{ margin: '0.2rem 0 0 0', color: '#94a3b8', fontSize: '0.8rem' }}>Year-to-date performance vs last year</p>
                </div>
                <select style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#eff3c1', borderRadius: '0.4rem', padding: '0.2rem 0.5rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                    <option>This Year</option>
                    <option>Last Year</option>
                </select>
            </div>

            <div style={{ flex: 1, position: 'relative', minHeight: '200px', padding: '0 0.5rem' }}>
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                    {/* Grid lines */}
                    {[0, 25, 50, 75, 100].map(h => (
                        <line key={h} x1="0" y1={h} x2="100" y2={h} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                    ))}

                    {/* Line */}
                    <polyline
                        points={points}
                        fill="none"
                        stroke="#22c1e6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Area fill (optional, simplified) */}
                    <polygon
                        points={`0,100 ${points} 100,100`}
                        fill="url(#gradient)"
                        opacity="0.2"
                    />

                    <defs>
                        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#22c1e6" />
                            <stop offset="100%" stopColor="#22c1e6" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Points */}
                    {data.map((val, idx) => {
                        const x = (idx / (data.length - 1)) * 100;
                        const y = 100 - (val / max) * 100;
                        return (
                            <circle key={idx} cx={x} cy={y} r="1.5" fill="#1A1625" stroke="#22c1e6" strokeWidth="1" />
                        );
                    })}
                </svg>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.7rem', color: '#64748b' }}>
                {labels.filter((_, i) => i % 2 === 0).map((l, i) => (
                    <span key={i}>{l}</span>
                ))}
            </div>
        </div>
    );
};

export default AttendanceTrendChart;
