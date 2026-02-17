import React, { useState } from 'react';

const AddUserModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        role: 'Viewer',
        department: '',
        sendInvite: true
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('User creation simulated: ' + JSON.stringify(formData));
        onClose();
    };

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        background: '#120D20',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '0.5rem',
        color: '#eff3c1',
        fontSize: '0.9rem',
        marginTop: '0.4rem',
        outline: 'none'
    };

    const labelStyle = {
        color: '#94a3b8',
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
                background: '#1A1625',
                padding: '2rem',
                borderRadius: '1rem',
                width: '100%',
                maxWidth: '500px',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: '#22c1e6', margin: 0 }}>Add New User</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>

                    {/* Full Name */}
                    <div>
                        <label style={labelStyle}>👤 Full Name</label>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" style={inputStyle} required />
                    </div>

                    {/* Email */}
                    <div>
                        <label style={labelStyle}>✉️ Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" style={inputStyle} required />
                    </div>

                    {/* Role & Department */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>🛡️ Role</label>
                            <select name="role" value={formData.role} onChange={handleChange} style={inputStyle}>
                                <option>Admin</option>
                                <option>Editor</option>
                                <option>Viewer</option>
                                <option>Finance Manager</option>
                                <option>Media Team</option>
                                <option>Cell Leader</option>
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>🏢 Department</label>
                            <select name="department" value={formData.department} onChange={handleChange} style={inputStyle}>
                                <option value="" disabled>Select Dept</option>
                                <option>Media</option>
                                <option>Finance</option>
                                <option>Administration</option>
                                <option>Pastoral</option>
                            </select>
                        </div>
                    </div>

                    {/* Send Invite */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', background: 'rgba(34, 193, 230, 0.05)', borderRadius: '0.5rem' }}>
                        <input
                            type="checkbox"
                            name="sendInvite"
                            checked={formData.sendInvite}
                            onChange={handleChange}
                            style={{ width: '18px', height: '18px', accentColor: '#22c1e6' }}
                        />
                        <label style={{ color: '#eff3c1', fontSize: '0.9rem' }}>Send email invitation immediately</label>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" onClick={onClose} style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: 'transparent',
                            color: '#94a3b8',
                            cursor: 'pointer'
                        }}>Cancel</button>
                        <button type="submit" style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            background: '#22c1e6',
                            color: '#120D20',
                            fontWeight: '700',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(34, 193, 230, 0.3)'
                        }}>Create User</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserModal;
