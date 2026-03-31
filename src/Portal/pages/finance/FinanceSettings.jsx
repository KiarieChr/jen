import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

const tabs = [
    { key: 'accounting_periods', label: 'Accounting Periods', icon: '📅' },
    { key: 'payment_methods', label: 'Payment Methods', icon: '💳' },
    { key: 'income_types', label: 'Income Types', icon: '💰' },
    { key: 'expense_types', label: 'Expense Types', icon: '📤' },
    { key: 'contribution_types', label: 'Contribution Types', icon: '🤝' },
    { key: 'funds', label: 'Funds', icon: '🏦' },
];

const FinanceSettings = () => {
    const [activeTab, setActiveTab] = useState('accounting_periods');
    const [data, setData] = useState({});
    const [glAccounts, setGlAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState('');
    const [editGl, setEditGl] = useState('');
    const [showAdd, setShowAdd] = useState(false);
    const [addForm, setAddForm] = useState({});
    const [saving, setSaving] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await api.get('finance_settings.php');
            if (res.success) {
                setData(res.data);
                setGlAccounts(res.data.gl_accounts || []);
            }
        } catch (err) {
            console.error('Failed to load settings:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleAction = async (section, action, payload) => {
        setSaving(true);
        try {
            const res = await api.post('finance_settings.php', { section, action, ...payload });
            if (res.success) {
                fetchData();
                setShowAdd(false);
                setEditingId(null);
                setAddForm({});
            } else {
                alert(res.error || 'Operation failed');
            }
        } catch (err) {
            alert(err.message || 'Operation failed');
        } finally {
            setSaving(false);
        }
    };

    const startEdit = (item) => {
        setEditingId(item.id);
        setEditName(item.name);
        setEditGl(item.gl_account_id || '');
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditName('');
        setEditGl('');
    };

    const items = data[activeTab] || [];
    const hasGl = activeTab === 'income_types' || activeTab === 'expense_types';
    const isPeriods = activeTab === 'accounting_periods';

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-color)' }}>⚙️ Finance Settings</h1>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Manage financial periods, payment methods, income/expense types, contribution types, and funds.</p>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
                {tabs.map(t => (
                    <button key={t.key} onClick={() => { setActiveTab(t.key); setShowAdd(false); cancelEdit(); }}
                        style={{
                            padding: '0.6rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer',
                            fontSize: '0.85rem', fontWeight: '600', whiteSpace: 'nowrap',
                            background: activeTab === t.key ? 'var(--primary, #22c1e6)' : 'var(--surface-1, #1A1625)',
                            color: activeTab === t.key ? '#000' : 'var(--text-muted)',
                        }}>
                        {t.icon} {t.label}
                    </button>
                ))}
            </div>

            {/* Add Button + Form */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                <button onClick={() => { setShowAdd(!showAdd); cancelEdit(); setAddForm({}); }}
                    style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', background: 'var(--primary, #22c1e6)', color: '#000', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer' }}>
                    {showAdd ? 'Cancel' : `+ Add ${tabs.find(t => t.key === activeTab)?.label?.replace(/s$/, '') || 'Item'}`}
                </button>
            </div>

            {showAdd && (
                <div style={{ background: 'var(--surface-1, #1A1625)', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid var(--border-color)', marginBottom: '1rem' }}>
                    {isPeriods ? (
                        <PeriodForm form={addForm} setForm={setAddForm} saving={saving}
                            onSubmit={() => handleAction('accounting_periods', 'create', addForm)}
                            onCancel={() => setShowAdd(false)} />
                    ) : (
                        <SimpleForm name={addForm.name || ''} glAccountId={addForm.gl_account_id || ''} hasGl={hasGl}
                            glAccounts={glAccounts} accountType={activeTab === 'income_types' ? 'Revenue' : 'Expense'}
                            saving={saving}
                            onNameChange={v => setAddForm(f => ({ ...f, name: v }))}
                            onGlChange={v => setAddForm(f => ({ ...f, gl_account_id: v }))}
                            onSubmit={() => handleAction(activeTab, 'create', addForm)}
                            onCancel={() => setShowAdd(false)} />
                    )}
                </div>
            )}

            {/* Table */}
            <div style={{ background: 'var(--surface-1, #1A1625)', borderRadius: '0.75rem', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                {isPeriods ? (
                    <PeriodsTable items={items} loading={loading} editingId={editingId}
                        editForm={addForm} setEditForm={setAddForm}
                        onStartEdit={(item) => { setEditingId(item.id); setAddForm({ name: item.name, start_date: item.start_date, end_date: item.end_date }); }}
                        onSaveEdit={(id) => handleAction('accounting_periods', 'update', { id, ...addForm })}
                        onCancelEdit={() => { setEditingId(null); setAddForm({}); }}
                        onClose={(id) => { if (window.confirm('Close this period? This cannot be undone.')) handleAction('accounting_periods', 'close_period', { id }); }}
                        saving={saving} />
                ) : (
                    <ItemsTable items={items} loading={loading} hasGl={hasGl} activeTab={activeTab}
                        editingId={editingId} editName={editName} editGl={editGl}
                        setEditName={setEditName} setEditGl={setEditGl}
                        glAccounts={glAccounts} accountType={activeTab === 'income_types' ? 'Revenue' : 'Expense'}
                        onStartEdit={startEdit} onCancelEdit={cancelEdit}
                        onSaveEdit={(id) => handleAction(activeTab, 'update', { id, name: editName, gl_account_id: editGl || null })}
                        onToggle={(id) => handleAction(activeTab, 'toggle', { id })}
                        saving={saving} />
                )}
            </div>
        </div>
    );
};

// ─── Simple add/edit form for name + optional GL link ───
const SimpleForm = ({ name, glAccountId, hasGl, glAccounts, accountType, saving, onNameChange, onGlChange, onSubmit, onCancel }) => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={labelSt}>Name</label>
            <input value={name} onChange={e => onNameChange(e.target.value)} placeholder="Enter name..." style={inputSt} />
        </div>
        {hasGl && (
            <div style={{ flex: 1, minWidth: '250px' }}>
                <label style={labelSt}>Linked GL Account</label>
                <select value={glAccountId} onChange={e => onGlChange(e.target.value)} style={inputSt}>
                    <option value="">None</option>
                    {glAccounts.filter(a => a.account_type === accountType).map(a => (
                        <option key={a.id} value={a.id}>{a.account_code} - {a.account_name}</option>
                    ))}
                </select>
            </div>
        )}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={onSubmit} disabled={saving || !name} style={{ ...btnSt, background: 'var(--primary, #22c1e6)', color: '#000' }}>{saving ? 'Saving...' : 'Save'}</button>
            <button onClick={onCancel} style={{ ...btnSt, background: 'var(--surface-2, #2a2438)', color: 'var(--text-color)' }}>Cancel</button>
        </div>
    </div>
);

// ─── Period add/edit form ───
const PeriodForm = ({ form, setForm, saving, onSubmit, onCancel }) => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={labelSt}>Period Name</label>
            <input value={form.name || ''} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. FY 2026-2027" style={inputSt} />
        </div>
        <div style={{ minWidth: '160px' }}>
            <label style={labelSt}>Start Date</label>
            <input type="date" value={form.start_date || ''} onChange={e => setForm(f => ({ ...f, start_date: e.target.value }))} style={inputSt} />
        </div>
        <div style={{ minWidth: '160px' }}>
            <label style={labelSt}>End Date</label>
            <input type="date" value={form.end_date || ''} onChange={e => setForm(f => ({ ...f, end_date: e.target.value }))} style={inputSt} />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={onSubmit} disabled={saving || !form.name || !form.start_date || !form.end_date}
                style={{ ...btnSt, background: 'var(--primary, #22c1e6)', color: '#000' }}>{saving ? 'Saving...' : 'Save'}</button>
            <button onClick={onCancel} style={{ ...btnSt, background: 'var(--surface-2, #2a2438)', color: 'var(--text-color)' }}>Cancel</button>
        </div>
    </div>
);

// ─── Accounting Periods Table ───
const PeriodsTable = ({ items, loading, editingId, editForm, setEditForm, onStartEdit, onSaveEdit, onCancelEdit, onClose, saving }) => (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
            <tr style={{ background: 'var(--surface-2, #2a2438)' }}>
                {['Period Name', 'Start Date', 'End Date', 'Entries', 'Status', 'Actions'].map(h => (
                    <th key={h} style={thSt}>{h}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {loading ? (
                <tr><td colSpan={6} style={{ ...tdSt, textAlign: 'center' }}>Loading...</td></tr>
            ) : items.length === 0 ? (
                <tr><td colSpan={6} style={{ ...tdSt, textAlign: 'center', color: 'var(--text-muted)' }}>No accounting periods found</td></tr>
            ) : items.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={tdSt}>
                        {editingId === p.id ? (
                            <input value={editForm.name || ''} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} style={{ ...inputSt, padding: '0.3rem 0.5rem' }} />
                        ) : (
                            <span style={{ fontWeight: '600' }}>{p.name}</span>
                        )}
                    </td>
                    <td style={tdSt}>
                        {editingId === p.id ? (
                            <input type="date" value={editForm.start_date || ''} onChange={e => setEditForm(f => ({ ...f, start_date: e.target.value }))} style={{ ...inputSt, padding: '0.3rem 0.5rem' }} />
                        ) : p.start_date}
                    </td>
                    <td style={tdSt}>
                        {editingId === p.id ? (
                            <input type="date" value={editForm.end_date || ''} onChange={e => setEditForm(f => ({ ...f, end_date: e.target.value }))} style={{ ...inputSt, padding: '0.3rem 0.5rem' }} />
                        ) : p.end_date}
                    </td>
                    <td style={tdSt}>{p.entry_count || 0}</td>
                    <td style={tdSt}>
                        <span style={{
                            padding: '0.15rem 0.5rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '600',
                            background: p.is_closed ? '#f8717120' : '#4ade8020',
                            color: p.is_closed ? '#f87171' : '#4ade80'
                        }}>{p.is_closed ? 'Closed' : 'Open'}</span>
                    </td>
                    <td style={tdSt}>
                        {editingId === p.id ? (
                            <div style={{ display: 'flex', gap: '0.3rem' }}>
                                <button onClick={() => onSaveEdit(p.id)} disabled={saving} style={actionBtnSt}>✓ Save</button>
                                <button onClick={onCancelEdit} style={actionBtnSt}>✕</button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', gap: '0.3rem' }}>
                                {!p.is_closed && <button onClick={() => onStartEdit(p)} style={actionBtnSt}>Edit</button>}
                                {!p.is_closed && <button onClick={() => onClose(p.id)} style={{ ...actionBtnSt, color: '#f87171' }}>Close</button>}
                            </div>
                        )}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

// ─── Generic Items Table (payment methods, types, funds) ───
const ItemsTable = ({ items, loading, hasGl, activeTab, editingId, editName, editGl, setEditName, setEditGl, glAccounts, accountType, onStartEdit, onCancelEdit, onSaveEdit, onToggle, saving }) => {
    const cols = hasGl ? ['Name', 'GL Account', 'Status', 'Actions'] : ['Name', 'Status', 'Actions'];
    return (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr style={{ background: 'var(--surface-2, #2a2438)' }}>
                    {cols.map(h => <th key={h} style={thSt}>{h}</th>)}
                </tr>
            </thead>
            <tbody>
                {loading ? (
                    <tr><td colSpan={cols.length} style={{ ...tdSt, textAlign: 'center' }}>Loading...</td></tr>
                ) : items.length === 0 ? (
                    <tr><td colSpan={cols.length} style={{ ...tdSt, textAlign: 'center', color: 'var(--text-muted)' }}>No items found</td></tr>
                ) : items.map(item => {
                    const isActive = Number(item.delete_status) === 0;
                    const isEditing = editingId === item.id;
                    return (
                        <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)', opacity: isActive ? 1 : 0.5 }}>
                            <td style={tdSt}>
                                {isEditing ? (
                                    <input value={editName} onChange={e => setEditName(e.target.value)} style={{ ...inputSt, padding: '0.3rem 0.5rem' }} />
                                ) : (
                                    <span style={{ fontWeight: '500' }}>{item.name}</span>
                                )}
                            </td>
                            {hasGl && (
                                <td style={tdSt}>
                                    {isEditing ? (
                                        <select value={editGl} onChange={e => setEditGl(e.target.value)} style={{ ...inputSt, padding: '0.3rem 0.5rem' }}>
                                            <option value="">None</option>
                                            {glAccounts.filter(a => a.account_type === accountType).map(a => (
                                                <option key={a.id} value={a.id}>{a.account_code} - {a.account_name}</option>
                                            ))}
                                        </select>
                                    ) : item.account_code ? (
                                        <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                            {item.account_code} - {item.account_name}
                                        </span>
                                    ) : (
                                        <span style={{ color: '#f59e0b', fontSize: '0.8rem' }}>Not linked</span>
                                    )}
                                </td>
                            )}
                            <td style={tdSt}>
                                <span style={{
                                    padding: '0.15rem 0.5rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '600',
                                    background: isActive ? '#4ade8020' : '#f8717120',
                                    color: isActive ? '#4ade80' : '#f87171'
                                }}>{isActive ? 'Active' : 'Inactive'}</span>
                            </td>
                            <td style={tdSt}>
                                {isEditing ? (
                                    <div style={{ display: 'flex', gap: '0.3rem' }}>
                                        <button onClick={() => onSaveEdit(item.id)} disabled={saving} style={actionBtnSt}>✓ Save</button>
                                        <button onClick={onCancelEdit} style={actionBtnSt}>✕</button>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', gap: '0.3rem' }}>
                                        <button onClick={() => onStartEdit(item)} style={actionBtnSt}>Edit</button>
                                        <button onClick={() => onToggle(item.id)} style={{ ...actionBtnSt, color: isActive ? '#f87171' : '#4ade80' }}>
                                            {isActive ? 'Disable' : 'Enable'}
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

const labelSt = { display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '0.25rem' };
const inputSt = { width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'var(--bg-color, #120D20)', color: 'var(--text-color)', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' };
const btnSt = { padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' };
const thSt = { padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)' };
const tdSt = { padding: '0.75rem', fontSize: '0.85rem', color: 'var(--text-color)' };
const actionBtnSt = { padding: '0.2rem 0.5rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer', fontSize: '0.75rem', background: 'var(--surface-2, #2a2438)', color: 'var(--text-muted)' };

export default FinanceSettings;
