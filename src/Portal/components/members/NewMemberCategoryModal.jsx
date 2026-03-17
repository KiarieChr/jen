import React, { useState } from 'react';

const NewMemberCategoryModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        color: 'var(--primary)'
    });

    const colors = [
        'var(--primary)', // Cyan
        'var(--secondary)', // Purple
        '#f59e0b', // Orange
        '#ef4444', // Red
        '#4ade80', // Green
        '#ec4899', // Pink
        '#6366f1', // Indigo
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleColorSelect = (color) => {
        setFormData(prev => ({ ...prev, color }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Category creation simulated: ' + JSON.stringify(formData));
        onClose();
    };

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        background: 'var(--bg-color)',
        border: '1px solid var(--border-color)',
        borderRadius: '0.5rem',
        color: 'var(--text-color)',
        fontSize: '0.9rem',
        marginTop: '0.4rem'
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
                maxWidth: '450px',
                border: '1px solid var(--border-color, rgba(255,255,255,0.1))',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                color: 'var(--text-color, #f8fafc)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-color)', margin: 0 }}>New Member Category</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                    <div>
                        <label style={labelStyle}>Category Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Visitor, Member, Leader"
                            style={inputStyle}
                            required
                        />
                    </div>

                    <div>
                        <label style={labelStyle}>Description (Optional)</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Brief description of who belongs to this category..."
                            style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                        />
                    </div>

                    <div>
                        <label style={labelStyle}>Color Tag</label>
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                            {colors.map(color => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => handleColorSelect(color)}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        background: color,
                                        border: formData.color === color ? '3px solid white' : '2px solid transparent',
                                        cursor: 'pointer',
                                        boxShadow: formData.color === color ? '0 0 0 2px #22c1e6' : 'none',
                                        transition: 'all 0.2s'
                                    }}
                                    aria-label={`Select color ${color}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
                        <button type="button" onClick={onClose} style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--border-color)',
                            background: 'transparent',
                            color: 'var(--text-muted)',
                            cursor: 'pointer'
                        }}>Cancel</button>
                        <button type="submit" style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            background: 'var(--primary)',
                            color: 'var(--bg-color)',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}>Create Category</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewMemberCategoryModal;
