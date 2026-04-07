import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

const CreateCellModal = ({ onClose, onCreated }) => {
    const [formData, setFormData] = useState({
        cellName: '',
        category: 'General',
        leader: '',
        day: 'Wednesday',
        time: '18:00',
        location: '',
        capacity: 15
    });
    const [members, setMembers] = useState([]);
    const [leaderSearch, setLeaderSearch] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch unassigned members for leader selection
        const fetchMembers = async () => {
            try {
                const res = await api.get('get_unassigned_members.php');
                if (res.success) setMembers(res.data.members);
            } catch (err) { console.error(err); }
        };
        fetchMembers();
    }, []);

    const filteredMembers = members.filter(m =>
        `${m.first_name} ${m.last_name}`.toLowerCase().includes(leaderSearch.toLowerCase())
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.leader) { setError('Please select a cell leader'); return; }
        setSubmitting(true);
        setError('');
        try {
            const res = await api.post('create_cell.php', formData);
            if (res.success) {
                if (onCreated) onCreated();
                else onClose();
            } else {
                setError(res.error || 'Failed to create cell');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create cell');
        } finally {
            setSubmitting(false);
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
        marginTop: '0.5rem'
    };

    const labelStyle = {
        color: 'var(--text-muted)',
        fontSize: '0.85rem',
        fontWeight: '500'
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
                border: '1px solid var(--border-color, rgba(255,255,255,0.1))',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                color: 'var(--text-color, #f8fafc)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-color)', margin: 0 }}>Create New Cell</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
                    {error && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.5rem', padding: '0.75rem', color: '#ef4444', fontSize: '0.85rem' }}>{error}</div>}

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                        <div>
                            <label style={labelStyle}>Cell Name</label>
                            <input
                                type="text"
                                name="cellName"
                                value={formData.cellName}
                                onChange={handleChange}
                                placeholder="e.g. Goshen Alpha"
                                style={inputStyle}
                                required
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                style={inputStyle}
                            >
                                <option>General</option>
                                <option>Youth</option>
                                <option>Men</option>
                                <option>Women</option>
                                <option>Kids</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <label style={labelStyle}>Cell Leader</label>
                        <input
                            type="text"
                            value={leaderSearch}
                            onChange={(e) => { setLeaderSearch(e.target.value); setFormData(prev => ({ ...prev, leader: '' })); }}
                            placeholder="Search member..."
                            style={inputStyle}
                        />
                        {formData.leader && <div style={{ fontSize: '0.8rem', color: 'var(--primary)', marginTop: '0.25rem' }}>Selected: {members.find(m => m.id == formData.leader) ? `${members.find(m => m.id == formData.leader).first_name} ${members.find(m => m.id == formData.leader).last_name}` : ''}</div>}
                        {leaderSearch && !formData.leader && filteredMembers.length > 0 && (
                            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--surface-1)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', maxHeight: '150px', overflowY: 'auto', zIndex: 10 }}>
                                {filteredMembers.slice(0, 10).map(m => (
                                    <div key={m.id} onClick={() => { setFormData(prev => ({ ...prev, leader: m.id })); setLeaderSearch(`${m.first_name} ${m.last_name}`); }}
                                        style={{ padding: '0.5rem 0.75rem', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--text-color)', borderBottom: '1px solid var(--border-color)' }}
                                        onMouseOver={e => e.currentTarget.style.background = 'var(--border-color)'}
                                        onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                                        {m.first_name} {m.last_name} <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>— {m.location || 'No location'}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                        <div>
                            <label style={labelStyle}>Meeting Day</label>
                            <select
                                name="day"
                                value={formData.day}
                                onChange={handleChange}
                                style={inputStyle}
                            >
                                <option>Monday</option>
                                <option>Tuesday</option>
                                <option>Wednesday</option>
                                <option>Thursday</option>
                                <option>Friday</option>
                                <option>Saturday</option>
                                <option>Sunday</option>
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Time</label>
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                style={inputStyle}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>Location / Area</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g. Westlands, Nairobi"
                            style={inputStyle}
                        />
                    </div>

                    <div>
                        <label style={labelStyle}>Max Capacity</label>
                        <input
                            type="number"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.5rem',
                                border: '1px solid var(--border-color)',
                                background: 'transparent',
                                color: 'var(--text-muted)',
                                cursor: 'pointer',
                                fontWeight: '600'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                background: submitting ? 'var(--text-muted)' : 'var(--primary)',
                                color: 'var(--bg-color)',
                                cursor: submitting ? 'not-allowed' : 'pointer',
                                fontWeight: '700'
                            }}
                        >
                            {submitting ? 'Creating...' : 'Create Cell'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCellModal;
