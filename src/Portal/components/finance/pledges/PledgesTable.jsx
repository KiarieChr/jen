import React, { useState, useEffect } from 'react';
import api from '../../../../services/api';

const PledgesTable = ({ refreshKey = 0, onMakePledge, onRedeemPledge }) => {
    const [pledges, setPledges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, total_pages: 1 });

    useEffect(() => {
        fetchPledges();
    }, [pagination.page, search, refreshKey]);

    const fetchPledges = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ page: pagination.page, limit: pagination.limit, search });
            const data = await api.get(`get_pledges.php?${params}`);
            if (data.success) {
                setPledges(data.data.pledges || []);
                setPagination(prev => ({
                    ...prev,
                    total: data.data.pagination?.total || 0,
                    total_pages: data.data.pagination?.total_pages || 1
                }));
            }
        } catch (err) {
            console.error('Failed to load pledges:', err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (redeemed, total) => {
        const pct = total > 0 ? (redeemed / total) * 100 : 0;
        if (pct >= 100) return '#4ade80';
        if (pct >= 50) return '#f59e0b';
        return '#f87171';
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
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '700', color: 'var(--text-color)' }}>Pledges</h3>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <input value={search} onChange={e => { setSearch(e.target.value); setPagination(p => ({ ...p, page: 1 })); }}
                        placeholder="Search pledges..."
                        style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)', fontSize: '0.85rem', width: '250px' }}
                    />
                    {onMakePledge && <button onClick={onMakePledge} style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', background: 'var(--primary)', color: 'var(--bg-color)', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>+ Make Pledge</button>}
                </div>
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                            {['Date', 'Name', 'Purpose', 'Pledged', 'Redeemed', 'Progress', 'Status', 'Actions'].map(h => (
                                <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={8} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</td></tr>
                        ) : pledges.length === 0 ? (
                            <tr><td colSpan={8} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No pledges found</td></tr>
                        ) : (
                            pledges.map((p, i) => {
                                const pct = p.pledged_amount > 0 ? Math.min(100, (p.redeemed_amount / p.pledged_amount) * 100) : 0;
                                return (
                                    <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}
                                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                        <td style={{ padding: '0.75rem 1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>{p.date}</td>
                                        <td style={{ padding: '0.75rem 1rem', fontSize: '0.9rem', color: 'var(--text-color)', fontWeight: '500' }}>{p.full_name}</td>
                                        <td style={{ padding: '0.75rem 1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{p.purpose || '—'}</td>
                                        <td style={{ padding: '0.75rem 1rem', fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-color)' }}>KES {(p.pledged_amount || 0).toLocaleString()}</td>
                                        <td style={{ padding: '0.75rem 1rem', fontSize: '0.9rem', fontWeight: '600', color: '#4ade80' }}>KES {(p.redeemed_amount || 0).toLocaleString()}</td>
                                        <td style={{ padding: '0.75rem 1rem', width: '120px' }}>
                                            <div style={{ background: 'var(--border-color)', borderRadius: '1rem', height: '6px', overflow: 'hidden' }}>
                                                <div style={{ width: `${pct}%`, height: '100%', background: getStatusColor(p.redeemed_amount, p.pledged_amount), borderRadius: '1rem', transition: 'width 0.3s' }}></div>
                                            </div>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>{pct.toFixed(0)}%</div>
                                        </td>
                                        <td style={{ padding: '0.75rem 1rem' }}>
                                            <span style={{
                                                padding: '0.2rem 0.6rem',
                                                borderRadius: '0.3rem',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                background: `${getStatusColor(p.redeemed_amount, p.pledged_amount)}20`,
                                                color: getStatusColor(p.redeemed_amount, p.pledged_amount)
                                            }}>{pct >= 100 ? 'Fulfilled' : pct > 0 ? 'Partial' : 'Pending'}</span>
                                        </td>
                                        <td style={{ padding: '0.75rem 1rem' }}>
                                            {pct < 100 && onRedeemPledge && (
                                                <button onClick={() => onRedeemPledge(p)}
                                                    style={{ padding: '0.3rem 0.7rem', borderRadius: '0.3rem', border: 'none', background: '#4ade8030', color: '#4ade80', fontWeight: '600', fontSize: '0.75rem', cursor: 'pointer' }}>
                                                    Redeem
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
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

export default PledgesTable;
