import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

const RecordContributionModal = ({ onClose, onSuccess }) => {
    const [form, setForm] = useState({ member: '', contritype: '', fund: '', amount: '', paymentmethod: '', date: new Date().toISOString().split('T')[0] });
    const [contriTypes, setContriTypes] = useState([]);
    const [funds, setFunds] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        api.get('get_contribution_options.php').then(d => {
            if (d.success) {
                setContriTypes(d.data.contribution_types || []);
                setFunds(d.data.funds || []);
                setPaymentMethods(d.data.payment_methods || []);
            }
        }).catch(() => {});
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.member || !form.contritype || !form.amount || !form.date) { setError('Please fill required fields'); return; }
        setSubmitting(true);
        setError('');
        try {
            const data = await api.post('add_contribution.php', { ...form, amount: parseFloat(form.amount) });
            if (data.success) { onSuccess?.(); onClose(); }
            else setError(data.error || 'Failed to record contribution');
        } catch (err) { setError('Failed to record contribution'); }
        finally { setSubmitting(false); }
    };

    const fieldStyle = { width: '100%', padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)', fontSize: '0.9rem' };
    const labelStyle = { display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem', fontWeight: '600' };

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: 'var(--surface-1, #1A1625)', borderRadius: '1rem', padding: '2rem', width: '90%', maxWidth: '500px', border: '1px solid var(--border-color, rgba(255,255,255,0.1))', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', maxHeight: '90vh', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--text-color)' }}>🤝 Record Contribution</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>
                {error && <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '0.5rem', padding: '0.75rem', marginBottom: '1rem', color: '#f87171', fontSize: '0.85rem' }}>{error}</div>}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={labelStyle}>Member Name *</label>
                        <input value={form.member} onChange={e => setForm(f => ({ ...f, member: e.target.value }))} placeholder="e.g. John Doe" style={fieldStyle} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Contribution Type *</label>
                            <select value={form.contritype} onChange={e => setForm(f => ({ ...f, contritype: e.target.value }))} style={fieldStyle}>
                                <option value="">Select...</option>
                                {contriTypes.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Fund</label>
                            <select value={form.fund} onChange={e => setForm(f => ({ ...f, fund: e.target.value }))} style={fieldStyle}>
                                <option value="">Select...</option>
                                {funds.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Amount (KES) *</label>
                            <input type="number" min="0" step="0.01" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} style={fieldStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Payment Method</label>
                            <select value={form.paymentmethod} onChange={e => setForm(f => ({ ...f, paymentmethod: e.target.value }))} style={fieldStyle}>
                                <option value="">Select...</option>
                                {paymentMethods.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label style={labelStyle}>Date *</label>
                        <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={fieldStyle} />
                    </div>
                    <button type="submit" disabled={submitting}
                        style={{ padding: '0.75rem', borderRadius: '0.5rem', border: 'none', background: 'var(--primary)', color: 'var(--bg-color)', fontWeight: '700', fontSize: '1rem', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1 }}>
                        {submitting ? 'Recording...' : 'Record Contribution'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RecordContributionModal;
