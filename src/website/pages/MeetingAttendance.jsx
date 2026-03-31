import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL as API_URL } from '../../services/api';

const MeetingAttendance = () => {
    const { meetingId } = useParams();
    const navigate = useNavigate();

    const [meeting, setMeeting] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        contact: '' // can be email or phone
    });
    const [countdown, setCountdown] = useState(null);
    // Countdown logic
    useEffect(() => {
        if (!meeting || !meeting.start_time) return;
        const start = new Date(meeting.start_time.replace(/-/g, '/')).getTime();
        const updateCountdown = () => {
            const now = Date.now();
            const diff = start - now;
            if (diff > 0) {
                const hours = Math.floor(diff / 1000 / 60 / 60);
                const mins = Math.floor((diff / 1000 / 60) % 60);
                const secs = Math.floor((diff / 1000) % 60);
                setCountdown(`${hours}h ${mins}m ${secs}s`);
            } else {
                setCountdown(null);
            }
        };
        updateCountdown();
        const timer = setInterval(updateCountdown, 1000);
        return () => clearInterval(timer);
    }, [meeting]);

    useEffect(() => {
        const fetchMeeting = async () => {
            try {
                const response = await fetch(`${API_URL}/get_meeting_details.php?id=${meetingId}`);
                const data = await response.json();
                if (data.success) {
                    setMeeting(data.data);
                } else {
                    setError(data.message || 'Meeting not found');
                }
            } catch (err) {
                setError('Failed to load meeting details');
            } finally {
                setLoading(false);
            }
        };
        if (meetingId) fetchMeeting();
    }, [meetingId]);

    const handleChange = (e) => {
        setFormData({ contact: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/mark_meeting_attendance.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contact: formData.contact, meeting_id: meetingId })
            });
            const data = await response.json();
            if (data.success) {
                setSubmitted(true);
                setTimeout(() => {
                    if (data.redirect) {
                        window.location.href = data.redirect;
                    }
                }, 2000);
            } else {
                setError(data.message || 'Failed to mark attendance');
            }
        } catch (err) {
            setError('Failed to submit attendance. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eff3c1' }}>Loading...</div>;
    }

    if (error && !meeting) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eff3c1' }}>
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ color: '#120D20' }}>{error}</h2>
                    <button onClick={() => navigate('/meetings')} style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#22c1e6', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>Back to Meetings</button>
                </div>
            </div>
        );
    }

    if (submitted) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eff3c1' }}>
                <div style={{ background: '#1A1625', padding: '3rem 2rem', borderRadius: '1.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                    <h2 style={{ color: '#eff3c1', marginBottom: '1rem' }}>Attendance Marked!</h2>
                    <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Thank you for attending <strong>{meeting.title}</strong>.<br/>Redirecting to meeting...</p>
                </div>
            </div>
        );
    }

    // Determine meeting status
    let meetingStatus = 'upcoming';
    if (meeting && meeting.end_time && meeting.start_time) {
        const now = Date.now();
        const start = new Date(meeting.start_time.replace(/-/g, '/')).getTime();
        const end = new Date(meeting.end_time.replace(/-/g, '/')).getTime();
        if (end < now) meetingStatus = 'past';
        else if (start <= now && end >= now) meetingStatus = 'live';
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#eff3c1' }}>
            <div style={{ flex: 1, padding: '4rem 1rem' }}>
                <div style={{
                    maxWidth: '600px',
                    margin: '0 auto',
                    background: '#1A1625',
                    padding: '2.5rem',
                    borderRadius: '1.5rem',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <div style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem' }}>
                        <h1 style={{ color: '#eff3c1', margin: 0, fontSize: '1.8rem' }}>{meeting.title}</h1>
                        <p style={{ color: 'var(--primary)', fontWeight: '600', marginTop: '0.5rem' }}>Meeting Attendance</p>
                        <div style={{ color: '#94a3b8', marginTop: '1rem', display: 'grid', gap: '0.5rem', fontSize: '0.9rem' }}>
                            <span>
                                📅 {meeting.end_date && meeting.end_date !== meeting.date ? (
                                    `${meeting.date} - ${meeting.end_date}`
                                ) : (
                                    meeting.date
                                )} at {meeting.time}
                            </span>
                            <span>📍 {meeting.location || 'Location TBD'}</span>
                        </div>
                        {meetingStatus === 'upcoming' && countdown && (
                            <div style={{ color: '#22c1e6', marginTop: 12, fontWeight: 600 }}>
                                Meeting starts in: {countdown}
                            </div>
                        )}
                        {meetingStatus === 'live' && (
                            <div style={{ color: '#22c1e6', marginTop: 12, fontWeight: 600 }}>
                                <b>Meeting is LIVE!</b>
                            </div>
                        )}
                        {meetingStatus === 'past' && (
                            <div style={{ color: '#ef4444', marginTop: 12, fontWeight: 600 }}>
                                <b>This event is past. You can still mark attendance below.</b>
                            </div>
                        )}
                    </div>
                    {error && <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
                        <div>
                            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.4rem', fontSize: '0.95rem' }}>Phone Number or Email Address</label>
                            <input
                                type="text"
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                                required
                                placeholder="Enter phone or email"
                                style={inputStyle}
                            />
                        </div>
                        <button type="submit" style={{
                            marginTop: '1rem',
                            padding: '1rem',
                            background: '#22c1e6',
                            color: '#120D20',
                            border: 'none',
                            borderRadius: '0.6rem',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }} disabled={submitting || !formData.contact}>
                            {meetingStatus === 'past' ? 'Mark Attendance Anyway' : (submitting ? 'Submitting...' : 'Mark Attendance')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    background: '#120D20',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '0.5rem',
    color: '#eff3c1',
    fontSize: '0.95rem',
    outline: 'none'
};

export default MeetingAttendance;
