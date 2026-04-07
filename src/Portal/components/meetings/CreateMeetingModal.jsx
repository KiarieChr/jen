import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

const CreateMeetingModal = ({ onClose, onCreated }) => {
    const [meetingTypes, setMeetingTypes] = useState([]);
    const [members, setMembers] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        meeting_type: '',
        date: '',
        time: '',
        end_time: '',
        facilitator: '',
        meeting_link: '',
        format: 'Physical',
        description: ''
    });
    const [bannerFile, setBannerFile] = useState(null);
    const [bannerPreview, setBannerPreview] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [typesRes, membersRes] = await Promise.all([
                    api.get('/get_meeting_types.php'),
                    api.get('/get_members.php?limit=500')
                ]);
                if (typesRes.success) setMeetingTypes(typesRes.data?.meeting_types || []);
                if (membersRes.success) setMembers(membersRes.data || []);
            } catch (err) {
                console.error('Failed to load form data:', err);
                setError('Failed to load meeting types and members. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError('Banner image must be under 5MB');
                return;
            }
            setBannerFile(file);
            setBannerPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            const fd = new FormData();
            fd.append('title', formData.title);
            fd.append('meeting_type', formData.meeting_type);
            fd.append('date', formData.date);
            fd.append('time', formData.time);
            fd.append('end_time', formData.end_time);
            fd.append('facilitator', formData.facilitator);
            fd.append('meeting_link', formData.meeting_link);
            fd.append('description', formData.description);
            if (bannerFile) fd.append('banner', bannerFile);

            const res = await api.post('/create_meeting.php', fd, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.success) {
                if (onCreated) onCreated();
                onClose();
            }
        } catch (err) {
            setError(err.message || 'Failed to create meeting');
        } finally {
            setSubmitting(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        background: 'var(--bg-color)',
        border: '1px solid var(--border-color)',
        borderRadius: '0.5rem',
        color: 'var(--text-color)',
        fontSize: '0.9rem',
        marginTop: '0.4rem'
    };

    const labelStyle = {
        color: 'var(--text-muted)',
        fontSize: '0.85rem',
        fontWeight: '500'
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1100
        }}>
            <div style={{
                background: 'var(--surface-1, #1A1625)',
                padding: '2rem',
                borderRadius: '1rem',
                width: '100%',
                maxWidth: '600px',
                border: '1px solid var(--border-color, rgba(255,255,255,0.1))',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                color: 'var(--text-color, #f8fafc)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-color)', margin: 0 }}>Create New Meeting</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Loading...</div>
                        <div style={{ fontSize: '0.85rem' }}>Fetching meeting types and members</div>
                    </div>
                ) : (
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', maxHeight: '70vh', overflowY: 'auto', paddingRight: '0.5rem' }}>
                    {error && (
                        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '0.5rem', padding: '0.75rem', color: '#ef4444', fontSize: '0.85rem' }}>
                            {error}
                        </div>
                    )}

                    {/* Banner Upload */}
                    <div>
                        <label style={labelStyle}>Meeting Banner / Poster</label>
                        <div
                            onClick={() => document.getElementById('banner-upload').click()}
                            style={{
                                marginTop: '0.4rem',
                                border: '2px dashed var(--border-color)',
                                borderRadius: '0.75rem',
                                padding: bannerPreview ? '0' : '2rem',
                                textAlign: 'center',
                                cursor: 'pointer',
                                overflow: 'hidden',
                                position: 'relative',
                                minHeight: '120px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'var(--bg-color)'
                            }}
                        >
                            {bannerPreview ? (
                                <img src={bannerPreview} alt="Banner preview" style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', display: 'block' }} />
                            ) : (
                                <div>
                                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🖼️</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Click to upload banner image</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '0.25rem' }}>JPG, PNG, WebP • Max 5MB</div>
                                </div>
                            )}
                        </div>
                        <input id="banner-upload" type="file" accept="image/*" onChange={handleBannerChange} style={{ display: 'none' }} />
                        {bannerPreview && (
                            <button type="button" onClick={() => { setBannerFile(null); setBannerPreview(null); }}
                                style={{ marginTop: '0.3rem', background: 'transparent', border: 'none', color: '#ef4444', fontSize: '0.8rem', cursor: 'pointer' }}>
                                Remove banner
                            </button>
                        )}
                    </div>

                    <div>
                        <label style={labelStyle}>Meeting Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Weekly Prayer" style={inputStyle} required />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Meeting Type</label>
                            <select name="meeting_type" value={formData.meeting_type} onChange={handleChange} style={inputStyle}>
                                <option value="">Select type...</option>
                                {meetingTypes.map(t => (
                                    <option key={t.id} value={t.id}>{t.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Format</label>
                            <select name="format" value={formData.format} onChange={handleChange} style={inputStyle}>
                                <option>Physical</option>
                                <option>Online</option>
                                <option>Hybrid</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Date</label>
                            <input type="date" name="date" value={formData.date} onChange={handleChange} style={inputStyle} required />
                        </div>
                        <div>
                            <label style={labelStyle}>Start Time</label>
                            <input type="time" name="time" value={formData.time} onChange={handleChange} style={inputStyle} required />
                        </div>
                        <div>
                            <label style={labelStyle}>End Time</label>
                            <input type="time" name="end_time" value={formData.end_time} onChange={handleChange} style={inputStyle} />
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>Facilitator</label>
                        <select name="facilitator" value={formData.facilitator} onChange={handleChange} style={inputStyle}>
                            <option value="">Select facilitator...</option>
                            {members.map(m => (
                                <option key={m.id} value={m.id}>{m.first_name} {m.last_name}</option>
                            ))}
                        </select>
                    </div>

                    {(formData.format === 'Online' || formData.format === 'Hybrid') && (
                        <div>
                            <label style={labelStyle}>Meeting Link</label>
                            <input type="url" name="meeting_link" value={formData.meeting_link} onChange={handleChange} placeholder="https://meet.google.com/..." style={inputStyle} />
                        </div>
                    )}

                    <div>
                        <label style={labelStyle}>Description / Notes</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Additional details..." style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" onClick={onClose} style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--border-color)',
                            background: 'transparent',
                            color: 'var(--text-muted)',
                            cursor: 'pointer'
                        }}>Cancel</button>
                        <button type="submit" disabled={submitting} style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            background: submitting ? 'var(--text-muted)' : 'var(--primary)',
                            color: 'var(--bg-color)',
                            fontWeight: '600',
                            cursor: submitting ? 'not-allowed' : 'pointer'
                        }}>{submitting ? 'Creating...' : 'Save Meeting'}</button>
                    </div>
                </form>
                )}
            </div>
        </div>
    );
};

export default CreateMeetingModal;
