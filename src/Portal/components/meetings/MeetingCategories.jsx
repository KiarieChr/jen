import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import NewCategoryModal from './NewCategoryModal';

const MeetingCategories = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Color palette for categories
    const colors = ['var(--primary)', '#f59e0b', '#ef4444', '#4ade80', '#a855f7', '#ec4899', '#06b6d4'];

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/get_meeting_types.php');
                if (response.success) {
                    setCategories(response.data.meeting_types || []);
                }
            } catch (err) {
                console.error('Error fetching meeting types:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid var(--border-color)'
        }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-color)', fontSize: '1rem' }}>Meeting Types</h3>
            {loading ? (
                <div style={{ color: 'var(--text-muted)', padding: '1rem' }}>Loading categories...</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}>
                    {categories.map((cat, idx) => (
                        <div key={cat.id} style={{
                            background: 'var(--surface-2)',
                            borderRadius: '0.75rem',
                            padding: '1rem',
                            borderLeft: `3px solid ${colors[idx % colors.length]}`,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                            <div style={{ color: 'var(--text-color)', fontWeight: '500', fontSize: '0.9rem' }}>{cat.name}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.2rem' }}>{cat.meeting_count} Meetings</div>
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
            )}

            {isModalOpen && <NewCategoryModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default MeetingCategories;
