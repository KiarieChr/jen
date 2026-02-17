import React from 'react';

const AuditItem = ({ user, action, time }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.8rem',
        padding: '0.8rem 0',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        fontSize: '0.85rem'
    }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c1e6' }}></div>
        <div style={{ flex: 1 }}>
            <span style={{ color: '#eff3c1', fontWeight: '600' }}>{user}</span> <span style={{ color: '#94a3b8' }}>{action}</span>
        </div>
        <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{time}</div>
    </div>
);

const UserAuditLog = () => {
    return (
        <div style={{
            background: '#1A1625',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.05)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, color: '#eff3c1', fontSize: '1rem' }}>Recent Security Activity</h3>
                <span style={{ fontSize: '0.75rem', color: '#22c1e6', cursor: 'pointer' }}>View All</span>
            </div>

            <div>
                <AuditItem user="John Doe" action="logged in" time="2 mins ago" />
                <AuditItem user="Jane Smith" action="updated role for Mike" time="15 mins ago" />
                <AuditItem user="System" action="locked account USR005" time="1 hour ago" />
                <AuditItem user="Sarah Connor" action="reset password" time="2 hours ago" />
                <AuditItem user="John Doe" action="exported user list" time="Yesterday" />
            </div>
        </div>
    );
};

export default UserAuditLog;
