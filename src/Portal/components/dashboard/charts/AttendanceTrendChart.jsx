import React, { useState } from 'react';
import DashboardCard, { CardDropdown } from '../DashboardCard';

const AttendanceTrendChart = () => {
    const [period, setPeriod] = useState('6months');

    // Mock data points for spline
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

    const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];

    return (
        <DashboardCard
            title="Revenue Updates"
            subtitle="Overview of Attendance"
            headerAction={
                <CardDropdown
                    value={period}
                    onChange={setPeriod}
                    options={[
                        { value: '6months', label: 'March 2026' },
                        { value: '3months', label: 'Last 3 Months' },
                        { value: '1year', label: 'This Year' }
                    ]}
                />
            }
        >
            <div style={{ position: 'relative', height: '220px', width: '100%' }}>
                <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                    <defs>
                        <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(93, 135, 255, 0.3)" />
                            <stop offset="100%" stopColor="rgba(93, 135, 255, 0)" />
                        </linearGradient>
                    </defs>
                    {/* Fill */}
                    <path d={pathD} fill="url(#trendGradient)" />
                    {/* Line */}
                    <path d={strokeD} fill="none" stroke="#5d87ff" strokeWidth="3" strokeLinecap="round" />

                    {/* Data points */}
                    <circle cx="0" cy="200" r="6" fill="#5d87ff" />
                    <circle cx="250" cy="100" r="6" fill="#5d87ff" />
                    <circle cx="500" cy="200" r="6" fill="#5d87ff" />
                    <circle cx="750" cy="250" r="6" fill="#5d87ff" />
                    <circle cx="1000" cy="150" r="6" fill="#5d87ff" />
                </svg>

                {/* Floating Stats */}
                <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'white',
                    padding: '1rem 1.25rem',
                    borderRadius: '0.75rem',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    minWidth: '140px'
                }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b' }}>1,245</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Total Attendees</div>
                    <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1e293b' }}>892</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>This month</div>
                    </div>
                </div>

                {/* Labels */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    color: '#94a3b8',
                    fontSize: '0.75rem',
                    fontWeight: '500'
                }}>
                    {months.map(m => <span key={m}>{m}</span>)}
                </div>
            </div>
        </DashboardCard>
    );
};

export default AttendanceTrendChart;
