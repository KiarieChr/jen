import React from 'react';

const ActionButton = ({ icon, label, primary = false, onClick }) => (
    <button onClick={onClick} style={{
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
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap'
    }}>
        <span>{icon}</span> {label}
    </button>
);

const MembersActionBar = ({ onNewMember, onUploadExcel, onNewCategory, onNewCellGroup, onAddCommittedMember }) => {
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
            <ActionButton icon="➕" label="New Member" primary={true} onClick={onNewMember} />
            <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }}></div>
            <ActionButton icon="📂" label="Upload Excel" onClick={onUploadExcel} />
            <ActionButton icon="🏷️" label="New Category" onClick={onNewCategory} />
            <ActionButton icon="🏘️" label="New Cell Group" onClick={onNewCellGroup} />
            <ActionButton icon="🤝" label="Add Committed Member" onClick={onAddCommittedMember} />
        </div>
    );
};

export default MembersActionBar;
