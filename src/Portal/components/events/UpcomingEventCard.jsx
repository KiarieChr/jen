import React, { useState } from 'react';
import api from '../../../services/api';

const UpcomingEventCard = ({ event }) => {
    const [showAttendeesModal, setShowAttendeesModal] = useState(false);
    const [attendeesData, setAttendeesData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const fetchAttendees = async () => {
        if (!event?.id) return;
        try {
            setLoading(true);
            const response = await api.get(`/get_event_attendees.php?event_id=${event.id}`);
            if (response?.success) {
                setAttendeesData(response.data);
            }
        } catch (err) {
            console.error('Error fetching attendees:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAttendingClick = () => {
        fetchAttendees();
        setShowAttendeesModal(true);
    };

    const copyRegistrationLink = () => {
        const link = `${window.location.origin}/events/${event?.id}/register`;
        navigator.clipboard.writeText(link).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    if (!event) {
        return (
            <div style={{
                background: 'var(--surface-1)',
                borderRadius: '1rem',
                padding: '1.5rem',
                border: '1px solid var(--border-color)',
                borderLeft: '5px solid var(--primary)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <p style={{ color: 'var(--text-muted)' }}>No upcoming events</p>
            </div>
        );
    }

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const getDaysUntil = (dateStr) => {
        const eventDate = new Date(dateStr);
        const today = new Date();
        const diffTime = eventDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const daysUntil = getDaysUntil(event.start_date);

    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid var(--border-color)',
            borderLeft: '5px solid var(--primary)',
            height: '100%'
        }}>
            {/* Header */}
            <div style={{
                textAlign: 'center',
                marginBottom: '1rem'
            }}>
                <span style={{
                    color: 'var(--primary)',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                }}>
                    Upcoming
                </span>
            </div>

            {/* Event Name */}
            <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '800',
                color: 'var(--text-color)',
                margin: '0 0 0.75rem 0'
            }}>
                {event.ename}
            </h3>

            {/* Date */}
            <p style={{
                color: 'var(--text-muted)',
                fontSize: '0.9rem',
                marginBottom: '0.5rem'
            }}>
                {formatDate(event.start_date)}
            </p>

            {/* Days Until */}
            {daysUntil > 0 && (
                <p style={{
                    color: 'var(--primary)',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    marginBottom: '1.5rem'
                }}>
                    {daysUntil} day{daysUntil !== 1 ? 's' : ''} to go
                </p>
            )}

            {/* Action Buttons */}
            <div style={{
                display: 'flex',
                gap: '0.75rem',
                flexWrap: 'wrap'
            }}>
                <button style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border-color)',
                    background: 'transparent',
                    color: 'var(--text-color)',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    transition: 'all 0.2s'
                }}>
                    ✏️ Edit
                </button>
                <button
                    onClick={handleAttendingClick}
                    style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #f59e0b',
                        background: 'rgba(245, 158, 11, 0.1)',
                        color: '#f59e0b',
                        fontSize: '0.85rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        transition: 'all 0.2s'
                    }}>
                    ✅ Attending ({event.registered || 0})
                </button>
                <button
                    onClick={copyRegistrationLink}
                    style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        border: '1px solid var(--primary)',
                        background: copied ? 'var(--primary)' : 'rgba(34, 193, 230, 0.1)',
                        color: copied ? '#fff' : 'var(--primary)',
                        fontSize: '0.85rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        transition: 'all 0.2s'
                    }}>
                    {copied ? '✓ Copied!' : '🔗 Copy Link'}
                </button>
            </div>

            {/* Attendees Modal */}
            {showAttendeesModal && (
                <AttendeesModal
                    data={attendeesData}
                    loading={loading}
                    onClose={() => setShowAttendeesModal(false)}
                    onCopyLink={copyRegistrationLink}
                    copied={copied}
                    registrationLink={`${window.location.origin}/events/${event?.id}/register`}
                />
            )}
        </div>
    );
};

// Attendees Modal Component
const AttendeesModal = ({ data, loading, onClose, onCopyLink, copied, registrationLink }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
        }} onClick={onClose}>
            <div
                style={{
                    background: 'var(--surface-1)',
                    borderRadius: '1rem',
                    width: '100%',
                    maxWidth: '700px',
                    maxHeight: '80vh',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div style={{
                    padding: '1.25rem 1.5rem',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-color)' }}>
                            Registered Attendees
                        </h3>
                        {data && (
                            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                {data.event?.ename} • {data.total || 0} registered
                            </p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            color: 'var(--text-muted)',
                            lineHeight: 1
                        }}
                    >
                        ×
                    </button>
                </div>

                {/* Copy Link Bar */}
                <div style={{
                    padding: '0.75rem 1.5rem',
                    background: 'var(--bg-color)',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                }}>
                    <input
                        type="text"
                        readOnly
                        value={registrationLink || ''}
                        style={{
                            flex: 1,
                            padding: '0.5rem 0.75rem',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--border-color)',
                            background: 'var(--surface-1)',
                            color: 'var(--text-color)',
                            fontSize: '0.8rem'
                        }}
                    />
                    <button
                        onClick={onCopyLink}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            background: copied ? '#22c55e' : 'var(--primary)',
                            color: '#fff',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {copied ? '✓ Copied' : 'Copy Link'}
                    </button>
                </div>

                {/* Stats Bar */}
                {data && (
                    <div style={{
                        padding: '0.75rem 1.5rem',
                        background: 'var(--bg-color)',
                        display: 'flex',
                        gap: '1.5rem',
                        fontSize: '0.8rem'
                    }}>
                        <span style={{ color: 'var(--text-muted)' }}>
                            Total: <strong style={{ color: 'var(--text-color)' }}>{data.total || 0}</strong>
                        </span>
                        <span style={{ color: 'var(--text-muted)' }}>
                            Self-funded: <strong style={{ color: '#22c55e' }}>{data.self_funded_count || 0}</strong>
                        </span>
                        <span style={{ color: 'var(--text-muted)' }}>
                            Need Sponsorship: <strong style={{ color: '#f59e0b' }}>{data.sponsored_count || 0}</strong>
                        </span>
                    </div>
                )}

                {/* Attendees List */}
                <div style={{ flex: 1, overflow: 'auto', padding: '1rem 1.5rem' }}>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                            Loading attendees...
                        </div>
                    ) : !data?.attendees?.length ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📋</div>
                            No registrations yet
                        </div>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.75rem' }}>#</th>
                                    <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.75rem' }}>Name</th>
                                    <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.75rem' }}>Contact</th>
                                    <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.75rem' }}>Location</th>
                                    <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.75rem' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.attendees.map((attendee, index) => (
                                    <tr key={attendee.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>{index + 1}</td>
                                        <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-color)', fontWeight: '500' }}>
                                            {attendee.names || 'N/A'}
                                        </td>
                                        <td style={{ padding: '0.75rem 0.5rem' }}>
                                            <div style={{ color: 'var(--text-color)', fontSize: '0.8rem' }}>{attendee.phone_no || '-'}</div>
                                            <div style={{ color: 'var(--primary)', fontSize: '0.75rem' }}>{attendee.email || '-'}</div>
                                        </td>
                                        <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                            {attendee.residence || attendee.travelling_from || '-'}
                                        </td>
                                        <td style={{ padding: '0.75rem 0.5rem' }}>
                                            <span style={{
                                                padding: '0.2rem 0.5rem',
                                                borderRadius: '0.25rem',
                                                fontSize: '0.7rem',
                                                fontWeight: '600',
                                                background: attendee.sponsorship === 'sponsored-fully' || attendee.sponsorship === 'half-sponsored'
                                                    ? 'rgba(245, 158, 11, 0.15)'
                                                    : 'rgba(34, 197, 94, 0.15)',
                                                color: attendee.sponsorship === 'sponsored-fully' || attendee.sponsorship === 'half-sponsored'
                                                    ? '#f59e0b'
                                                    : '#22c55e'
                                            }}>
                                                {attendee.sponsorship === 'sponsored-fully' ? 'Need Full Sponsor' :
                                                    attendee.sponsorship === 'half-sponsored' ? 'Need Half Sponsor' : 'Self-funded'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UpcomingEventCard;
