import React, { useState, useEffect } from 'react';
import api from '../../services/api';

// Components
import EventsTabs from '../components/events/EventsTabs';
import UpcomingEventCard from '../components/events/UpcomingEventCard';
import RegistrationProgressChart from '../components/events/RegistrationProgressChart';
import FinancialSummaryChart from '../components/events/FinancialSummaryChart';
import GenderDistributionChart from '../components/events/GenderDistributionChart';
import AllEventsTable from '../components/events/AllEventsTable';
import CreateEventModal from '../components/meetings/events/CreateEventModal';

const EventsDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const response = await api.get('/get_events_dashboard.php');
                // api.js interceptor already returns response.data, so response IS the data
                if (response?.success) {
                    setDashboardData(response.data);
                }
            } catch (err) {
                console.error('Error fetching events data:', err);
                setError('Failed to load events data');
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const renderDashboardTab = () => {
        if (loading) {
            return (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '3rem',
                    color: 'var(--text-muted)'
                }}>
                    Loading events data...
                </div>
            );
        }

        return (
            <>
                {/* Row 1: Upcoming Event & Registration Progress */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '1.5rem'
                }}>
                    <UpcomingEventCard event={dashboardData?.upcoming_event} />
                    <RegistrationProgressChart data={dashboardData?.overall_progress} />
                </div>

                {/* Row 2: Financial Summary & Gender Distribution */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '1.5rem'
                }}>
                    <FinancialSummaryChart data={dashboardData?.financial_stats} />
                    <GenderDistributionChart
                        data={dashboardData?.gender_distribution}
                        total={dashboardData?.gender_total}
                    />
                </div>

                {/* Stats Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                }}>
                    <StatCard
                        icon="🎉"
                        value={dashboardData?.summary?.total_events || 0}
                        label="Total Events"
                        color="#22c1e6"
                    />
                    <StatCard
                        icon="⏳"
                        value={dashboardData?.summary?.upcoming_count || 0}
                        label="Upcoming"
                        color="#f59e0b"
                    />
                    <StatCard
                        icon="✅"
                        value={dashboardData?.summary?.past_count || 0}
                        label="Completed"
                        color="#22c55e"
                    />
                    <StatCard
                        icon="👥"
                        value={dashboardData?.overall_progress?.registered || 0}
                        label="Registered"
                        color="#a855f7"
                    />
                </div>
            </>
        );
    };

    const renderMobilisationTab = () => (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1rem',
            padding: '3rem',
            border: '1px solid var(--border-color)',
            textAlign: 'center'
        }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📢</div>
            <h3 style={{ color: 'var(--text-color)', marginBottom: '0.5rem' }}>
                Events Mobilisation
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Mobilisation tools and invitee management coming soon.
            </p>
        </div>
    );

    const renderStatisticsTab = () => (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1rem',
            padding: '3rem',
            border: '1px solid var(--border-color)',
            textAlign: 'center'
        }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
            <h3 style={{ color: 'var(--text-color)', marginBottom: '0.5rem' }}>
                Events Statistics
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Advanced analytics and reporting coming soon.
            </p>
        </div>
    );

    const renderAllEventsTab = () => (
        <AllEventsTable
            events={dashboardData?.all_events || []}
            onCreateEvent={() => setIsCreateModalOpen(true)}
        />
    );

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
            }}>
                <div>
                    <h1 style={{
                        fontSize: '1.8rem',
                        fontWeight: '800',
                        margin: 0,
                        color: 'var(--text-color)'
                    }}>
                        Events
                    </h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                        Plan, track, and manage ministry events.
                    </p>
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

            {/* Tabs */}
            <EventsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Tab Content */}
            {activeTab === 'dashboard' && renderDashboardTab()}
            {activeTab === 'mobilisation' && renderMobilisationTab()}
            {activeTab === 'statistics' && renderStatisticsTab()}
            {activeTab === 'all' && renderAllEventsTab()}

            {/* Create Event Modal */}
            {isCreateModalOpen && (
                <CreateEventModal onClose={() => setIsCreateModalOpen(false)} />
            )}
        </div>
    );
};

// Stat Card Component
const StatCard = ({ icon, value, label, color = 'var(--primary)' }) => (
    <div style={{
        background: 'var(--surface-1)',
        borderRadius: '1rem',
        padding: '1.25rem',
        border: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    }}>
        <div style={{
            width: '45px',
            height: '45px',
            borderRadius: '10px',
            background: `${color}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.3rem'
        }}>
            {icon}
        </div>
        <div>
            <div style={{
                fontSize: '1.4rem',
                fontWeight: '700',
                color: 'var(--text-color)',
                lineHeight: 1
            }}>
                {value}
            </div>
            <div style={{
                color: 'var(--text-muted)',
                fontSize: '0.75rem',
                fontWeight: '500',
                marginTop: '0.2rem'
            }}>
                {label}
            </div>
        </div>
    </div>
);

export default EventsDashboard;
