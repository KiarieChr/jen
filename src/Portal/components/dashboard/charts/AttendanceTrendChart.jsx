import React, { useState, useEffect } from 'react';
import DashboardCard, { CardDropdown } from '../DashboardCard';
import api from '../../../../services/api';

const AttendanceTrendChart = () => {
    const [period, setPeriod] = useState('6months');
    const [attendanceData, setAttendanceData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await api.get('/get_my_attendance.php');
                if (response.success) {
                    setAttendanceData(response.data);
                }
            } catch (err) {
                console.error('Error fetching attendance trend:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const trend = attendanceData?.monthly_trend || [];
    const stats = attendanceData?.my_attendance || { attended: 0, total_meetings: 0, percentage: 0 };

    // Chart dimensions
    const width = 1000;
    const height = 300;

    // Generate path based on data
    const generatePath = (isStroke) => {
        if (trend.length === 0) return '';
        
        const maxCount = Math.max(...trend.map(d => d.count), 5);
        const padding = 50;
        const usableHeight = height - padding * 2;
        const xStep = width / (Math.max(trend.length - 1, 1));
        
        let d = `M 0,${height - padding - (trend[0].count / maxCount) * usableHeight}`;
        
        for (let i = 1; i < trend.length; i++) {
            const x = i * xStep;
            const y = height - padding - (trend[i].count / maxCount) * usableHeight;
            // Smooth curve
            const prevX = (i - 1) * xStep;
            const prevY = height - padding - (trend[i-1].count / maxCount) * usableHeight;
            const cp1x = prevX + (x - prevX) / 2;
            const cp2x = prevX + (x - prevX) / 2;
            d += ` C ${cp1x},${prevY} ${cp2x},${y} ${x},${y}`;
        }

        if (!isStroke) {
            d += ` V ${height} H 0 Z`;
        }
        return d;
    };

    const pathD = generatePath(false);
    const strokeD = generatePath(true);
    const months = trend.map(d => {
        const date = new Date(d.month + '-01');
        return date.toLocaleDateString('en-US', { month: 'short' });
    });

    if (loading) {
        return (
            <DashboardCard title="Attendance Trend" subtitle="Overview of your attendance">
                <div style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                    Loading...
                </div>
            </DashboardCard>
        );
    }

    return (
        <DashboardCard
            title="Attendance Trend"
            subtitle="Your monthly participation"
            headerAction={
                <CardDropdown
                    value={period}
                    onChange={setPeriod}
                    options={[
                        { value: '6months', label: 'Last 6 Months' },
                        { value: '3months', label: 'Last 3 Months' },
                        { value: '1year', label: 'This Year' }
                    ]}
                />
            }
        >
            <div style={{ position: 'relative', height: '220px', width: '100%' }}>
                {trend.length > 0 ? (
                    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                        <defs>
                            <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="rgba(93, 135, 255, 0.3)" />
                                <stop offset="100%" stopColor="rgba(93, 135, 255, 0)" />
                            </linearGradient>
                        </defs>
                        <path d={pathD} fill="url(#trendGradient)" />
                        <path d={strokeD} fill="none" stroke="#5d87ff" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                ) : (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        No attendance data for the period
                    </div>
                )}

                <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'var(--surface-1)',
                    padding: '1rem 1.25rem',
                    borderRadius: '0.75rem',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    minWidth: '140px',
                    border: '1px solid var(--border-color)'
                }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-color)' }}>{stats.attended}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Attended</div>
                    <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--primary)' }}>{stats.percentage}%</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Attendance Rate</div>
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    color: 'var(--text-muted)',
                    fontSize: '0.75rem',
                    fontWeight: '500'
                }}>
                    {months.map((m, i) => <span key={i}>{m}</span>)}
                </div>
            </div>
        </DashboardCard>
    );
};

export default AttendanceTrendChart;
