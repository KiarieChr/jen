import React, { useState } from 'react';

const AttendanceRecordPanel = () => {
    const [filterType, setFilterType] = useState('All');

    // Mock Attendance Data
    const attendanceHistory = [
        { id: 1, date: 'Feb 02, 2026', event: 'Sunday Service', type: 'Service', status: 'Present', time: '10:00 AM' },
        { id: 2, date: 'Jan 28, 2026', event: 'Mid-Week Cell Group', type: 'Cell Meeting', status: 'Present', time: '06:00 PM' },
        { id: 3, date: 'Jan 26, 2026', event: 'Sunday Service', type: 'Service', status: 'Absent', time: '-' },
        { id: 4, date: 'Jan 21, 2026', event: 'Mid-Week Cell Group', type: 'Cell Meeting', status: 'Present', time: '06:15 PM' },
        { id: 5, date: 'Jan 19, 2026', event: 'Sunday Service', type: 'Service', status: 'Present', time: '09:55 AM' },
    ];

    const getStatusColor = (status) => {
        return status === 'Present' ? '#4ade80' : '#ef4444';
    };

    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1rem',
            padding: '2rem',
            border: '1px solid var(--border-color)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, color: 'var(--text-color)', fontSize: '1.1rem' }}>Attendance History</h3>

                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    style={{
                        background: 'var(--border-color)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-color)',
                        borderRadius: '0.4rem',
                        padding: '0.4rem 0.8rem',
                        fontSize: '0.9rem'
                    }}
                >
                    <option value="All">All Events</option>
                    <option value="Service">Services</option>
                    <option value="Cell Meeting">Cell Meetings</option>
                </select>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                        <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                            <th style={{ padding: '1rem 0', fontWeight: '500' }}>Date</th>
                            <th style={{ padding: '1rem 0', fontWeight: '500' }}>Event / Meeting</th>
                            <th style={{ padding: '1rem 0', fontWeight: '500' }}>Type</th>
                            <th style={{ padding: '1rem 0', fontWeight: '500' }}>Check-in Time</th>
                            <th style={{ padding: '1rem 0', fontWeight: '500' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceHistory
                            .filter(item => filterType === 'All' || item.type === filterType)
                            .map(record => (
                                <tr key={record.id} style={{ borderBottom: '1px solid var(--surface-2)', color: 'var(--text-color)' }}>
                                    <td style={{ padding: '1rem 0' }}>{record.date}</td>
                                    <td style={{ padding: '1rem 0', color: 'var(--text-color)', fontWeight: '500' }}>{record.event}</td>
                                    <td style={{ padding: '1rem 0' }}>
                                        <span style={{
                                            background: 'var(--border-color)',
                                            padding: '0.2rem 0.6rem',
                                            borderRadius: '4px',
                                            fontSize: '0.8rem'
                                        }}>
                                            {record.type}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>{record.time}</td>
                                    <td style={{ padding: '1rem 0' }}>
                                        <span style={{ color: getStatusColor(record.status), fontWeight: '500' }}>
                                            {record.status === 'Present' ? '✓ Present' : '✕ Absent'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* Summary Stats */}
            <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ background: 'rgba(34, 193, 230, 0.1)', padding: '1rem', borderRadius: '0.8rem', border: '1px solid rgba(34, 193, 230, 0.2)', minWidth: '150px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>Total Present</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-color)' }}>35</div>
                </div>
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '0.8rem', border: '1px solid rgba(239, 68, 68, 0.2)', minWidth: '150px' }}>
                    <div style={{ fontSize: '0.8rem', color: '#ef4444' }}>Total Absent</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-color)' }}>2</div>
                </div>
                <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '1rem', borderRadius: '0.8rem', border: '1px solid rgba(74, 222, 128, 0.2)', minWidth: '150px' }}>
                    <div style={{ fontSize: '0.8rem', color: '#4ade80' }}>Attendance Rate</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-color)' }}>94%</div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceRecordPanel;
