import React, { useState, useEffect } from 'react';
import { API_BASE_URL as API_URL } from '../../services/api';

// Stats Card Component
const StatsCard = ({ icon, value, label, color }) => (
    <div style={{
        background: 'var(--surface-1)',
        borderRadius: '1rem',
        padding: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        border: '1px solid var(--border-color, rgba(34, 193, 230, 0.2))'
    }}>
        <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: color || 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem'
        }}>
            {icon}
        </div>
        <div>
            <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-color)' }}>{value}</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{label}</div>
        </div>
    </div>
);

// Devotional Table Row
const DevotionalRow = ({ devotional, onEdit, onDelete }) => (
    <tr style={{ borderBottom: '1px solid var(--border-color, rgba(34, 193, 230, 0.1))' }}>
        <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img
                src={devotional.featured_image || 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=100&auto=format&fit=crop'}
                alt={devotional.title}
                style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }}
            />
            <div>
                <div style={{ fontWeight: '600', color: 'var(--text-color)' }}>{devotional.title}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{devotional.scripture_reference}</div>
            </div>
        </td>
        <td style={{ padding: '1rem', color: 'var(--text-color)' }}>{devotional.author?.name || 'Unknown'}</td>
        <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{devotional.date_formatted}</td>
        <td style={{ padding: '1rem' }}>
            <span style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '600',
                background: devotional.status === 'published' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                color: devotional.status === 'published' ? '#22c55e' : '#eab308'
            }}>
                {devotional.status}
            </span>
        </td>
        <td style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                    onClick={() => onEdit(devotional)}
                    style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        border: 'none',
                        background: 'var(--primary)',
                        color: 'var(--bg-color)',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                    }}
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(devotional.id)}
                    style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        border: 'none',
                        background: 'rgba(239, 68, 68, 0.2)',
                        color: '#ef4444',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                    }}
                >
                    Delete
                </button>
            </div>
        </td>
    </tr>
);

// Add/Edit Modal Component
const DevotionalModal = ({ devotional, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        title: devotional?.title || '',
        slug: devotional?.slug || '',
        devotional_date: devotional?.date || new Date().toISOString().split('T')[0],
        scripture_reference: devotional?.scripture_reference || '',
        scripture_text: devotional?.scripture_text || '',
        message: devotional?.message || '',
        author_id: devotional?.author?.id || '',
        featured_image: devotional?.featured_image || '',
        status: devotional?.status || 'draft'
    });
    const [authors, setAuthors] = useState([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        // Fetch authors for dropdown
        const fetchAuthors = async () => {
            try {
                const response = await fetch(`${API_URL}get_devotional_authors.php`);
                const data = await response.json();
                if (data.success) {
                    setAuthors(data.authors || []);
                }
            } catch (err) {
                console.error('Error fetching authors:', err);
            }
        };
        fetchAuthors();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            // Auto-generate slug from title
            ...(name === 'title' && !devotional ? { slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') } : {})
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const endpoint = devotional ? 'update_devotional.php' : 'add_devotional.php';
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, id: devotional?.id })
            });
            const data = await response.json();
            if (data.success) {
                onSave();
                onClose();
            } else {
                alert(data.message || 'Failed to save devotional');
            }
        } catch (err) {
            console.error('Error saving devotional:', err);
            alert('An error occurred while saving');
        } finally {
            setSaving(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        borderRadius: '8px',
        border: '1px solid var(--border-color, rgba(34, 193, 230, 0.3))',
        background: 'var(--surface-1)',
        color: 'var(--text-color)',
        fontSize: '0.9rem'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: '600',
        color: 'var(--text-color)',
        fontSize: '0.875rem'
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
        }}>
            <div style={{
                background: 'var(--bg-color, #0a0a0a)',
                borderRadius: '1rem',
                width: '100%',
                maxWidth: '700px',
                maxHeight: '90vh',
                overflow: 'auto',
                border: '1px solid var(--border-color, rgba(34, 193, 230, 0.3))'
            }}>
                <div style={{
                    padding: '1.5rem',
                    borderBottom: '1px solid var(--border-color, rgba(34, 193, 230, 0.2))',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h2 style={{ color: 'var(--primary)', margin: 0 }}>
                        {devotional ? 'Edit Devotional' : 'Add New Devotional'}
                    </h2>
                    <button onClick={onClose} style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        fontSize: '1.5rem',
                        cursor: 'pointer'
                    }}>×</button>
                </div>

                <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={labelStyle}>Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    style={inputStyle}
                                    placeholder="Enter devotional title"
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Date *</label>
                                <input
                                    type="date"
                                    name="devotional_date"
                                    value={formData.devotional_date}
                                    onChange={handleChange}
                                    required
                                    style={inputStyle}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={labelStyle}>Slug</label>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="url-friendly-slug"
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={labelStyle}>Scripture Reference *</label>
                                <input
                                    type="text"
                                    name="scripture_reference"
                                    value={formData.scripture_reference}
                                    onChange={handleChange}
                                    required
                                    style={inputStyle}
                                    placeholder="e.g., John 3:16"
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Author</label>
                                <select
                                    name="author_id"
                                    value={formData.author_id}
                                    onChange={handleChange}
                                    style={inputStyle}
                                >
                                    <option value="">Select Author</option>
                                    {authors.map(author => (
                                        <option key={author.id} value={author.id}>{author.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label style={labelStyle}>Scripture Text *</label>
                            <textarea
                                name="scripture_text"
                                value={formData.scripture_text}
                                onChange={handleChange}
                                required
                                rows={3}
                                style={inputStyle}
                                placeholder="Enter the scripture verse text"
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>Message *</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={6}
                                style={inputStyle}
                                placeholder="Enter the devotional message/reflection"
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={labelStyle}>Featured Image URL</label>
                                <input
                                    type="url"
                                    name="featured_image"
                                    value={formData.featured_image}
                                    onChange={handleChange}
                                    style={inputStyle}
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    style={inputStyle}
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '1rem',
                        marginTop: '2rem',
                        paddingTop: '1rem',
                        borderTop: '1px solid var(--border-color, rgba(34, 193, 230, 0.2))'
                    }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '8px',
                                border: '1px solid var(--border-color, rgba(34, 193, 230, 0.3))',
                                background: 'transparent',
                                color: 'var(--text-color)',
                                cursor: 'pointer',
                                fontWeight: '600'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '8px',
                                border: 'none',
                                background: 'var(--primary)',
                                color: 'var(--bg-color)',
                                cursor: saving ? 'not-allowed' : 'pointer',
                                fontWeight: '600',
                                opacity: saving ? 0.7 : 1
                            }}
                        >
                            {saving ? 'Saving...' : (devotional ? 'Update Devotional' : 'Add Devotional')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Main Dashboard Component
const DevotionalsDashboard = () => {
    const [devotionals, setDevotionals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({ current_page: 1, total_pages: 1, total_count: 0 });
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [editingDevotional, setEditingDevotional] = useState(null);

    const fetchDevotionals = async () => {
        try {
            setLoading(true);
            let url = `${API_URL}get_devotionals.php?limit=10&page=${currentPage}`;
            if (statusFilter !== 'all') {
                url += `&status=${statusFilter}`;
            }
            const response = await fetch(url);
            const data = await response.json();

            if (data.success) {
                setDevotionals(data.devotionals || []);
                setPagination(data.pagination || {});
            } else {
                setError(data.message || 'Failed to load devotionals');
            }
        } catch (err) {
            console.error('Error fetching devotionals:', err);
            setError('Unable to load devotionals');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDevotionals();
    }, [currentPage, statusFilter]);

    const handleEdit = (devotional) => {
        setEditingDevotional(devotional);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this devotional?')) return;

        try {
            const response = await fetch(`${API_URL}delete_devotional.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            const data = await response.json();
            if (data.success) {
                fetchDevotionals();
            } else {
                alert(data.message || 'Failed to delete');
            }
        } catch (err) {
            console.error('Error deleting:', err);
            alert('An error occurred');
        }
    };

    const handleSave = () => {
        fetchDevotionals();
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingDevotional(null);
    };

    // Filter devotionals by search term
    const filteredDevotionals = devotionals.filter(d =>
        d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.scripture_reference?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = {
        total: pagination.total_count || 0,
        published: devotionals.filter(d => d.status === 'published').length,
        drafts: devotionals.filter(d => d.status === 'draft').length
    };

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem'
            }}>
                <div>
                    <h1 style={{ color: 'var(--primary)', margin: 0, fontSize: '1.75rem' }}>📖 Devotionals</h1>
                    <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 0', fontSize: '0.9rem' }}>
                        Manage daily devotional content
                    </p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '8px',
                        border: 'none',
                        background: 'var(--primary)',
                        color: 'var(--bg-color)',
                        cursor: 'pointer',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    + Add Devotional
                </button>
            </div>

            {/* Stats Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem'
            }}>
                <StatsCard icon="📖" value={stats.total} label="Total Devotionals" color="rgba(34, 193, 230, 0.2)" />
                <StatsCard icon="✅" value={stats.published} label="Published" color="rgba(34, 197, 94, 0.2)" />
                <StatsCard icon="📝" value={stats.drafts} label="Drafts" color="rgba(234, 179, 8, 0.2)" />
            </div>

            {/* Filters */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '1.5rem',
                flexWrap: 'wrap'
            }}>
                <input
                    type="text"
                    placeholder="Search devotionals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        flex: 1,
                        minWidth: '200px',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color, rgba(34, 193, 230, 0.3))',
                        background: 'var(--surface-1)',
                        color: 'var(--text-color)',
                        fontSize: '0.9rem'
                    }}
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color, rgba(34, 193, 230, 0.3))',
                        background: 'var(--surface-1)',
                        color: 'var(--text-color)',
                        fontSize: '0.9rem',
                        cursor: 'pointer'
                    }}
                >
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Drafts</option>
                </select>
            </div>

            {/* Table */}
            <div style={{
                background: 'var(--surface-1)',
                borderRadius: '1rem',
                border: '1px solid var(--border-color, rgba(34, 193, 230, 0.2))',
                overflow: 'hidden'
            }}>
                {loading ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        Loading devotionals...
                    </div>
                ) : error ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: '#ef4444' }}>
                        {error}
                    </div>
                ) : filteredDevotionals.length === 0 ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📖</div>
                        <h3 style={{ color: 'var(--text-color)' }}>No devotionals found</h3>
                        <p>Add your first devotional to get started</p>
                    </div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{
                                background: 'rgba(34, 193, 230, 0.1)',
                                borderBottom: '1px solid var(--border-color, rgba(34, 193, 230, 0.2))'
                            }}>
                                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-color)', fontWeight: '600' }}>Devotional</th>
                                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-color)', fontWeight: '600' }}>Author</th>
                                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-color)', fontWeight: '600' }}>Date</th>
                                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-color)', fontWeight: '600' }}>Status</th>
                                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-color)', fontWeight: '600' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDevotionals.map(devotional => (
                                <DevotionalRow
                                    key={devotional.id}
                                    devotional={devotional}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination */}
            {pagination.total_pages > 1 && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginTop: '2rem'
                }}>
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            border: 'none',
                            background: currentPage === 1 ? 'var(--surface-1)' : 'var(--primary)',
                            color: currentPage === 1 ? 'var(--text-muted)' : 'var(--bg-color)',
                            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        Previous
                    </button>
                    <span style={{ color: 'var(--text-muted)', padding: '0 1rem' }}>
                        Page {pagination.current_page} of {pagination.total_pages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(p => p + 1)}
                        disabled={!pagination.has_more}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            border: 'none',
                            background: !pagination.has_more ? 'var(--surface-1)' : 'var(--primary)',
                            color: !pagination.has_more ? 'var(--text-muted)' : 'var(--bg-color)',
                            cursor: !pagination.has_more ? 'not-allowed' : 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <DevotionalModal
                    devotional={editingDevotional}
                    onClose={handleCloseModal}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default DevotionalsDashboard;
