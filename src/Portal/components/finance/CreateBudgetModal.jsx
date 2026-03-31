import React, { useState } from 'react';
import api from '../../../services/api';

const CreateBudgetModal = ({ onClose, onSuccess }) => {
    const [form, setForm] = useState({ budget_name: '', budget_purpose: '', items: [{ description: '', amount: '' }] });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const addItem = () => setForm(f => ({ ...f, items: [...f.items, { description: '', amount: '' }] }));
    const removeItem = (idx) => setForm(f => ({ ...f, items: f.items.filter((_, i) => i !== idx) }));
    const updateItem = (idx, field, value) => setForm(f => ({ ...f, items: f.items.map((item, i) => i === idx ? { ...item, [field]: value } : item) }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.budget_name) { setError('Budget name is required'); return; }
        setSubmitting(true);
        setError('');
        try {
            const data = await api.post('add_budget.php', {
                ...form,
                items: form.items.filter(i => i.description && i.amount).map(i => ({ ...i, amount: parseFloat(i.amount) }))
            });
            if (data.success) { onSuccess?.(); onClose(); }
            else setError(data.error || 'Failed to create budget');
        } catch (err) { setError('Failed to create budget'); }
        finally { setSubmitting(false); }
    };

    const fieldStyle = { width: '100%', padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)', fontSize: '0.9rem' };
    const labelStyle = { display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem', fontWeight: '600' };

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: 'var(--surface-1, #1A1625)', borderRadius: '1rem', padding: '2rem', width: '90%', maxWidth: '600px', border: '1px solid var(--border-color, rgba(255,255,255,0.1))', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', maxHeight: '90vh', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--text-color)' }}>📋 Create Budget</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>
                {error && <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '0.5rem', padding: '0.75rem', marginBottom: '1rem', color: '#f87171', fontSize: '0.85rem' }}>{error}</div>}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={labelStyle}>Budget Name *</label>
                        <input value={form.budget_name} onChange={e => setForm(f => ({ ...f, budget_name: e.target.value }))} placeholder="e.g. Q2 2026 Budget" style={fieldStyle} />
                    </div>
                    <div>
                        <label style={labelStyle}>Purpose</label>
                        <input value={form.budget_purpose} onChange={e => setForm(f => ({ ...f, budget_purpose: e.target.value }))} placeholder="e.g. Operational expenses" style={fieldStyle} />
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <label style={{ ...labelStyle, marginBottom: 0 }}>Budget Line Items</label>
                            <button type="button" onClick={addItem} style={{ background: 'var(--primary)', border: 'none', color: 'var(--bg-color)', padding: '0.3rem 0.75rem', borderRadius: '0.3rem', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' }}>+ Add Item</button>
                        </div>
                        {form.items.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                                <input value={item.description} onChange={e => updateItem(idx, 'description', e.target.value)} placeholder="Description"
                                    style={{ ...fieldStyle, flex: 2 }} />
                                <input type="number" min="0" step="0.01" value={item.amount} onChange={e => updateItem(idx, 'amount', e.target.value)} placeholder="Amount"
                                    style={{ ...fieldStyle, flex: 1 }} />
                                {form.items.length > 1 && (
                                    <button type="button" onClick={() => removeItem(idx)}
                                        style={{ background: 'rgba(248,113,113,0.1)', border: 'none', color: '#f87171', padding: '0.5rem', borderRadius: '0.3rem', cursor: 'pointer', fontSize: '1rem', lineHeight: 1 }}>×</button>
                                )}
                            </div>
                        ))}
                        <div style={{ textAlign: 'right', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                            Total: <strong style={{ color: 'var(--text-color)' }}>KES {form.items.reduce((s, i) => s + (parseFloat(i.amount) || 0), 0).toLocaleString()}</strong>
                        </div>
                    </div>

                    <button type="submit" disabled={submitting}
                        style={{ padding: '0.75rem', borderRadius: '0.5rem', border: 'none', background: 'var(--primary)', color: 'var(--bg-color)', fontWeight: '700', fontSize: '1rem', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1 }}>
                        {submitting ? 'Creating...' : 'Create Budget'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateBudgetModal;
