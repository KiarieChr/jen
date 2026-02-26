import React from 'react';

const QuickAccessCard = ({ icon, title, subtitle, color, onClick }) => (
    <div
        onClick={onClick}
        style={{
            background: 'var(--surface-1)',
            borderRadius: '1rem',
            padding: '2rem',
            border: '1px solid var(--border-color)',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
        <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '1rem',
            background: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            color: 'var(--bg-color)'
        }}>
            {icon}
        </div>
        <div>
            <h3 style={{ color: 'var(--text-color)', margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>{title}</h3>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>{subtitle}</p>
        </div>
        <div style={{ color: color, fontSize: '0.9rem', fontWeight: '600', marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Explore <span>→</span>
        </div>
    </div>
);

const QuickAccessCards = ({ onNavigate }) => {
    return (
        <div style={{ marginTop: '2rem' }}>
            <h3 style={{ color: 'var(--text-color)', fontSize: '1.1rem', marginBottom: '1rem' }}>Quick Access</h3>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem'
            }}>
                <QuickAccessCard
                    icon="🎤"
                    title="Audio Archive"
                    subtitle="Listen to past messages"
                    color="#22c1e6"
                    onClick={() => onNavigate('audio')}
                />
                <QuickAccessCard
                    icon="📹"
                    title="Video Sermons"
                    subtitle="Watch Sunday services"
                    color="#f43f5e"
                    onClick={() => onNavigate('video')}
                />
                <QuickAccessCard
                    icon="🖼️"
                    title="Photo Gallery"
                    subtitle="View ministry moments"
                    color="#22c55e"
                    onClick={() => onNavigate('photos')}
                />
            </div>
        </div>
    );
};

export default QuickAccessCards;
