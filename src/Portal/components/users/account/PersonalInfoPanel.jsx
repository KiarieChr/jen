import React from 'react';

const InfoField = ({ label, value }) => (
    <div>
        <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.3rem' }}>{label}</div>
        <div style={{ color: 'white', fontWeight: '500', fontSize: '1rem' }}>{value}</div>
    </div>
);

const PersonalInfoPanel = () => {
    return (
        <div style={{
            background: '#1A1625',
            borderRadius: '1rem',
            padding: '2rem',
            border: '1px solid rgba(255,255,255,0.05)'
        }}>
            <h3 style={{ margin: '0 0 1.5rem 0', color: 'white', fontSize: '1.1rem' }}>Personal Information</h3>

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
