import React, { useState, useEffect, useCallback, useContext } from 'react';
import api, { API_BASE_URL, getAccessToken } from '../../services/api';
import { ThemeContext } from '../../context/ThemeContext';

const CATEGORIES = [
    { value: 'venue', label: 'Venue & Facilities', color: '#2980b9', bg: 'rgba(41,128,185,0.12)' },
    { value: 'catering', label: 'Catering', color: '#27ae60', bg: 'rgba(39,174,96,0.12)' },
    { value: 'transport', label: 'Transport & Logistics', color: '#f39c12', bg: 'rgba(243,156,18,0.12)' },
    { value: 'sound_av', label: 'Sound & AV', color: '#8e44ad', bg: 'rgba(142,68,173,0.12)' },
    { value: 'printing', label: 'Printing & Stationery', color: '#34495e', bg: 'rgba(52,73,94,0.12)' },
    { value: 'decoration', label: 'Decoration', color: '#e74c3c', bg: 'rgba(231,76,60,0.12)' },
    { value: 'speaker_honorarium', label: 'Speaker Honorarium', color: '#16a085', bg: 'rgba(22,160,133,0.12)' },
    { value: 'marketing', label: 'Marketing & Publicity', color: '#c0392b', bg: 'rgba(192,57,43,0.12)' },
    { value: 'accommodation', label: 'Accommodation', color: '#2c3e50', bg: 'rgba(44,62,80,0.12)' },
    { value: 'miscellaneous', label: 'Miscellaneous', color: '#95a5a6', bg: 'rgba(149,165,166,0.12)' },
];

const getCat = (val) => CATEGORIES.find(c => c.value === val) || CATEGORIES[CATEGORIES.length - 1];

const STATUS_BADGES = {
    draft: { label: 'Draft', bg: '#f0f0f5', color: '#6b7280', border: '#d1d5db' },
    pending_approval: { label: 'Pending Approval', bg: '#fef3c7', color: '#b45309', border: '#fcd34d' },
    approved: { label: 'Approved', bg: '#d1fae5', color: '#065f46', border: '#6ee7b7' },
    rejected: { label: 'Rejected', bg: '#fee2e2', color: '#991b1b', border: '#fca5a5' },
    closed: { label: 'Closed', bg: '#e5e7eb', color: '#374151', border: '#9ca3af' },
};

const PAYMENT_METHODS = [
    { value: 'cash', label: 'Cash' },
    { value: 'mpesa', label: 'M-Pesa' },
    { value: 'bank_transfer', label: 'Bank Transfer' },
    { value: 'online', label: 'Online/Card' },
];

const formatKES = (n) => 'KES ' + Number(n || 0).toLocaleString('en-KE', { minimumFractionDigits: 0 });

const EventBudgetPage = () => {
    const { theme } = useContext(ThemeContext);
    const dk = theme === 'dark';

    // ─── State ────────────────────────────────────────────
    const [events, setEvents] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState('');
    const [budget, setBudget] = useState(null);
    const [items, setItems] = useState([]);
    const [versions, setVersions] = useState([]);
    const [categorySummary, setCategorySummary] = useState([]);
    const [audit, setAudit] = useState([]);
    const [eventInfo, setEventInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    // Modals
    const [showCreateBudget, setShowCreateBudget] = useState(false);
    const [showAddItem, setShowAddItem] = useState(false);
    const [showExpense, setShowExpense] = useState(false);
    const [showApproval, setShowApproval] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [expenseItem, setExpenseItem] = useState(null);
    const [uploadItem, setUploadItem] = useState(null);

    // Forms
    const [budgetForm, setBudgetForm] = useState({ budget_name: '', notes: '' });
    const [itemForm, setItemForm] = useState({ category: 'miscellaneous', description: '', estimated_amount: '', vendor: '', notes: '' });
    const [expenseForm, setExpenseForm] = useState({ actual_amount: '', payment_date: '', payment_method: 'cash', receipt_ref: '', vendor: '', notes: '' });
    const [approvalForm, setApprovalForm] = useState({ decision: 'approve', reason: '' });
    const [saving, setSaving] = useState(false);

    // Active tab
    const [tab, setTab] = useState('items'); // items | summary | audit

    // ─── Load events ──────────────────────────────────────
    useEffect(() => {
        (async () => {
            try {
                const res = await api.get('/get_events_dashboard.php');
                if (res?.success) setEvents(res.data.all_events || []);
            } catch (err) { console.error('Failed to load events:', err); }
        })();
    }, []);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    };

    // ─── Fetch budget ─────────────────────────────────────
    const fetchBudget = useCallback(async (silent = false, version = null) => {
        if (!selectedEventId) return;
        if (!silent) setLoading(true);
        try {
            let url = `/get_event_budget.php?event_id=${selectedEventId}`;
            if (version) url += `&version=${version}`;
            const res = await api.get(url);
            if (res?.success) {
                const d = res.data;
                setBudget(d.budget);
                setItems(d.items || []);
                setVersions(d.versions || []);
                setCategorySummary(d.category_summary || []);
                setAudit(d.audit || []);
                setEventInfo(d.event);
            }
        } catch (err) {
            console.error('Failed to load budget:', err);
            showToast('Failed to load budget', 'error');
        } finally {
            if (!silent) setLoading(false);
        }
    }, [selectedEventId]);

    useEffect(() => { fetchBudget(); }, [fetchBudget]);

    // ─── Budget CRUD actions ──────────────────────────────
    const handleCreateBudget = async () => {
        if (!budgetForm.budget_name.trim()) return showToast('Budget name is required', 'error');
        setSaving(true);
        try {
            const res = await api.post('/save_event_budget.php', {
                action: 'create_budget',
                event_id: parseInt(selectedEventId),
                budget_name: budgetForm.budget_name,
                notes: budgetForm.notes
            });
            if (res?.success) {
                showToast(res.message || 'Budget created');
                setShowCreateBudget(false);
                setBudgetForm({ budget_name: '', notes: '' });
                fetchBudget(true);
            } else {
                showToast(res?.message || 'Failed', 'error');
            }
        } catch (err) {
            showToast(err?.response?.data?.message || 'Failed to create budget', 'error');
        } finally { setSaving(false); }
    };

    const handleAddItem = async () => {
        if (!itemForm.description.trim() || !itemForm.estimated_amount) return showToast('Description and amount required', 'error');
        setSaving(true);
        try {
            const payload = editItem
                ? { action: 'update_item', item_id: editItem.id, ...itemForm }
                : { action: 'add_item', budget_id: budget.id, ...itemForm, estimated_amount: parseFloat(itemForm.estimated_amount) };
            const res = await api.post('/save_event_budget.php', payload);
            if (res?.success) {
                showToast(res.message || 'Saved');
                setShowAddItem(false);
                setEditItem(null);
                setItemForm({ category: 'miscellaneous', description: '', estimated_amount: '', vendor: '', notes: '' });
                fetchBudget(true);
            } else {
                showToast(res?.message || 'Failed', 'error');
            }
        } catch (err) {
            showToast(err?.response?.data?.message || 'Failed to save item', 'error');
        } finally { setSaving(false); }
    };

    const handleDeleteItem = async (itemId) => {
        if (!window.confirm('Delete this item?')) return;
        try {
            const res = await api.post('/save_event_budget.php', { action: 'delete_item', item_id: itemId });
            if (res?.success) { showToast('Item deleted'); fetchBudget(true); }
            else showToast(res?.message || 'Failed', 'error');
        } catch (err) {
            showToast(err?.response?.data?.message || 'Failed to delete', 'error');
        }
    };

    const handleSubmitForApproval = async () => {
        if (!window.confirm('Submit this budget for approval? It cannot be edited once submitted.')) return;
        try {
            const res = await api.post('/save_event_budget.php', { action: 'submit', budget_id: budget.id });
            if (res?.success) { showToast('Budget submitted for approval'); fetchBudget(true); }
            else showToast(res?.message || 'Failed', 'error');
        } catch (err) {
            showToast(err?.response?.data?.message || 'Failed to submit', 'error');
        }
    };

    const handleApproval = async () => {
        if (approvalForm.decision === 'reject' && !approvalForm.reason.trim()) return showToast('Rejection reason required', 'error');
        setSaving(true);
        try {
            const res = await api.post('/approve_event_budget.php', { budget_id: budget.id, ...approvalForm });
            if (res?.success) {
                showToast(res.message);
                setShowApproval(false);
                setApprovalForm({ decision: 'approve', reason: '' });
                fetchBudget(true);
            } else showToast(res?.message || 'Failed', 'error');
        } catch (err) {
            showToast(err?.response?.data?.message || 'Failed', 'error');
        } finally { setSaving(false); }
    };

    const handleRecordExpense = async () => {
        if (!expenseForm.actual_amount || !expenseForm.payment_date) return showToast('Amount and date required', 'error');
        setSaving(true);
        try {
            const res = await api.post('/record_event_expense.php', {
                item_id: expenseItem.id,
                actual_amount: parseFloat(expenseForm.actual_amount),
                payment_date: expenseForm.payment_date,
                payment_method: expenseForm.payment_method,
                receipt_ref: expenseForm.receipt_ref,
                vendor: expenseForm.vendor,
                notes: expenseForm.notes
            });
            if (res?.success) {
                showToast(res.message || 'Expense recorded & journal entry created');
                setShowExpense(false);
                setExpenseItem(null);
                setExpenseForm({ actual_amount: '', payment_date: '', payment_method: 'cash', receipt_ref: '', vendor: '', notes: '' });
                fetchBudget(true);
            } else showToast(res?.message || 'Failed', 'error');
        } catch (err) {
            showToast(err?.response?.data?.message || 'Failed to record expense', 'error');
        } finally { setSaving(false); }
    };

    const handleUploadReceipt = async (e) => {
        const file = e.target.files?.[0];
        if (!file || !uploadItem) return;
        const fd = new FormData();
        fd.append('item_id', uploadItem.id);
        fd.append('receipt', file);
        setSaving(true);
        try {
            const res = await api.post('/upload_budget_receipt.php', fd, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (res?.success) {
                showToast('Receipt uploaded');
                setShowUpload(false);
                setUploadItem(null);
                fetchBudget(true);
            } else showToast(res?.message || 'Failed', 'error');
        } catch (err) {
            showToast(err?.response?.data?.message || 'Upload failed', 'error');
        } finally { setSaving(false); }
    };

    const downloadPDF = async () => {
        try {
            const url = `${API_BASE_URL}event_budget_report_pdf.php?event_id=${selectedEventId}${budget?.version ? `&version=${budget.version}` : ''}`;
            const resp = await fetch(url, { headers: { Authorization: `Bearer ${getAccessToken()}` } });
            if (!resp.ok) throw new Error('PDF generation failed');
            const blob = await resp.blob();
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `Budget_Report_${eventInfo?.ename || 'Event'}_v${budget?.version || 1}.pdf`;
            a.click();
            URL.revokeObjectURL(a.href);
        } catch (err) {
            showToast('Failed to download PDF', 'error');
        }
    };

    // ─── Helpers ──────────────────────────────────────────
    const isEditable = budget && ['draft', 'rejected'].includes(budget.status);
    const isApproved = budget?.status === 'approved';
    const isPending = budget?.status === 'pending_approval';
    const totalEstimated = parseFloat(budget?.total_estimated || 0);
    const totalActual = parseFloat(budget?.total_actual || 0);
    const variance = totalActual - totalEstimated;
    const variancePct = totalEstimated > 0 ? (variance / totalEstimated * 100) : 0;
    const executionPct = totalEstimated > 0 ? Math.min(100, (totalActual / totalEstimated * 100)) : 0;
    const paidCount = items.filter(i => i.status === 'paid').length;

    // ─── Styles ───────────────────────────────────────────
    const card = { background: dk ? '#1A1625' : '#fff', borderRadius: 12, boxShadow: dk ? '0 1px 4px rgba(0,0,0,0.3)' : '0 1px 4px rgba(0,0,0,0.07)', padding: 20, marginBottom: 16, border: dk ? '1px solid rgba(255,255,255,0.06)' : 'none' };
    const btnPrimary = { background: 'linear-gradient(135deg,#6c3baa,#4f46e5)', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', cursor: 'pointer', fontWeight: 600, fontSize: 13 };
    const btnSecondary = { background: dk ? '#2a2438' : '#f3f4f6', color: dk ? '#cbd5e1' : '#374151', border: dk ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e5e7eb', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontWeight: 500, fontSize: 13 };
    const btnDanger = { background: dk ? 'rgba(239,68,68,0.15)' : '#fee2e2', color: dk ? '#fca5a5' : '#991b1b', border: dk ? '1px solid rgba(239,68,68,0.3)' : '1px solid #fca5a5', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontWeight: 500, fontSize: 12 };
    const btnSuccess = { background: dk ? 'rgba(34,197,94,0.15)' : '#d1fae5', color: dk ? '#6ee7b7' : '#065f46', border: dk ? '1px solid rgba(34,197,94,0.3)' : '1px solid #6ee7b7', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontWeight: 500, fontSize: 12 };
    const input = { width: '100%', padding: '8px 12px', borderRadius: 8, border: dk ? '1px solid rgba(255,255,255,0.12)' : '1px solid #d1d5db', fontSize: 13, outline: 'none', boxSizing: 'border-box', background: dk ? '#2a2438' : '#fff', color: dk ? '#e2e8f0' : '#1e1e3c' };
    const label = { display: 'block', fontSize: 12, fontWeight: 600, color: dk ? '#94a3b8' : '#374151', marginBottom: 4 };
    const overlay = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' };
    const modal = { background: dk ? '#1A1625' : '#fff', borderRadius: 14, padding: 24, width: '100%', maxWidth: 520, maxHeight: '90vh', overflow: 'auto', boxShadow: dk ? '0 20px 60px rgba(0,0,0,0.5)' : '0 20px 60px rgba(0,0,0,0.15)', border: dk ? '1px solid rgba(255,255,255,0.08)' : 'none' };
    const textPrimary = dk ? '#e2e8f0' : '#1e1e3c';
    const textSecondary = dk ? '#94a3b8' : '#6b7280';
    const textMuted = dk ? '#64748b' : '#9ca3af';
    const surfaceAlt = dk ? '#2a2438' : '#fafafe';
    const surfaceBorder = dk ? 'rgba(255,255,255,0.06)' : '#f0f0f5';
    const theadBg = dk ? '#2a2438' : '#f8f8fc';
    const rowAltBg = dk ? 'rgba(255,255,255,0.02)' : '#fafafe';
    const rowBg = dk ? 'transparent' : '#fff';
    const borderLight = dk ? 'rgba(255,255,255,0.06)' : '#f0f0f5';
    const borderMed = dk ? 'rgba(255,255,255,0.08)' : '#e5e7eb';
    const pageBg = dk ? '#0f0d1a' : '#f5f5fa';

    // ─── Render ───────────────────────────────────────────
    return (
        <div style={{ padding: '24px 28px', minHeight: '100vh', background: pageBg, fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif' }}>

            {/* Toast */}
            {toast && (
                <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 2000, padding: '12px 20px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 13,
                    background: toast.type === 'error' ? '#ef4444' : '#22c55e', boxShadow: '0 8px 25px rgba(0,0,0,0.15)', animation: 'slideIn .3s' }}>
                    {toast.message}
                </div>
            )}

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: textPrimary }}>Event Budget & Expenditure</h1>
                    <p style={{ margin: '4px 0 0', color: textSecondary, fontSize: 13 }}>Plan budgets, track expenses, and generate financial reports</p>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                    <select value={selectedEventId} onChange={e => setSelectedEventId(e.target.value)}
                        style={{ ...input, width: 240 }}>
                        <option value="">— Select Event —</option>
                        {events.map(ev => <option key={ev.id} value={ev.id}>{ev.ename}</option>)}
                    </select>
                    {selectedEventId && budget && (
                        <select value={budget.version || ''} onChange={e => fetchBudget(false, e.target.value)}
                            style={{ ...input, width: 140 }}>
                            {versions.map(v => (
                                <option key={v.id} value={v.version}>v{v.version} — {v.status}</option>
                            ))}
                        </select>
                    )}
                </div>
            </div>

            {/* No event selected */}
            {!selectedEventId && (
                <div style={{ ...card, textAlign: 'center', padding: 60 }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>📊</div>
                    <h3 style={{ color: textPrimary, margin: 0 }}>Select an Event</h3>
                    <p style={{ color: textMuted, marginTop: 8, fontSize: 14 }}>Choose an event above to manage its budget and expenses</p>
                </div>
            )}

            {loading && <div style={{ textAlign: 'center', padding: 40, color: textSecondary }}>Loading budget...</div>}

            {/* No budget yet */}
            {selectedEventId && !loading && !budget && (
                <div style={{ ...card, textAlign: 'center', padding: 48 }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>💰</div>
                    <h3 style={{ color: textPrimary, margin: 0 }}>No Budget Yet</h3>
                    <p style={{ color: textMuted, marginTop: 8, fontSize: 14 }}>Create a budget to start planning expenses for this event</p>
                    <button style={{ ...btnPrimary, marginTop: 16 }} onClick={() => setShowCreateBudget(true)}>
                        + Create Budget
                    </button>
                </div>
            )}

            {/* Budget exists */}
            {selectedEventId && !loading && budget && (
                <>
                    {/* Status + action bar */}
                    <div style={{ ...card, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: textPrimary }}>{budget.budget_name}</h2>
                            {(() => {
                                const s = STATUS_BADGES[budget.status] || STATUS_BADGES.draft;
                                return <span style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 20, background: s.bg, color: s.color, border: `1px solid ${s.border}`, fontSize: 11, fontWeight: 600 }}>{s.label}</span>;
                            })()}
                            <span style={{ color: textMuted, fontSize: 12 }}>v{budget.version}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {isEditable && <button style={btnPrimary} onClick={() => setShowAddItem(true)}>+ Add Item</button>}
                            {isEditable && items.length > 0 && <button style={{ ...btnPrimary, background: 'linear-gradient(135deg,#f59e0b,#d97706)' }} onClick={handleSubmitForApproval}>Submit for Approval</button>}
                            {isPending && <button style={{ ...btnSuccess, fontWeight: 600 }} onClick={() => setShowApproval(true)}>Review & Approve</button>}
                            {budget && <button style={btnSecondary} onClick={downloadPDF}>📄 PDF Report</button>}
                            {selectedEventId && <button style={btnSecondary} onClick={() => setShowCreateBudget(true)}>+ New Version</button>}
                        </div>
                    </div>

                    {/* Summary cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 16 }}>
                        {[
                            { label: 'Estimated Budget', value: formatKES(totalEstimated), color: '#2980b9', icon: '📋' },
                            { label: 'Total Spent', value: formatKES(totalActual), color: totalActual > totalEstimated ? '#ef4444' : '#22c55e', icon: '💸' },
                            { label: 'Remaining', value: formatKES(Math.max(0, totalEstimated - totalActual)), color: '#16a085', icon: '💰' },
                            { label: 'Variance', value: `${variance >= 0 ? '+' : ''}${variancePct.toFixed(1)}%`, color: variance > 0 ? '#ef4444' : '#22c55e', icon: '📈' },
                            { label: 'Items Paid', value: `${paidCount} / ${items.length}`, color: '#8e44ad', icon: '✅' },
                        ].map((c, i) => (
                            <div key={i} style={{ ...card, display: 'flex', alignItems: 'center', gap: 12, padding: 16 }}>
                                <div style={{ fontSize: 28 }}>{c.icon}</div>
                                <div>
                                    <div style={{ fontSize: 11, color: textMuted, fontWeight: 500 }}>{c.label}</div>
                                    <div style={{ fontSize: 18, fontWeight: 700, color: c.color }}>{c.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Execution bar */}
                    <div style={card}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                            <span style={{ fontSize: 12, fontWeight: 600, color: textPrimary }}>Budget Execution</span>
                            <span style={{ fontSize: 12, fontWeight: 600, color: textSecondary }}>{executionPct.toFixed(1)}%</span>
                        </div>
                        <div style={{ height: 10, background: borderMed, borderRadius: 6, overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${executionPct}%`, borderRadius: 6, transition: 'width .5s',
                                background: executionPct > 100 ? '#ef4444' : executionPct > 80 ? '#f59e0b' : '#22c55e' }} />
                        </div>
                    </div>

                    {/* Tabs */}
                    <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                        {[
                            { key: 'items', label: `Line Items (${items.length})` },
                            { key: 'summary', label: 'Category Summary' },
                            { key: 'audit', label: `Audit Trail (${audit.length})` },
                        ].map(t => (
                            <button key={t.key} onClick={() => setTab(t.key)}
                                style={{ padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                                    background: tab === t.key ? 'linear-gradient(135deg,#6c3baa,#4f46e5)' : dk ? '#1A1625' : '#fff',
                                    color: tab === t.key ? '#fff' : textSecondary,
                                    boxShadow: tab === t.key ? '0 2px 8px rgba(108,59,170,0.3)' : dk ? '0 1px 3px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.06)' }}>
                                {t.label}
                            </button>
                        ))}
                    </div>

                    {/* ─── Tab: Line Items ────────────────── */}
                    {tab === 'items' && (
                        <div style={card}>
                            {items.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: 32, color: textMuted }}>
                                    <p>No items yet. Add budget line items to get started.</p>
                                </div>
                            ) : (
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                                        <thead>
                                            <tr style={{ background: theadBg }}>
                                                {['Category', 'Description', 'Estimated', 'Actual', 'Variance', 'Status', 'Vendor', 'Actions'].map(h => (
                                                    <th key={h} style={{ padding: '10px 12px', textAlign: h === 'Category' || h === 'Description' || h === 'Vendor' ? 'left' : 'right', fontWeight: 600, color: textSecondary, fontSize: 11, borderBottom: `2px solid ${borderMed}` }}>{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.map((item, idx) => {
                                                const cat = getCat(item.category);
                                                const itemVar = (parseFloat(item.actual_amount) || 0) - parseFloat(item.estimated_amount);
                                                const isPaid = item.status === 'paid';
                                                const isCancelled = item.status === 'cancelled';
                                                return (
                                                    <tr key={item.id} style={{ borderBottom: `1px solid ${borderLight}`, background: idx % 2 ? rowAltBg : rowBg, opacity: isCancelled ? 0.5 : 1 }}>
                                                        <td style={{ padding: '10px 12px' }}>
                                                            <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: 12, background: cat.bg, color: cat.color, fontSize: 11, fontWeight: 600 }}>{cat.label}</span>
                                                        </td>
                                                        <td style={{ padding: '10px 12px', fontWeight: 500, color: textPrimary }}>
                                                            {item.description}
                                                            {item.receipts?.length > 0 && <span style={{ marginLeft: 6, fontSize: 11, color: '#2980b9' }} title={`${item.receipts.length} receipt(s)`}>📎{item.receipts.length}</span>}
                                                        </td>
                                                        <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 500, color: textPrimary }}>{formatKES(item.estimated_amount)}</td>
                                                        <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600, color: isPaid ? '#065f46' : textMuted }}>
                                                            {isPaid ? formatKES(item.actual_amount) : '—'}
                                                        </td>
                                                        <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600, color: !isPaid ? textMuted : itemVar > 0 ? '#ef4444' : '#22c55e' }}>
                                                            {isPaid ? `${itemVar >= 0 ? '+' : ''}${formatKES(itemVar).replace('KES ', '')}` : '—'}
                                                        </td>
                                                        <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                                                            <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 10,
                                                                background: isPaid ? '#d1fae5' : isCancelled ? '#fee2e2' : '#fef3c7',
                                                                color: isPaid ? '#065f46' : isCancelled ? '#991b1b' : '#b45309' }}>
                                                                {isPaid ? 'Paid' : isCancelled ? 'Cancelled' : 'Planned'}
                                                            </span>
                                                            {item.journal_entry_id && <span style={{ marginLeft: 4, fontSize: 10, color: textSecondary }}>JE#{item.journal_entry_id}</span>}
                                                        </td>
                                                        <td style={{ padding: '10px 12px', fontSize: 12, color: textSecondary }}>{item.vendor || '—'}</td>
                                                        <td style={{ padding: '10px 12px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                                                            {isEditable && !isPaid && !isCancelled && (
                                                                <>
                                                                    <button onClick={() => { setEditItem(item); setItemForm({ category: item.category, description: item.description, estimated_amount: item.estimated_amount, vendor: item.vendor || '', notes: item.notes || '' }); setShowAddItem(true); }}
                                                                        style={{ ...btnSecondary, padding: '4px 10px', fontSize: 11, marginRight: 4 }}>Edit</button>
                                                                    <button onClick={() => handleDeleteItem(item.id)} style={{ ...btnDanger, padding: '4px 10px', fontSize: 11 }}>Del</button>
                                                                </>
                                                            )}
                                                            {isApproved && !isPaid && !isCancelled && (
                                                                <button onClick={() => { setExpenseItem(item); setExpenseForm({ actual_amount: item.estimated_amount, payment_date: new Date().toISOString().slice(0, 10), payment_method: 'cash', receipt_ref: '', vendor: item.vendor || '', notes: '' }); setShowExpense(true); }}
                                                                    style={{ ...btnSuccess, padding: '4px 10px', fontSize: 11, marginRight: 4 }}>💳 Pay</button>
                                                            )}
                                                            {isApproved && isPaid && (
                                                                <button onClick={() => { setUploadItem(item); setShowUpload(true); }}
                                                                    style={{ ...btnSecondary, padding: '4px 10px', fontSize: 11 }}>📎 Receipt</button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                        <tfoot>
                                            <tr style={{ background: dk ? '#2a2438' : '#1e1e3c' }}>
                                                <td colSpan={2} style={{ padding: '10px 12px', color: '#fff', fontWeight: 700, fontSize: 13 }}>TOTAL</td>
                                                <td style={{ padding: '10px 12px', textAlign: 'right', color: '#fff', fontWeight: 700 }}>{formatKES(totalEstimated)}</td>
                                                <td style={{ padding: '10px 12px', textAlign: 'right', color: '#fff', fontWeight: 700 }}>{formatKES(totalActual)}</td>
                                                <td style={{ padding: '10px 12px', textAlign: 'right', color: variance > 0 ? '#fca5a5' : '#6ee7b7', fontWeight: 700 }}>
                                                    {variance !== 0 ? `${variance > 0 ? '+' : ''}${formatKES(variance).replace('KES ', '')}` : '—'}
                                                </td>
                                                <td colSpan={3} style={{ padding: '10px 12px', textAlign: 'right', color: '#cbd5e1', fontSize: 12 }}>{paidCount}/{items.length} paid</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ─── Tab: Category Summary ──────────── */}
                    {tab === 'summary' && (
                        <div style={card}>
                            {categorySummary.length === 0 ? (
                                <p style={{ textAlign: 'center', color: textMuted }}>No data yet</p>
                            ) : (
                                <div>
                                    {categorySummary.map((cs, i) => {
                                        const cat = getCat(cs.category);
                                        const catVar = cs.actual - cs.estimated;
                                        const catPct = cs.estimated > 0 ? (cs.actual / cs.estimated * 100) : 0;
                                        const budgetShare = totalEstimated > 0 ? (cs.estimated / totalEstimated * 100) : 0;
                                        return (
                                            <div key={i} style={{ marginBottom: 16, padding: 14, borderRadius: 10, background: surfaceAlt, border: `1px solid ${surfaceBorder}` }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: cat.color }} />
                                                        <span style={{ fontWeight: 600, color: textPrimary, fontSize: 14 }}>{cat.label}</span>
                                                        <span style={{ fontSize: 11, color: textMuted }}>{budgetShare.toFixed(0)}% of budget</span>
                                                    </div>
                                                    <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
                                                        <span style={{ color: textSecondary }}>Est: <strong>{formatKES(cs.estimated)}</strong></span>
                                                        <span style={{ color: '#065f46' }}>Act: <strong>{formatKES(cs.actual)}</strong></span>
                                                        <span style={{ color: catVar > 0 ? '#ef4444' : '#22c55e', fontWeight: 600 }}>
                                                            {catVar !== 0 ? `${catVar > 0 ? '+' : ''}${formatKES(catVar).replace('KES ', '')}` : 'On track'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div style={{ height: 6, background: borderMed, borderRadius: 4, overflow: 'hidden' }}>
                                                    <div style={{ height: '100%', width: `${Math.min(100, catPct)}%`, borderRadius: 4, background: catPct > 100 ? '#ef4444' : cat.color, transition: 'width .4s' }} />
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 11, color: textMuted }}>
                                                    <span>{cs.paid}/{cs.count} items paid</span>
                                                    <span>{catPct.toFixed(0)}% executed</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ─── Tab: Audit Trail ───────────────── */}
                    {tab === 'audit' && (
                        <div style={card}>
                            {audit.length === 0 ? (
                                <p style={{ textAlign: 'center', color: textMuted }}>No audit entries yet</p>
                            ) : (
                                <div style={{ position: 'relative', paddingLeft: 24 }}>
                                    <div style={{ position: 'absolute', left: 8, top: 0, bottom: 0, width: 2, background: borderMed }} />
                                    {audit.map((a, i) => (
                                        <div key={i} style={{ position: 'relative', marginBottom: 16 }}>
                                            <div style={{ position: 'absolute', left: -20, top: 4, width: 10, height: 10, borderRadius: '50%', background: '#6c3baa', border: '2px solid #fff' }} />
                                            <div style={{ fontSize: 11, color: textMuted, marginBottom: 2 }}>
                                                {new Date(a.performed_at).toLocaleString()} &middot; <strong style={{ color: textPrimary }}>{a.performed_by_name || 'System'}</strong>
                                            </div>
                                            <div style={{ fontSize: 12, color: textPrimary }}>
                                                <span style={{ display: 'inline-block', padding: '1px 8px', borderRadius: 8, background: dk ? 'rgba(108,59,170,0.2)' : '#f0f0f5', color: '#6c3baa', fontWeight: 600, fontSize: 10, marginRight: 6, textTransform: 'uppercase' }}>{a.action}</span>
                                                {a.details}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Rejection reason */}
                    {budget.status === 'rejected' && budget.rejection_reason && (
                        <div style={{ ...card, background: dk ? 'rgba(239,68,68,0.1)' : '#fef2f2', border: dk ? '1px solid rgba(239,68,68,0.3)' : '1px solid #fca5a5' }}>
                            <strong style={{ color: dk ? '#fca5a5' : '#991b1b', fontSize: 13 }}>Rejection Reason:</strong>
                            <p style={{ margin: '6px 0 0', color: dk ? '#fca5a5' : '#7f1d1d', fontSize: 13 }}>{budget.rejection_reason}</p>
                        </div>
                    )}
                </>
            )}

            {/* ════════════════════════════════════════════════
                MODALS
            ═══════════════════════════════════════════════ */}

            {/* Create Budget Modal */}
            {showCreateBudget && (
                <div style={overlay} onClick={() => setShowCreateBudget(false)}>
                    <div style={modal} onClick={e => e.stopPropagation()}>
                        <h3 style={{ margin: '0 0 16px', fontSize: 17, color: textPrimary }}>
                            {budget ? 'Create New Version' : 'Create Budget'}
                        </h3>
                        <div style={{ marginBottom: 14 }}>
                            <label style={label}>Budget Name *</label>
                            <input style={input} placeholder="e.g. Main Event Budget" value={budgetForm.budget_name} onChange={e => setBudgetForm({ ...budgetForm, budget_name: e.target.value })} />
                        </div>
                        <div style={{ marginBottom: 14 }}>
                            <label style={label}>Notes</label>
                            <textarea style={{ ...input, minHeight: 70 }} placeholder="Optional notes..." value={budgetForm.notes} onChange={e => setBudgetForm({ ...budgetForm, notes: e.target.value })} />
                        </div>
                        {budget && <p style={{ fontSize: 12, color: '#f59e0b', margin: '0 0 12px' }}>⚠️ A new version will copy existing items from v{budget.version}.</p>}
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <button style={btnSecondary} onClick={() => setShowCreateBudget(false)}>Cancel</button>
                            <button style={btnPrimary} disabled={saving} onClick={handleCreateBudget}>{saving ? 'Creating...' : 'Create'}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add/Edit Item Modal */}
            {showAddItem && (
                <div style={overlay} onClick={() => { setShowAddItem(false); setEditItem(null); }}>
                    <div style={modal} onClick={e => e.stopPropagation()}>
                        <h3 style={{ margin: '0 0 16px', fontSize: 17, color: textPrimary }}>{editItem ? 'Edit Item' : 'Add Budget Item'}</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                            <div>
                                <label style={label}>Category *</label>
                                <select style={input} value={itemForm.category} onChange={e => setItemForm({ ...itemForm, category: e.target.value })}>
                                    {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={label}>Estimated Amount (KES) *</label>
                                <input style={input} type="number" min="0" step="100" placeholder="0" value={itemForm.estimated_amount} onChange={e => setItemForm({ ...itemForm, estimated_amount: e.target.value })} />
                            </div>
                        </div>
                        <div style={{ marginTop: 12 }}>
                            <label style={label}>Description *</label>
                            <input style={input} placeholder="e.g. Main venue hire for 3 days" value={itemForm.description} onChange={e => setItemForm({ ...itemForm, description: e.target.value })} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
                            <div>
                                <label style={label}>Vendor</label>
                                <input style={input} placeholder="Supplier name" value={itemForm.vendor} onChange={e => setItemForm({ ...itemForm, vendor: e.target.value })} />
                            </div>
                            <div>
                                <label style={label}>Notes</label>
                                <input style={input} placeholder="Optional" value={itemForm.notes} onChange={e => setItemForm({ ...itemForm, notes: e.target.value })} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
                            <button style={btnSecondary} onClick={() => { setShowAddItem(false); setEditItem(null); }}>Cancel</button>
                            <button style={btnPrimary} disabled={saving} onClick={handleAddItem}>{saving ? 'Saving...' : editItem ? 'Update' : 'Add Item'}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Record Expense Modal */}
            {showExpense && expenseItem && (
                <div style={overlay} onClick={() => { setShowExpense(false); setExpenseItem(null); }}>
                    <div style={modal} onClick={e => e.stopPropagation()}>
                        <h3 style={{ margin: '0 0 4px', fontSize: 17, color: textPrimary }}>Record Payment</h3>
                        <p style={{ margin: '0 0 16px', fontSize: 13, color: textSecondary }}>
                            {expenseItem.description} &middot; Estimated: {formatKES(expenseItem.estimated_amount)}
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                            <div>
                                <label style={label}>Actual Amount (KES) *</label>
                                <input style={input} type="number" min="0" step="100" value={expenseForm.actual_amount} onChange={e => setExpenseForm({ ...expenseForm, actual_amount: e.target.value })} />
                            </div>
                            <div>
                                <label style={label}>Payment Date *</label>
                                <input style={input} type="date" value={expenseForm.payment_date} onChange={e => setExpenseForm({ ...expenseForm, payment_date: e.target.value })} />
                            </div>
                            <div>
                                <label style={label}>Payment Method</label>
                                <select style={input} value={expenseForm.payment_method} onChange={e => setExpenseForm({ ...expenseForm, payment_method: e.target.value })}>
                                    {PAYMENT_METHODS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={label}>Receipt Ref</label>
                                <input style={input} placeholder="e.g. INV-001" value={expenseForm.receipt_ref} onChange={e => setExpenseForm({ ...expenseForm, receipt_ref: e.target.value })} />
                            </div>
                            <div>
                                <label style={label}>Vendor</label>
                                <input style={input} value={expenseForm.vendor} onChange={e => setExpenseForm({ ...expenseForm, vendor: e.target.value })} />
                            </div>
                            <div>
                                <label style={label}>Notes</label>
                                <input style={input} placeholder="Optional" value={expenseForm.notes} onChange={e => setExpenseForm({ ...expenseForm, notes: e.target.value })} />
                            </div>
                        </div>
                        <div style={{ marginTop: 12, padding: 10, background: dk ? 'rgba(245,158,11,0.12)' : '#fef3c7', borderRadius: 8, fontSize: 12, color: dk ? '#fcd34d' : '#92400e' }}>
                            💡 This will create a double-entry journal entry: Debit expense GL account → Credit cash/bank.
                        </div>
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
                            <button style={btnSecondary} onClick={() => { setShowExpense(false); setExpenseItem(null); }}>Cancel</button>
                            <button style={{ ...btnPrimary, background: 'linear-gradient(135deg,#22c55e,#16a34a)' }} disabled={saving} onClick={handleRecordExpense}>{saving ? 'Recording...' : '💳 Record Payment'}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Approval Modal */}
            {showApproval && (
                <div style={overlay} onClick={() => setShowApproval(false)}>
                    <div style={modal} onClick={e => e.stopPropagation()}>
                        <h3 style={{ margin: '0 0 16px', fontSize: 17, color: textPrimary }}>Budget Approval</h3>
                        <p style={{ fontSize: 13, color: textSecondary, margin: '0 0 16px' }}>
                            <strong>{budget.budget_name}</strong> &middot; Total: {formatKES(totalEstimated)} &middot; {items.length} items
                        </p>
                        <div style={{ marginBottom: 14 }}>
                            <label style={label}>Decision</label>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <button onClick={() => setApprovalForm({ ...approvalForm, decision: 'approve' })}
                                    style={{ ...btnSuccess, flex: 1, padding: '10px 0', fontWeight: 700, opacity: approvalForm.decision === 'approve' ? 1 : 0.4 }}>
                                    ✓ Approve
                                </button>
                                <button onClick={() => setApprovalForm({ ...approvalForm, decision: 'reject' })}
                                    style={{ ...btnDanger, flex: 1, padding: '10px 0', fontWeight: 700, opacity: approvalForm.decision === 'reject' ? 1 : 0.4 }}>
                                    ✗ Reject
                                </button>
                            </div>
                        </div>
                        {approvalForm.decision === 'reject' && (
                            <div style={{ marginBottom: 14 }}>
                                <label style={label}>Rejection Reason *</label>
                                <textarea style={{ ...input, minHeight: 70 }} placeholder="Explain why the budget is rejected..." value={approvalForm.reason} onChange={e => setApprovalForm({ ...approvalForm, reason: e.target.value })} />
                            </div>
                        )}
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <button style={btnSecondary} onClick={() => setShowApproval(false)}>Cancel</button>
                            <button style={btnPrimary} disabled={saving} onClick={handleApproval}>
                                {saving ? 'Processing...' : approvalForm.decision === 'approve' ? 'Approve Budget' : 'Reject Budget'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Upload Receipt Modal */}
            {showUpload && uploadItem && (
                <div style={overlay} onClick={() => { setShowUpload(false); setUploadItem(null); }}>
                    <div style={modal} onClick={e => e.stopPropagation()}>
                        <h3 style={{ margin: '0 0 4px', fontSize: 17, color: textPrimary }}>Upload Receipt</h3>
                        <p style={{ margin: '0 0 16px', fontSize: 13, color: textSecondary }}>
                            {uploadItem.description} &middot; Paid: {formatKES(uploadItem.actual_amount)}
                        </p>
                        {uploadItem.receipts?.length > 0 && (
                            <div style={{ marginBottom: 14 }}>
                                <label style={label}>Existing Receipts</label>
                                {uploadItem.receipts.map((r, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 6, background: surfaceAlt, borderRadius: 6, marginBottom: 4, fontSize: 12 }}>
                                        <span>📎</span>
                                        <span style={{ flex: 1, color: textPrimary }}>{r.file_name}</span>
                                        <span style={{ color: textMuted }}>{(r.file_size / 1024).toFixed(0)} KB</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div style={{ marginBottom: 14 }}>
                            <label style={label}>Upload New Receipt</label>
                            <input type="file" accept="image/jpeg,image/png,image/webp,application/pdf" onChange={handleUploadReceipt} disabled={saving}
                                style={{ width: '100%', padding: 8, border: `2px dashed ${dk ? 'rgba(255,255,255,0.15)' : '#d1d5db'}`, borderRadius: 8, fontSize: 13, cursor: 'pointer', background: 'transparent', color: textPrimary }} />
                            <p style={{ margin: '6px 0 0', fontSize: 11, color: textMuted }}>Accepted: JPEG, PNG, WebP, PDF (max 10MB)</p>
                        </div>
                        {saving && <p style={{ textAlign: 'center', color: '#6c3baa', fontSize: 13 }}>Uploading...</p>}
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button style={btnSecondary} onClick={() => { setShowUpload(false); setUploadItem(null); }}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Animation keyframes */}
            <style>{`@keyframes slideIn { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>
        </div>
    );
};

export default EventBudgetPage;
