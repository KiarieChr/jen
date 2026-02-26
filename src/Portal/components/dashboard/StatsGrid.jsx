import React from 'react';

const StatCard = ({ label, value, subtext, icon }) => (
    <div style={{
        background: 'var(--surface-1)', // Dark card background for stats
        border: '1px solid var(--border-color)',
        padding: '1.5rem',
        borderRadius: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        position: 'relative',
        overflow: 'hidden'
    }}>
        <div style={{
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--text-muted)',
            fontWeight: '600'
        }}>
            {label}
        </div>
        <div style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            color: 'var(--primary)'
        }}>
            {value}
        </div>
        {subtext && (
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {subtext}
            </div>
        )}
    </div>
);

const StatsGrid = () => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2.5rem'
        }}>
            <StatCard
                label="Total Attendance"
                value="124"
                subtext="This Year"
            />
            <StatCard
                label="Cell Members"
                value="12"
                subtext="Active in Goshen Cell"
            />
            <StatCard
                label="Next Meeting"
                value="Feb 1st"
                subtext="Thursday, 6:00 PM"
            />
            <StatCard
                label="Giving (YTD)"
                value="KES 35,000"
                subtext="15% increase"
            />
        </div>
    );
};

export default StatsGrid;
