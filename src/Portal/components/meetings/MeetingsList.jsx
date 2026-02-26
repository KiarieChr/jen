import React, { useState } from 'react';

const MeetingsList = () => {
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid' (cards)
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');

    // Mock Data
    const meetings = [
        { id: 1, title: 'Leadership Sync', category: 'Leadership', date: '2026-02-10', time: '10:00 AM', location: 'Conference Room', status: 'Upcoming' },
        { id: 2, title: 'Youth Connect', category: 'Cell Meeting', date: '2026-02-11', time: '6:00 PM', location: 'Youth Hall', status: 'Upcoming' },
        { id: 3, title: 'Monthly Prayer', category: 'Prayer', date: '2026-02-01', time: '7:00 PM', location: 'Main Sanctuary', status: 'Completed' },
        { id: 4, title: 'New Member Class', category: 'Training', date: '2026-01-25', time: '2:00 PM', location: 'Room 202', status: 'Completed' },
        { id: 5, title: 'Evangelism Drive', category: 'Outreach', date: '2026-02-15', time: '9:00 AM', location: 'City Park', status: 'Upcoming' },
    ];

    const filteredMeetings = meetings.filter(m =>
        (filter === 'All' || m.status === filter) &&
        (m.title.toLowerCase().includes(searchTerm.toLowerCase()) || m.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'Upcoming': return 'var(--primary)';
            case 'Completed': return '#4ade80';
            case 'Cancelled': return 'var(--text-muted)';
            default: return 'var(--text-color)';
        }
    };

    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1rem',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            marginBottom: '1.5rem'
        }}>
            {/* Toolbar */}
            <div style={{
                padding: '1.25rem',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {['All', 'Upcoming', 'Completed', 'Cancelled'].map(f => (
                        <button key={f} onClick={() => setFilter(f)} style={{
                            background: filter === f ? 'rgba(34, 193, 230, 0.1)' : 'transparent',
                            color: filter === f ? 'var(--primary)' : 'var(--text-muted)',
                            border: filter === f ? '1px solid rgba(34, 193, 230, 0.3)' : '1px solid transparent',
                            borderRadius: '0.5rem',
                            padding: '0.3rem 0.8rem',
                            fontSize: '0.8rem',
                            cursor: 'pointer'
                        }}>{f}</button>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '1rem', flex: 1, justifyContent: 'flex-end', minWidth: '250px' }}>
                    <input
                        type="text"
                        placeholder="Search meetings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            padding: '0.5rem 1rem',
                            background: 'var(--bg-color)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '0.5rem',
                            color: 'var(--text-color)',
                            outline: 'none',
                            fontSize: '0.9rem'
                        }}
                    />
                </div>
            </div>

            {/* List */}
            <div style={{ padding: '0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: '#e2e8f0', fontSize: '0.9rem' }}>
                    <thead>
                        <tr style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--border-color)' }}>
                            <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--text-muted)', fontWeight: '600' }}>Event / Meeting</th>
                            <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--text-muted)', fontWeight: '600' }}>Date & Time</th>
                            <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--text-muted)', fontWeight: '600' }}>Location</th>
                            <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--text-muted)', fontWeight: '600' }}>Category</th>
                            <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--text-muted)', fontWeight: '600' }}>Status</th>
                            <th style={{ textAlign: 'right', padding: '1rem', color: 'var(--text-muted)', fontWeight: '600' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMeetings.length > 0 ? filteredMeetings.map(m => (
                            <tr key={m.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }}>
                                <td style={{ padding: '1rem', fontWeight: '500', color: 'var(--text-color)' }}>{m.title}</td>
                                <td style={{ padding: '1rem' }}>
                                    <div>{m.date}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.time}</div>
                                </td>
                                <td style={{ padding: '1rem', color: 'var(--text-color)' }}>{m.location}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{ background: 'var(--border-color)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.category}</span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{ color: getStatusColor(m.status), display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: getStatusColor(m.status) }}></span>
                                        {m.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', textAlign: 'right' }}>
                                    <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1rem' }}>⋮</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    No meetings found matching your criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MeetingsList;
