import React, { useState } from 'react';

const EditProfileModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        fullName: 'Timothy Mutisya',
        aboutMe: 'Passionate about serving the community and technical administration.',
        dob: '2001-09-10',
        location: 'Nairobi',
        role: 'Administrator' // Read-only usually
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Profile Details Updated: ' + JSON.stringify(formData));
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
        marginTop: '0.4rem',
        outline: 'none'
    };

    const labelStyle = {
        color: 'var(--text-muted)',
        fontSize: '0.85rem',
        fontWeight: '500',
        marginBottom: '0.5rem',
        display: 'block'
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
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', margin: 0 }}>Edit Personal Details</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>

                    {/* Full Name */}
                    <div>
                        <label style={labelStyle}>Full Name</label>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} style={inputStyle} required />
                    </div>

                    {/* About Me */}
                    <div>
                        <label style={labelStyle}>About Me</label>
                        <textarea
                            name="aboutMe"
                            value={formData.aboutMe}
                            onChange={handleChange}
                            rows="4"
                            style={{ ...inputStyle, resize: 'vertical' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        {/* Date of Birth */}
                        <div>
                            <label style={labelStyle}>Date of Birth</label>
                            <input type="date" name="dob" value={formData.dob} onChange={handleChange} style={inputStyle} />
                        </div>

                        {/* Location */}
                        <div>
                            <label style={labelStyle}>Location</label>
                            <input type="text" name="location" value={formData.location} onChange={handleChange} style={inputStyle} />
                        </div>
                    </div>

                    {/* Actions */}
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
                            fontWeight: '700',
                            cursor: 'pointer'
                        }}>Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
