import React, { useState, useContext } from 'react';
import { EventContext } from '../../../../context/EventContext';

const CreateEventModal = ({ onClose }) => {
    const { addEvent } = useContext(EventContext);
    const [formData, setFormData] = useState({
        name: '',
        category: 'Sunday Service',
        date: '',
        time: '',
        endDate: '',
        endTime: '',
        location: '',
        description: '',
        rsvpRequired: false,
        trackingAttendance: true,
        onlineLink: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addEvent(formData);
        onClose();
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

    const checkboxStyle = {
        accentColor: 'var(--primary)',
        width: '1.2rem',
        height: '1.2rem',
        cursor: 'pointer'
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
                background: 'var(--surface-1)',
                padding: '2rem',
                borderRadius: '1rem',
                width: '100%',
                maxWidth: '650px',
                border: '1px solid var(--border-color)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                maxHeight: '90vh',
                overflowY: 'auto'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-color)', margin: 0 }}>Create New Event</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>

                    {/* Basic Info */}
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Event Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Easter Conference" style={inputStyle} required />
                        </div>
                        <div>
                            <label style={labelStyle}>Category</label>
                            <select name="category" value={formData.category} onChange={handleChange} style={inputStyle}>
                                <option>Sunday Service</option>
                                <option>Conference</option>
                                <option>Concert</option>
                                <option>Workshop</option>
                                <option>Outreach</option>
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

                    {/* Advanced Options */}
                    <div style={{ background: 'var(--surface-2)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                        <div style={{ color: 'var(--text-color)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Settings</div>
                        <div style={{ display: 'flex', gap: '2rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                <input type="checkbox" name="rsvpRequired" checked={formData.rsvpRequired} onChange={handleChange} style={checkboxStyle} />
                                RSVP Required
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                <input type="checkbox" name="trackingAttendance" checked={formData.trackingAttendance} onChange={handleChange} style={checkboxStyle} />
                                Track Attendance
                            </label>
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                            <label style={labelStyle}>Online Link (Optional)</label>
                            <input type="url" name="onlineLink" value={formData.onlineLink} onChange={handleChange} placeholder="https://..." style={inputStyle} />
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
                        <button type="submit" style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            background: 'var(--primary)',
                            color: 'var(--bg-color)',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}>Publish Event</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEventModal;
