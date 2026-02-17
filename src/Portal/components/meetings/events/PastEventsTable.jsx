import React, { useState } from 'react';

const PastEventsTable = () => {
    // Mock Data
    const pastEvents = [
        { id: 101, title: 'New Year Service', date: 'Jan 01, 2026', attendees: 450, category: 'Sunday Service', status: 'Completed' },
        { id: 102, title: 'Leadership Summit', date: 'Jan 15, 2026', attendees: 50, category: 'Conference', status: 'Completed' },
        { id: 103, title: 'Charity Run', date: 'Jan 28, 2026', attendees: 120, category: 'Outreach', status: 'Completed' },
    ];

    return (
        <div style={{
            background: '#1A1625',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.05)',
            marginBottom: '2rem'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, color: '#eff3c1', fontSize: '1.1rem' }}>Past Events</h3>
                <button style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '0.4rem', fontSize: '0.85rem', cursor: 'pointer' }}>View All</button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                    <tr style={{ color: '#64748b', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <th style={{ textAlign: 'left', padding: '0.75rem' }}>Event Name</th>
                        <th style={{ textAlign: 'left', padding: '0.75rem' }}>Date</th>
                        <th style={{ textAlign: 'left', padding: '0.75rem' }}>Category</th>
                        <th style={{ textAlign: 'center', padding: '0.75rem' }}>Attendees</th>
                        <th style={{ textAlign: 'right', padding: '0.75rem' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pastEvents.map(event => (
                        <tr key={event.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', color: '#cbd5e1' }}>
                            <td style={{ padding: '1rem 0.75rem', fontWeight: '500', color: '#eff3c1' }}>{event.title}</td>
                            <td style={{ padding: '1rem 0.75rem' }}>{event.date}</td>
                            <td style={{ padding: '1rem 0.75rem' }}><span style={{ background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>{event.category}</span></td>
                            <td style={{ padding: '1rem 0.75rem', textAlign: 'center' }}>{event.attendees}</td>
                            <td style={{ padding: '1rem 0.75rem', textAlign: 'right' }}>
                                <button style={{ background: 'transparent', border: 'none', color: '#22c1e6', cursor: 'pointer', marginRight: '0.5rem' }}>Report</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PastEventsTable;
