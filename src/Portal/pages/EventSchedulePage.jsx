import React, { useState, useEffect, useCallback } from 'react';
import api, { API_BASE_URL, getAccessToken } from '../../services/api';

const SESSION_TYPES = [
    { value: 'worship', label: 'Worship', color: '#a855f7', bg: 'rgba(168,85,247,0.15)' },
    { value: 'teaching', label: 'Teaching', color: '#3b82f6', bg: 'rgba(59,130,246,0.15)' },
    { value: 'prayer', label: 'Prayer', color: '#22c55e', bg: 'rgba(34,197,94,0.15)' },
    { value: 'break', label: 'Break', color: '#9ca3af', bg: 'rgba(156,163,175,0.15)' },
    { value: 'meal', label: 'Meal', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
    { value: 'registration', label: 'Registration', color: '#06b6d4', bg: 'rgba(6,182,212,0.15)' },
    { value: 'panel', label: 'Panel', color: '#ec4899', bg: 'rgba(236,72,153,0.15)' },
    { value: 'activity', label: 'Activity', color: '#f97316', bg: 'rgba(249,115,22,0.15)' },
    { value: 'announcement', label: 'Announcement', color: '#6366f1', bg: 'rgba(99,102,241,0.15)' },
    { value: 'other', label: 'Other', color: '#6b7280', bg: 'rgba(107,114,128,0.15)' },
];

const getTypeInfo = (type) => SESSION_TYPES.find(t => t.value === type) || SESSION_TYPES[SESSION_TYPES.length - 1];

const emptySession = {
    day_number: 1, start_time: '09:00', end_time: '10:00',
    title: '', description: '', speaker: '', session_type: 'other', location: ''
};

const EventSchedulePage = () => {
    const [events, setEvents] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState('');
    const [eventInfo, setEventInfo] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [byDay, setByDay] = useState({});
    const [stats, setStats] = useState(null);
    const [totalDays, setTotalDays] = useState(1);
    const [loading, setLoading] = useState(false);
    const [activeDay, setActiveDay] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [editSession, setEditSession] = useState(null);
    const [form, setForm] = useState({ ...emptySession });
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState(null);

    // Load events
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await api.get('/get_events_dashboard.php');
                if (res?.success) setEvents(res.data.all_events || []);
            } catch (err) { console.error('Failed to load events:', err); }
        };
        fetchEvents();
    }, []);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    };

    // Load schedule
    const fetchSchedule = useCallback(async (silent = false) => {
        if (!selectedEventId) return;
        if (!silent) setLoading(true);
        try {
            const res = await api.get(`/get_event_schedule.php?event_id=${selectedEventId}`);
            if (res?.success) {
                setEventInfo(res.data.event);
                setSessions(res.data.sessions || []);
                setByDay(res.data.by_day || {});
                setStats(res.data.stats);
                setTotalDays(res.data.total_days || 1);
            }
        } catch (err) {
            console.error('Failed to load schedule:', err);
            if (!silent) showToast('Failed to load schedule', 'error');
        } finally {
            if (!silent) setLoading(false);
        }
    }, [selectedEventId]);

    useEffect(() => { fetchSchedule(); setActiveDay(1); }, [fetchSchedule]);

    // Add / Edit
    const openAddForm = (dayNum) => {
        setEditSession(null);
        setForm({ ...emptySession, day_number: dayNum || activeDay });
        setShowForm(true);
    };

    const openEditForm = (session) => {
        setEditSession(session);
        setForm({
            day_number: session.day_number,
            start_time: session.start_time?.slice(0, 5),
            end_time: session.end_time?.slice(0, 5),
            title: session.title,
            description: session.description || '',
            speaker: session.speaker || '',
            session_type: session.session_type,
            location: session.location || ''
        });
        setShowForm(true);
    };

    const handleSave = async () => {
        if (!form.title || !form.start_time || !form.end_time) {
            showToast('Title, start time, and end time are required', 'error');
            return;
        }
        setSaving(true);
        try {
            const payload = {
                ...form,
                event_id: parseInt(selectedEventId),
                ...(editSession ? { id: editSession.id } : {})
            };
            const res = await api.post('/save_event_schedule.php', payload);
            if (res?.success) {
                showToast(editSession ? 'Session updated!' : 'Session added!');
                setShowForm(false);
                setEditSession(null);
                await fetchSchedule(true);
            }
        } catch (err) {
            showToast(err.message || 'Failed to save', 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await api.post('/save_event_schedule.php', { action: 'delete', id });
            if (res?.success) {
                showToast('Session deleted');
                await fetchSchedule(true);
            }
        } catch (err) {
            showToast('Failed to delete', 'error');
        }
    };

    const handleDownloadPDF = () => {
        const url = `${API_BASE_URL}/schedule_report_pdf.php?event_id=${selectedEventId}`;
        const token = getAccessToken();
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
    };

    const handleDownloadTimetable = () => {
        const url = `${API_BASE_URL}/schedule_timetable_pdf.php?event_id=${selectedEventId}`;
        const token = getAccessToken();
        fetch(url, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                if (!res.ok) throw new Error('Failed to generate timetable');
                return res.blob();
            })
            .then(blob => {
                const blobUrl = URL.createObjectURL(blob);
                window.open(blobUrl, '_blank');
            })
            .catch(() => showToast('Failed to generate timetable PDF', 'error'));
    };

    const formatTime = (t) => {
        if (!t) return '';
        const [h, m] = t.split(':');
        const hr = parseInt(h);
        const ampm = hr >= 12 ? 'PM' : 'AM';
        return `${hr % 12 || 12}:${m} ${ampm}`;
    };

    const getDuration = (start, end) => {
        if (!start || !end) return 0;
        const [sh, sm] = start.split(':').map(Number);
        const [eh, em] = end.split(':').map(Number);
        return (eh * 60 + em) - (sh * 60 + sm);
    };

    const currentDaySessions = byDay[activeDay] || [];

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            {/* Toast */}
            {toast && (
                <div style={{
                    position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 10000,
                    padding: '0.75rem 1.25rem', borderRadius: '0.5rem', fontSize: '0.9rem',
                    fontWeight: '600', boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                    animation: 'slideIn 0.3s ease',
                    background: toast.type === 'error' ? 'rgba(239,68,68,0.95)'
                        : toast.type === 'warning' ? 'rgba(245,158,11,0.95)' : 'rgba(34,197,94,0.95)',
                    color: '#fff'
                }}>{toast.message}</div>
            )}

            {/* Header */}
            <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem'
            }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-color)' }}>
                        Event Schedule
                    </h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                        Plan and manage your event program — sessions, speakers, and timing.
                    </p>
                </div>
                {selectedEventId && (
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <button onClick={() => openAddForm(activeDay)} style={btnStyle('#22c55e', '#16a34a', 'rgba(34,197,94,0.3)')}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                            Add Session
                        </button>
                        <button onClick={handleDownloadPDF} disabled={sessions.length === 0}
                            style={btnStyle(sessions.length === 0 ? '#6b7280' : '#ef4444', '#dc2626', 'rgba(239,68,68,0.3)', sessions.length === 0)}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                            PDF Report
                        </button>
                        <button onClick={handleDownloadTimetable} disabled={sessions.length === 0}
                            style={btnStyle(sessions.length === 0 ? '#6b7280' : '#a855f7', '#7c3aed', 'rgba(168,85,247,0.3)', sessions.length === 0)}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            Timetable
                        </button>
                    </div>
                )}
            </div>

            {/* Event Selector */}
            <div style={{
                background: 'var(--surface-1)', borderRadius: '1rem',
                padding: '1.25rem 1.5rem', border: '1px solid var(--border-color)', marginBottom: '1.5rem'
            }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                    Select Event
                </label>
                <select value={selectedEventId} onChange={(e) => setSelectedEventId(e.target.value)}
                    style={{
                        width: '100%', padding: '0.65rem 1rem', borderRadius: '0.5rem',
                        border: '1px solid var(--border-color)', background: 'var(--bg-color)',
                        color: 'var(--text-color)', fontSize: '0.95rem'
                    }}>
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
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                    <StatCard icon="📅" value={totalDays} label={totalDays > 1 ? 'Days' : 'Day'} color="#a855f7" />
                    <StatCard icon="📋" value={stats.total_sessions} label="Sessions" color="#3b82f6" />
                    <StatCard icon="🎤" value={stats.speaker_count} label="Speakers" color="#22c55e" />
                    <StatCard icon="⏱️" value={`${Math.round(stats.total_scheduled_minutes / 60 * 10) / 10}h`} label="Total Time" color="#f59e0b" />
                </div>
            )}

            {/* Day Tabs */}
            {selectedEventId && totalDays > 0 && (
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    {Array.from({ length: totalDays }, (_, i) => i + 1).map(d => {
                        const daySessionCount = (byDay[d] || []).length;
                        const isActive = activeDay === d;
                        return (
                            <button key={d} onClick={() => setActiveDay(d)} style={{
                                padding: '0.6rem 1.2rem', borderRadius: '0.5rem',
                                border: isActive ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                                background: isActive ? 'rgba(34,193,230,0.15)' : 'transparent',
                                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                                fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: '0.4rem'
                            }}>
                                Day {d}
                                {daySessionCount > 0 && (
                                    <span style={{
                                        background: isActive ? 'var(--primary)' : 'var(--border-color)',
                                        color: isActive ? '#fff' : 'var(--text-muted)',
                                        borderRadius: '50%', width: '20px', height: '20px',
                                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '0.7rem', fontWeight: '700'
                                    }}>{daySessionCount}</span>
                                )}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Timeline */}
            {selectedEventId && !loading && (
                <div style={{
                    background: 'var(--surface-1)', borderRadius: '1rem',
                    border: '1px solid var(--border-color)', overflow: 'hidden'
                }}>
                    {currentDaySessions.length === 0 ? (
                        <div style={{ padding: '3rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
                            <h3 style={{ color: 'var(--text-color)', marginBottom: '0.5rem' }}>No Sessions for Day {activeDay}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                Start building your program by adding sessions.
                            </p>
                            <button onClick={() => openAddForm(activeDay)} style={{
                                background: 'var(--primary)', color: '#fff', border: 'none',
                                borderRadius: '0.5rem', padding: '0.6rem 1.5rem', fontWeight: '600',
                                cursor: 'pointer', fontSize: '0.9rem'
                            }}>+ Add First Session</button>
                        </div>
                    ) : (
                        <div style={{ padding: '1rem 0' }}>
                            {currentDaySessions.map((s, idx) => {
                                const typeInfo = getTypeInfo(s.session_type);
                                const dur = getDuration(s.start_time?.slice(0, 5), s.end_time?.slice(0, 5));
                                return (
                                    <div key={s.id} style={{
                                        display: 'flex', gap: '1rem', padding: '0.75rem 1.5rem',
                                        borderBottom: idx < currentDaySessions.length - 1 ? '1px solid var(--border-color)' : 'none',
                                        alignItems: 'flex-start', transition: 'background 0.15s',
                                    }}
                                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,92,246,0.04)'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                    >
                                        {/* Time column */}
                                        <div style={{ minWidth: '80px', textAlign: 'right', paddingTop: '0.2rem' }}>
                                            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-color)' }}>
                                                {formatTime(s.start_time?.slice(0, 5))}
                                            </div>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                                {formatTime(s.end_time?.slice(0, 5))}
                                            </div>
                                        </div>

                                        {/* Timeline dot */}
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '0.3rem' }}>
                                            <div style={{
                                                width: '12px', height: '12px', borderRadius: '50%',
                                                background: typeInfo.color, border: `2px solid ${typeInfo.color}`,
                                                boxShadow: `0 0 8px ${typeInfo.color}40`
                                            }} />
                                            {idx < currentDaySessions.length - 1 && (
                                                <div style={{ width: '2px', flex: 1, minHeight: '30px', background: 'var(--border-color)', marginTop: '4px' }} />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                                                <span style={{
                                                    padding: '0.15rem 0.5rem', borderRadius: '0.25rem',
                                                    fontSize: '0.65rem', fontWeight: '700',
                                                    background: typeInfo.bg, color: typeInfo.color,
                                                    textTransform: 'uppercase', letterSpacing: '0.5px'
                                                }}>{typeInfo.label}</span>
                                                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{dur} min</span>
                                            </div>
                                            <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-color)', marginBottom: '0.2rem' }}>
                                                {s.title}
                                            </div>
                                            {s.speaker && (
                                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.15rem' }}>
                                                    🎤 {s.speaker}
                                                </div>
                                            )}
                                            {s.location && (
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>📍 {s.location}</div>
                                            )}
                                            {s.description && (
                                                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.3rem', lineHeight: 1.4 }}>
                                                    {s.description}
                                                </div>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div style={{ display: 'flex', gap: '0.3rem', paddingTop: '0.2rem' }}>
                                            <button onClick={() => openEditForm(s)} title="Edit" style={iconBtnStyle}>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                            </button>
                                            <button onClick={() => { if (window.confirm('Delete this session?')) handleDelete(s.id); }} title="Delete" style={{ ...iconBtnStyle, color: '#ef4444' }}>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Add session at bottom */}
                            <div style={{ padding: '0.75rem 1.5rem', textAlign: 'center' }}>
                                <button onClick={() => openAddForm(activeDay)} style={{
                                    background: 'transparent', border: '1px dashed var(--border-color)',
                                    borderRadius: '0.5rem', padding: '0.5rem 1.5rem', color: 'var(--text-muted)',
                                    cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600', width: '100%'
                                }}>+ Add Session to Day {activeDay}</button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Loading */}
            {loading && (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading schedule...</div>
            )}

            {/* No event selected */}
            {!selectedEventId && (
                <div style={{
                    background: 'var(--surface-1)', borderRadius: '1rem', padding: '3rem',
                    border: '1px solid var(--border-color)', textAlign: 'center'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
                    <h3 style={{ color: 'var(--text-color)', marginBottom: '0.5rem' }}>Select an Event</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        Choose an event above to plan its program schedule.
                    </p>
                </div>
            )}

            {/* Add/Edit Modal */}
            {showForm && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
                }} onClick={() => setShowForm(false)}>
                    <div style={{
                        background: 'var(--surface-1, #1A1625)', borderRadius: '1rem', padding: '2rem',
                        maxWidth: '520px', width: '90%', maxHeight: '90vh', overflowY: 'auto',
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', border: '1px solid var(--border-color)'
                    }} onClick={e => e.stopPropagation()}>
                        <h3 style={{ margin: '0 0 1.25rem', color: 'var(--text-color)', fontSize: '1.15rem' }}>
                            {editSession ? 'Edit Session' : 'Add New Session'}
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                            {/* Title */}
                            <FormField label="Session Title *">
                                <input type="text" placeholder="e.g. Opening Worship" value={form.title}
                                    onChange={e => setForm(p => ({ ...p, title: e.target.value }))} style={inputStyle} />
                            </FormField>

                            {/* Day + Type row */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                <FormField label="Day *">
                                    <select value={form.day_number} onChange={e => setForm(p => ({ ...p, day_number: parseInt(e.target.value) }))} style={inputStyle}>
                                        {Array.from({ length: totalDays }, (_, i) => i + 1).map(d => (
                                            <option key={d} value={d}>Day {d}</option>
                                        ))}
                                    </select>
                                </FormField>
                                <FormField label="Session Type *">
                                    <select value={form.session_type} onChange={e => setForm(p => ({ ...p, session_type: e.target.value }))} style={inputStyle}>
                                        {SESSION_TYPES.map(t => (
                                            <option key={t.value} value={t.value}>{t.label}</option>
                                        ))}
                                    </select>
                                </FormField>
                            </div>

                            {/* Time row */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                <FormField label="Start Time *">
                                    <input type="time" value={form.start_time}
                                        onChange={e => setForm(p => ({ ...p, start_time: e.target.value }))} style={inputStyle} />
                                </FormField>
                                <FormField label="End Time *">
                                    <input type="time" value={form.end_time}
                                        onChange={e => setForm(p => ({ ...p, end_time: e.target.value }))} style={inputStyle} />
                                </FormField>
                            </div>

                            {/* Speaker */}
                            <FormField label="Speaker">
                                <input type="text" placeholder="e.g. Pastor John" value={form.speaker}
                                    onChange={e => setForm(p => ({ ...p, speaker: e.target.value }))} style={inputStyle} />
                            </FormField>

                            {/* Location */}
                            <FormField label="Location / Room">
                                <input type="text" placeholder="e.g. Main Auditorium" value={form.location}
                                    onChange={e => setForm(p => ({ ...p, location: e.target.value }))} style={inputStyle} />
                            </FormField>

                            {/* Description */}
                            <FormField label="Description">
                                <textarea rows={3} placeholder="Brief session description..." value={form.description}
                                    onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                                    style={{ ...inputStyle, resize: 'vertical' }} />
                            </FormField>
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                            <button onClick={() => setShowForm(false)} style={{
                                padding: '0.6rem 1.25rem', borderRadius: '0.5rem',
                                border: '1px solid var(--border-color)', background: 'transparent',
                                color: 'var(--text-color)', fontSize: '0.9rem', cursor: 'pointer'
                            }}>Cancel</button>
                            <button onClick={handleSave} disabled={saving} style={{
                                padding: '0.6rem 1.25rem', borderRadius: '0.5rem', border: 'none',
                                background: saving ? 'var(--border-color)' : 'linear-gradient(135deg, #a855f7, #7c3aed)',
                                color: '#fff', fontSize: '0.9rem', fontWeight: '600',
                                cursor: saving ? 'wait' : 'pointer', boxShadow: '0 4px 12px rgba(168,85,247,0.3)'
                            }}>{saving ? 'Saving...' : editSession ? 'Update Session' : 'Add Session'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Helper styles
const btnStyle = (from, to, shadow, disabled = false) => ({
    background: disabled ? 'var(--border-color)' : `linear-gradient(135deg, ${from}, ${to})`,
    color: '#fff', border: 'none', borderRadius: '0.5rem', padding: '0.75rem 1.5rem',
    fontSize: '0.95rem', fontWeight: '700', cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: disabled ? 'none' : `0 4px 15px ${shadow}`
});

const iconBtnStyle = {
    background: 'transparent', border: 'none', color: 'var(--text-muted)',
    cursor: 'pointer', padding: '0.3rem', borderRadius: '0.25rem',
    display: 'flex', alignItems: 'center'
};

const inputStyle = {
    width: '100%', padding: '0.6rem 1rem', borderRadius: '0.5rem',
    border: '1px solid var(--border-color)', background: 'var(--bg-color)',
    color: 'var(--text-color)', fontSize: '0.9rem', boxSizing: 'border-box'
};

const FormField = ({ label, children }) => (
    <div>
        <label style={{
            display: 'block', fontSize: '0.75rem', fontWeight: '600',
            color: 'var(--text-muted)', marginBottom: '0.3rem', textTransform: 'uppercase'
        }}>{label}</label>
        {children}
    </div>
);

const StatCard = ({ icon, value, label, color = 'var(--primary)' }) => (
    <div style={{
        background: 'var(--surface-1)', borderRadius: '1rem', padding: '1.25rem',
        border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1rem'
    }}>
        <div style={{
            width: '45px', height: '45px', borderRadius: '10px',
            background: `${color}15`, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '1.3rem'
        }}>{icon}</div>
        <div>
            <div style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-color)', lineHeight: 1 }}>{value}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '500', marginTop: '0.2rem' }}>{label}</div>
        </div>
    </div>
);

export default EventSchedulePage;
