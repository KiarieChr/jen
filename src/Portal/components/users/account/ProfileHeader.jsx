import React from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { API_BASE_URL } from '../../../../services/api';

// Helper: format a date string like "September 10th, 2001"
const formatDOB = (dateStr) => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return null;
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const day = d.getDate();
    const suffix = day === 1 || day === 21 || day === 31 ? 'st'
        : day === 2 || day === 22 ? 'nd'
        : day === 3 || day === 23 ? 'rd' : 'th';
    return `${monthNames[d.getMonth()]} ${day}${suffix}, ${d.getFullYear()}`;
};

// Helper: format joined date
const formatJoined = (dateStr) => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return null;
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const day = d.getDate();
    const suffix = day === 1 || day === 21 || day === 31 ? 'st'
        : day === 2 || day === 22 ? 'nd'
        : day === 3 || day === 23 ? 'rd' : 'th';
    return `${monthNames[d.getMonth()]} ${day}${suffix}, ${d.getFullYear()}`;
};

// Derive initials from first/last name
const getInitials = (firstname, lastname) => {
    const f = (firstname || '').charAt(0).toUpperCase();
    const l = (lastname || '').charAt(0).toUpperCase();
    return f + l || '?';
};

const ProfileHeader = ({ onEditProfilePic, onEditProfile }) => {
    const { user } = useAuth();

    const fullName = user ? `${user.firstname || ''} ${user.lastname || ''}`.trim() : 'Loading...';
    const initials = user ? getInitials(user.firstname, user.lastname) : '??';
    const bio = user?.bio || 'No bio added yet.';
    const location = user?.location || 'Location not set';
    const dob = formatDOB(user?.dob);
    const joinedDate = formatJoined(user?.last_login); // or a "created_at" if available
    const roles = user?.roles || [];
    const roleLabel = roles.length > 0 ? roles.map(r => r.name).join(', ') : 'Member';
    const isActive = user?.status === 'active';

    // Build avatar URL — profile_picture is stored as a relative path
    const avatarUrl = user?.profile_picture
        ? (user.profile_picture.startsWith('http')
            ? user.profile_picture
            : `${window.location.origin}${user.profile_picture}`)
        : null;

    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1rem',
            overflow: 'hidden',
            marginBottom: '1.5rem',
            border: '1px solid var(--border-color)'
        }}>
            {/* Cover Banner */}
            <div style={{
                height: '180px',
                background: 'linear-gradient(135deg, #2a9d8f 0%, #69b578 50%, #4f46e5 100%)',
                position: 'relative'
            }} />

            <div style={{ padding: '0 2rem 2rem 2rem', position: 'relative' }}>
                {/* Avatar & Edit Button */}
                <div style={{
                    position: 'absolute',
                    top: '-60px',
                    left: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <div style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '0.8rem',
                        border: '4px solid var(--surface-1, #1A1625)',
                        overflow: 'hidden',
                        background: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        color: 'white',
                        flexShrink: 0,
                    }}>
                        {avatarUrl ? (
                            <img
                                src={avatarUrl}
                                alt={fullName}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                        ) : initials}
                    </div>
                    <button
                        onClick={onEditProfilePic}
                        style={{
                            background: '#4f46e5',
                            color: 'white',
                            border: 'none',
                            padding: '0.4rem 1rem',
                            borderRadius: '0.4rem',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            whiteSpace: 'nowrap',
                        }}>
                        📷 Edit Photo
                    </button>
                </div>

                {/* Profile Details */}
                <div style={{ marginLeft: '160px', paddingTop: '0.5rem', minHeight: '80px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                        <div style={{ flex: 1, minWidth: '220px' }}>
                            <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-color)', margin: '0 0 0.4rem 0' }}>
                                {fullName}
                            </h1>

                            {/* Bio */}
                            <div style={{ marginBottom: '0.75rem' }}>
                                <div style={{ color: 'var(--text-color)', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                                    About Me{' '}
                                    <span
                                        onClick={onEditProfile}
                                        role="button"
                                        tabIndex={0}
                                        style={{ color: '#6366f1', fontSize: '0.75rem', cursor: 'pointer' }}
                                    >✎ Edit</span>
                                </div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, maxWidth: '600px' }}>
                                    {bio}
                                </p>
                            </div>

                            {/* Meta info */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem', fontSize: '0.85rem', color: 'var(--text-color)' }}>
                                {dob && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <span>📅</span> Born {dob}
                                        <span
                                            onClick={onEditProfile}
                                            role="button"
                                            tabIndex={0}
                                            style={{ color: '#6366f1', cursor: 'pointer' }}
                                        >✎</span>
                                    </div>
                                )}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <span>🔧</span> {roleLabel}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <span>📍</span> {location}
                                    <span
                                        onClick={onEditProfile}
                                        role="button"
                                        tabIndex={0}
                                        style={{ color: '#6366f1', cursor: 'pointer' }}
                                    >✎</span>
                                </div>
                            </div>
                        </div>

                        {/* Status badge */}
                        <div style={{ marginTop: '0.5rem' }}>
                            <span style={{
                                background: isActive ? '#4f46e5' : '#6b7280',
                                color: 'white',
                                padding: '0.3rem 0.9rem',
                                borderRadius: '2rem',
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                                textTransform: 'capitalize',
                            }}>
                                {isActive ? '✓' : '○'} {user?.status || 'Unknown'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
