import React from 'react';

const StatCard = ({ icon, value, label, subtext, color = 'var(--primary)' }) => (
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
            borderRadius: '12px',
            background: `rgba(${color === 'var(--primary)' ? '34, 193, 230' : (color === '#ef4444' ? '239, 68, 68' : '239, 243, 193')}, 0.1)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
            color: color
        }}>
            {icon}
        </div>
        <div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-color)', lineHeight: 1 }}>{value}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '500', marginTop: '0.25rem' }}>{label}</div>
            {subtext && <div style={{ color: color, fontSize: '0.75rem', marginTop: '0.2rem' }}>{subtext}</div>}
        </div>
    </div>
);

const CellStatsCards = () => {
    // Mock Data
    const stats = [
        { icon: '🏘️', value: '42', label: 'Total Cells', subtext: '5 new this month', color: 'var(--text-color)' },
        { icon: '✅', value: '38', label: 'Active Cells', subtext: '90% operational', color: 'var(--primary)' },
        { icon: '👥', value: '315', label: 'Total Members', subtext: 'Avg. 8 per cell', color: 'var(--secondary)' },
        { icon: '⚠️', value: '3', label: 'Needs Attention', subtext: 'Low attendance', color: '#f59e0b' },
    ];

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
        }}>
            {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    );
};

export default CellStatsCards;
