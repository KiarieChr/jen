import React, { useState } from 'react';

const BulkDeactivateModal = ({ onClose }) => {
    // Mock Users List
    const initialUsers = [
        { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Viewer' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
        { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'Viewer' },
        { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', role: 'Admin' },
        { id: '5', name: 'David Brown', email: 'david@example.com', role: 'Cell Leader' }
    ];

    const [users] = useState(initialUsers);
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleUser = (id) => {
        setSelectedUserIds(prev =>
            prev.includes(id)
                ? prev.filter(userId => userId !== id)
                : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selectedUserIds.length === filteredUsers.length) {
            setSelectedUserIds([]);
        } else {
            setSelectedUserIds(filteredUsers.map(u => u.id));
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedUserIds.length === 0) {
            alert('Please select at least one user to deactivate.');
            return;
        }

        const confirmDeactivate = window.confirm(`Are you sure you want to deactivate ${selectedUserIds.length} users? This action will revoke their access.`);
        if (confirmDeactivate) {
            alert(`Deactivation simulated for user IDs: ${selectedUserIds.join(', ')}`);
            onClose();
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
        marginBottom: '1rem'
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
                maxHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid var(--border-color, rgba(255,255,255,0.1))',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                color: 'var(--text-color, #f8fafc)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>🚫</span>
                        <h2 style={{ fontSize: '1.5rem', color: '#ff4d4d', margin: 0 }}>Bulk User Deactivation</h2>
                    </div>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={inputStyle}
                    />
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem',
                    padding: '0 0.5rem'
                }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{selectedUserIds.length} users selected</span>
                    <button
                        type="button"
                        onClick={toggleAll}
                        style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.9rem' }}
                    >
                        {selectedUserIds.length === filteredUsers.length ? 'Deselect All' : 'Select All'}
                    </button>
                </div>

                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.5rem',
                    marginBottom: '1.5rem'
                }}>
                    {filteredUsers.map(user => (
                        <div
                            key={user.id}
                            onClick={() => toggleUser(user.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '0.75rem',
                                borderBottom: '1px solid var(--border-color)',
                                background: selectedUserIds.includes(user.id) ? 'rgba(255, 77, 77, 0.1)' : 'transparent',
                                cursor: 'pointer',
                                transition: 'background 0.2s'
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={selectedUserIds.includes(user.id)}
                                onChange={() => { }} // Handle click on div
                                style={{ accentColor: '#ff4d4d', width: '18px', height: '18px' }}
                            />
                            <div style={{ flex: 1 }}>
                                <div style={{ color: 'var(--text-color)', fontWeight: '500' }}>{user.name}</div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{user.email} • {user.role}</div>
                            </div>
                        </div>
                    ))}
                    {filteredUsers.length === 0 && (
                        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No users found.</div>
                    )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                    <button type="button" onClick={onClose} style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.5rem',
                        border: '1px solid var(--border-color)',
                        background: 'transparent',
                        color: 'var(--text-muted)',
                        cursor: 'pointer'
                    }}>Cancel</button>
                    <button onClick={handleSubmit} style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.5rem',
                        border: 'none',
                        background: '#ff4d4d',
                        color: 'var(--text-color)',
                        fontWeight: '700',
                        cursor: 'pointer',
                        opacity: selectedUserIds.length > 0 ? 1 : 0.5,
                        pointerEvents: selectedUserIds.length > 0 ? 'auto' : 'none'
                    }}>Deactivate Selected Users</button>
                </div>
            </div>
        </div>
    );
};

export default BulkDeactivateModal;
