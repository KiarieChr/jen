import React, { useState, useCallback } from 'react';
import MeetingStatsCards from '../components/meetings/MeetingStatsCards';
import MeetingsList from '../components/meetings/MeetingsList';
import MeetingCategories from '../components/meetings/MeetingCategories';
import CreateMeetingModal from '../components/meetings/CreateMeetingModal';

const MeetingsDashboard = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleCreated = useCallback(() => {
        setRefreshKey(k => k + 1);
    }, []);

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-color)' }}>Meetings</h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Schedule, manage, and track all ministry gatherings.</p>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    style={{
                        background: 'var(--primary)',
                        color: 'var(--bg-color)',
                        border: 'none',
                        borderRadius: '0.5rem',
                        padding: '0.75rem 1.5rem',
                        fontSize: '0.95rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 4px 15px rgba(34, 193, 230, 0.3)'
                    }}
                >
                    <span style={{ fontSize: '1.2rem' }}>+</span> Create Meeting
                </button>
            </div>

            {/* Content */}
            <MeetingStatsCards key={`stats-${refreshKey}`} />
            <MeetingsList key={`list-${refreshKey}`} />
            <MeetingCategories key={`cats-${refreshKey}`} />

            {/* Modal */}
            {isCreateModalOpen && (
                <CreateMeetingModal
                    onClose={() => setIsCreateModalOpen(false)}
                    onCreated={handleCreated}
                />
            )}
        </div>
    );
};

export default MeetingsDashboard;
