import React, { useState, useEffect } from 'react';
import MeetingDetailsModal from './MeetingDetailsModal';
import api from '../../../services/api';

const MeetingsList = () => {
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid' (cards)
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Modal state
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const [copiedId, setCopiedId] = useState(null);

    useEffect(() => {
        fetchMeetings();
    }, [filter, currentPage, itemsPerPage]);

    const fetchMeetings = async () => {
        try {
            setLoading(true);
            const statusParam = filter === 'All' ? '' : filter.toLowerCase();
            const params = new URLSearchParams();
            if (statusParam) params.append('status', statusParam);
            params.append('page', currentPage);
            params.append('limit', itemsPerPage);

            const response = await api.get(`/get_meetings.php?${params.toString()}`);
            if (response.success) {
                setMeetings(response.data.meetings || []);
                setTotalPages(response.data.pagination?.total_pages || 1);
                setTotalItems(response.data.pagination?.total || 0);
            } else {
                setError(response.error || 'Failed to load meetings');
            }
        } catch (err) {
            console.error('Error fetching meetings:', err);
            setError('Failed to load meetings');
        } finally {
            setLoading(false);
        }
    };

    // Reset to page 1 when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [filter]);

    const filteredMeetings = meetings.filter(m =>
        m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (m.category && m.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'Upcoming': return 'var(--primary)';
            case 'Completed': return '#4ade80';
            case 'Cancelled': return 'var(--text-muted)';
            default: return 'var(--text-color)';
        }
    };

    // Attendance link generator
    const getAttendanceUrl = (meetingId) => {
        return `${window.location.origin.replace(/:\d+$/, '')}/attend-meet.php?meeting_id=${meetingId}`;
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
                {loading ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        Loading meetings...
                    </div>
                ) : error ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: '#ef4444' }}>
                        {error}
                    </div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: '#e2e8f0', fontSize: '0.9rem' }}>
                        <thead>
                            <tr style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--border-color)' }}>
                                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--text-muted)', fontWeight: '600' }}>Meeting</th>
                                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--text-muted)', fontWeight: '600' }}>Date & Time</th>
                                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--text-muted)', fontWeight: '600' }}>Facilitator</th>
                                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--text-muted)', fontWeight: '600' }}>Category</th>
                                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--text-muted)', fontWeight: '600' }}>Attendees</th>
                                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--text-muted)', fontWeight: '600' }}>Status</th>
                                <th style={{ textAlign: 'right', padding: '1rem', color: 'var(--text-muted)', fontWeight: '600' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMeetings.length > 0 ? filteredMeetings.map(m => (
                                <tr
                                    key={m.id}
                                    style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s', cursor: 'pointer' }}
                                    onDoubleClick={() => setSelectedMeeting(m)}
                                    title="Double-click to view details"
                                >
                                    <td style={{ padding: '1rem', fontWeight: '500', color: 'var(--text-color)' }}>{m.title}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ color: 'var(--text-color)' }}>{m.date}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.time} - {m.end_time}</div>
                                    </td>
                                    <td style={{ padding: '1rem', color: 'var(--text-color)' }}>{m.facilitator}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{ background: 'var(--border-color)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.category}</span>
                                    </td>
                                    <td style={{ padding: '1rem', color: 'var(--text-color)' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                            <span>👥</span> {m.attendee_count}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{ color: getStatusColor(m.status), display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: getStatusColor(m.status) }}></span>
                                            {m.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right', minWidth: 120 }}>
                                        <button
                                            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1rem', marginRight: 8 }}
                                            title="Copy attendance link"
                                            onClick={e => {
                                                e.stopPropagation();
                                                navigator.clipboard.writeText(getAttendanceUrl(m.id));
                                                setCopiedId(m.id);
                                                setTimeout(() => setCopiedId(null), 1200);
                                            }}
                                        >
                                            {copiedId === m.id ? 'Copied!' : 'Copy Link'}
                                        </button>
                                        <button
                                            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1rem' }}
                                            title="View details"
                                            onClick={e => {
                                                e.stopPropagation();
                                                setSelectedMeeting(m);
                                            }}
                                        >
                                            ⋮
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="7" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                        No meetings found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination */}
            {!loading && !error && totalPages > 0 && (
                <div style={{
                    padding: '1rem 1.25rem',
                    borderTop: '1px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        <span>Show</span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            style={{
                                padding: '0.3rem 0.5rem',
                                background: 'var(--surface-2)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '4px',
                                color: 'var(--text-color)',
                                fontSize: '0.85rem'
                            }}
                        >
                            {[5, 10, 20, 50].map(n => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                        <span>of {totalItems} meetings</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <button
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                            style={{
                                padding: '0.4rem 0.6rem',
                                background: currentPage === 1 ? 'transparent' : 'var(--surface-2)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '4px',
                                color: currentPage === 1 ? 'var(--text-muted)' : 'var(--text-color)',
                                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                fontSize: '0.8rem'
                            }}
                        >
                            ««
                        </button>
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            style={{
                                padding: '0.4rem 0.6rem',
                                background: currentPage === 1 ? 'transparent' : 'var(--surface-2)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '4px',
                                color: currentPage === 1 ? 'var(--text-muted)' : 'var(--text-color)',
                                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                fontSize: '0.8rem'
                            }}
                        >
                            «
                        </button>

                        {/* Page numbers */}
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                                pageNum = i + 1;
                            } else if (currentPage <= 3) {
                                pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                            } else {
                                pageNum = currentPage - 2 + i;
                            }
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    style={{
                                        padding: '0.4rem 0.7rem',
                                        background: currentPage === pageNum ? 'var(--primary)' : 'var(--surface-2)',
                                        border: '1px solid',
                                        borderColor: currentPage === pageNum ? 'var(--primary)' : 'var(--border-color)',
                                        borderRadius: '4px',
                                        color: currentPage === pageNum ? '#fff' : 'var(--text-color)',
                                        cursor: 'pointer',
                                        fontSize: '0.85rem',
                                        fontWeight: currentPage === pageNum ? '600' : '400'
                                    }}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}

                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            style={{
                                padding: '0.4rem 0.6rem',
                                background: currentPage === totalPages ? 'transparent' : 'var(--surface-2)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '4px',
                                color: currentPage === totalPages ? 'var(--text-muted)' : 'var(--text-color)',
                                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                fontSize: '0.8rem'
                            }}
                        >
                            »
                        </button>
                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                            style={{
                                padding: '0.4rem 0.6rem',
                                background: currentPage === totalPages ? 'transparent' : 'var(--surface-2)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '4px',
                                color: currentPage === totalPages ? 'var(--text-muted)' : 'var(--text-color)',
                                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                fontSize: '0.8rem'
                            }}
                        >
                            »»
                        </button>
                    </div>
                </div>
            )}
            {/* Meeting Details Modal */}
            {selectedMeeting && (
                <MeetingDetailsModal
                    meeting={selectedMeeting}
                    onClose={() => setSelectedMeeting(null)}
                />
            )}
        </div>
    );
};

export default MeetingsList;
