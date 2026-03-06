import React, { useState } from 'react';

const AllEventsTable = ({ events = [], onCreateEvent }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const isPastEvent = (dateStr) => {
        return new Date(dateStr) < new Date();
    };

    // Filter events
    const filteredEvents = events.filter(event =>
        (event.ename || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.venue || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination
    const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedEvents = filteredEvents.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1rem',
            border: '1px solid var(--border-color)',
            overflow: 'hidden'
        }}>
            {/* Header */}
            <div style={{
                padding: '1rem 1.5rem',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: 'var(--text-color)',
                    margin: 0
                }}>
                    All Events ({filteredEvents.length})
                </h3>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--border-color)',
                            background: 'var(--bg-color)',
                            color: 'var(--text-color)',
                            fontSize: '0.85rem',
                            width: '200px'
                        }}
                    />
                    <button
                        onClick={onCreateEvent}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            background: 'var(--primary)',
                            color: 'var(--bg-color)',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem'
                        }}
                    >
                        + New Event
                    </button>
                </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '0.85rem'
                }}>
                    <thead>
                        <tr style={{ background: 'var(--bg-color)' }}>
                            <th style={{
                                padding: '0.75rem 1rem',
                                textAlign: 'left',
                                color: 'var(--text-muted)',
                                fontWeight: '600',
                                fontSize: '0.75rem',
                                textTransform: 'uppercase'
                            }}>
                                Event Name
                            </th>
                            <th style={{
                                padding: '0.75rem 1rem',
                                textAlign: 'left',
                                color: 'var(--text-muted)',
                                fontWeight: '600',
                                fontSize: '0.75rem',
                                textTransform: 'uppercase'
                            }}>
                                Venue
                            </th>
                            <th style={{
                                padding: '0.75rem 1rem',
                                textAlign: 'left',
                                color: 'var(--text-muted)',
                                fontWeight: '600',
                                fontSize: '0.75rem',
                                textTransform: 'uppercase'
                            }}>
                                Start Date
                            </th>
                            <th style={{
                                padding: '0.75rem 1rem',
                                textAlign: 'left',
                                color: 'var(--text-muted)',
                                fontWeight: '600',
                                fontSize: '0.75rem',
                                textTransform: 'uppercase'
                            }}>
                                End Date
                            </th>
                            <th style={{
                                padding: '0.75rem 1rem',
                                textAlign: 'center',
                                color: 'var(--text-muted)',
                                fontWeight: '600',
                                fontSize: '0.75rem',
                                textTransform: 'uppercase'
                            }}>
                                Target
                            </th>
                            <th style={{
                                padding: '0.75rem 1rem',
                                textAlign: 'center',
                                color: 'var(--text-muted)',
                                fontWeight: '600',
                                fontSize: '0.75rem',
                                textTransform: 'uppercase'
                            }}>
                                Status
                            </th>
                            <th style={{
                                padding: '0.75rem 1rem',
                                textAlign: 'center',
                                color: 'var(--text-muted)',
                                fontWeight: '600',
                                fontSize: '0.75rem',
                                textTransform: 'uppercase'
                            }}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedEvents.length === 0 ? (
                            <tr>
                                <td colSpan="7" style={{
                                    padding: '2rem',
                                    textAlign: 'center',
                                    color: 'var(--text-muted)'
                                }}>
                                    No events found
                                </td>
                            </tr>
                        ) : (
                            paginatedEvents.map((event, index) => (
                                <tr
                                    key={event.id || index}
                                    style={{
                                        borderBottom: '1px solid var(--border-color)',
                                        background: index % 2 === 0 ? 'transparent' : 'var(--bg-color)'
                                    }}
                                >
                                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-color)', fontWeight: '500' }}>
                                        {event.ename || 'Untitled'}
                                    </td>
                                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>
                                        {event.venue || '-'}
                                    </td>
                                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>
                                        {formatDate(event.start_date)}
                                    </td>
                                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>
                                        {formatDate(event.end_date)}
                                    </td>
                                    <td style={{ padding: '0.75rem 1rem', textAlign: 'center', color: 'var(--text-color)' }}>
                                        {event.target_attendees || '-'}
                                    </td>
                                    <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                                        <span style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '1rem',
                                            fontSize: '0.7rem',
                                            fontWeight: '600',
                                            background: isPastEvent(event.start_date)
                                                ? 'rgba(156, 163, 175, 0.15)'
                                                : 'rgba(34, 197, 94, 0.15)',
                                            color: isPastEvent(event.start_date)
                                                ? '#9ca3af'
                                                : '#22c55e'
                                        }}>
                                            {isPastEvent(event.start_date) ? 'Completed' : 'Upcoming'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                            <button style={{
                                                padding: '0.35rem 0.65rem',
                                                borderRadius: '0.35rem',
                                                border: '1px solid var(--border-color)',
                                                background: 'transparent',
                                                color: 'var(--text-muted)',
                                                fontSize: '0.75rem',
                                                cursor: 'pointer'
                                            }}>
                                                View
                                            </button>
                                            <button style={{
                                                padding: '0.35rem 0.65rem',
                                                borderRadius: '0.35rem',
                                                border: '1px solid var(--primary)',
                                                background: 'rgba(34, 193, 230, 0.1)',
                                                color: 'var(--primary)',
                                                fontSize: '0.75rem',
                                                cursor: 'pointer'
                                            }}>
                                                Edit
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div style={{
                    padding: '1rem 1.5rem',
                    borderTop: '1px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredEvents.length)} of {filteredEvents.length}
                    </span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            style={{
                                padding: '0.4rem 0.8rem',
                                borderRadius: '0.35rem',
                                border: '1px solid var(--border-color)',
                                background: 'transparent',
                                color: currentPage === 1 ? 'var(--text-muted)' : 'var(--text-color)',
                                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                fontSize: '0.8rem'
                            }}
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            style={{
                                padding: '0.4rem 0.8rem',
                                borderRadius: '0.35rem',
                                border: '1px solid var(--border-color)',
                                background: 'transparent',
                                color: currentPage === totalPages ? 'var(--text-muted)' : 'var(--text-color)',
                                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                fontSize: '0.8rem'
                            }}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllEventsTable;
