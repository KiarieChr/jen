import React from 'react';

const StatCard = ({ title, value, label, description, icon, color = 'var(--primary)' }) => (
    <div style={{
        background: 'var(--surface-1)',
        borderRadius: '1rem',
        padding: '1.25rem',
        border: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        position: 'relative',
        overflow: 'hidden'
    }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>{title}</div>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-color)', margin: '0.2rem 0' }}>{value}</div>
            </div>
            <div style={{
                background: `rgba(${color === 'var(--primary)' ? '34, 193, 230' : (color === '#4ade80' ? '74, 222, 128' : (color === '#f59e0b' ? '245, 158, 11' : '168, 85, 247'))}, 0.1)`,
                color: color,
                borderRadius: '0.5rem',
                padding: '0.5rem',
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {icon}
            </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 'auto' }}>
            {label && <span style={{ background: `rgba(${color === 'var(--primary)' ? '34, 193, 230' : (color === '#4ade80' ? '74, 222, 128' : (color === '#f59e0b' ? '245, 158, 11' : '168, 85, 247'))}, 0.1)`, padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.7rem', color: color, fontWeight: '600' }}>{label}</span>}
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{description}</span>
        </div>
    </div>
);

const MemberStatsCard = () => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem'
        }}>
            <StatCard
                title="Total Members"
                value="2,450"
                label="Registered"
                description="All registered members"
                icon="👥"
                color="#22c1e6"
            />
            <StatCard
                title="Committed Members"
                value="850"
                label="Committed"
                description="Formal commitment made"
                icon="🤝"
                color="#4ade80"
            />
            <StatCard
                title="Linked Accounts"
                value="720"
                label="Linked"
                description="Committed & ID linked"
                icon="🔗"
                color="#a855f7"
            />
            <StatCard
                title="Unlinked Accounts"
                value="130"
                label="Unlinked"
                description="Action required"
                icon="⚠️"
                color="#f59e0b"
            />
        </div>
    );
};

export default MemberStatsCard;
