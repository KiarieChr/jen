import React, { useState } from 'react';

const CreateMeetingModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        category: 'Cell Meeting',
        date: '',
        time: '',
        location: '',
        type: 'Physical',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Meeting creation simulated: ' + JSON.stringify(formData));
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

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                    <div>
                        <label style={labelStyle}>Meeting Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Weekly Prayer" style={inputStyle} required />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Category</label>
                            <select name="category" value={formData.category} onChange={handleChange} style={inputStyle}>
                                <option>Cell Meeting</option>
                                <option>Leadership</option>
                                <option>Prayer</option>
                                <option>Outreach</option>
                                <option>Training</option>
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Type</label>
                            <select name="type" value={formData.type} onChange={handleChange} style={inputStyle}>
                                <option>Physical</option>
                                <option>Online</option>
                                <option>Hybrid</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Date</label>
                            <input type="date" name="date" value={formData.date} onChange={handleChange} style={inputStyle} required />
                        </div>
                        <div>
                            <label style={labelStyle}>Start Time</label>
                            <input type="time" name="time" value={formData.time} onChange={handleChange} style={inputStyle} required />
                        </div>
                    </div>


                    {(formData.type === 'Online' || formData.type === 'Hybrid') && (
                        <div>
                            <label style={labelStyle}>Google Meet Link</label>
                            <input
                                type="url"
                                name="googleMeetLink"
                                value={formData.googleMeetLink || ''}
                                onChange={handleChange}
                                placeholder="https://meet.google.com/..."
                                style={inputStyle}
                            />
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
                        <button type="submit" style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            background: 'var(--primary)',
                            color: 'var(--bg-color)',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}>Save Meeting</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateMeetingModal;
