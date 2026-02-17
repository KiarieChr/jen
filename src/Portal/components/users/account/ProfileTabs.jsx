import React from 'react';

const ProfileTabs = ({ activeTab, onTabChange }) => {
    return (
        <div style={{
            background: '#1A1625',
            borderRadius: '1rem',
            padding: '0 2rem',
            border: '1px solid rgba(255,255,255,0.05)',
            marginBottom: '1.5rem',
            display: 'flex',
            gap: '2rem'
        }}>
            <TabItem label="My Profile" icon="👤" active={activeTab === 'profile'} onClick={() => onTabChange('profile')} />
            <TabItem label="My Attendance Record" icon="📄" active={activeTab === 'attendance'} onClick={() => onTabChange('attendance')} />
            <TabItem label="Members I Invited" icon="➕" active={activeTab === 'invited'} onClick={() => onTabChange('invited')} />
        </div>
    );
};

const TabItem = ({ label, icon, active, onClick }) => (
    <div
        onClick={onClick}
        style={{
            padding: '1rem 0',
            color: active ? '#22c1e6' : '#94a3b8',
            borderBottom: active ? '2px solid #22c1e6' : '2px solid transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            fontWeight: active ? '600' : '400',
            transition: 'all 0.2s'
        }}>
        <span>{icon}</span> {label}
    </div>
);

export default ProfileTabs;
