import React, { useState } from 'react';

const CellsList = () => {
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
    const [searchTerm, setSearchTerm] = useState('');

    // Mock Data
    const cells = [
        { id: 1, name: 'Goshen Alpha', leader: 'John Doe', members: 12, location: 'Westlands', day: 'Wed 6pm', status: 'Active' },
        { id: 2, name: 'Zion Youth', leader: 'Sarah Smith', members: 25, location: 'Kilimani', day: 'Fri 7pm', status: 'Active' },
        { id: 3, name: 'Bethel Men', leader: 'Mike Jones', members: 8, location: 'CBD', day: 'Tue 7am', status: 'Inactive' },
        { id: 4, name: 'Grace Women', leader: 'Mary Jane', members: 15, location: 'Ngong Rd', day: 'Thu 6pm', status: 'Active' },
        { id: 5, name: 'Hope Kids', leader: 'Alice Wonder', members: 30, location: 'Main Hall', day: 'Sun 10am', status: 'Active' },
    ];

    const filteredCells = cells.filter(cell =>
        cell.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cell.leader.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1rem',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            {/* Toolbar */}
            <div style={{
                padding: '1.5rem',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, color: 'var(--text-color)', fontSize: '1.1rem' }}>All Cells</h3>
                    <span style={{ background: 'var(--border-color)', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{filteredCells.length}</span>
                </div>

                <div style={{ display: 'flex', gap: '1rem', flex: 1, justifyContent: 'flex-end', minWidth: '300px' }}>
                    <div style={{ position: 'relative', flex: 1, maxWidth: '300px' }}>
                        <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
                        <input
                            type="text"
                            placeholder="Search cells..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.6rem 1rem 0.6rem 2.5rem',
                                background: 'var(--bg-color)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '2rem',
                                color: 'var(--text-color)',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', background: 'var(--bg-color)', borderRadius: '0.5rem', padding: '0.2rem', border: '1px solid var(--border-color)' }}>
                        <button
                            onClick={() => setViewMode('grid')}
                            style={{
                                background: viewMode === 'grid' ? 'var(--border-color)' : 'transparent',
                                border: 'none',
                                color: viewMode === 'grid' ? 'var(--text-color)' : 'var(--text-muted)',
                                padding: '0.4rem 0.8rem',
                                borderRadius: '0.3rem',
                                cursor: 'pointer'
                            }}
                        >
                            🔲
                        </button>
                        <button
                            onClick={() => setViewMode('table')}
                            style={{
                                background: viewMode === 'table' ? 'var(--border-color)' : 'transparent',
                                border: 'none',
                                color: viewMode === 'table' ? 'var(--text-color)' : 'var(--text-muted)',
                                padding: '0.4rem 0.8rem',
                                borderRadius: '0.3rem',
                                cursor: 'pointer'
                            }}
                        >
                            ≣
                        </button>
                    </div>
                </div>
            </div>

            {/* List Content */}
            <div style={{ padding: '1.5rem', overflowX: 'auto' }}>
                {viewMode === 'grid' ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {filteredCells.map(cell => (
                            <div key={cell.id} style={{
                                background: 'var(--bg-color)',
                                borderRadius: '0.75rem',
                                padding: '1.25rem',
                                border: '1px solid var(--border-color)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem',
                                transition: 'transform 0.2s',
                                cursor: 'pointer'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                    <div style={{ fontWeight: '700', color: 'var(--text-color)', fontSize: '1.1rem' }}>{cell.name}</div>
                                    <span style={{
                                        background: cell.status === 'Active' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(148, 163, 184, 0.2)',
                                        color: cell.status === 'Active' ? '#4ade80' : 'var(--text-muted)',
                                        fontSize: '0.7rem',
                                        padding: '0.2rem 0.5rem',
                                        borderRadius: '0.25rem',
                                        textTransform: 'uppercase',
                                        fontWeight: '600'
                                    }}>
                                        {cell.status}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', color: 'var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                        {cell.leader.charAt(0)}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.9rem', color: '#e2e8f0' }}>{cell.leader}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Leader</div>
                                    </div>
                                </div>
                                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Members</div>
                                        <div style={{ color: 'var(--text-color)' }}>{cell.members}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Meeting</div>
                                        <div style={{ color: 'var(--text-color)', fontSize: '0.9rem' }}>{cell.day}</div>
                                    </div>
                                </div>
                                <button style={{ marginTop: '0.5rem', width: '100%', padding: '0.5rem', background: 'var(--border-color)', border: 'none', borderRadius: '0.5rem', color: 'var(--primary)', fontSize: '0.85rem', cursor: 'pointer' }}>
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: '#e2e8f0' }}>
                        <thead>
                            <tr style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--border-color)' }}>
                                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem' }}>Name</th>
                                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem' }}>Leader</th>
                                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem' }}>Members</th>
                                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem' }}>Location</th>
                                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem' }}>Schedule</th>
                                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem' }}>Status</th>
                                <th style={{ textAlign: 'right', padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCells.map(cell => (
                                <tr key={cell.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '1rem', fontWeight: '500' }}>{cell.name}</td>
                                    <td style={{ padding: '1rem' }}>{cell.leader}</td>
                                    <td style={{ padding: '1rem' }}>{cell.members}</td>
                                    <td style={{ padding: '1rem' }}>{cell.location}</td>
                                    <td style={{ padding: '1rem' }}>{cell.day}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            background: cell.status === 'Active' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(148, 163, 184, 0.1)',
                                            color: cell.status === 'Active' ? '#4ade80' : 'var(--text-muted)',
                                            fontSize: '0.75rem',
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '0.25rem'
                                        }}>
                                            {cell.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <button style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', marginRight: '0.5rem' }}>Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default CellsList;
