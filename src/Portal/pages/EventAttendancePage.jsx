import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import QRScannerModal from '../components/events/QRScannerModal';
import { QRCodeSVG } from 'qrcode.react';

const EventAttendancePage = () => {
    const [events, setEvents] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState('');
    const [attendees, setAttendees] = useState([]);
    const [eventInfo, setEventInfo] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // all, checked-in, not-checked-in
    const [showScanner, setShowScanner] = useState(false);
    const [showQRPreview, setShowQRPreview] = useState(null); // registration_id for QR preview
    const [manualSearch, setManualSearch] = useState('');
    const [actionLoading, setActionLoading] = useState(null);
    const [toast, setToast] = useState(null);

    // Load events list
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await api.get('/get_events_dashboard.php');
                if (res?.success) {
                    setEvents(res.data.all_events || []);
                }
            } catch (err) {
                console.error('Failed to load events:', err);
            }
        };
        fetchEvents();
    }, []);

    // Load attendance data for selected event
    const fetchAttendance = useCallback(async () => {
        if (!selectedEventId) return;
        setLoading(true);
        try {
            const res = await api.get(`/get_event_attendance.php?event_id=${selectedEventId}`);
            if (res?.success) {
                setAttendees(res.data.attendees || []);
                setEventInfo(res.data.event || null);
                setStats(res.data.stats || null);
            }
        } catch (err) {
            console.error('Failed to load attendance:', err);
            showToast('Failed to load attendance data', 'error');
        } finally {
            setLoading(false);
        }
    }, [selectedEventId]);

    useEffect(() => {
        fetchAttendance();
    }, [fetchAttendance]);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    };

    // Manual check-in
    const handleManualCheckin = async (registrationId) => {
        setActionLoading(registrationId);
        try {
            const res = await api.post('/mark_event_attendance.php', {
                event_id: parseInt(selectedEventId),
                registration_id: registrationId
            });
            if (res?.success) {
                showToast(res.message || 'Checked in successfully!');
                fetchAttendance();
            }
        } catch (err) {
            const msg = err.response?.data?.error || 'Check-in failed';
            showToast(msg, 'error');
        } finally {
            setActionLoading(null);
        }
    };

    // Manual check-in by phone/email search
    const handleSearchCheckin = async () => {
        if (!manualSearch.trim() || !selectedEventId) return;
        setActionLoading('search');
        try {
            const res = await api.post('/mark_event_attendance.php', {
                event_id: parseInt(selectedEventId),
                search: manualSearch.trim()
            });
            if (res?.success) {
                showToast(res.message || 'Checked in successfully!');
                setManualSearch('');
                fetchAttendance();
            }
        } catch (err) {
            const msg = err.response?.data?.error || 'Check-in failed';
            showToast(msg, 'error');
        } finally {
            setActionLoading(null);
        }
    };

    // QR scan callback
    const handleQRScan = async (qrData) => {
        try {
            const res = await api.post('/qr_checkin.php', { qr_data: qrData });
            if (res?.success) {
                const name = res.data?.registration?.names || 'Attendee';
                if (res.data?.already_checked_in) {
                    showToast(`${name} was already checked in`, 'warning');
                } else {
                    showToast(`${name} checked in via QR!`);
                }
                fetchAttendance();
            }
        } catch (err) {
            const msg = err.response?.data?.error || 'QR check-in failed';
            showToast(msg, 'error');
        }
    };

    // Undo check-in
    const handleUndoCheckin = async (registrationId) => {
        setActionLoading(registrationId);
        try {
            const res = await api.post('/undo_event_attendance.php', {
                event_id: parseInt(selectedEventId),
                registration_id: registrationId
            });
            if (res?.success) {
                showToast('Check-in reversed');
                fetchAttendance();
            }
        } catch (err) {
            showToast('Failed to undo check-in', 'error');
        } finally {
            setActionLoading(null);
        }
    };

    // Filter attendees
    const filteredAttendees = attendees.filter(a => {
        const matchesSearch = !searchTerm ||
            (a.names || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (a.phone_no || '').includes(searchTerm) ||
            (a.email || '').toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filterStatus === 'all' ||
            (filterStatus === 'checked-in' && a.checked_in) ||
            (filterStatus === 'not-checked-in' && !a.checked_in);

        return matchesSearch && matchesFilter;
    });

    const formatTime = (dt) => {
        if (!dt) return '-';
        return new Date(dt).toLocaleString('en-US', {
            month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            {/* Toast */}
            {toast && (
                <div style={{
                    position: 'fixed',
                    top: '1.5rem',
                    right: '1.5rem',
                    zIndex: 10000,
                    padding: '0.75rem 1.25rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                    animation: 'slideIn 0.3s ease',
                    background: toast.type === 'error' ? 'rgba(239,68,68,0.95)'
                        : toast.type === 'warning' ? 'rgba(245,158,11,0.95)'
                            : 'rgba(34,197,94,0.95)',
                    color: '#fff'
                }}>
                    {toast.message}
                </div>
            )}

            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div>
                    <h1 style={{
                        fontSize: '1.8rem',
                        fontWeight: '800',
                        margin: 0,
                        color: 'var(--text-color)'
                    }}>
                        Event Attendance
                    </h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                        Check in attendees manually or scan QR codes.
                    </p>
                </div>
                {selectedEventId && (
                    <button
                        onClick={() => setShowScanner(true)}
                        style={{
                            background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '0.5rem',
                            padding: '0.75rem 1.5rem',
                            fontSize: '0.95rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            boxShadow: '0 4px 15px rgba(168, 85, 247, 0.3)'
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7" />
                            <rect x="14" y="3" width="7" height="7" />
                            <rect x="3" y="14" width="7" height="7" />
                            <rect x="14" y="14" width="3" height="3" />
                            <rect x="18" y="14" width="3" height="3" />
                            <rect x="14" y="18" width="3" height="3" />
                            <rect x="18" y="18" width="3" height="3" />
                        </svg>
                        Scan QR Code
                    </button>
                )}
            </div>

            {/* Event Selector */}
            <div style={{
                background: 'var(--surface-1)',
                borderRadius: '1rem',
                padding: '1.25rem 1.5rem',
                border: '1px solid var(--border-color)',
                marginBottom: '1.5rem'
            }}>
                <label style={{
                    display: 'block',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    color: 'var(--text-muted)',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase'
                }}>
                    Select Event
                </label>
                <select
                    value={selectedEventId}
                    onChange={(e) => setSelectedEventId(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '0.65rem 1rem',
                        borderRadius: '0.5rem',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-color)',
                        color: 'var(--text-color)',
                        fontSize: '0.95rem'
                    }}
                >
                    <option value="">-- Choose an event --</option>
                    {events.map(ev => (
                        <option key={ev.id} value={ev.id}>
                            {ev.ename} — {new Date(ev.start_date).toLocaleDateString()} ({ev.venue || 'No venue'})
                        </option>
                    ))}
                </select>
            </div>

            {/* Stats Cards */}
            {stats && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                }}>
                    <StatCard icon="📝" value={stats.total_registered} label="Registered" color="#22c1e6" />
                    <StatCard icon="✅" value={stats.checked_in} label="Checked In" color="#22c55e" />
                    <StatCard icon="⏳" value={stats.not_checked_in} label="Pending" color="#f59e0b" />
                    <StatCard
                        icon="📊"
                        value={`${stats.attendance_rate}%`}
                        label="Attendance Rate"
                        color="#a855f7"
                    />
                    <StatCard icon="📱" value={stats.qr_checkins} label="QR Scans" color="#7c3aed" />
                    <StatCard icon="✋" value={stats.manual_checkins} label="Manual" color="#06b6d4" />
                </div>
            )}

            {/* Manual Check-in Bar */}
            {selectedEventId && (
                <div style={{
                    background: 'var(--surface-1)',
                    borderRadius: '1rem',
                    padding: '1rem 1.5rem',
                    border: '1px solid var(--border-color)',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}>
                    <span style={{
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap'
                    }}>
                        Quick Check-in:
                    </span>
                    <input
                        type="text"
                        placeholder="Enter phone number or email..."
                        value={manualSearch}
                        onChange={(e) => setManualSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearchCheckin()}
                        style={{
                            flex: 1,
                            minWidth: '200px',
                            padding: '0.6rem 1rem',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--border-color)',
                            background: 'var(--bg-color)',
                            color: 'var(--text-color)',
                            fontSize: '0.9rem'
                        }}
                    />
                    <button
                        onClick={handleSearchCheckin}
                        disabled={actionLoading === 'search' || !manualSearch.trim()}
                        style={{
                            padding: '0.6rem 1.25rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            background: !manualSearch.trim() ? 'var(--border-color)' : 'var(--primary)',
                            color: !manualSearch.trim() ? 'var(--text-muted)' : 'var(--bg-color)',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            cursor: !manualSearch.trim() ? 'not-allowed' : 'pointer',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {actionLoading === 'search' ? 'Checking in...' : 'Check In'}
                    </button>
                </div>
            )}

            {/* Filters & Search */}
            {selectedEventId && (
                <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    marginBottom: '1rem',
                    flexWrap: 'wrap',
                    alignItems: 'center'
                }}>
                    <input
                        type="text"
                        placeholder="Search attendees..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--border-color)',
                            background: 'var(--bg-color)',
                            color: 'var(--text-color)',
                            fontSize: '0.85rem',
                            minWidth: '200px'
                        }}
                    />
                    {['all', 'checked-in', 'not-checked-in'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilterStatus(f)}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '0.5rem',
                                border: filterStatus === f ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                                background: filterStatus === f ? 'rgba(34, 193, 230, 0.15)' : 'transparent',
                                color: filterStatus === f ? 'var(--primary)' : 'var(--text-muted)',
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                textTransform: 'capitalize'
                            }}
                        >
                            {f === 'all' ? `All (${attendees.length})`
                                : f === 'checked-in' ? `Checked In (${attendees.filter(a => a.checked_in).length})`
                                    : `Pending (${attendees.filter(a => !a.checked_in).length})`}
                        </button>
                    ))}
                </div>
            )}

            {/* Attendees Table */}
            {selectedEventId && (
                <div style={{
                    background: 'var(--surface-1)',
                    borderRadius: '1rem',
                    border: '1px solid var(--border-color)',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        padding: '1rem 1.5rem',
                        borderBottom: '1px solid var(--border-color)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <h3 style={{
                            fontSize: '1rem',
                            fontWeight: '700',
                            color: 'var(--text-color)',
                            margin: 0
                        }}>
                            Registered Attendees ({filteredAttendees.length})
                        </h3>
                    </div>

                    {loading ? (
                        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                            Loading attendance data...
                        </div>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                                <thead>
                                    <tr style={{ background: 'var(--bg-color)' }}>
                                        {['#', 'Name', 'Phone', 'Email', 'Category', 'Status', 'Check-in Time', 'Method', 'Actions'].map(h => (
                                            <th key={h} style={{
                                                padding: '0.75rem 1rem',
                                                textAlign: h === 'Actions' || h === 'Status' || h === 'Method' ? 'center' : 'left',
                                                color: 'var(--text-muted)',
                                                fontWeight: '600',
                                                fontSize: '0.75rem',
                                                textTransform: 'uppercase',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAttendees.length === 0 ? (
                                        <tr>
                                            <td colSpan="9" style={{
                                                padding: '2rem',
                                                textAlign: 'center',
                                                color: 'var(--text-muted)'
                                            }}>
                                                {attendees.length === 0
                                                    ? 'No registrations for this event yet.'
                                                    : 'No attendees match your filter.'}
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredAttendees.map((a, idx) => (
                                            <tr
                                                key={a.registration_id}
                                                style={{
                                                    borderBottom: '1px solid var(--border-color)',
                                                    background: a.checked_in
                                                        ? 'rgba(34, 197, 94, 0.05)'
                                                        : idx % 2 === 0 ? 'transparent' : 'var(--bg-color)'
                                                }}
                                            >
                                                <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>
                                                    {idx + 1}
                                                </td>
                                                <td style={{ padding: '0.75rem 1rem', color: 'var(--text-color)', fontWeight: '500' }}>
                                                    {a.names}
                                                </td>
                                                <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>
                                                    {a.phone_no}
                                                </td>
                                                <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>
                                                    {a.email}
                                                </td>
                                                <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>
                                                    {a.category || '-'}
                                                </td>
                                                <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                                                    <span style={{
                                                        padding: '0.2rem 0.6rem',
                                                        borderRadius: '1rem',
                                                        fontSize: '0.7rem',
                                                        fontWeight: '600',
                                                        background: a.checked_in
                                                            ? 'rgba(34, 197, 94, 0.15)'
                                                            : 'rgba(245, 158, 11, 0.15)',
                                                        color: a.checked_in ? '#22c55e' : '#f59e0b'
                                                    }}>
                                                        {a.checked_in ? 'Checked In' : 'Pending'}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                                                    {a.checked_in ? formatTime(a.check_in_time) : '-'}
                                                </td>
                                                <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                                                    {a.checked_in ? (
                                                        <span style={{
                                                            padding: '0.2rem 0.5rem',
                                                            borderRadius: '0.25rem',
                                                            fontSize: '0.7rem',
                                                            fontWeight: '600',
                                                            background: a.check_in_method === 'qr'
                                                                ? 'rgba(168, 85, 247, 0.15)'
                                                                : 'rgba(6, 182, 212, 0.15)',
                                                            color: a.check_in_method === 'qr' ? '#a855f7' : '#06b6d4'
                                                        }}>
                                                            {a.check_in_method === 'qr' ? 'QR' : 'Manual'}
                                                        </span>
                                                    ) : '-'}
                                                </td>
                                                <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                                                    <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center' }}>
                                                        {!a.checked_in ? (
                                                            <button
                                                                onClick={() => handleManualCheckin(a.registration_id)}
                                                                disabled={actionLoading === a.registration_id}
                                                                style={{
                                                                    padding: '0.3rem 0.6rem',
                                                                    borderRadius: '0.35rem',
                                                                    border: 'none',
                                                                    background: 'rgba(34, 197, 94, 0.15)',
                                                                    color: '#22c55e',
                                                                    fontSize: '0.75rem',
                                                                    fontWeight: '600',
                                                                    cursor: 'pointer'
                                                                }}
                                                            >
                                                                {actionLoading === a.registration_id ? '...' : 'Check In'}
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleUndoCheckin(a.registration_id)}
                                                                disabled={actionLoading === a.registration_id}
                                                                style={{
                                                                    padding: '0.3rem 0.6rem',
                                                                    borderRadius: '0.35rem',
                                                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                                                    background: 'transparent',
                                                                    color: '#ef4444',
                                                                    fontSize: '0.75rem',
                                                                    fontWeight: '600',
                                                                    cursor: 'pointer'
                                                                }}
                                                            >
                                                                Undo
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => setShowQRPreview(
                                                                showQRPreview === a.registration_id ? null : a.registration_id
                                                            )}
                                                            style={{
                                                                padding: '0.3rem 0.6rem',
                                                                borderRadius: '0.35rem',
                                                                border: '1px solid var(--border-color)',
                                                                background: 'transparent',
                                                                color: 'var(--text-muted)',
                                                                fontSize: '0.75rem',
                                                                cursor: 'pointer'
                                                            }}
                                                            title="Show QR Code"
                                                        >
                                                            QR
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {/* No event selected */}
            {!selectedEventId && (
                <div style={{
                    background: 'var(--surface-1)',
                    borderRadius: '1rem',
                    padding: '3rem',
                    border: '1px solid var(--border-color)',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
                    <h3 style={{ color: 'var(--text-color)', marginBottom: '0.5rem' }}>
                        Select an Event
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        Choose an event above to view registrations and mark attendance.
                    </p>
                </div>
            )}

            {/* QR Preview Modal */}
            {showQRPreview && <QRPreviewModal
                registrationId={showQRPreview}
                eventId={selectedEventId}
                attendee={attendees.find(a => a.registration_id === showQRPreview)}
                eventName={eventInfo?.ename}
                onClose={() => setShowQRPreview(null)}
            />}

            {/* QR Scanner Modal */}
            {showScanner && (
                <QRScannerModal
                    onClose={() => setShowScanner(false)}
                    onScan={handleQRScan}
                    eventName={eventInfo?.ename}
                />
            )}
        </div>
    );
};

// QR Preview Modal
const QRPreviewModal = ({ registrationId, eventId, attendee, eventName, onClose }) => {
    const [qrData, setQrData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQR = async () => {
            try {
                const res = await api.get(`/generate_event_qr.php?registration_id=${registrationId}`);
                if (res?.success) {
                    setQrData(res.data);
                }
            } catch (err) {
                console.error('Failed to get QR:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchQR();
    }, [registrationId]);

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
        }} onClick={onClose}>
            <div style={{
                background: 'var(--surface-1, #1A1625)',
                borderRadius: '1rem',
                padding: '2rem',
                maxWidth: '350px',
                width: '90%',
                textAlign: 'center',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                border: '1px solid var(--border-color)'
            }} onClick={e => e.stopPropagation()}>
                <h3 style={{ margin: '0 0 0.25rem', color: 'var(--text-color)', fontSize: '1.1rem' }}>
                    {attendee?.names || 'Attendee'}
                </h3>
                <p style={{ margin: '0 0 1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    {eventName}
                </p>

                {loading ? (
                    <div style={{ padding: '2rem', color: 'var(--text-muted)' }}>Loading QR...</div>
                ) : qrData ? (
                    <div style={{
                        background: '#fff',
                        borderRadius: '0.75rem',
                        padding: '1.5rem',
                        display: 'inline-block',
                        marginBottom: '1rem'
                    }}>
                        <QRCodeSVG
                            value={qrData.qr_data}
                            size={200}
                            level="H"
                            includeMargin={false}
                        />
                    </div>
                ) : (
                    <div style={{ padding: '2rem', color: '#ef4444' }}>Failed to generate QR</div>
                )}

                <div style={{ marginTop: '0.5rem' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: '0 0 1rem' }}>
                        Scan this QR code at the event entrance for instant check-in
                    </p>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '0.5rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--border-color)',
                            background: 'transparent',
                            color: 'var(--text-color)',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

// Stat Card Component
const StatCard = ({ icon, value, label, color = 'var(--primary)' }) => (
    <div style={{
        background: 'var(--surface-1)',
        borderRadius: '1rem',
        padding: '1.25rem',
        border: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    }}>
        <div style={{
            width: '45px',
            height: '45px',
            borderRadius: '10px',
            background: `${color}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.3rem'
        }}>
            {icon}
        </div>
        <div>
            <div style={{
                fontSize: '1.4rem',
                fontWeight: '700',
                color: 'var(--text-color)',
                lineHeight: 1
            }}>
                {value}
            </div>
            <div style={{
                color: 'var(--text-muted)',
                fontSize: '0.75rem',
                fontWeight: '500',
                marginTop: '0.2rem'
            }}>
                {label}
            </div>
        </div>
    </div>
);

export default EventAttendancePage;
