import React from 'react';

const CellMeetingsWidget = () => {
    return (
        <div style={{
            background: '#1A1625',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.05)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <h3 style={{ color: '#22c1e6', fontSize: '1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                📅 Meetings & Activity
            </h3>

            {/* Next Meeting */}
            <div style={{
                background: 'rgba(34, 193, 230, 0.05)',
                borderLeft: '4px solid #22c1e6',
                borderRadius: '0.5rem',
                padding: '1rem',
                marginBottom: '1rem'
            }}>
                <div style={{ color: '#22c1e6', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '700', marginBottom: '0.25rem' }}>Next Meeting</div>
                <div style={{ color: '#eff3c1', fontSize: '1.1rem', fontWeight: '700' }}>Wednesday, Feb 10th</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>@ 6:00 PM • Westlands</div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button style={{ flex: 1, padding: '0.4rem', borderRadius: '0.25rem', border: 'none', background: '#22c1e6', color: '#120D20', fontWeight: '600', cursor: 'pointer', fontSize: '0.8rem' }}>I'm Attending</button>
                    <button style={{ flex: 1, padding: '0.4rem', borderRadius: '0.25rem', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#94a3b8', cursor: 'pointer', fontSize: '0.8rem' }}>Can't Make It</button>
                </div>
            </div>

            {/* Attendance Stat */}
            <div style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>My Attendance (Last 30 days)</div>
                    <div style={{ color: '#eff3c1', fontSize: '0.9rem', fontWeight: '600' }}>100% (4/4 Meetings)</div>
                </div>
                <div style={{ fontSize: '1.5rem' }}>🔥</div>
            </div>
        </div>
    );
};

export default CellMeetingsWidget;
