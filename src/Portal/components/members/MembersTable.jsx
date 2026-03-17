import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://jesusenthroned_net.local/api/';

const MembersTable = () => {
    const [activeTab, setActiveTab] = useState('regular'); // regular | committed
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        total: 0,
        total_pages: 1
    });
    const [stats, setStats] = useState({ regular: 0, committed: 0 });

    useEffect(() => {
        fetchMembers();
    }, [activeTab, pagination.page, search]);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch(`${API_URL}get_member_stats.php`);
            const data = await response.json();
            if (data.success) {
                setStats({
                    regular: data.data.total_members,
                    committed: data.data.committed_members
                });
            }
        } catch (err) {
            console.error('Failed to load stats:', err);
        }
    };

    const fetchMembers = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                type: activeTab,
                page: pagination.page,
                limit: pagination.limit,
                search: search
            });
            const response = await fetch(`${API_URL}get_members.php?${params}`);
            const data = await response.json();
            if (data.success) {
                setMembers(data.data);
                setPagination(prev => ({
                    ...prev,
                    total: data.pagination.total,
                    total_pages: data.pagination.total_pages
                }));
            }
        } catch (err) {
            console.error('Failed to load members:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.total_pages) {
            setPagination(prev => ({ ...prev, page: newPage }));
        }
    };

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
                            onClick={() => handleTabChange('regular')}
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
                            Regular Members <span style={{ fontSize: '0.75rem', opacity: 0.7, marginLeft: '4px' }}>({stats.regular.toLocaleString()})</span>
                        </button>
                        <button
                            onClick={() => handleTabChange('committed')}
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
                            Committed Members <span style={{ fontSize: '0.75rem', opacity: 0.7, marginLeft: '4px' }}>({stats.committed.toLocaleString()})</span>
                        </button>
                    </div>

                    {/* Search */}
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Search members..."
                            value={search}
                            onChange={handleSearch}
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
                            <th style={{ textAlign: 'left', padding: '1rem' }}>ID</th>
                            <th style={{ textAlign: 'left', padding: '1rem' }}>Full Name</th>
                            <th style={{ textAlign: 'left', padding: '1rem' }}>Phone</th>
                            <th style={{ textAlign: 'left', padding: '1rem' }}>Email</th>
                            {activeTab === 'regular' && <th style={{ textAlign: 'left', padding: '1rem' }}>Invited By</th>}
                            {activeTab === 'committed' && <th style={{ textAlign: 'left', padding: '1rem' }}>Residence</th>}
                            <th style={{ textAlign: 'left', padding: '1rem' }}>Status</th>
                            {activeTab === 'committed' && <th style={{ textAlign: 'center', padding: '1rem' }}>Linked</th>}
                            <th style={{ textAlign: 'right', padding: '1rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={activeTab === 'committed' ? 8 : 7} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    Loading...
                                </td>
                            </tr>
                        ) : members.length === 0 ? (
                            <tr>
                                <td colSpan={activeTab === 'committed' ? 8 : 7} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    No members found
                                </td>
                            </tr>
                        ) : (
                            members.map(member => (
                                <tr key={member.id} style={{ borderBottom: '1px solid var(--surface-2)', color: 'var(--text-color)' }}>
                                    <td style={{ padding: '1rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>{member.id}</td>
                                    <td style={{ padding: '1rem', fontWeight: '500', color: 'var(--text-color)' }}>
                                        {member.name}
                                        {member.status === 'New' && (
                                            <span style={{
                                                background: 'rgba(245, 158, 11, 0.2)',
                                                color: '#f59e0b',
                                                padding: '0.1rem 0.4rem',
                                                borderRadius: '4px',
                                                fontSize: '0.7rem',
                                                marginLeft: '0.5rem'
                                            }}>New</span>
                                        )}
                                    </td>
                                    <td style={{ padding: '1rem' }}>{member.phone}</td>
                                    <td style={{ padding: '1rem' }}>{member.email}</td>
                                    {activeTab === 'regular' && <td style={{ padding: '1rem' }}>{member.department || '-'}</td>}
                                    {activeTab === 'committed' && <td style={{ padding: '1rem' }}>{member.residence || '-'}</td>}
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            color: member.status === 'Active' ? '#4ade80' : (member.status === 'New' ? 'var(--primary)' : 'var(--text-muted)'),
                                            fontSize: '0.85rem'
                                        }}>
                                            ● {member.status || 'Active'}
                                        </span>
                                    </td>
                                    {activeTab === 'committed' && (
                                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                                            {member.linked ? (
                                                <span style={{ color: '#4ade80', fontSize: '1.2rem' }} title={`Linked to ID: ${member.member_id}`}>✓</span>
                                            ) : (
                                                <span style={{ color: '#f59e0b', fontSize: '1.2rem' }} title="Not linked">⚠️</span>
                                            )}
                                        </td>
                                    )}
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <button style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--primary)', borderRadius: '0.3rem', padding: '0.3rem 0.6rem', fontSize: '0.8rem', cursor: 'pointer' }}>View</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <div>Showing {members.length > 0 ? ((pagination.page - 1) * pagination.limit + 1) : 0} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total.toLocaleString()} entries</div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1}
                        style={{ background: 'var(--border-color)', border: 'none', color: 'var(--text-color)', padding: '0.3rem 0.6rem', borderRadius: '0.3rem', cursor: pagination.page === 1 ? 'not-allowed' : 'pointer', opacity: pagination.page === 1 ? 0.5 : 1 }}>
                        Previous
                    </button>
                    {Array.from({ length: Math.min(5, pagination.total_pages) }, (_, i) => {
                        let pageNum;
                        if (pagination.total_pages <= 5) {
                            pageNum = i + 1;
                        } else if (pagination.page <= 3) {
                            pageNum = i + 1;
                        } else if (pagination.page >= pagination.total_pages - 2) {
                            pageNum = pagination.total_pages - 4 + i;
                        } else {
                            pageNum = pagination.page - 2 + i;
                        }
                        return (
                            <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                style={{
                                    background: pagination.page === pageNum ? 'var(--primary)' : 'var(--border-color)',
                                    border: 'none',
                                    color: pagination.page === pageNum ? 'var(--bg-color)' : 'var(--text-color)',
                                    padding: '0.3rem 0.6rem',
                                    borderRadius: '0.3rem',
                                    cursor: 'pointer',
                                    fontWeight: pagination.page === pageNum ? 'bold' : 'normal'
                                }}>
                                {pageNum}
                            </button>
                        );
                    })}
                    <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === pagination.total_pages}
                        style={{ background: 'var(--border-color)', border: 'none', color: 'var(--text-color)', padding: '0.3rem 0.6rem', borderRadius: '0.3rem', cursor: pagination.page === pagination.total_pages ? 'not-allowed' : 'pointer', opacity: pagination.page === pagination.total_pages ? 0.5 : 1 }}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MembersTable;
