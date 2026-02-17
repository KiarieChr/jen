import React from 'react';

const ActionButton = ({ icon, label, primary = false }) => (
    <button style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.6rem 1rem',
        borderRadius: '0.5rem',
        border: primary ? 'none' : '1px solid rgba(255,255,255,0.1)',
        background: primary ? '#22c1e6' : 'rgba(255,255,255,0.05)',
        color: primary ? '#120D20' : '#eff3c1',
        fontWeight: primary ? '700' : '500',
        fontSize: '0.9rem',
        cursor: 'pointer',
        whiteSpace: 'nowrap'
    }}>
        <span>{icon}</span> {label}
    </button>
);

const UserActionsMenu = ({ onAddUser, onAssignRoles, onBulkDeactivate }) => {
    return (
        <div style={{
            background: '#1A1625',
            padding: '1rem',
            borderRadius: '1rem',
            border: '1px solid rgba(255,255,255,0.05)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            overflowX: 'auto'
        }}>
            <div onClick={onAddUser}>
                <ActionButton icon="➕" label="Add New User" primary={true} />
            </div>
            <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }}></div>
            <div onClick={onAssignRoles}>
                <ActionButton icon="🛡️" label="Assign Roles" />
            </div>
            <ActionButton icon="🔗" label="Link Profile" />
            <div onClick={onBulkDeactivate}>
                <ActionButton icon="🚫" label="Bulk Deactivate" />
            </div>
        </div>
    );
};

export default UserActionsMenu;
