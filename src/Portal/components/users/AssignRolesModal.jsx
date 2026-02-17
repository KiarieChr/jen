import React, { useState } from 'react';

const AssignRolesModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        userId: '',
        role: 'Viewer',
        permissions: []
    });

    // Mock Users List
    const users = [
        { id: '1', name: 'John Doe', email: 'john@example.com' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
        { id: '3', name: 'Mike Johnson', email: 'mike@example.com' },
        { id: '4', name: 'Sarah Williams', email: 'sarah@example.com' }
    ];

    const roles = [
        { id: 'admin', label: 'Admin', desc: 'Full system access' },
        { id: 'editor', label: 'Editor', desc: 'Can edit content, cannot change settings' },
        { id: 'viewer', label: 'Viewer', desc: 'Read-only access' },
        { id: 'finance', label: 'Finance Manager', desc: 'Access to financial records only' },
        { id: 'media', label: 'Media Team', desc: 'Upload and manage media' },
        { id: 'cell_leader', label: 'Cell Leader', desc: 'Manage cell groups and members' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedUser = users.find(u => u.id === formData.userId);
        alert(`Role update simulated for ${selectedUser ? selectedUser.name : 'Unknown User'}: assigned ${formData.role}`);
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
                background: '#1A1625',
                padding: '2rem',
                borderRadius: '1rem',
                width: '100%',
                maxWidth: '500px',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: '#22c1e6', margin: 0 }}>Assign Roles</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>

                    {/* Select User */}
                    <div>
                        <label style={labelStyle}>Select User</label>
                        <select
                            name="userId"
                            value={formData.userId}
                            onChange={handleChange}
                            style={inputStyle}
                            required
                        >
                            <option value="">-- Select a user --</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
                            ))}
                        </select>
                    </div>

                    {/* Select Role */}
                    <div>
                        <label style={labelStyle}>Select Role</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {roles.map(role => (
                                <label key={role.id} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '0.75rem',
                                    background: formData.role === role.label ? 'rgba(34, 193, 230, 0.1)' : 'rgba(255,255,255,0.02)',
                                    border: formData.role === role.label ? '1px solid #22c1e6' : '1px solid rgba(255,255,255,0.05)',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value={role.label}
                                        checked={formData.role === role.label}
                                        onChange={handleChange}
                                        style={{ accentColor: '#22c1e6' }}
                                    />
                                    <div>
                                        <div style={{ color: '#eff3c1', fontWeight: '500' }}>{role.label}</div>
                                        <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{role.desc}</div>
                                    </div>
                                </label>
                            ))}
                        </div>
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
                            opacity: formData.userId ? 1 : 0.5,
                            pointerEvents: formData.userId ? 'auto' : 'none'
                        }}>Update Roles</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AssignRolesModal;
