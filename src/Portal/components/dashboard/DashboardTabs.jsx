import React from 'react';

const DashboardTabs = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'dashboard', label: 'My Dashboard', icon: '🎛️' },
        { id: 'cell', label: 'My Cell', icon: '👥' },
        { id: 'partnership', label: 'My Partnership', icon: '🤝' },
        { id: 'birthday', label: 'My Birthday', icon: '🎂' },
        { id: 'upcoming', label: 'Upcoming Birthdays', icon: '🎁' },
    ];

    return (
        <div className="dashboard-tabs-container">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`dashboard-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                >
                    <span className="tab-icon">{tab.icon}</span>
                    <span className="tab-label">{tab.label}</span>
                </button>
            ))}

            <style>{`
                .dashboard-tabs-container {
                    background: var(--surface-1);
                    padding: 0.5rem;
                    border-radius: 0.75rem;
                    display: flex;
                    gap: 0.5rem;
                    margin-bottom: 2rem;
                    overflow-x: auto;
                    border-bottom: 1px solid var(--border-color);
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                .dashboard-tabs-container::-webkit-scrollbar {
                    display: none;
                }
                .dashboard-tab-btn {
                    background: transparent;
                    border: none;
                    border-bottom: 2px solid transparent;
                    color: var(--text-muted);
                    padding: 0.75rem 1rem;
                    font-size: 0.9rem;
                    font-weight: 500;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    white-space: nowrap;
                    transition: all 0.2s;
                    flex-shrink: 0;
                }
                .dashboard-tab-btn.active {
                    border-bottom: 2px solid #22c1e6;
                    color: var(--primary);
                    font-weight: 600;
                }
                
                @media (max-width: 640px) {
                    .dashboard-tabs-container {
                        position: fixed !important;
                        bottom: 0 !important;
                        left: 0 !important;
                        right: 0 !important;
                        margin-bottom: 0 !important;
                        border-radius: 0 !important;
                        border-top: 1px solid var(--border-color) !important;
                        border-bottom: none !important;
                        z-index: 1000 !important;
                        padding: 0.75rem 0.5rem !important;
                        background: rgba(22, 22, 22, 0.9) !important;
                        backdrop-filter: blur(10px) !important;
                        justify-content: space-around !important;
                    }
                    .dashboard-tab-btn {
                        padding: 0.5rem !important;
                        font-size: 0.75rem !important;
                        flex-direction: column !important;
                        gap: 0.25rem !important;
                        border-bottom: none !important;
                    }
                    .dashboard-tab-btn.active {
                        color: var(--primary) !important;
                    }
                    .tab-icon {
                        font-size: 1.2rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default DashboardTabs;
