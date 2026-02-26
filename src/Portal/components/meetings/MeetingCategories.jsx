import React, { useState } from 'react';
import NewCategoryModal from './NewCategoryModal';

const MeetingCategories = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const categories = [
        { name: 'Cell Meeting', count: 12, color: 'var(--primary)' },
        { name: 'Training', count: 5, color: 'var(--secondary)' },
        { name: 'Leadership', count: 4, color: '#f59e0b' },
        { name: 'Prayer', count: 8, color: '#ef4444' },
        { name: 'Outreach', count: 3, color: '#4ade80' },
    ];

    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid var(--border-color)'
        }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-color)', fontSize: '1rem' }}>Categories</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}>
                {categories.map((cat, idx) => (
                    <div key={idx} style={{
                        background: 'var(--surface-2)',
                        borderRadius: '0.75rem',
                        padding: '1rem',
                        borderLeft: `3px solid ${cat.color}`,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <div style={{ color: 'var(--text-color)', fontWeight: '500', fontSize: '0.9rem' }}>{cat.name}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.2rem' }}>{cat.count} Meetings</div>
                    </div>
                ))}
                <button
                    onClick={() => setIsModalOpen(true)}
                    style={{
                        background: 'transparent',
                        border: '1px dashed rgba(255,255,255,0.2)',
                        borderRadius: '0.75rem',
                        color: 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        minHeight: '70px'
                    }}>
                    + Add New
                </button>
            </div>

            {isModalOpen && <NewCategoryModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default MeetingCategories;
