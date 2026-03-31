import React, { useState } from 'react';
import api from '../../../../services/api';

const RedeemPledgeModal = ({ pledge, onClose, onSuccess }) => {
    const remaining = (pledge.pledged_amount || 0) - (pledge.redeemed_amount || 0);
    const [form, setForm] = useState({
        redeemed_amount: '',
        mpesa_code: '',
        payment_method: 'cash',
        date: new Date().toISOString().split('T')[0]
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const amount = parseFloat(form.redeemed_amount);
        if (!amount || amount <= 0) { setError('Please enter a valid amount'); return; }
        if (amount > remaining + 0.01) { setError(`Amount exceeds remaining balance of KES ${remaining.toLocaleString()}`); return; }
        setSubmitting(true);
        setError('');
        try {
            const data = await api.post('redeem_pledge.php', {
                pledge_id: pledge.id,
                redeemed_amount: amount,
                mpesa_code: form.mpesa_code,
                payment_method: form.payment_method,
                date: form.date
            });
            if (data.success) { onSuccess?.(); onClose(); }
            else setError(data.error || 'Failed to redeem pledge');
        } catch (err) { setError('Failed to redeem pledge'); }
        finally { setSubmitting(false); }
    };

    const fieldStyle = { width: '100%', padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)', fontSize: '0.9rem' };
    const labelStyle = { display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem', fontWeight: '600' };
    const pct = pledge.pledged_amount > 0 ? Math.min(100, (pledge.redeemed_amount / pledge.pledged_amount) * 100) : 0;

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: 'var(--surface-1, #1A1625)', borderRadius: '1rem', padding: '2rem', width: '90%', maxWidth: '500px', border: '1px solid var(--border-color, rgba(255,255,255,0.1))', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', maxHeight: '90vh', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--text-color)' }}>💳 Redeem Pledge</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                {/* Pledge summary */}
                <div style={{ background: 'var(--bg-color)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: '600', color: 'var(--text-color)' }}>{pledge.full_name}</span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{pledge.purpose || 'General'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        <span>Pledged: <strong style={{ color: 'var(--text-color)' }}>KES {(pledge.pledged_amount || 0).toLocaleString()}</strong></span>
                        <span>Redeemed: <strong style={{ color: '#4ade80' }}>KES {(pledge.redeemed_amount || 0).toLocaleString()}</strong></span>
                    </div>
                    <div style={{ background: 'var(--border-color)', borderRadius: '1rem', height: '6px', overflow: 'hidden', marginBottom: '0.3rem' }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: pct >= 100 ? '#4ade80' : pct >= 50 ? '#f59e0b' : '#f87171', borderRadius: '1rem' }}></div>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Remaining: <strong style={{ color: '#f59e0b' }}>KES {remaining.toLocaleString()}</strong>
                    </div>
                </div>

                {error && <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '0.5rem', padding: '0.75rem', marginBottom: '1rem', color: '#f87171', fontSize: '0.85rem' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Amount (KES) *</label>
                            <input type="number" min="0" step="0.01" max={remaining} value={form.redeemed_amount} onChange={e => setForm(f => ({ ...f, redeemed_amount: e.target.value }))} placeholder={`Max: ${remaining.toLocaleString()}`} style={fieldStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Date</label>
                            <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={fieldStyle} />
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Payment Method</label>
                            <select value={form.payment_method} onChange={e => setForm(f => ({ ...f, payment_method: e.target.value }))} style={fieldStyle}>
                                <option value="cash">Cash</option>
                                <option value="online payment">Online Payment</option>
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>M-Pesa Code</label>
                            <input value={form.mpesa_code} onChange={e => setForm(f => ({ ...f, mpesa_code: e.target.value }))} placeholder="e.g. TJOIZ85A2T" maxLength={10} style={fieldStyle} />
                        </div>
                    </div>
                    <button type="submit" disabled={submitting}
                        style={{ padding: '0.75rem', borderRadius: '0.5rem', border: 'none', background: '#4ade80', color: '#000', fontWeight: '700', fontSize: '1rem', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1 }}>
                        {submitting ? 'Processing...' : 'Redeem Pledge'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RedeemPledgeModal;
