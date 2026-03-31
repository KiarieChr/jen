import React, { useState } from 'react';
import api from '../../../../services/api';

const MakePledgeModal = ({ onClose, onSuccess }) => {
    const [form, setForm] = useState({
        full_name: '', email: '', phone_no: '', pledges_amount: '',
        purpose: '', date: new Date().toISOString().split('T')[0],
        notes: '', pledge_type: '', attendees_sponsored: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.full_name || !form.email || !form.pledges_amount || !form.date) {
            setError('Name, email, amount, and date are required');
            return;
        }
        setSubmitting(true);
        setError('');
        try {
            const data = await api.post('add_pledge.php', {
                ...form,
                pledges_amount: parseFloat(form.pledges_amount),
                attendees_sponsored: form.attendees_sponsored ? parseInt(form.attendees_sponsored) : 0
            });
            if (data.success) { onSuccess?.(); onClose(); }
            else setError(data.error || 'Failed to record pledge');
        } catch (err) { setError('Failed to record pledge'); }
        finally { setSubmitting(false); }
    };

    const fieldStyle = { width: '100%', padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)', fontSize: '0.9rem' };
    const labelStyle = { display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem', fontWeight: '600' };

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: 'var(--surface-1, #1A1625)', borderRadius: '1rem', padding: '2rem', width: '90%', maxWidth: '500px', border: '1px solid var(--border-color, rgba(255,255,255,0.1))', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', maxHeight: '90vh', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--text-color)' }}>🙏 Make Pledge</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>
                {error && <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '0.5rem', padding: '0.75rem', marginBottom: '1rem', color: '#f87171', fontSize: '0.85rem' }}>{error}</div>}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={labelStyle}>Full Name *</label>
                        <input value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))} placeholder="e.g. John Doe" style={fieldStyle} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Email *</label>
                            <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="email@example.com" style={fieldStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Phone</label>
                            <input value={form.phone_no} onChange={e => setForm(f => ({ ...f, phone_no: e.target.value }))} placeholder="07XXXXXXXX" style={fieldStyle} />
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Amount (KES) *</label>
                            <input type="number" min="0" step="0.01" value={form.pledges_amount} onChange={e => setForm(f => ({ ...f, pledges_amount: e.target.value }))} style={fieldStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Date *</label>
                            <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={fieldStyle} />
                        </div>
                    </div>
                    <div>
                        <label style={labelStyle}>Purpose</label>
                        <input value={form.purpose} onChange={e => setForm(f => ({ ...f, purpose: e.target.value }))} placeholder="e.g. Building fund, Conference" style={fieldStyle} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Pledge Type</label>
                            <select value={form.pledge_type} onChange={e => setForm(f => ({ ...f, pledge_type: e.target.value }))} style={fieldStyle}>
                                <option value="">Select...</option>
                                <option value="general">General</option>
                                <option value="attendee">Attendee Sponsorship</option>
                                <option value="building">Building Fund</option>
                                <option value="missions">Missions</option>
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Attendees Sponsored</label>
                            <input type="number" min="0" value={form.attendees_sponsored} onChange={e => setForm(f => ({ ...f, attendees_sponsored: e.target.value }))} style={fieldStyle} />
                        </div>
                    </div>
                    <div>
                        <label style={labelStyle}>Notes</label>
                        <input value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="e.g. Payment timeline" style={fieldStyle} />
                    </div>
                    <button type="submit" disabled={submitting}
                        style={{ padding: '0.75rem', borderRadius: '0.5rem', border: 'none', background: 'var(--primary)', color: 'var(--bg-color)', fontWeight: '700', fontSize: '1rem', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1 }}>
                        {submitting ? 'Recording...' : 'Record Pledge'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MakePledgeModal;
