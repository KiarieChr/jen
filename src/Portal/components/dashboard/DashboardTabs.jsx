import React from 'react';

const DashboardTabs = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'dashboard', label: 'My Dashboard', icon: '00' },
        { id: 'calendar', label: 'Calendar', icon: '📅' },
        { id: 'cell', label: 'My Cell', icon: '👥' },
        { id: 'partnership', label: 'My Partnership', icon: '🤝' },
        { id: 'birthday', label: 'My Birthday', icon: '🎂' },
        { id: 'upcoming', label: 'Upcoming Birthdays', icon: '🎁' },
    ];

    return (
        <div style={{
            background: 'var(--surface-1)',
            padding: '0.5rem',
            borderRadius: '0.75rem',
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '2rem',
            overflowX: 'auto',
            borderBottom: '1px solid var(--border-color)'
        }}>
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                        background: activeTab === tab.id ? 'transparent' : 'transparent',
                        border: 'none',
                        borderBottom: activeTab === tab.id ? '2px solid #22c1e6' : '2px solid transparent',
                        color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-muted)',
                        padding: '0.75rem 1rem',
                        fontSize: '0.9rem',
                        fontWeight: activeTab === tab.id ? '600' : '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.2s'
                    }}
                >
                    <span>{tab.icon === '00' ? '🎛️' : tab.icon}</span>
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default DashboardTabs;
