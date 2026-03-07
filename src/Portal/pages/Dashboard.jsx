import React, { useState } from 'react';
import GreetingCard from '../components/dashboard/GreetingCard';
import StatsGrid from '../components/dashboard/StatsGrid';
import DashboardTabs from '../components/dashboard/DashboardTabs';
import ProfilePrompt from '../components/dashboard/ProfilePrompt';

// Widgets
import CellOverviewWidget from '../components/dashboard/CellOverviewWidget';
import AttendanceWidget from '../components/dashboard/AttendanceWidget';
import PledgesWidget from '../components/dashboard/PledgesWidget';
import BirthdaysWidget from '../components/dashboard/BirthdaysWidget';
import SmartInsightsWidget from '../components/dashboard/SmartInsightsWidget';
import QuickActionsWidget from '../components/dashboard/QuickActionsWidget';
import PartnershipTierWidget from '../components/dashboard/PartnershipTierWidget';
import ContributionHistoryWidget from '../components/dashboard/ContributionHistoryWidget';
import BirthdayCard from '../components/dashboard/BirthdayCard';
import UpcomingEventsList from '../components/dashboard/UpcomingEventsList';

// Charts
import AttendanceTrendChart from '../components/dashboard/charts/AttendanceTrendChart';
import ParticipationHealthChart from '../components/dashboard/charts/ParticipationHealthChart';
import GivingProgressChart from '../components/dashboard/charts/GivingProgressChart';
import MonthlyAttendanceChart from '../components/dashboard/charts/MonthlyAttendanceChart';
import CellEngagementChart from '../components/dashboard/charts/CellEngagementChart';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <div className="dashboard-content-wrapper">
            {/* Show profile prompt, greeting, and stats only on Dashboard tab OR on desktop */}
            <div className={`dashboard-top-section ${activeTab !== 'dashboard' ? 'mobile-hidden' : ''}`}>
                <ProfilePrompt />
                <GreetingCard />
                <StatsGrid />
            </div>
            <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {activeTab === 'dashboard' ? (
                <div className="dashboard-grid">
                    {/* Primary Row: Trends & Health */}
                    <div className="horizontal-widget-row">
                        <div className="grid-item-trend">
                            <AttendanceTrendChart />
                        </div>
                        <div className="grid-item-health">
                            <ParticipationHealthChart />
                        </div>
                    </div>

                    {/* Secondary Row: Insights & Recent Attendance */}
                    <div className="horizontal-widget-row">
                        <div className="grid-item-insights">
                            <SmartInsightsWidget />
                        </div>
                        <div className="grid-item-recent">
                            <AttendanceWidget />
                        </div>
                    </div>

                    {/* Tertiary Row: Cell Overview */}
                    <div className="horizontal-widget-row">
                        <div className="grid-item-cell">
                            <CellOverviewWidget />
                        </div>
                    </div>
                </div>
            ) : activeTab === 'cell' ? (
                <div className="cell-tab-grid">
                    <div className="grid-item-chart">
                        <CellEngagementChart />
                    </div>
                    <div className="grid-item-overview">
                        <CellOverviewWidget />
                    </div>
                </div>
            ) : activeTab === 'partnership' ? (
                <div className="partnership-grid">
                    <div className="grid-item-tier">
                        <PartnershipTierWidget />
                    </div>
                    <div className="grid-item-graph">
                        <GivingProgressChart />
                    </div>
                    <div className="grid-item-list">
                        <ContributionHistoryWidget />
                    </div>
                    <div className="grid-item-pledge">
                        <PledgesWidget />
                    </div>
                </div>
            ) : activeTab === 'birthday' ? (
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <BirthdayCard />
                </div>
            ) : activeTab === 'upcoming' ? (
                <div className="upcoming-grid">
                    <div>
                        <BirthdaysWidget />
                    </div>
                    <div>
                        <UpcomingEventsList />
                    </div>
                </div>
            ) : (
                <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)', background: 'var(--surface-1)', borderRadius: '1rem' }}>
                    <h2 style={{ color: 'var(--text-color)' }}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Module</h2>
                    <p>Detailed view coming soon...</p>
                </div>
            )}

            <style>{`
                .dashboard-content-wrapper {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding-bottom: 2rem;
                }

                @media (max-width: 640px) {
                    .dashboard-content-wrapper {
                        padding-bottom: 80px;
                    }
                    .mobile-hidden {
                        display: none !important;
                    }
                }

                .dashboard-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .horizontal-widget-row {
                    display: flex;
                    gap: 1.25rem;
                    overflow-x: auto;
                    padding: 0.25rem 0.25rem 1rem;
                    margin: -0.25rem -0.25rem 0.5rem;
                    scrollbar-width: none;
                    scroll-snap-type: x mandatory;
                    -webkit-overflow-scrolling: touch;
                }
                .horizontal-widget-row::-webkit-scrollbar { display: none; }
                
                .horizontal-widget-row > div {
                    flex: 0 0 280px;
                    scroll-snap-align: start;
                }

                @media (min-width: 1024px) {
                    .dashboard-grid {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        grid-template-areas: 
                            "trend trend health"
                            "recent insights cell";
                        gap: 1.5rem;
                    }
                    .horizontal-widget-row {
                        display: contents !important;
                    }
                    .grid-item-trend { grid-area: trend; }
                    .grid-item-health { grid-area: health; }
                    .grid-item-insights { grid-area: insights; }
                    .grid-item-recent { grid-area: recent; }
                    .grid-item-cell { grid-area: cell; }
                }

                /* Cell Tab Grid */
                .cell-tab-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                @media (min-width: 1024px) {
                    .cell-tab-grid {
                        display: grid;
                        grid-template-columns: 2fr 1fr;
                        grid-template-areas: "chart overview";
                    }
                    .cell-tab-grid .grid-item-chart { grid-area: chart; }
                    .cell-tab-grid .grid-item-overview { grid-area: overview; }
                }

                /* Partnership Grid */
                .partnership-grid {
                    display: grid;
                    gap: 1.5rem;
                    grid-template-columns: 1fr;
                    grid-template-areas: "tier" "graph" "list" "pledge";
                }
                
                @media (min-width: 1024px) {
                    .partnership-grid {
                        grid-template-columns: 1fr 2fr;
                        grid-template-areas: 
                            "tier graph"
                            "pledge list";
                    }
                }

                .partnership-grid .grid-item-tier { grid-area: tier; }
                .partnership-grid .grid-item-graph { grid-area: graph; }
                .partnership-grid .grid-item-list { grid-area: list; }
                .partnership-grid .grid-item-pledge { grid-area: pledge; }

                /* Upcoming Birthdays Grid */
                .upcoming-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                }

                @media (min-width: 1024px) {
                    .upcoming-grid {
                        grid-template-columns: 1fr 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default Dashboard;
