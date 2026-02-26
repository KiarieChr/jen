import React from 'react';

const AudioPlayer = ({ title, preacher, duration }) => {
    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem'
        }}>
            <div style={{
                width: '60px',
                height: '60px',
                background: 'var(--primary)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--bg-color)',
                fontSize: '1.5rem',
                cursor: 'pointer'
            }}>
                ▶
            </div>

            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div>
                        <div style={{ color: 'var(--text-color)', fontWeight: '600', fontSize: '1rem' }}>{title}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{preacher}</div>
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{duration}</div>
                </div>

                {/* Progress Bar */}
                <div style={{ width: '100%', height: '4px', background: 'var(--border-color)', borderRadius: '2px', position: 'relative' }}>
                    <div style={{ width: '30%', height: '100%', background: 'var(--primary)', borderRadius: '2px' }}></div>
                    <div style={{ width: '12px', height: '12px', background: 'var(--text-color)', borderRadius: '50%', position: 'absolute', top: '-4px', left: '30%' }}></div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)' }}>
                <span style={{ cursor: 'pointer' }}>🔊</span>
                <span style={{ cursor: 'pointer' }}>⬇️</span>
            </div>
        </div>
    );
};

export default AudioPlayer;
