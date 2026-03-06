import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

const AttendanceWidget = () => {
    const [attendanceData, setAttendanceData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                setLoading(true);
                const response = await api.get('/get_my_attendance.php');
                if (response.data.success) {
                    setAttendanceData(response.data.data);
                }
            } catch (err) {
                console.error('Error fetching attendance:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAttendance();
    }, []);

    const getStatusColor = (status) => {
        if (status === 'Present' || status === 'present') return 'var(--primary)';
        if (status === 'Absent' || status === 'absent') return '#ef4444';
        return '#a8a29e';
    };

    // Transform API data or use fallback
    const history = attendanceData?.recent_attendance?.map(record => ({
        date: new Date(record.date || record.login_time).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        }),
        event: record.meeting_name || 'Meeting',
        status: record.attended ? 'Present' : 'Absent'
    })) || [];

    const stats = attendanceData?.my_attendance || { attended: 0, total_meetings: 0, percentage: 0 };

    if (loading) {
        return (
            <div style={{
                background: 'var(--surface-1)',
                border: '1px solid var(--border-color)',
                borderRadius: '1rem',
                padding: '1.5rem',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{ color: 'var(--text-muted)' }}>Loading...</div>
            </div>
        );
    }

    return (
        <div style={{
            background: 'var(--surface-1)',
            border: '1px solid var(--border-color)',
            borderRadius: '1rem',
            padding: '1.5rem',
            height: '100%'
        }}>
            <h3 style={{ color: 'var(--primary)', fontSize: '1.1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
                ✅ My Attendance
            </h3>

            {/* Stats Summary */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '0.75rem',
                marginBottom: '1.5rem'
            }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                    <div style={{ color: 'var(--text-color)', fontSize: '1.25rem', fontWeight: '700' }}>{stats.attended}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Attended</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                    <div style={{ color: 'var(--text-color)', fontSize: '1.25rem', fontWeight: '700' }}>{stats.total_meetings}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Total</div>
                </div>
                <div style={{ background: 'rgba(34, 193, 230, 0.1)', padding: '0.75rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                    <div style={{ color: 'var(--primary)', fontSize: '1.25rem', fontWeight: '700' }}>{stats.percentage}%</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Rate</div>
                </div>
            </div>

            {/* Recent History */}
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Recent History
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {history.length > 0 ? history.slice(0, 5).map((record, i) => (
                    <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.75rem',
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '0.75rem',
                        borderLeft: `3px solid ${getStatusColor(record.status)}`
                    }}>
                        <div>
                            <div style={{ color: 'var(--text-color)', fontSize: '0.9rem', fontWeight: '600' }}>{record.event}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{record.date}</div>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            color: getStatusColor(record.status),
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            background: `rgba(${record.status === 'Present' ? '34, 193, 230' : '239, 68, 68'}, 0.1)`,
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.5rem'
                        }}>
                            <span style={{ fontSize: '0.5rem' }}>●</span> {record.status}
                        </div>
                    </div>
                )) : (
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '1rem' }}>
                        No attendance records yet
                    </div>
                )}
            </div>

            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <button style={{ background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.85rem', cursor: 'pointer', width: '100%' }}>
                    View Full History
                </button>
            </div>
        </div>
    );
};

export default AttendanceWidget;
