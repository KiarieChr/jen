import React, { useState, useEffect } from 'react';
import api from '../../../../services/api';

const ContributionsTable = () => {
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, total_pages: 1 });

    useEffect(() => {
        fetchContributions();
    }, [pagination.page, search]);

    const fetchContributions = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ page: pagination.page, limit: pagination.limit, search });
            const data = await api.get(`get_contributions.php?${params}`);
            if (data.success) {
                setContributions(data.data.contributions || []);
                setPagination(prev => ({
                    ...prev,
                    total: data.data.pagination?.total || 0,
                    total_pages: data.data.pagination?.total_pages || 1
                }));
            }
        } catch (err) {
            console.error('Failed to load contributions:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1rem',
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            marginBottom: '1.5rem'
        }}>
            <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)' }}>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '700', color: 'var(--text-color)' }}>Contributions</h3>
                <input value={search} onChange={e => { setSearch(e.target.value); setPagination(p => ({ ...p, page: 1 })); }}
                    placeholder="Search contributions..."
                    style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)', fontSize: '0.85rem', width: '250px' }}
                />
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                            {['Date', 'Member', 'Type', 'Fund', 'Amount', 'Method'].map(h => (
                                <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</td></tr>
                        ) : contributions.length === 0 ? (
                            <tr><td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No contributions found</td></tr>
                        ) : (
                            contributions.map((c, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>{c.date}</td>
                                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.9rem', color: 'var(--text-color)', fontWeight: '500' }}>{c.member}</td>
                                    <td style={{ padding: '0.75rem 1rem' }}>
                                        <span style={{ padding: '0.2rem 0.6rem', borderRadius: '0.3rem', fontSize: '0.75rem', fontWeight: '600', background: 'rgba(34,193,230,0.1)', color: '#22c1e6' }}>{c.type}</span>
                                    </td>
                                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{c.fund || '—'}</td>
                                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.9rem', fontWeight: '700', color: '#4ade80' }}>KES {(c.amount || 0).toLocaleString()}</td>
                                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{c.method || '—'}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <div>Page {pagination.page} of {pagination.total_pages} ({(pagination.total || 0).toLocaleString()} total)</div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => setPagination(p => ({ ...p, page: Math.max(1, p.page - 1) }))} disabled={pagination.page === 1}
                        style={{ background: 'var(--border-color)', border: 'none', color: 'var(--text-color)', padding: '0.3rem 0.6rem', borderRadius: '0.3rem', cursor: pagination.page === 1 ? 'not-allowed' : 'pointer', opacity: pagination.page === 1 ? 0.5 : 1 }}>‹ Prev</button>
                    <button onClick={() => setPagination(p => ({ ...p, page: Math.min(p.total_pages, p.page + 1) }))} disabled={pagination.page >= pagination.total_pages}
                        style={{ background: 'var(--border-color)', border: 'none', color: 'var(--text-color)', padding: '0.3rem 0.6rem', borderRadius: '0.3rem', cursor: pagination.page >= pagination.total_pages ? 'not-allowed' : 'pointer', opacity: pagination.page >= pagination.total_pages ? 0.5 : 1 }}>Next ›</button>
                </div>
            </div>
        </div>
    );
};

export default ContributionsTable;
