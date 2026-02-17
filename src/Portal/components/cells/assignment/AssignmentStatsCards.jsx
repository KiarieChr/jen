import React from 'react';

const StatCard = ({ icon, value, label, color = '#22c1e6', alert = false }) => (
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
            width: '50px',
            height: '50px',
            borderRadius: '10px',
            background: `rgba(${color === '#22c1e6' ? '34, 193, 230' : (color === '#ef4444' ? '239, 68, 68' : (color === '#f59e0b' ? '245, 158, 11' : '239, 243, 193'))}, 0.1)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            color: color
        }}>
            {icon}
        </div>
        <div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: alert ? '#ef4444' : '#eff3c1', lineHeight: 1 }}>{value}</div>
            <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: '500', marginTop: '0.2rem' }}>{label}</div>
        </div>
    </div>
);

const AssignmentStatsCards = () => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem'
        }}>
            <StatCard icon="👥" value="315" label="Total Members" color="#a855f7" />
            <StatCard icon="✅" value="280" label="Assigned" color="#22c1e6" />
            <StatCard icon="⏳" value="35" label="Unassigned" color="#f59e0b" alert={true} />
            <StatCard icon="🏘️" value="42" label="Total Cells" color="#eff3c1" />
            <StatCard icon="⚠️" value="3" label="At Capacity" color="#ef4444" />
        </div>
    );
};

export default AssignmentStatsCards;
