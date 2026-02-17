import React, { useState } from 'react';
import NewCategoryModal from './NewCategoryModal';

const MeetingCategories = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const categories = [
        { name: 'Cell Meeting', count: 12, color: '#22c1e6' },
        { name: 'Training', count: 5, color: '#a855f7' },
        { name: 'Leadership', count: 4, color: '#f59e0b' },
        { name: 'Prayer', count: 8, color: '#ef4444' },
        { name: 'Outreach', count: 3, color: '#4ade80' },
    ];

    return (
        <div style={{
            background: '#1A1625',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.05)'
        }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#eff3c1', fontSize: '1rem' }}>Categories</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}>
                {categories.map((cat, idx) => (
                    <div key={idx} style={{
                        background: 'rgba(255,255,255,0.02)',
                        borderRadius: '0.75rem',
                        padding: '1rem',
                        borderLeft: `3px solid ${cat.color}`,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <div style={{ color: '#eff3c1', fontWeight: '500', fontSize: '0.9rem' }}>{cat.name}</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.2rem' }}>{cat.count} Meetings</div>
                    </div>
                ))}
                <button
                    onClick={() => setIsModalOpen(true)}
                    style={{
                        background: 'transparent',
                        border: '1px dashed rgba(255,255,255,0.2)',
                        borderRadius: '0.75rem',
                        color: '#94a3b8',
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
