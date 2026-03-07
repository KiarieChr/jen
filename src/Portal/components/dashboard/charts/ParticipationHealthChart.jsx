import React from 'react';
import DashboardCard from '../DashboardCard';

const ParticipationHealthChart = () => {
    const healthScore = 82;

    return (
        <DashboardCard title="Participation Health">
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1rem 0'
            }}>
                <div style={{ position: 'relative', width: '200px', height: '120px', display: 'flex', justifyContent: 'center' }}>
                    <svg width="200" height="120" viewBox="0 0 200 120">
                        {/* Background Arc */}
                        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#e2e8f0" strokeWidth="12" strokeLinecap="round" />
                        {/* Active Arc */}
                        <path
                            d="M 20 100 A 80 80 0 0 1 180 100"
                            fill="none"
                            stroke="#5d87ff"
                            strokeWidth="12"
                            strokeLinecap="round"
                            strokeDasharray="251.2"
                            strokeDashoffset={251.2 * (1 - healthScore / 100)}
                        />
                    </svg>

                    <div style={{ position: 'absolute', bottom: '0', textAlign: 'center' }}>
                        <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1e293b', lineHeight: 1 }}>{healthScore}%</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#10b981', marginTop: '0.25rem' }}>Growing</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', marginTop: '0.1rem' }}>Healthy</div>
                    </div>
                </div>

                {/* Stats Row */}
                <div style={{
                    display: 'flex',
                    gap: '2rem',
                    marginTop: '1.5rem',
                    padding: '1rem',
                    background: '#f8fafc',
                    borderRadius: '0.5rem',
                    width: '100%',
                    justifyContent: 'center'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b' }}>12</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Events</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b' }}>8</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Attended</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#10b981' }}>+5%</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>vs Last Month</div>
                    </div>
                </div>
            </div>
        </DashboardCard>
    );
};

export default ParticipationHealthChart;
