import React, { useState } from 'react';

const MembersTable = () => {
    const [activeTab, setActiveTab] = useState('regular'); // regular | committed

    // Mock Data
    const members = [
        { id: 'MEM001', name: 'John Doe', phone: '+254 712 345 678', cell: 'Goshen Alpha', category: 'Member', status: 'Active', linked: false },
        { id: 'MEM002', name: 'Jane Smith', phone: '+254 722 111 222', cell: 'Judah Beta', category: 'Leader', status: 'Active', linked: true },
        { id: 'MEM003', name: 'Alice Johnson', phone: '+254 733 444 555', cell: 'None', category: 'Visitor', status: 'New', linked: false },
        { id: 'MEM004', name: 'Bob Williams', phone: '+254 711 999 888', cell: 'Goshen Alpha', category: 'Member', status: 'Inactive', linked: true },
        { id: 'MEM005', name: 'Charlie Brown', phone: '+254 700 000 000', cell: 'Zion', category: 'Member', status: 'Active', linked: true },
    ];

    const ExportButton = ({ icon, label }) => (
        <button style={{
            background: 'transparent',
            border: '1px solid var(--border-color)',
            color: 'var(--text-muted)',
            borderRadius: '0.4rem',
            padding: '0.3rem 0.6rem',
            fontSize: '0.75rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem'
        }}>
            {icon} {label}
        </button>
    );

    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1rem',
            border: '1px solid var(--border-color)',
            overflow: 'hidden'
        }}>
            {/* Tabs & Filters Header */}
            <div style={{ borderBottom: '1px solid var(--border-color)', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>

                    {/* Tabs */}
                    <div style={{ display: 'flex', background: 'var(--border-color)', borderRadius: '0.5rem', padding: '0.25rem' }}>
                        <button
                            onClick={() => setActiveTab('regular')}
                            style={{
                                background: activeTab === 'regular' ? 'var(--primary)' : 'transparent',
                                color: activeTab === 'regular' ? 'var(--bg-color)' : 'var(--text-muted)',
                                border: 'none',
                                padding: '0.5rem 1.5rem',
                                borderRadius: '0.3rem',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            Regular Members <span style={{ fontSize: '0.75rem', opacity: 0.7, marginLeft: '4px' }}>(2.4k)</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('committed')}
                            style={{
                                background: activeTab === 'committed' ? 'var(--primary)' : 'transparent',
                                color: activeTab === 'committed' ? 'var(--bg-color)' : 'var(--text-muted)',
                                border: 'none',
                                padding: '0.5rem 1.5rem',
                                borderRadius: '0.3rem',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            Committed Members <span style={{ fontSize: '0.75rem', opacity: 0.7, marginLeft: '4px' }}>(850)</span>
                        </button>
                    </div>

                    {/* Search */}
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Search members..."
                            style={{
                                background: 'var(--surface-2)',
                                border: '1px solid var(--border-color)',
                                color: 'var(--text-color)',
                                padding: '0.6rem 1rem 0.6rem 2.2rem',
                                borderRadius: '0.5rem',
                                fontSize: '0.9rem',
                                minWidth: '250px'
                            }}
                        />
                        <span style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
                    </div>
                </div>

                {/* Export Tools */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginRight: '0.5rem' }}>Export:</span>
                    <ExportButton icon="📋" label="Copy" />
                    <ExportButton icon="📊" label="CSV" />
                    <ExportButton icon="📗" label="Excel" />
                    <ExportButton icon="📕" label="PDF" />
                    <ExportButton icon="🖨️" label="Print" />
                </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                        <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)', background: 'var(--surface-2)' }}>
                            <th style={{ textAlign: 'left', padding: '1rem' }}>Member ID</th>
                            <th style={{ textAlign: 'left', padding: '1rem' }}>Full Name</th>
                            <th style={{ textAlign: 'left', padding: '1rem' }}>Phone / Email</th>
                            <th style={{ textAlign: 'left', padding: '1rem' }}>Cell Group</th>
                            <th style={{ textAlign: 'left', padding: '1rem' }}>Category</th>
                            <th style={{ textAlign: 'left', padding: '1rem' }}>Status</th>
                            {activeTab === 'committed' && <th style={{ textAlign: 'center', padding: '1rem' }}>Linked</th>}
                            <th style={{ textAlign: 'right', padding: '1rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map(member => (
                            <tr key={member.id} style={{ borderBottom: '1px solid var(--surface-2)', color: 'var(--text-color)' }}>
                                <td style={{ padding: '1rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>{member.id}</td>
                                <td style={{ padding: '1rem', fontWeight: '500', color: 'var(--text-color)' }}>{member.name}</td>
                                <td style={{ padding: '1rem' }}>{member.phone}</td>
                                <td style={{ padding: '1rem' }}>
                                    {member.cell !== 'None' ? (
                                        <span style={{ background: 'rgba(34, 193, 230, 0.1)', color: 'var(--primary)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>{member.cell}</span>
                                    ) : (
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>-</span>
                                    )}
                                </td>
                                <td style={{ padding: '1rem' }}>{member.category}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        color: member.status === 'Active' ? '#4ade80' : (member.status === 'New' ? 'var(--primary)' : 'var(--text-muted)'),
                                        fontSize: '0.85rem'
                                    }}>
                                        ● {member.status}
                                    </span>
                                </td>
                                {activeTab === 'committed' && (
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                                        {member.linked ? (
                                            <span style={{ color: '#4ade80', fontSize: '1.2rem' }} title="Linked">✓</span>
                                        ) : (
                                            <span style={{ color: '#f59e0b', fontSize: '1.2rem' }} title="Unlinked">⚠️</span>
                                        )}
                                    </td>
                                )}
                                <td style={{ padding: '1rem', textAlign: 'right' }}>
                                    <button style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--primary)', borderRadius: '0.3rem', padding: '0.3rem 0.6rem', fontSize: '0.8rem', cursor: 'pointer' }}>View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <div>Showing 1 to 5 of 2,450 entries</div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button style={{ background: 'var(--border-color)', border: 'none', color: 'var(--text-color)', padding: '0.3rem 0.6rem', borderRadius: '0.3rem', cursor: 'pointer' }}>Previous</button>
                    <button style={{ background: 'var(--primary)', border: 'none', color: 'var(--bg-color)', padding: '0.3rem 0.6rem', borderRadius: '0.3rem', cursor: 'pointer', fontWeight: 'bold' }}>1</button>
                    <button style={{ background: 'var(--border-color)', border: 'none', color: 'var(--text-color)', padding: '0.3rem 0.6rem', borderRadius: '0.3rem', cursor: 'pointer' }}>2</button>
                    <button style={{ background: 'var(--border-color)', border: 'none', color: 'var(--text-color)', padding: '0.3rem 0.6rem', borderRadius: '0.3rem', cursor: 'pointer' }}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default MembersTable;
