import React, { useState } from 'react';
import EventStatsCards from '../components/meetings/events/EventStatsCards';
import UpcomingEventsList from '../components/meetings/events/UpcomingEventsList';
import PastEventsTable from '../components/meetings/events/PastEventsTable';
import CreateEventModal from '../components/meetings/events/CreateEventModal';
import EventAnalytics from '../components/meetings/events/EventAnalytics';

const EventsDashboard = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-color)' }}>Events</h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Plan, track, and manage ministry events.</p>
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
                    <span style={{ fontSize: '1.2rem' }}>+</span> Create Event
                </button>
            </div>

            {/* Stats */}
            <EventStatsCards />

            {/* Analytics */}
            <EventAnalytics />

            {/* Lists */}
            <UpcomingEventsList />
            <PastEventsTable />

            {/* Modal */}
            {isCreateModalOpen && <CreateEventModal onClose={() => setIsCreateModalOpen(false)} />}
        </div>
    );
};

export default EventsDashboard;
