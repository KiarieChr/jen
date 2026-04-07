import React, { useState } from 'react';
import api from '../../../../services/api';

const EVENT_TYPES = [
    { value: 'conference', label: 'Conference' },
    { value: 'service', label: 'Service' },
    { value: 'concert', label: 'Concert' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'outreach', label: 'Outreach' },
    { value: 'prayer', label: 'Prayer' },
    { value: 'training', label: 'Training' },
    { value: 'general', label: 'General' },
];

const CreateEventModal = ({ onClose, onCreated }) => {
    const [formData, setFormData] = useState({
        name: '',
        type: 'conference',
        date: '',
        time: '',
        endDate: '',
        endTime: '',
        location: '',
        description: '',
        targetAttendees: '',
        facilitationFee: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            const res = await api.post('create_event.php', {
                name: formData.name,
                type: formData.type,
                start_date: formData.date,
                start_time: formData.time,
                end_date: formData.endDate,
                end_time: formData.endTime,
                venue: formData.location,
                description: formData.description,
                target_attendees: formData.targetAttendees ? parseInt(formData.targetAttendees) : 0,
                facilitation_fee: formData.facilitationFee ? parseFloat(formData.facilitationFee) : 0,
            });
            if (res.success) {
                if (onCreated) onCreated();
                onClose();
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create event');
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
                maxWidth: '650px',
                border: '1px solid var(--border-color, rgba(255,255,255,0.1))',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                maxHeight: '90vh',
                overflowY: 'auto',
                color: 'var(--text-color, #f8fafc)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-color)', margin: 0 }}>Create New Event</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>

                    {error && (
                        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '0.5rem', padding: '0.75rem', color: '#ef4444', fontSize: '0.85rem' }}>
                            {error}
                        </div>
                    )}

                    {/* Basic Info */}
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Event Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Easter Conference" style={inputStyle} required />
                        </div>
                        <div>
                            <label style={labelStyle}>Event Type</label>
                            <select name="type" value={formData.type} onChange={handleChange} style={inputStyle}>
                                {EVENT_TYPES.map(t => (
                                    <option key={t.value} value={t.value}>{t.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Date & Time */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Start Date & Time</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input type="date" name="date" value={formData.date} onChange={handleChange} style={inputStyle} required />
                                <input type="time" name="time" value={formData.time} onChange={handleChange} style={inputStyle} required />
                            </div>
                        </div>
                        <div>
                            <label style={labelStyle}>End Date & Time</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} style={inputStyle} required />
                                <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} style={inputStyle} required />
                            </div>
                        </div>
                    </div>

                    {/* Venue */}
                    <div>
                        <label style={labelStyle}>Venue / Location</label>
                        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Main Auditorium" style={inputStyle} required />
                    </div>

                    {/* Description */}
                    <div>
                        <label style={labelStyle}>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Event details..." style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} />
                    </div>

                    {/* Target & Fees */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Target Attendees</label>
                            <input type="number" name="targetAttendees" value={formData.targetAttendees} onChange={handleChange} placeholder="e.g. 100" min="0" style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Facilitation Fee</label>
                            <input type="number" name="facilitationFee" value={formData.facilitationFee} onChange={handleChange} placeholder="0.00" min="0" step="0.01" style={inputStyle} />
                        </div>
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
                        }}>{submitting ? 'Creating...' : 'Publish Event'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEventModal;
