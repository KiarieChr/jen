import React, { useState } from 'react';
import GreetingCard from '../components/dashboard/GreetingCard';
import StatsGrid from '../components/dashboard/StatsGrid';
import DashboardTabs from '../components/dashboard/DashboardTabs';

// Widgets
import CalendarWidget from '../components/dashboard/CalendarWidget';
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
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <GreetingCard />
            <StatsGrid />
            <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {activeTab === 'dashboard' ? (
                <div className="dashboard-grid">
                    {/* Row 1: Trends & Health */}
                    <div style={{ gridArea: 'trend' }}>
                        <AttendanceTrendChart />
                    </div>
                    <div style={{ gridArea: 'health' }}>
                        <ParticipationHealthChart />
                    </div>

                    {/* Row 2: Breakdown, Giving, Engagement */}
                    <div style={{ gridArea: 'breakdown' }}>
                        <MonthlyAttendanceChart />
                    </div>
                    <div style={{ gridArea: 'giving' }}>
                        <GivingProgressChart />
                    </div>
                    <div style={{ gridArea: 'cellPie' }}>
                        <CellEngagementChart />
                    </div>

                    {/* Row 3: Quick Actions */}
                    <div style={{ gridArea: 'actions' }}>
                        <QuickActionsWidget />
                    </div>

                    {/* Row 4: Lists & Details */}
                    <div style={{ gridArea: 'recent' }}>
                        <AttendanceWidget />
                    </div>
                    <div style={{ gridArea: 'insights' }}>
                        <SmartInsightsWidget />
                    </div>
                    <div style={{ gridArea: 'cellGroup' }}>
                        <CellOverviewWidget />
                    </div>
                </div>
            ) : activeTab === 'cell' ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    <div style={{ flex: 2, minWidth: '350px' }}>
                        <CellEngagementChart />
                    </div>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <CellOverviewWidget />
                    </div>
                    <style>{`
                        @media (min-width: 1024px) {
                            div[style*="grid-template-columns"] {
                                grid-template-columns: 2fr 1fr !important;
                            }
                        }
                     `}</style>
                </div>
            ) : activeTab === 'partnership' ? (
                <div className="partnership-grid">
                    <div style={{ gridArea: 'tier' }}>
                        <PartnershipTierWidget />
                    </div>
                    <div style={{ gridArea: 'graph' }}>
                        <GivingProgressChart />
                    </div>
                    <div style={{ gridArea: 'list' }}>
                        <ContributionHistoryWidget />
                    </div>
                    <div style={{ gridArea: 'pledge' }}>
                        <PledgesWidget />
                    </div>
                    <style>{`
                        .partnership-grid {
                            display: grid;
                            gap: 1.5rem;
                            grid-template-columns: 1fr;
                            grid-template-areas: "tier" "graph" "list" "pledge";
                        }
                        @media (min-width: 1024px) {
                            .partnership-grid {
                                grid-template-columns: 1fr 2fr;
                                grid-template-rows: auto auto;
                                grid-template-areas: 
                                    "tier graph"
                                    "list list"
                                    "pledge pledge"; /* Adjusted to fit */
                            }
                             /* Better layout */
                             .partnership-grid {
                                grid-template-columns: 1fr 1fr 1fr;
                                grid-template-areas: 
                                    "tier graph list"
                                    "pledge graph list"; /* Spanning */
                             }
                             /* Simplest robust layout */
                             .partnership-grid {
                                grid-template-columns: 1fr 2fr;
                                grid-template-areas: 
                                    "tier graph"
                                    "pledge list";
                             }
                        }
                    `}</style>
                </div>
            ) : activeTab === 'birthday' ? (
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <BirthdayCard />
                </div>
            ) : activeTab === 'upcoming' ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    <div style={{ flex: 1 }}>
                        <BirthdaysWidget />
                    </div>
                    <div style={{ flex: 1 }}>
                        <UpcomingEventsList />
                    </div>
                    <style>{`
                        @media (min-width: 1024px) {
                            div[style*="grid-template-columns"] {
                                grid-template-columns: 1fr 1fr !important;
                            }
                        }
                     `}</style>
                </div>
            ) : (
                <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)', background: 'var(--surface-1)', borderRadius: '1rem' }}>
                    <h2 style={{ color: 'var(--text-color)' }}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Module</h2>
                    <p>Detailed view coming soon...</p>
                </div>
            )}

            <style>{`
                .dashboard-grid {
                    display: grid;
                    gap: 1.5rem;
                    grid-template-columns: 1fr;
                }

                @media (min-width: 1024px) {
                    .dashboard-grid {
                        grid-template-columns: repeat(3, 1fr);
                        grid-template-areas: 
                            "trend trend health"
                            "breakdown giving cellPie"
                            "actions actions actions" 
                            "recent insights cellGroup";
                    }
                }
            `}</style>
        </div>
    );
};

export default Dashboard;
