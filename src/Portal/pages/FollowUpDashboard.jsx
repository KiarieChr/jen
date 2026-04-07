import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';

const FollowUpDashboard = () => {
    const [followups, setFollowups] = useState([]);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    const fetchFollowups = useCallback(async (pageNum = 1) => {
        try {
            setLoading(true);
            const res = await api.get('get_followups.php', {
                params: { status: filter, page: pageNum, limit: 20 }
            });
            if (res.success) {
                setFollowups(res.data.followups);
                setStats(res.data.stats);
                setHasMore(res.data.pagination.has_more);
            }
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    }, [filter]);

    useEffect(() => { setPage(1); fetchFollowups(1); }, [fetchFollowups]);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const res = await api.post('update_followup.php', {
                followup_id: id,
                status: newStatus,
                notes: ''
            });
            if (res.success) fetchFollowups(page);
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to update');
        }
    };

    const statusColors = {
        pending: { bg: 'rgba(245, 158, 11, 0.1)', text: '#f59e0b', border: 'rgba(245, 158, 11, 0.3)' },
        completed: { bg: 'rgba(34, 197, 94, 0.1)', text: '#4ade80', border: 'rgba(34, 197, 94, 0.3)' },
        no_response: { bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444', border: 'rgba(239, 68, 68, 0.3)' }
    };

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-color)', margin: 0 }}>Follow-Up Management</h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Track and manage member follow-ups.</p>
                </div>
                <button onClick={() => setShowCreateModal(true)}
                    style={{ background: 'var(--primary)', color: 'var(--bg-color)', border: 'none', borderRadius: '0.5rem', padding: '0.75rem 1.5rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>+</span> New Follow-Up
                </button>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <StatCard icon="📋" value={stats.total ?? 0} label="Total Follow-Ups" color="var(--text-color)" />
                <StatCard icon="⏳" value={stats.pending ?? 0} label="Pending" color="#f59e0b" />
                <StatCard icon="✅" value={stats.completed ?? 0} label="Completed" color="#4ade80" />
                <StatCard icon="📵" value={stats.no_response ?? 0} label="No Response" color="#ef4444" />
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {[
                    { key: '', label: 'All' },
                    { key: 'pending', label: 'Pending' },
                    { key: 'completed', label: 'Completed' },
                    { key: 'no_response', label: 'No Response' }
                ].map(f => (
                    <button key={f.key} onClick={() => setFilter(f.key)}
                        style={{
                            padding: '0.4rem 1rem', borderRadius: '2rem', border: 'none', cursor: 'pointer',
                            background: filter === f.key ? 'rgba(34, 193, 230, 0.2)' : 'var(--surface-1)',
                            color: filter === f.key ? 'var(--primary)' : 'var(--text-muted)',
                            fontWeight: filter === f.key ? '600' : '400', fontSize: '0.85rem'
                        }}>
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Follow-up List */}
            <div style={{ background: 'var(--surface-1)', borderRadius: '1rem', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                {loading ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>
                ) : followups.length === 0 ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</div>
                        No follow-ups found
                    </div>
                ) : followups.map(fu => {
                    const sc = statusColors[fu.status] || statusColors.pending;
                    return (
                        <div key={fu.id} style={{
                            padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)',
                            display: 'flex', alignItems: 'center', gap: '1rem'
                        }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: sc.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                                {fu.followup_type === 'attendance' ? '📋' : fu.followup_type === 'welfare' ? '❤️' : fu.followup_type === 'new_member' ? '🆕' : '💬'}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                    <span style={{ color: 'var(--text-color)', fontWeight: '600' }}>{fu.first_name} {fu.last_name}</span>
                                    <span style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}`, fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '0.25rem', textTransform: 'capitalize' }}>
                                        {fu.status.replace('_', ' ')}
                                    </span>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{fu.followup_type}</span>
                                </div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>{fu.message}</div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                                    {fu.sent_at} • By: {fu.sent_by_name}
                                    {fu.phone_no && <> • 📞 {fu.phone_no}</>}
                                </div>
                            </div>
                            {fu.status === 'pending' && (
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button onClick={() => handleStatusUpdate(fu.id, 'completed')}
                                        style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '0.25rem', padding: '0.3rem 0.6rem', fontSize: '0.75rem', cursor: 'pointer' }}>
                                        ✅ Done
                                    </button>
                                    <button onClick={() => handleStatusUpdate(fu.id, 'no_response')}
                                        style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '0.25rem', padding: '0.3rem 0.6rem', fontSize: '0.75rem', cursor: 'pointer' }}>
                                        📵 No Response
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {hasMore && (
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <button onClick={() => { setPage(p => p + 1); fetchFollowups(page + 1); }}
                        style={{ background: 'var(--surface-1)', color: 'var(--primary)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.5rem 1.5rem', cursor: 'pointer' }}>
                        Load More
                    </button>
                </div>
            )}

            {showCreateModal && <CreateFollowUpModal onClose={() => setShowCreateModal(false)} onCreated={() => { setShowCreateModal(false); fetchFollowups(1); }} />}
        </div>
    );
};

const StatCard = ({ icon, value, label, color }) => (
    <div style={{ background: 'var(--surface-1)', borderRadius: '1rem', padding: '1.25rem', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ fontSize: '1.5rem' }}>{icon}</div>
        <div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: color || 'var(--text-color)', lineHeight: 1 }}>{value}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.2rem' }}>{label}</div>
        </div>
    </div>
);

const CreateFollowUpModal = ({ onClose, onCreated }) => {
    const [members, setMembers] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedMember, setSelectedMember] = useState(null);
    const [message, setMessage] = useState('');
    const [followupType, setFollowupType] = useState('general');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await api.get('get_members.php', { params: { limit: 200 } });
                if (res.success) setMembers(res.data?.members || []);
            } catch (err) { console.error(err); }
        };
        fetch();
    }, []);

    const filtered = members.filter(m =>
        `${m.first_name} ${m.last_name}`.toLowerCase().includes(search.toLowerCase())
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedMember) return;
        setSubmitting(true);
        try {
            const res = await api.post('create_followup.php', {
                member_id: selectedMember.id,
                message,
                followup_type: followupType
            });
            if (res.success) onCreated();
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to create follow-up');
        } finally { setSubmitting(false); }
    };

    const inputStyle = { width: '100%', padding: '0.75rem', background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', color: 'var(--text-color)', fontSize: '0.9rem', marginTop: '0.5rem' };

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }}>
            <div style={{ background: 'var(--surface-1)', padding: '2rem', borderRadius: '1rem', width: '100%', maxWidth: '500px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.3rem', color: 'var(--text-color)', margin: 0 }}>New Follow-Up</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
                    <div style={{ position: 'relative' }}>
                        <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Member</label>
                        <input type="text" value={search}
                            onChange={(e) => { setSearch(e.target.value); setSelectedMember(null); }}
                            placeholder="Search member..." style={inputStyle} />
                        {selectedMember && <div style={{ fontSize: '0.8rem', color: 'var(--primary)', marginTop: '0.25rem' }}>Selected: {selectedMember.first_name} {selectedMember.last_name}</div>}
                        {search && !selectedMember && filtered.length > 0 && (
                            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--surface-1)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', maxHeight: '150px', overflow: 'auto', zIndex: 10 }}>
                                {filtered.slice(0, 10).map(m => (
                                    <div key={m.id} onClick={() => { setSelectedMember(m); setSearch(`${m.first_name} ${m.last_name}`); }}
                                        style={{ padding: '0.5rem 0.75rem', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--text-color)', borderBottom: '1px solid var(--border-color)' }}
                                        onMouseOver={e => e.currentTarget.style.background = 'var(--border-color)'}
                                        onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                                        {m.first_name} {m.last_name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Type</label>
                        <select value={followupType} onChange={(e) => setFollowupType(e.target.value)} style={inputStyle}>
                            <option value="general">General</option>
                            <option value="attendance">Attendance</option>
                            <option value="welfare">Welfare</option>
                            <option value="new_member">New Member</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Message</label>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)}
                            placeholder="Follow-up message..." rows={4}
                            style={{ ...inputStyle, resize: 'vertical' }} required />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <button type="button" onClick={onClose}
                            style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer' }}>
                            Cancel
                        </button>
                        <button type="submit" disabled={submitting || !selectedMember}
                            style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none', background: (submitting || !selectedMember) ? 'var(--text-muted)' : 'var(--primary)', color: 'var(--bg-color)', fontWeight: '700', cursor: (submitting || !selectedMember) ? 'not-allowed' : 'pointer' }}>
                            {submitting ? 'Creating...' : 'Create Follow-Up'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FollowUpDashboard;
