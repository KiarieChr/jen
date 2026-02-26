import React from 'react';

const AttendanceTable = () => {
    const sessions = [
        { id: 1, name: 'Sunday Service', date: 'Feb 02, 2026', type: 'Event', present: 450, absent: 50, excused: 10, rate: 90 },
        { id: 2, name: 'Goshen Alpha Cell', date: 'Feb 04, 2026', type: 'Meeting', present: 12, absent: 1, excused: 0, rate: 92 },
        { id: 3, name: 'Leadership Summit', date: 'Jan 28, 2026', type: 'Event', present: 48, absent: 2, excused: 0, rate: 96 },
        { id: 4, name: 'Main Prayer', date: 'Jan 30, 2026', type: 'Meeting', present: 80, absent: 20, excused: 5, rate: 76 },
        { id: 5, name: 'Youth Bash', date: 'Feb 01, 2026', type: 'Event', present: 120, absent: 5, excused: 2, rate: 94 },
    ];

    const getRateColor = (rate) => {
        if (rate >= 90) return '#4ade80';
        if (rate >= 80) return 'var(--primary)';
        if (rate >= 70) return '#f59e0b';
        return '#ef4444';
    };

    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid var(--border-color)',
            marginTop: '2rem'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, color: 'var(--text-color)', fontSize: '1.1rem' }}>Detailed Attendance Breakdown</h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-muted)', borderRadius: '0.4rem', padding: '0.4rem 0.8rem', fontSize: '0.85rem', cursor: 'pointer' }}>Filter</button>
                    <button style={{ background: 'var(--primary)', border: 'none', color: 'var(--bg-color)', borderRadius: '0.4rem', padding: '0.4rem 0.8rem', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' }}>Export Report</button>
                </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                    <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>
                        <th style={{ textAlign: 'left', padding: '1rem 0.75rem' }}>Name</th>
                        <th style={{ textAlign: 'left', padding: '1rem 0.75rem' }}>Type</th>
                        <th style={{ textAlign: 'center', padding: '1rem 0.75rem' }}>Present</th>
                        <th style={{ textAlign: 'center', padding: '1rem 0.75rem' }}>Absent</th>
                        <th style={{ textAlign: 'center', padding: '1rem 0.75rem' }}>Excused</th>
                        <th style={{ textAlign: 'right', padding: '1rem 0.75rem' }}>Rate</th>
                        <th style={{ textAlign: 'right', padding: '1rem 0.75rem' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sessions.map(s => (
                        <tr key={s.id} style={{ borderBottom: '1px solid var(--surface-2)', color: 'var(--text-color)' }}>
                            <td style={{ padding: '1rem 0.75rem' }}>
                                <div style={{ color: 'var(--text-color)', fontWeight: '500' }}>{s.name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.date}</div>
                            </td>
                            <td style={{ padding: '1rem 0.75rem' }}>
                                <span style={{
                                    background: s.type === 'Event' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(34, 193, 230, 0.1)',
                                    color: s.type === 'Event' ? 'var(--secondary)' : 'var(--primary)',
                                    padding: '0.2rem 0.6rem',
                                    borderRadius: '1rem',
                                    fontSize: '0.75rem'
                                }}>{s.type}</span>
                            </td>
                            <td style={{ padding: '1rem 0.75rem', textAlign: 'center', color: '#4ade80' }}>{s.present}</td>
                            <td style={{ padding: '1rem 0.75rem', textAlign: 'center', color: '#ef4444' }}>{s.absent}</td>
                            <td style={{ padding: '1rem 0.75rem', textAlign: 'center', color: '#f59e0b' }}>{s.excused}</td>
                            <td style={{ padding: '1rem 0.75rem', textAlign: 'right' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                    <span style={{ fontWeight: '700', color: getRateColor(s.rate) }}>{s.rate}%</span>
                                    {/* Mini progress bar */}
                                    <div style={{ width: '40px', height: '4px', background: 'var(--border-color)', borderRadius: '2px', overflow: 'hidden' }}>
                                        <div style={{ width: `${s.rate}%`, height: '100%', background: getRateColor(s.rate) }}></div>
                                    </div>
                                </div>
                            </td>
                            <td style={{ padding: '1rem 0.75rem', textAlign: 'right' }}>
                                <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>⋮</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AttendanceTable;
