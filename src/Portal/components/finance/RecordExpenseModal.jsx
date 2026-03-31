import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

const RecordExpenseModal = ({ onClose, onSuccess }) => {
    const [form, setForm] = useState({ expensetype: '', expensetype_id: '', amount: '', date: new Date().toISOString().split('T')[0], description: '' });
    const [types, setTypes] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        api.get('get_expense_types.php').then(d => { if (d.success) setTypes(d.data.types || []); }).catch(() => {});
    }, []);

    const handleTypeChange = (e) => {
        const selectedId = e.target.value;
        const type = types.find(t => String(t.id) === selectedId);
        setForm(f => ({ ...f, expensetype_id: selectedId, expensetype: type ? type.name : '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.expensetype_id || !form.amount || !form.date) { setError('Please fill required fields'); return; }
        setSubmitting(true);
        setError('');
        try {
            const data = await api.post('add_expense.php', { ...form, expensetype_id: parseInt(form.expensetype_id), amount: parseFloat(form.amount) });
            if (data.success) { onSuccess?.(); onClose(); }
            else setError(data.error || 'Failed to record expense');
        } catch (err) { setError('Failed to record expense'); }
        finally { setSubmitting(false); }
    };

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: 'var(--surface-1, #1A1625)', borderRadius: '1rem', padding: '2rem', width: '90%', maxWidth: '500px', border: '1px solid var(--border-color, rgba(255,255,255,0.1))', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--text-color)' }}>📤 Record Expense</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>
                {error && <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '0.5rem', padding: '0.75rem', marginBottom: '1rem', color: '#f87171', fontSize: '0.85rem' }}>{error}</div>}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem', fontWeight: '600' }}>Expense Type *</label>
                        <select value={form.expensetype_id} onChange={handleTypeChange}
                            style={{ width: '100%', padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)', fontSize: '0.9rem' }}>
                            <option value="">Select expense type...</option>
                            {types.map(t => <option key={t.id} value={t.id}>{t.account_code ? `${t.account_code} - ` : ''}{t.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem', fontWeight: '600' }}>Amount (KES) *</label>
                        <input type="number" min="0" step="0.01" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                            style={{ width: '100%', padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)', fontSize: '0.9rem' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem', fontWeight: '600' }}>Date *</label>
                        <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                            style={{ width: '100%', padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)', fontSize: '0.9rem' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem', fontWeight: '600' }}>Description</label>
                        <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                            style={{ width: '100%', padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)', fontSize: '0.9rem' }} />
                    </div>
                    <button type="submit" disabled={submitting}
                        style={{ padding: '0.75rem', borderRadius: '0.5rem', border: 'none', background: '#f87171', color: '#fff', fontWeight: '700', fontSize: '1rem', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1 }}>
                        {submitting ? 'Recording...' : 'Record Expense'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RecordExpenseModal;
