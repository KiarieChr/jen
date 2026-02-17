import React from 'react';

const AudioPlayer = ({ title, preacher, duration }) => {
    return (
        <div style={{
            background: '#1A1625',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem'
        }}>
            <div style={{
                width: '60px',
                height: '60px',
                background: '#22c1e6',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#120D20',
                fontSize: '1.5rem',
                cursor: 'pointer'
            }}>
                ▶
            </div>

            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div>
                        <div style={{ color: '#eff3c1', fontWeight: '600', fontSize: '1rem' }}>{title}</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{preacher}</div>
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{duration}</div>
                </div>

                {/* Progress Bar */}
                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', position: 'relative' }}>
                    <div style={{ width: '30%', height: '100%', background: '#22c1e6', borderRadius: '2px' }}></div>
                    <div style={{ width: '12px', height: '12px', background: '#eff3c1', borderRadius: '50%', position: 'absolute', top: '-4px', left: '30%' }}></div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', color: '#94a3b8' }}>
                <span style={{ cursor: 'pointer' }}>🔊</span>
                <span style={{ cursor: 'pointer' }}>⬇️</span>
            </div>
        </div>
    );
};

export default AudioPlayer;
