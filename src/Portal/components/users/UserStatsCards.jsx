import React from 'react';

const StatCard = ({ title, value, icon, color = '#22c1e6', subtext }) => (
    <div style={{
        background: '#1A1625',
        borderRadius: '1rem',
        padding: '1.25rem',
        border: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    }}>
        <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '10px',
            background: `rgba(${color === '#22c1e6' ? '34, 193, 230' : (color === '#4ade80' ? '74, 222, 128' : (color === '#ef4444' ? '239, 68, 68' : '168, 85, 247'))}, 0.1)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            color: color
        }}>
            {icon}
        </div>
        <div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#eff3c1', lineHeight: 1 }}>{value}</div>
            <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: '500', marginTop: '0.2rem' }}>{title}</div>
            {subtext && <div style={{ fontSize: '0.7rem', color: color, marginTop: '2px' }}>{subtext}</div>}
        </div>
    </div>
);

const UserStatsCards = () => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem'
        }}>
            <StatCard icon="👥" value="156" title="Total Users" color="#22c1e6" />
            <StatCard icon="🟢" value="142" title="Active Users" color="#4ade80" />
            <StatCard icon="🔐" value="45" title="Signed In Today" color="#a855f7" subtext="24h Activity" />
            <StatCard icon="⛔" value="5" title="Locked Accounts" color="#ef4444" subtext="Action Required" />
            <StatCard icon="⚠️" value="9" title="No Role Assigned" color="#f59e0b" />
        </div>
    );
};

export default UserStatsCards;
