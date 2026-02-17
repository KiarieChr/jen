import React, { useState } from 'react';

const UnassignedMembersList = ({ selectedMembers, toggleSelection }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');

    // Mock Data
    const members = [
        { id: 101, name: 'David Kim', gender: 'Male', location: 'Westlands', status: 'New Member' },
        { id: 102, name: 'Eva Green', gender: 'Female', location: 'Kilimani', status: 'Transferred' },
        { id: 103, name: 'Frank White', gender: 'Male', location: 'CBD', status: 'New Member' },
        { id: 104, name: 'Grace Liu', gender: 'Female', location: 'Westlands', status: 'New Member' },
        { id: 105, name: 'Henry Ford', gender: 'Male', location: 'Ngong Rd', status: 'Rejoining' },
    ];

    const filteredMembers = members.filter(m =>
        (filter === 'All' || m.location === filter) &&
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{
            background: '#1A1625',
            borderRadius: '1rem',
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden'
        }}>
            <div style={{ padding: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 style={{ margin: '0 0 1rem 0', color: '#eff3c1', fontSize: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                    Unassigned Members
                    <span style={{ background: '#f59e0b', color: '#120D20', padding: '0.1rem 0.5rem', borderRadius: '1rem', fontSize: '0.75rem' }}>{filteredMembers.length}</span>
                </h3>

                <input
                    type="text"
                    placeholder="Search name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '0.6rem',
                        background: '#120D20',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '0.5rem',
                        color: '#eff3c1',
                        marginBottom: '0.75rem',
                        fontSize: '0.9rem'
                    }}
                />

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['All', 'Westlands', 'Kilimani', 'CBD'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                background: filter === f ? 'rgba(34, 193, 230, 0.2)' : 'rgba(255,255,255,0.05)',
                                color: filter === f ? '#22c1e6' : '#94a3b8',
                                border: 'none',
                                borderRadius: '0.25rem',
                                padding: '0.3rem 0.6rem',
                                fontSize: '0.75rem',
                                cursor: 'pointer'
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem' }}>
                {filteredMembers.map(member => (
                    <div
                        key={member.id}
                        onClick={() => toggleSelection(member.id)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem',
                            marginBottom: '0.5rem',
                            background: selectedMembers.includes(member.id) ? 'rgba(34, 193, 230, 0.1)' : 'transparent',
                            borderRadius: '0.5rem',
                            border: selectedMembers.includes(member.id) ? '1px solid #22c1e6' : '1px solid transparent',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            border: '2px solid #64748b',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: selectedMembers.includes(member.id) ? '#22c1e6' : 'transparent',
                            borderColor: selectedMembers.includes(member.id) ? '#22c1e6' : '#64748b'
                        }}>
                            {selectedMembers.includes(member.id) && <span style={{ color: '#120D20', fontSize: '0.8rem', fontWeight: 'bold' }}>✓</span>}
                        </div>

                        <div style={{ flex: 1 }}>
                            <div style={{ color: '#eff3c1', fontSize: '0.9rem', fontWeight: '500' }}>{member.name}</div>
                            <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                                {member.location} • <span style={{ color: '#f59e0b' }}>{member.status}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UnassignedMembersList;
