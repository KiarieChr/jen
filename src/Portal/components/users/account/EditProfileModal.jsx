import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';

const EditProfileModal = ({ onClose }) => {
    const { user, updateProfile } = useAuth();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_no: '',
        dob: '',
        location: '',
        bio: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Pre-fill form when user data is available
    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.firstname || '',
                last_name: user.lastname || '',
                email: user.email || '',
                phone_no: user.phone || '',
                dob: user.dob ? user.dob.split('T')[0] : '',   // ensure YYYY-MM-DD
                location: user.location || '',
                bio: user.bio || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await updateProfile(formData);
            setSuccess(true);
            setTimeout(() => {
                onClose();
            }, 1200);
        } catch (err) {
            setError(err.message || 'Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
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
        outline: 'none',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s',
    };

    const labelStyle = {
        color: 'var(--text-muted)',
        fontSize: '0.82rem',
        fontWeight: '600',
        marginBottom: '0.4rem',
        display: 'block',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1100,
            padding: '1rem',
        }}>
            <div style={{
                background: 'var(--surface-1, #1A1625)',
                padding: '2rem',
                borderRadius: '1.25rem',
                width: '100%',
                maxWidth: '600px',
                border: '1px solid var(--border-color, rgba(255,255,255,0.1))',
                boxShadow: '0 30px 60px -12px rgba(0,0,0,0.6)',
                color: 'var(--text-color, #f8fafc)',
                maxHeight: '90vh',
                overflowY: 'auto',
            }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
                    <div>
                        <h2 style={{ fontSize: '1.4rem', color: 'var(--primary)', margin: '0 0 0.2rem 0' }}>Edit Profile</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>Update your personal details</p>
                    </div>
                    <button
                        onClick={onClose}
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.6rem', cursor: 'pointer', lineHeight: 1 }}
                    >×</button>
                </div>

                {/* Alerts */}
                {error && (
                    <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.5rem', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#f87171', fontSize: '0.9rem' }}>
                        ⚠ {error}
                    </div>
                )}
                {success && (
                    <div style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: '0.5rem', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#4ade80', fontSize: '0.9rem' }}>
                        ✓ Profile updated successfully!
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.1rem' }}>

                    {/* Name row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>First Name</label>
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                style={inputStyle}
                                required
                                placeholder="e.g. John"
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Last Name</label>
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                style={inputStyle}
                                required
                                placeholder="e.g. Doe"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label style={labelStyle}>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={inputStyle}
                            placeholder="e.g. john@example.com"
                        />
                    </div>

                    {/* Phone & Location */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Phone Number</label>
                            <input
                                type="tel"
                                name="phone_no"
                                value={formData.phone_no}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="e.g. 0712345678"
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="e.g. Nairobi"
                            />
                        </div>
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label style={labelStyle}>Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                    </div>

                    {/* Bio */}
                    <div>
                        <label style={labelStyle}>Bio / About Me</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows={4}
                            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                            placeholder="Tell the community a little about yourself..."
                        />
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.5rem',
                                border: '1px solid var(--border-color)',
                                background: 'transparent',
                                color: 'var(--text-muted)',
                                cursor: 'pointer',
                                fontSize: '0.95rem',
                            }}
                        >Cancel</button>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                padding: '0.75rem 2rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                background: loading ? 'var(--border-color)' : 'var(--primary)',
                                color: loading ? 'var(--text-muted)' : 'white',
                                fontWeight: '700',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                fontSize: '0.95rem',
                                transition: 'all 0.2s',
                            }}
                        >
                            {loading ? '⏳ Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
