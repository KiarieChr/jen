import React from 'react';
import { useAuth } from '../../../../context/AuthContext';

const InfoField = ({ label, value, icon }) => (
    <div style={{
        padding: '1.25rem',
        background: 'var(--bg-color, rgba(255,255,255,0.03))',
        borderRadius: '0.75rem',
        border: '1px solid var(--border-color)',
    }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {icon && <span>{icon}</span>}
            {label}
        </div>
        <div style={{ color: 'var(--text-color)', fontWeight: '500', fontSize: '0.95rem', wordBreak: 'break-word' }}>
            {value || <span style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontWeight: '400' }}>Not provided</span>}
        </div>
    </div>
);

const capitalize = (str) => {
    if (!str) return null;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase().replace(/_/g, ' ');
};

const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return null;
    return d.toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' });
};

const PersonalInfoPanel = () => {
    const { user } = useAuth();

    if (!user) {
        return (
            <div style={{
                background: 'var(--surface-1)', borderRadius: '1rem', padding: '2rem',
                border: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'center'
            }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏳</div>
                Loading profile...
            </div>
        );
    }

    const fullName = `${user.firstname || ''} ${user.lastname || ''}`.trim();
    const roleNames = (user.roles || []).map(r => r.name).join(', ') || 'Member';

    const formatPhone = (phone) => {
        if (!phone) return null;
        const clean = phone.replace(/\D/g, '');
        if (clean.startsWith('254') && clean.length === 12) {
            return `+${clean.slice(0, 3)} ${clean.slice(3, 6)} ${clean.slice(6, 9)} ${clean.slice(9)}`;
        }
        if (clean.startsWith('0') && clean.length === 10) {
            return `+254 ${clean.slice(1, 4)} ${clean.slice(4, 7)} ${clean.slice(7)}`;
        }
        return phone;
    };

    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1rem',
            padding: '2rem',
            border: '1px solid var(--border-color)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 style={{ margin: 0, color: 'var(--text-color)', fontSize: '1.1rem' }}>Personal Information</h3>
                <span style={{
                    background: user.status === 'active' ? 'rgba(74, 222, 128, 0.12)' : 'rgba(107, 114, 128, 0.12)',
                    color: user.status === 'active' ? '#4ade80' : '#6b7280',
                    padding: '0.25rem 0.8rem',
                    borderRadius: '2rem',
                    fontSize: '0.78rem',
                    fontWeight: '600',
                    textTransform: 'capitalize',
                }}>
                    {user.status || 'unknown'}
                </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <InfoField icon="👤" label="Full Name" value={fullName || null} />
                <InfoField icon="✉️" label="Email Address" value={user.email} />
                <InfoField icon="📞" label="Phone Number" value={formatPhone(user.phone)} />
                <InfoField icon="📍" label="Location" value={user.location} />
                {user.address && <InfoField icon="🏠" label="Address" value={user.address} />}
                <InfoField icon="💼" label="Employment Status" value={capitalize(user.emp_status)} />
                {user.gender && <InfoField icon="⚥" label="Gender" value={capitalize(user.gender)} />}
                {user.marital && <InfoField icon="💍" label="Marital Status" value={capitalize(user.marital)} />}
                <InfoField icon="🔧" label="Roles" value={roleNames} />
                {user.cell_code && <InfoField icon="🏘️" label="Cell Group" value={user.cell_code} />}
                {user.dob && <InfoField icon="📅" label="Date of Birth" value={formatDate(user.dob)} />}
                {user.joined_on && <InfoField icon="🗓️" label="Member Since" value={formatDate(user.joined_on)} />}
            </div>

            {user.bio && (
                <div style={{ marginTop: '1.25rem', padding: '1.25rem', background: 'var(--bg-color, rgba(255,255,255,0.03))', borderRadius: '0.75rem', border: '1px solid var(--border-color)' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>📝 Bio</div>
                    <p style={{ color: 'var(--text-color)', margin: 0, lineHeight: 1.7, fontSize: '0.95rem' }}>{user.bio}</p>
                </div>
            )}
        </div>
    );
};

export default PersonalInfoPanel;
