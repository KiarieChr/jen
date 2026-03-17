import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

const StatCard = ({ icon, value, label, subtext, color = 'var(--primary)', loading }) => (
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
            background: `rgba(${color === 'var(--primary)' ? '34, 193, 230' : (color === '#4ade80' ? '74, 222, 128' : '168, 85, 247')}, 0.1)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            color: color
        }}>
            {icon}
        </div>
        <div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-color)', lineHeight: 1 }}>
                {loading ? '...' : value}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '500', marginTop: '0.2rem' }}>{label}</div>
            {subtext && <div style={{ color: color, fontSize: '0.7rem', marginTop: '0.1rem' }}>{subtext}</div>}
        </div>
    </div>
);

const MeetingStatsCards = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/get_meeting_stats.php');
                if (response.success) {
                    setStats(response.data.stats);
                }
            } catch (err) {
                console.error('Error fetching meeting stats:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem'
        }}>
            <StatCard
                icon="📅"
                value={stats?.total_meetings || 0}
                label="Total Meetings"
                color="#eff3c1"
                loading={loading}
            />
            <StatCard
                icon="⏳"
                value={stats?.upcoming_7_days || 0}
                label="Upcoming"
                color="#22c1e6"
                subtext="In next 7 days"
                loading={loading}
            />
            <StatCard
                icon="✅"
                value={stats?.completed_meetings || 0}
                label="Completed"
                color="#4ade80"
                loading={loading}
            />
            <StatCard
                icon="👥"
                value={stats?.average_attendance || 0}
                label="Avg Attendance"
                color="#a855f7"
                loading={loading}
            />
        </div>
    );
};

export default MeetingStatsCards;
