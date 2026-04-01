import React, { useState, useEffect, useCallback } from 'react';
import api, { API_BASE_URL, getAccessToken } from '../../services/api';
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
    const [emailLoading, setEmailLoading] = useState(null); // 'bulk' or registration_id
    const [showEmailConfirm, setShowEmailConfirm] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [regForm, setRegForm] = useState({ names: '', phone_no: '', email: '', residence: '', gender: '' });
    const [regLoading, setRegLoading] = useState(false);

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
    const fetchAttendance = useCallback(async (silent = false) => {
        if (!selectedEventId) return;
        if (!silent) setLoading(true);
        try {
            const res = await api.get(`/get_event_attendance.php?event_id=${selectedEventId}`);
            if (res?.success) {
                setAttendees(res.data.attendees || []);
                setEventInfo(res.data.event || null);
                setStats(res.data.stats || null);
            }
        } catch (err) {
            console.error('Failed to load attendance:', err);
            if (!silent) showToast('Failed to load attendance data', 'error');
        } finally {
            if (!silent) setLoading(false);
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
                await fetchAttendance(true);
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
                await fetchAttendance(true);
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
                await fetchAttendance(true);
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
                await fetchAttendance(true);
            }
        } catch (err) {
            showToast('Failed to undo check-in', 'error');
        } finally {
            setActionLoading(null);
        }
    };

    // Send QR email to single registrant
    const handleSendEmail = async (registrationId) => {
        setEmailLoading(registrationId);
        try {
            const res = await api.post('/send_event_qr_email.php', {
                registration_id: registrationId
            });
            if (res?.success) {
                console.log('[Email] Single send result:', res.data);
                if (res.data?.failed > 0) {
                    console.warn('[Email] Failures:', res.data.errors);
                    showToast(`Email failed: ${res.data.errors?.[0] || 'Unknown error'}`, 'error');
                } else {
                    showToast(res.message || 'Email sent!');
                }
            }
        } catch (err) {
            const errData = err.response?.data;
            console.error('[Email] Send error:', errData || err.message);
            showToast(errData?.error || 'Failed to send email', 'error');
        } finally {
            setEmailLoading(null);
        }
    };

    // Send QR emails to all registrants for the event
    const handleBulkEmail = async () => {
        setShowEmailConfirm(false);
        setEmailLoading('bulk');
        try {
            const res = await api.post('/send_event_qr_email.php', {
                event_id: parseInt(selectedEventId)
            });
            if (res?.success) {
                const d = res.data;
                console.log('[Email] Bulk send result:', d);
                if (d.failed > 0) {
                    console.warn('[Email] Failed emails:', d.errors);
                }
                showToast(
                    `Sent ${d.sent} of ${d.total} emails${d.failed > 0 ? `. ${d.failed} failed — check console for details.` : '!'}`,
                    d.failed > 0 ? 'warning' : 'success'
                );
            }
        } catch (err) {
            const errData = err.response?.data;
            console.error('[Email] Bulk send error:', errData || err.message);
            showToast(errData?.error || 'Failed to send bulk emails', 'error');
        } finally {
            setEmailLoading(null);
        }
    };

    // On-the-spot registration + auto check-in
    const handleRegister = async () => {
        const { names, phone_no, email, residence, gender } = regForm;
        if (!names || !phone_no || !email || !residence || !gender) {
            showToast('Please fill all required fields', 'error');
            return;
        }
        setRegLoading(true);
        try {
            const res = await api.post('/register_event.php', {
                ...regForm,
                event_id: parseInt(selectedEventId)
            });
            if (res?.success) {
                const regId = res.data?.registration_id;
                showToast(`${names} registered successfully!`);
                // Auto check-in
                if (regId) {
                    try {
                        await api.post('/mark_event_attendance.php', {
                            event_id: parseInt(selectedEventId),
                            registration_id: regId
                        });
                        showToast(`${names} registered & checked in!`);
                    } catch (e) {
                        // Registration succeeded even if check-in failed
                    }
                }
                setRegForm({ names: '', phone_no: '', email: '', residence: '', gender: '' });
                setShowRegister(false);
                await fetchAttendance(true);
            }
        } catch (err) {
            const msg = err.response?.data?.error || err.message || 'Registration failed';
            showToast(msg, 'error');
        } finally {
            setRegLoading(false);
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
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => setShowRegister(true)}
                            style={{
                                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
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
                                boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)'
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                                <circle cx="9" cy="7" r="4"/>
                                <line x1="19" y1="8" x2="19" y2="14"/>
                                <line x1="22" y1="11" x2="16" y2="11"/>
                            </svg>
                            Register
                        </button>
                        <button
                            onClick={() => setShowEmailConfirm(true)}
                            disabled={emailLoading === 'bulk' || attendees.length === 0}
                            style={{
                                background: emailLoading === 'bulk'
                                    ? 'var(--border-color)'
                                    : 'linear-gradient(135deg, #06b6d4, #0891b2)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '0.5rem',
                                padding: '0.75rem 1.5rem',
                                fontSize: '0.95rem',
                                fontWeight: '700',
                                cursor: emailLoading === 'bulk' ? 'wait' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                boxShadow: '0 4px 15px rgba(6, 182, 212, 0.3)'
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                <polyline points="22,6 12,13 2,6"/>
                            </svg>
                            {emailLoading === 'bulk' ? 'Sending...' : 'Email All QR Codes'}
                        </button>
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
                        <button
                            onClick={() => {
                                const url = `${API_BASE_URL}/attendance_report_pdf.php?event_id=${selectedEventId}`;
                                const token = getAccessToken();
                                // Open in new tab with auth via fetch + blob
                                fetch(url, { headers: { Authorization: `Bearer ${token}` } })
                                    .then(res => {
                                        if (!res.ok) throw new Error('Failed to generate report');
                                        return res.blob();
                                    })
                                    .then(blob => {
                                        const blobUrl = URL.createObjectURL(blob);
                                        window.open(blobUrl, '_blank');
                                    })
                                    .catch(() => showToast('Failed to generate PDF report', 'error'));
                            }}
                            disabled={attendees.length === 0}
                            style={{
                                background: attendees.length === 0 ? 'var(--border-color)' : 'linear-gradient(135deg, #ef4444, #dc2626)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '0.5rem',
                                padding: '0.75rem 1.5rem',
                                fontSize: '0.95rem',
                                fontWeight: '700',
                                cursor: attendees.length === 0 ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14 2 14 8 20 8"/>
                                <line x1="16" y1="13" x2="8" y2="13"/>
                                <line x1="16" y1="17" x2="8" y2="17"/>
                                <polyline points="10 9 9 9 8 9"/>
                            </svg>
                            PDF Report
                        </button>
                    </div>
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
                                                        {a.email && (
                                                            <button
                                                                onClick={() => handleSendEmail(a.registration_id)}
                                                                disabled={emailLoading === a.registration_id}
                                                                style={{
                                                                    padding: '0.3rem 0.6rem',
                                                                    borderRadius: '0.35rem',
                                                                    border: '1px solid rgba(6, 182, 212, 0.3)',
                                                                    background: 'rgba(6, 182, 212, 0.1)',
                                                                    color: '#06b6d4',
                                                                    fontSize: '0.75rem',
                                                                    fontWeight: '600',
                                                                    cursor: emailLoading === a.registration_id ? 'wait' : 'pointer'
                                                                }}
                                                                title="Send QR code via email"
                                                            >
                                                                {emailLoading === a.registration_id ? '...' : '✉'}
                                                            </button>
                                                        )}
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

            {/* Bulk Email Confirmation Modal */}
            {showEmailConfirm && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999
                }} onClick={() => setShowEmailConfirm(false)}>
                    <div style={{
                        background: 'var(--surface-1, #1A1625)',
                        borderRadius: '1rem',
                        padding: '2rem',
                        maxWidth: '420px',
                        width: '90%',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                        border: '1px solid var(--border-color)'
                    }} onClick={e => e.stopPropagation()}>
                        <h3 style={{ margin: '0 0 0.5rem', color: 'var(--text-color)', fontSize: '1.15rem' }}>
                            Send QR Codes to All Registrants?
                        </h3>
                        <p style={{ margin: '0 0 0.25rem', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                            This will send an invitation email with their personal QR check-in code to
                            <strong style={{ color: 'var(--text-color)' }}> {attendees.filter(a => a.email).length} registrants</strong> with
                            email addresses for <strong style={{ color: 'var(--primary)' }}>{eventInfo?.ename}</strong>.
                        </p>
                        <p style={{ margin: '0 0 1.25rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                            Each person will receive the event details and their unique QR code.
                        </p>
                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => setShowEmailConfirm(false)}
                                style={{
                                    padding: '0.6rem 1.25rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid var(--border-color)',
                                    background: 'transparent',
                                    color: 'var(--text-color)',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleBulkEmail}
                                style={{
                                    padding: '0.6rem 1.25rem',
                                    borderRadius: '0.5rem',
                                    border: 'none',
                                    background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                                    color: '#fff',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)'
                                }}
                            >
                                Send All Emails
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Registration Modal */}
            {showRegister && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999
                }} onClick={() => setShowRegister(false)}>
                    <div style={{
                        background: 'var(--surface-1, #1A1625)',
                        borderRadius: '1rem',
                        padding: '2rem',
                        maxWidth: '480px',
                        width: '90%',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                        border: '1px solid var(--border-color)'
                    }} onClick={e => e.stopPropagation()}>
                        <h3 style={{ margin: '0 0 0.25rem', color: 'var(--text-color)', fontSize: '1.15rem' }}>
                            Register New Attendee
                        </h3>
                        <p style={{ margin: '0 0 1.25rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                            {eventInfo?.ename} — will be auto-checked in after registration.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                            {[{ key: 'names', label: 'Full Name', placeholder: 'John Doe', type: 'text' },
                              { key: 'phone_no', label: 'Phone Number', placeholder: '0712345678', type: 'tel' },
                              { key: 'email', label: 'Email Address', placeholder: 'john@example.com', type: 'email' },
                              { key: 'residence', label: 'Residence', placeholder: 'Nairobi', type: 'text' }
                            ].map(f => (
                                <div key={f.key}>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.75rem',
                                        fontWeight: '600',
                                        color: 'var(--text-muted)',
                                        marginBottom: '0.3rem',
                                        textTransform: 'uppercase'
                                    }}>{f.label} *</label>
                                    <input
                                        type={f.type}
                                        placeholder={f.placeholder}
                                        value={regForm[f.key]}
                                        onChange={e => setRegForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                                        style={{
                                            width: '100%',
                                            padding: '0.6rem 1rem',
                                            borderRadius: '0.5rem',
                                            border: '1px solid var(--border-color)',
                                            background: 'var(--bg-color)',
                                            color: 'var(--text-color)',
                                            fontSize: '0.9rem',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                </div>
                            ))}
                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    color: 'var(--text-muted)',
                                    marginBottom: '0.3rem',
                                    textTransform: 'uppercase'
                                }}>Gender *</label>
                                <select
                                    value={regForm.gender}
                                    onChange={e => setRegForm(prev => ({ ...prev, gender: e.target.value }))}
                                    style={{
                                        width: '100%',
                                        padding: '0.6rem 1rem',
                                        borderRadius: '0.5rem',
                                        border: '1px solid var(--border-color)',
                                        background: 'var(--bg-color)',
                                        color: 'var(--text-color)',
                                        fontSize: '0.9rem',
                                        boxSizing: 'border-box'
                                    }}
                                >
                                    <option value="">-- Select --</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                            <button
                                onClick={() => setShowRegister(false)}
                                style={{
                                    padding: '0.6rem 1.25rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid var(--border-color)',
                                    background: 'transparent',
                                    color: 'var(--text-color)',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRegister}
                                disabled={regLoading}
                                style={{
                                    padding: '0.6rem 1.25rem',
                                    borderRadius: '0.5rem',
                                    border: 'none',
                                    background: regLoading ? 'var(--border-color)' : 'linear-gradient(135deg, #22c55e, #16a34a)',
                                    color: '#fff',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    cursor: regLoading ? 'wait' : 'pointer',
                                    boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
                                }}
                            >
                                {regLoading ? 'Registering...' : 'Register & Check In'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
