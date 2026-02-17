import React from 'react';

const GivingProgressChart = () => {
    const data = [
        { label: 'Q1', fulfilled: 80, pledged: 100 },
        { label: 'Q2', fulfilled: 45, pledged: 90 },
        { label: 'Q3', fulfilled: 95, pledged: 100 },
        { label: 'Q4', fulfilled: 0, pledged: 100 },
    ];

    // Max height for bars
    const maxVal = 100;

    return (
        <div style={{
            background: '#1A1625',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.05)',
            height: '100%'
        }}>
            <h3 style={{ color: '#22c1e6', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Giving & Pledges Progress
            </h3>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.7rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#64748b' }}>
                    <span style={{ width: '8px', height: '8px', background: '#22c1e6' }}></span> Fulfilled
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#64748b' }}>
                    <span style={{ width: '8px', height: '8px', background: 'rgba(255,255,255,0.1)' }}></span> Target Pledged
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '180px', paddingBottom: '1rem' }}>
                {data.map((item, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '100%' }}>
                            {/* Pledged Bar (Background/Ghost) */}
                            <div style={{
                                width: '12px',
                                height: `${(item.pledged / maxVal) * 100}%`,
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: '2px 2px 0 0'
                            }}></div>
                            {/* Fulfilled Bar */}
                            <div style={{
                                width: '20px',
                                height: `${(item.fulfilled / maxVal) * 100}%`,
                                background: '#22c1e6',
                                borderRadius: '4px 4px 0 0',
                                boxShadow: '0 0 10px rgba(34, 193, 230, 0.2)'
                            }}></div>
                        </div>
                        <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{item.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GivingProgressChart;
