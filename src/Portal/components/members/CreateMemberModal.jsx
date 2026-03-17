import React, { useState } from 'react';

const CreateMemberModal = ({ onClose, initialStatus = 'Regular Member' }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        cellGroup: '',
        category: '',
        commitmentStatus: initialStatus,
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Member registration simulated: ' + JSON.stringify(formData));
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
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
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
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', margin: 0 }}>
                        {initialStatus === 'Committed Member' ? 'Register Committed Member' : 'Register New Member'}
                    </h2>
                    <button onClick={onClose} style={{ background: 'var(--border-color)', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.2rem' }}>

                    {/* Full Name */}
                    <div>
                        <label style={labelStyle}>👤 Full Name</label>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter full name" style={inputStyle} required />
                    </div>

                    {/* Phone & Email */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>📞 Phone Number</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="0712 345 678" style={inputStyle} required />
                        </div>
                        <div>
                            <label style={labelStyle}>✉️ Email Address</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@mail.com" style={inputStyle} />
                        </div>
                    </div>

                    {/* Cell Group & Category */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>👥 Cell Group</label>
                            <select name="cellGroup" value={formData.cellGroup} onChange={handleChange} style={inputStyle}>
                                <option value="" disabled>Select Cell</option>
                                <option>Goshen Alpha</option>
                                <option>Judah Beta</option>
                                <option>Zion</option>
                                <option>None</option>
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>🏷️ Category</label>
                            <select name="category" value={formData.category} onChange={handleChange} style={inputStyle}>
                                <option value="" disabled>Select Category</option>
                                <option>Member</option>
                                <option>Leader</option>
                                <option>Visitor</option>
                                <option>Child</option>
                            </select>
                        </div>
                    </div>

                    {/* Commitment Status */}
                    <div>
                        <label style={labelStyle}>♡ Commitment Status</label>
                        <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: formData.commitmentStatus === 'Regular Member' ? 'var(--primary)' : 'var(--text-muted)' }}>
                                <input
                                    type="radio"
                                    name="commitmentStatus"
                                    value="Regular Member"
                                    checked={formData.commitmentStatus === 'Regular Member'}
                                    onChange={handleChange}
                                    style={{ accentColor: 'var(--primary)' }}
                                />
                                Regular Member
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: formData.commitmentStatus === 'Committed Member' ? 'var(--primary)' : 'var(--text-muted)' }}>
                                <input
                                    type="radio"
                                    name="commitmentStatus"
                                    value="Committed Member"
                                    checked={formData.commitmentStatus === 'Committed Member'}
                                    onChange={handleChange}
                                    style={{ accentColor: 'var(--primary)' }}
                                />
                                Committed Member
                            </label>
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <label style={labelStyle}>📍 Home Address / Location</label>
                        <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Enter residential area or specific address" style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} />
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" onClick={onClose} style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--border-color)',
                            background: 'transparent',
                            color: 'var(--text-color)',
                            cursor: 'pointer'
                        }}>Cancel</button>
                        <button type="submit" style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            background: 'var(--primary)',
                            color: 'var(--bg-color)',
                            fontWeight: '700',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(34, 193, 230, 0.3)'
                        }}>Register Member</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateMemberModal;
