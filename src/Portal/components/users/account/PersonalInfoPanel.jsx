import React from 'react';

const InfoField = ({ label, value }) => (
    <div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.3rem' }}>{label}</div>
        <div style={{ color: 'var(--text-color)', fontWeight: '500', fontSize: '1rem' }}>{value}</div>
    </div>
);

const PersonalInfoPanel = () => {
    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1rem',
            padding: '2rem',
            border: '1px solid var(--border-color)'
        }}>
            <h3 style={{ margin: '0 0 1.5rem 0', color: 'var(--text-color)', fontSize: '1.1rem' }}>Personal Information</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <InfoField label="Email Address" value="timothy.mutisya@jen.org" />
                <InfoField label="Phone Number" value="+254 7XX XXX XXX" />
                <InfoField label="Occupation" value="Software Engineer" />
                <InfoField label="Marital Status" value="Single" />
            </div>
        </div>
    );
};

export default PersonalInfoPanel;
