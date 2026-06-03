import React, { useState, useEffect } from 'react';
import api, { API_BASE_URL as API_URL } from '../../services/api';

const EvangelismDashboard = () => {
    const [souls, setSouls] = useState([]);
    const [stats, setStats] = useState(null);
    const [cells, setCells] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSoulModal, setShowSoulModal] = useState(false);
    const [showFollowupModal, setShowFollowupModal] = useState(false);
    const [selectedSoul, setSelectedSoul] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [soulsRes, statsRes, cellsRes] = await Promise.all([
                api.get('get_evangelism_souls.php'),
                api.get('get_evangelism_stats.php'),
                api.get('get_cells.php')
            ]);

            if (soulsRes.success) setSouls(soulsRes.data.souls);
            if (statsRes.success) setStats(statsRes.data);
            if (cellsRes.success) setCells(cellsRes.data.cells);

        } catch (err) {
            console.error('Error fetching evangelism data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ color: 'var(--primary)', margin: 0 }}>Soul Winning & Evangelism</h1>
                <button 
                    onClick={() => setShowSoulModal(true)}
                    style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: '600' }}
                >
                    + Record New Soul
                </button>
            </div>

            {/* Stats Overview */}
            {stats && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div className="stat-card" style={{ background: 'var(--surface-1)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                        <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>Total Souls Won</p>
                        <h2 style={{ margin: '0.5rem 0 0', color: 'white' }}>{stats.total}</h2>
                    </div>
                    <div className="stat-card" style={{ background: 'var(--surface-1)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                        <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>Joined Cells</p>
                        <h2 style={{ margin: '0.5rem 0 0', color: '#10b981' }}>{stats.cell_stats.actually_joined_cell}</h2>
                    </div>
                    <div className="stat-card" style={{ background: 'var(--surface-1)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                        <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>Following Up</p>
                        <h2 style={{ margin: '0.5rem 0 0', color: '#22c1e6' }}>{stats.status_counts.find(s => s.status === 'following_up')?.count || 0}</h2>
                    </div>
                    <div className="stat-card" style={{ background: 'var(--surface-1)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                        <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>Established</p>
                        <h2 style={{ margin: '0.5rem 0 0', color: '#a855f7' }}>{stats.status_counts.find(s => s.status === 'established')?.count || 0}</h2>
                    </div>
                </div>
            )}

            {/* Souls Table */}
            <div style={{ background: 'var(--surface-1)', borderRadius: '12px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                            <th style={{ padding: '1rem' }}>Name</th>
                            <th style={{ padding: '1rem' }}>Won Date</th>
                            <th style={{ padding: '1rem' }}>Cell Assignment</th>
                            <th style={{ padding: '1rem' }}>Status</th>
                            <th style={{ padding: '1rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {souls.map(soul => (
                            <tr key={soul.id} style={{ borderTop: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ fontWeight: '600' }}>{soul.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{soul.phone || 'No phone'}</div>
                                </td>
                                <td style={{ padding: '1rem' }}>{new Date(soul.won_date).toLocaleDateString()}</td>
                                <td style={{ padding: '1rem' }}>
                                    {soul.cell_name ? (
                                        <span style={{ padding: '0.25rem 0.75rem', borderRadius: '4px', background: 'rgba(34, 193, 230, 0.1)', color: 'var(--primary)', fontSize: '0.85rem' }}>
                                            {soul.cell_name}
                                        </span>
                                    ) : (
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Not Assigned</span>
                                    )}
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{ 
                                        padding: '0.25rem 0.75rem', 
                                        borderRadius: '20px', 
                                        fontSize: '0.75rem', 
                                        textTransform: 'uppercase',
                                        fontWeight: '700',
                                        background: soul.status === 'established' ? 'rgba(16, 185, 129, 0.1)' : soul.status === 'following_up' ? 'rgba(34, 193, 230, 0.1)' : 'rgba(255,255,255,0.05)',
                                        color: soul.status === 'established' ? '#10b981' : soul.status === 'following_up' ? '#22c1e6' : 'white'
                                    }}>
                                        {soul.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <button 
                                        onClick={() => { setSelectedSoul(soul); setShowFollowupModal(true); }}
                                        style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border-color)', cursor: 'pointer' }}
                                    >
                                        Log Follow-up
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showSoulModal && (
                <AddSoulModal 
                    cells={cells} 
                    onClose={() => setShowSoulModal(false)} 
                    onSave={fetchData} 
                />
            )}

            {showFollowupModal && selectedSoul && (
                <LogFollowupModal 
                    soul={selectedSoul} 
                    onClose={() => setShowFollowupModal(false)} 
                    onSave={fetchData} 
                />
            )}
        </div>
    );
};

const AddSoulModal = ({ cells, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        location: '',
        won_date: new Date().toISOString().split('T')[0],
        cell_id: '',
        notes: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('add_evangelism_soul.php', formData);
            if (response.success) {
                onSave();
                onClose();
            } else {
                alert(response.error || 'Failed to save');
            }
        } catch (err) {
            console.error('Save error:', err);
        }
    };

    return (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: 'var(--bg-color)', padding: '2rem', borderRadius: '16px', width: '100%', maxWidth: '500px', border: '1px solid var(--border-color)' }}>
                <h2>Record New Soul</h2>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                    <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--surface-1)', color: 'white', border: '1px solid var(--border-color)' }} />
                    <input type="text" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--surface-1)', color: 'white', border: '1px solid var(--border-color)' }} />
                    <input type="date" value={formData.won_date} onChange={e => setFormData({...formData, won_date: e.target.value})} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--surface-1)', color: 'white', border: '1px solid var(--border-color)' }} />
                    <select value={formData.cell_id} onChange={e => setFormData({...formData, cell_id: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--surface-1)', color: 'white', border: '1px solid var(--border-color)' }}>
                        <option value="">Assign to Cell (Optional)</option>
                        {cells.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <textarea placeholder="Notes" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--surface-1)', color: 'white', border: '1px solid var(--border-color)', height: '80px' }} />
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button type="button" onClick={onClose} style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: 'white', border: 'none', cursor: 'pointer' }}>Cancel</button>
                        <button type="submit" style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer' }}>Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const LogFollowupModal = ({ soul, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        soul_id: soul.id,
        followup_date: new Date().toISOString().split('T')[0],
        method: 'call',
        joined_session: false,
        joined_cell: false,
        session_details: '',
        feedback: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('add_evangelism_followup.php', formData);
            if (response.success) {
                onSave();
                onClose();
            } else {
                alert(response.error || 'Failed to log');
            }
        } catch (err) {
            console.error('Log error:', err);
        }
    };

    return (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: 'var(--bg-color)', padding: '2rem', borderRadius: '16px', width: '100%', maxWidth: '500px', border: '1px solid var(--border-color)' }}>
                <h2 style={{ marginBottom: '0.5rem' }}>Log Follow-up</h2>
                <p style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>For: {soul.name}</p>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <input type="date" value={formData.followup_date} onChange={e => setFormData({...formData, followup_date: e.target.value})} required style={{ padding: '0.75rem', borderRadius: '8px', background: 'var(--surface-1)', color: 'white', border: '1px solid var(--border-color)' }} />
                        <select value={formData.method} onChange={e => setFormData({...formData, method: e.target.value})} style={{ padding: '0.75rem', borderRadius: '8px', background: 'var(--surface-1)', color: 'white', border: '1px solid var(--border-color)' }}>
                            <option value="call">Phone Call</option>
                            <option value="whatsapp">WhatsApp</option>
                            <option value="visit">Visit</option>
                            <option value="sms">SMS</option>
                        </select>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                            <input type="checkbox" checked={formData.joined_session} onChange={e => setFormData({...formData, joined_session: e.target.checked})} />
                            Joined Session
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                            <input type="checkbox" checked={formData.joined_cell} onChange={e => setFormData({...formData, joined_cell: e.target.checked})} />
                            Joined Cell
                        </label>
                    </div>

                    <input type="text" placeholder="Which Session? (e.g. Sunday Service)" value={formData.session_details} onChange={e => setFormData({...formData, session_details: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--surface-1)', color: 'white', border: '1px solid var(--border-color)' }} />
                    <textarea placeholder="Feedback / Feedback from soul" value={formData.feedback} onChange={e => setFormData({...formData, feedback: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--surface-1)', color: 'white', border: '1px solid var(--border-color)', height: '80px' }} />
                    
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button type="button" onClick={onClose} style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: 'white', border: 'none', cursor: 'pointer' }}>Cancel</button>
                        <button type="submit" style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer' }}>Log Activity</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EvangelismDashboard;
