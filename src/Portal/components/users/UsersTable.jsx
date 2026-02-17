import React, { useState } from 'react';

const UsersTable = () => {
    const [filterRole, setFilterRole] = useState('All');

    // Mock Data
    const users = [
        { id: 'USR001', name: 'John Doe', email: 'john@example.com', role: 'Admin', linked: true, lastLogin: 'Today, 10:23 AM', status: 'Active' },
        { id: 'USR002', name: 'Jane Smith', email: 'jane@example.com', role: 'Cell Leader', linked: true, lastLogin: 'Yesterday, 4:15 PM', status: 'Active' },
        { id: 'USR003', name: 'Mike Johnson', email: 'mike@example.com', role: 'Member', linked: false, lastLogin: 'Jan 28, 2026', status: 'Inactive' },
        { id: 'USR004', name: 'Sarah Connor', email: 'sarah@example.com', role: 'Pastor', linked: true, lastLogin: 'Today, 08:00 AM', status: 'Active' },
        { id: 'USR005', name: 'Unknown User', email: 'temp@example.com', role: 'None', linked: false, lastLogin: 'Never', status: 'Locked' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return '#4ade80';
            case 'Inactive': return '#94a3b8';
            case 'Locked': return '#ef4444';
            default: return '#cbd5e1';
        }
    };

    return (
        <div style={{
            background: '#1A1625',
            borderRadius: '1rem',
            border: '1px solid rgba(255,255,255,0.05)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Table Controls */}
            <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#eff3c1', borderRadius: '0.4rem', padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}
                    >
                        <option value="All">All Roles</option>
                        <option value="Admin">Admin</option>
                        <option value="Pastor">Pastor</option>
                        <option value="Cell Leader">Cell Leader</option>
                        <option value="Member">Member</option>
                    </select>
                    <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', borderRadius: '0.4rem', padding: '0.4rem 0.8rem', cursor: 'pointer' }}>
                        Filter Status
                    </button>
                </div>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Search users..."
                        style={{
                            background: 'rgba(0,0,0,0.2)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: '#eff3c1',
                            padding: '0.4rem 1rem 0.4rem 2rem',
                            borderRadius: '0.4rem',
                            fontSize: '0.9rem',
                            width: '250px'
                        }}
                    />
                    <span style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.8rem', opacity: 0.5 }}>🔍</span>
                </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                        <tr style={{ color: '#94a3b8', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                            <th style={{ textAlign: 'left', padding: '1rem' }}>User Info</th>
                            <th style={{ textAlign: 'left', padding: '1rem' }}>Role</th>
                            <th style={{ textAlign: 'left', padding: '1rem' }}>Member Link</th>
                            <th style={{ textAlign: 'left', padding: '1rem' }}>Last Login</th>
                            <th style={{ textAlign: 'left', padding: '1rem' }}>Status</th>
                            <th style={{ textAlign: 'right', padding: '1rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', color: '#cbd5e1' }}>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ fontWeight: '500', color: '#eff3c1' }}>{user.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{user.email}</div>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        background: 'rgba(255,255,255,0.05)',
                                        padding: '0.2rem 0.5rem',
                                        borderRadius: '4px',
                                        fontSize: '0.8rem',
                                        border: '1px solid rgba(255,255,255,0.05)'
                                    }}>
                                        {user.role}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    {user.linked ? (
                                        <span style={{ color: '#4ade80' }}>✓ Linked</span>
                                    ) : (
                                        <span style={{ color: '#94a3b8' }}>- Unlinked</span>
                                    )}
                                </td>
                                <td style={{ padding: '1rem', color: '#94a3b8' }}>{user.lastLogin}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{ color: getStatusColor(user.status), fontWeight: '500' }}>● {user.status}</span>
                                </td>
                                <td style={{ padding: '1rem', textAlign: 'right' }}>
                                    <button style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.2rem' }}>⋮</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#cbd5e1', padding: '0.3rem 0.8rem', borderRadius: '0.3rem', cursor: 'pointer', fontSize: '0.8rem' }}>Previous</button>
                <button style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#cbd5e1', padding: '0.3rem 0.8rem', borderRadius: '0.3rem', cursor: 'pointer', fontSize: '0.8rem' }}>Next</button>
            </div>
        </div>
    );
};

export default UsersTable;
