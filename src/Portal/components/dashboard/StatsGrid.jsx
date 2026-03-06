import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

const StatCard = ({ label, value, subtext, icon, loading }) => (
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
            {loading ? (
                <span style={{ opacity: 0.5 }}>...</span>
            ) : value}
        </div>
        {subtext && (
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {subtext}
            </div>
        )}
    </div>
);

const StatsGrid = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/get_dashboard_stats.php');
                if (response.success) {
                    setStats(response.data);
                }
            } catch (err) {
                console.error('Failed to fetch stats:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount || 0);
    };

    // Format date for next event
    const formatNextEvent = () => {
        if (!stats?.next_event) return 'No upcoming';
        const date = new Date(stats.next_event.date);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const getNextEventSubtext = () => {
        if (!stats?.next_event) return 'events scheduled';
        const date = new Date(stats.next_event.date);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const time = stats.next_event.time ? stats.next_event.time.substring(0, 5) : '';
        return `${dayName}${time ? ', ' + time : ''}`;
    };

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2.5rem'
        }}>
            <StatCard
                label="Total Members"
                value={stats?.total_members || 0}
                subtext={stats?.new_members_month ? `+${stats.new_members_month} this month` : 'Active members'}
                loading={loading}
            />
            <StatCard
                label="Cell Members"
                value={stats?.my_cell?.members || stats?.total_cells || 0}
                subtext={stats?.my_cell ? `Active in ${stats.my_cell.name || stats.my_cell.code}` : `${stats?.total_cells || 0} active cells`}
                loading={loading}
            />
            <StatCard
                label="Next Meeting"
                value={formatNextEvent()}
                subtext={getNextEventSubtext()}
                loading={loading}
            />
            <StatCard
                label="Giving (YTD)"
                value={formatCurrency(stats?.my_giving_ytd || stats?.ytd_giving)}
                subtext={stats?.pledges ? `${stats.pledges.active} active pledges` : 'Year to date'}
                loading={loading}
            />
        </div>
    );
};

export default StatsGrid;
