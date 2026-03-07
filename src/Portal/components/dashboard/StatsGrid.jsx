import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

const ModernStatCard = ({ label, value, icon, bgColor, iconBg, loading }) => (
    <div className="modern-stat-card" style={{ background: bgColor }}>
        <div className="stat-icon" style={{ background: iconBg }}>
            {icon}
        </div>
        <div className="stat-label">{label}</div>
        <div className="stat-value">
            {loading ? <span className="loading-dots">...</span> : value}
        </div>
        <style>{`
            .modern-stat-card {
                padding: 1.5rem;
                border-radius: 1rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                min-height: 140px;
                transition: all 0.3s ease;
                cursor: pointer;
            }
            .modern-stat-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            }
            .stat-icon {
                width: 56px;
                height: 56px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.75rem;
                margin-bottom: 0.75rem;
            }
            .stat-label {
                font-size: 0.9rem;
                color: #64748b;
                font-weight: 500;
                margin-bottom: 0.25rem;
            }
            .stat-value {
                font-size: 1.75rem;
                font-weight: 700;
                color: #1e293b;
            }
            .loading-dots {
                opacity: 0.5;
                animation: pulse 1.5s infinite;
            }
            @keyframes pulse {
                0%, 100% { opacity: 0.5; }
                50% { opacity: 1; }
            }
        `}</style>
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
        const num = Number(amount) || 0;
        if (num >= 1000000) return `KES ${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `KES ${(num / 1000).toFixed(0)}k`;
        return `KES ${num}`;
    };

    const statCards = [
        {
            label: 'Members',
            value: stats?.total_members || 0,
            icon: '👥',
            bgColor: '#eef2ff',
            iconBg: '#c7d2fe'
        },
        {
            label: 'Cells',
            value: stats?.total_cells || 0,
            icon: '🏘️',
            bgColor: '#fef9c3',
            iconBg: '#fef08a'
        },
        {
            label: 'Events',
            value: stats?.upcoming_events || stats?.events_count || 0,
            icon: '📅',
            bgColor: '#e0f2fe',
            iconBg: '#bae6fd'
        },
        {
            label: 'Meetings',
            value: stats?.meetings_held || stats?.total_meetings || 0,
            icon: '📋',
            bgColor: '#ffe4e6',
            iconBg: '#fecdd3'
        },
        {
            label: 'Giving',
            value: formatCurrency(stats?.my_giving_ytd || stats?.ytd_giving),
            icon: '💰',
            bgColor: '#dcfce7',
            iconBg: '#bbf7d0'
        },
        {
            label: 'Attendance',
            value: `${stats?.avg_attendance || stats?.attendance_rate || 0}%`,
            icon: '📊',
            bgColor: '#f3e8ff',
            iconBg: '#e9d5ff'
        }
    ];

    return (
        <div className="stats-grid-container">
            {statCards.map((card, index) => (
                <ModernStatCard
                    key={index}
                    {...card}
                    loading={loading}
                />
            ))}
            <style>{`
                .stats-grid-container {
                    display: grid;
                    grid-template-columns: repeat(6, 1fr);
                    gap: 1.25rem;
                    margin-bottom: 2rem;
                }
                @media (max-width: 1400px) {
                    .stats-grid-container {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }
                @media (max-width: 768px) {
                    .stats-grid-container {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 1rem;
                    }
                }
                @media (max-width: 480px) {
                    .stats-grid-container {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 0.75rem;
                    }
                    .modern-stat-card {
                        padding: 1rem !important;
                        min-height: 120px !important;
                    }
                    .stat-icon {
                        width: 44px !important;
                        height: 44px !important;
                        font-size: 1.4rem !important;
                    }
                    .stat-value {
                        font-size: 1.35rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default StatsGrid;
