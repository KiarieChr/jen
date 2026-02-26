import React from 'react';

const StatCard = ({ icon, value, label, subtext, color = 'var(--primary)' }) => (
    <div style={{
        background: 'var(--surface-1)',
        borderRadius: '1rem',
        padding: '1.25rem',
        border: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    }}>
        <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '10px',
            background: `rgba(${color === 'var(--primary)' ? '34, 193, 230' : (color === '#4ade80' ? '74, 222, 128' : (color === '#f59e0b' ? '245, 158, 11' : '168, 85, 247'))}, 0.1)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            color: color
        }}>
            {icon}
        </div>
        <div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-color)', lineHeight: 1 }}>{value}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '500', marginTop: '0.2rem' }}>{label}</div>
            {subtext && <div style={{ color: color, fontSize: '0.7rem', marginTop: '0.1rem' }}>{subtext}</div>}
        </div>
    </div>
);

const AttendanceStatsCards = () => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem'
        }}>
            <StatCard icon="📅" value="15" label="Total Sessions" color="#eff3c1" subtext="Last 30 days" />
            <StatCard icon="👥" value="1,240" label="Total Attendance" color="#22c1e6" />
            <StatCard icon="📊" value="82" label="Avg. Attendance" color="#a855f7" />
            <StatCard icon="📈" value="92%" label="Attendance Rate" color="#4ade80" subtext="+5% from last month" />
            <StatCard icon="⚠️" value="8%" label="Missed Rate" color="#f59e0b" />
        </div>
    );
};

export default AttendanceStatsCards;
