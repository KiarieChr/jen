import React from 'react';

const StatCard = ({ title, value, icon, iconBg, iconColor }) => (
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
            width: '56px',
            height: '56px',
            borderRadius: '12px',
            background: iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            color: iconColor
        }}>
            {icon}
        </div>
        <div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-color)', lineHeight: 1 }}>{value}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.3rem' }}>{title}</div>
        </div>
    </div>
);

const MediaStatsCards = () => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
        }}>
            <StatCard icon="🎤" value="342" title="Total Sermons" iconBg="rgba(34, 193, 230, 0.1)" iconColor="#22c1e6" />
            <StatCard icon="📹" value="128" title="Video Library" iconBg="rgba(244, 63, 94, 0.1)" iconColor="#f43f5e" />
            <StatCard icon="🖼️" value="1.2k" title="Event Photos" iconBg="rgba(34, 197, 94, 0.1)" iconColor="#22c55e" />
        </div>
    );
};

export default MediaStatsCards;
