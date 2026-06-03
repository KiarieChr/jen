import React, { useState, useEffect } from 'react';
import DashboardCard from '../DashboardCard';
import api from '../../../../services/api';

const ParticipationHealthChart = () => {
    const [attendanceData, setAttendanceData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                setLoading(true);
                const response = await api.get('/get_my_attendance.php');
                if (response.success) {
                    setAttendanceData(response.data);
                }
            } catch (err) {
                console.error('Error fetching attendance:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAttendance();
    }, []);

    const stats = attendanceData?.my_attendance || { attended: 0, total_meetings: 0, percentage: 0 };
    const healthScore = stats.percentage || 0;

    if (loading) {
        return (
            <DashboardCard title="Participation Health">
                <div style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                    Loading...
                </div>
            </DashboardCard>
        );
    }

    return (
        <DashboardCard title="Participation Health">
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1rem 0'
            }}>
                <div style={{ position: 'relative', width: '200px', height: '120px', display: 'flex', justifyContent: 'center' }}>
                    <svg width="200" height="120" viewBox="0 0 200 120">
                        {/* Background Arc */}
                        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="var(--border-color)" strokeWidth="12" strokeLinecap="round" />
                        {/* Active Arc */}
                        <path
                            d="M 20 100 A 80 80 0 0 1 180 100"
                            fill="none"
                            stroke="var(--primary)"
                            strokeWidth="12"
                            strokeLinecap="round"
                            strokeDasharray="251.2"
                            strokeDashoffset={251.2 * (1 - Math.min(healthScore, 100) / 100)}
                            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                        />
                    </svg>

                    <div style={{ position: 'absolute', bottom: '0', textAlign: 'center' }}>
                        <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--text-color)', lineHeight: 1 }}>{Math.round(healthScore)}%</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: healthScore >= 70 ? '#10b981' : '#f59e0b', marginTop: '0.25rem' }}>
                            {healthScore >= 90 ? 'Excellent' : healthScore >= 70 ? 'Growing' : healthScore >= 50 ? 'Steady' : 'Needs Focus'}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '0.1rem' }}>Overall Health</div>
                    </div>
                </div>

                {/* Stats Row */}
                <div style={{
                    display: 'flex',
                    gap: '2rem',
                    marginTop: '1.5rem',
                    padding: '1rem',
                    background: 'var(--surface-2)',
                    borderRadius: '0.5rem',
                    width: '100%',
                    justifyContent: 'center'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-color)' }}>{stats.total_meetings}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Meetings</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-color)' }}>{stats.attended}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Attended</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#10b981' }}>{Math.round(healthScore)}%</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Rate</div>
                    </div>
                </div>
            </div>
        </DashboardCard>
    );
};

export default ParticipationHealthChart;
