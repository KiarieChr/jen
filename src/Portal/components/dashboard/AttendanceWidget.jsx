import React from 'react';

const AttendanceWidget = () => {
    const history = [
        { date: 'Sun, Jan 28', event: 'Sunday Service', status: 'Present' },
        { date: 'Thu, Jan 25', event: 'Cell Meeting', status: 'Present' },
        { date: 'Sun, Jan 21', event: 'Sunday Service', status: 'Absent' },
        { date: 'Thu, Jan 18', event: 'Cell Meeting', status: 'Present' },
        { date: 'Sun, Jan 14', event: 'Sunday Service', status: 'Present' },
    ];

    const getStatusColor = (status) => {
        if (status === 'Present') return 'var(--primary)'; // Primary accent
        if (status === 'Absent') return '#ef4444'; // Red
        return '#a8a29e'; // Grey
    };

    return (
        <div style={{
            background: 'var(--surface-1)',
            border: '1px solid var(--border-color)',
            borderRadius: '1rem',
            padding: '1.5rem',
            height: '100%'
        }}>
            <h3 style={{ color: 'var(--primary)', fontSize: '1.1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>
                ✅ Recent Attendance
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {history.map((record, i) => (
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
                            background: `rgba(${record.status === 'Present' ? '34, 193, 230' : (record.status === 'Absent' ? '239, 68, 68' : '168, 162, 158')}, 0.1)`,
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.5rem'
                        }}>
                            <span style={{ fontSize: '0.5rem' }}>●</span> {record.status}
                        </div>
                    </div>
                ))}
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
