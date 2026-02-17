import React from 'react';

const CellOverviewWidget = () => {
    return (
        <div style={{
            background: '#1A1625',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '1rem',
            padding: '1.5rem',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#22c1e6', fontSize: '1.1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    🏠 My Cell Group
                </h3>
                <button style={{ background: 'rgba(34, 193, 230, 0.1)', color: '#22c1e6', border: 'none', borderRadius: '0.5rem', padding: '0.25rem 0.75rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                    View Details
                </button>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ color: '#eff3c1', fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                    Goshen Cell
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                    <span>Leader:</span>
                    <span style={{ color: '#eff3c1', fontWeight: '600' }}>Pastor Sarah</span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '0.75rem' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Members</div>
                    <div style={{ color: '#eff3c1', fontSize: '1.25rem', fontWeight: '700' }}>12</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '0.75rem' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Next Gathering</div>
                    <div style={{ color: '#22c1e6', fontSize: '1.1rem', fontWeight: '700' }}>Thursday, Feb 1st</div>
                </div>
            </div>

            <div style={{ marginTop: 'auto' }}>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Engagement Health</div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '85%', height: '100%', background: '#22c1e6' }}></div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#22c1e6', marginTop: '0.25rem' }}>Healthy (85%)</div>
            </div>
        </div>
    );
};

export default CellOverviewWidget;
