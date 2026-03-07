import React from 'react';
import { useAuth } from '../../../context/AuthContext';

const GreetingCard = () => {
    const { user } = useAuth();

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

    // Get display name (prefer first name from full_name, fallback to username)
    const getDisplayName = () => {
        if (!user) return 'Member';
        const fullName = user.profile?.full_name || user?.firstname || user?.first_name || user.username;
        return fullName.split(' ')[0];
    };

    const initial = getDisplayName().charAt(0).toUpperCase();

    const avatarUrl = user?.profile?.avatar
        ? (user.profile.avatar.startsWith('http') ? user.profile.avatar : `${user.profile.avatar}`)
        : null;

    return (
        <div className="greeting-card" style={{
            background: 'transparent',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <div style={{ flex: 1, minWidth: 0 }}>
                <h1 style={{
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    color: 'var(--text-color)',
                    marginBottom: '0.25rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    {getGreeting()}, <span style={{ color: 'var(--primary)' }}>{getDisplayName()}</span>
                </h1>
                <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem',
                    fontStyle: 'italic',
                    maxWidth: '100%',
                    wordBreak: 'break-word'
                }}>
                    {user?.profile?.role || user?.roles?.[0]?.name || 'Member'} • Let everything that has breath praise the Lord. – Psalm 150:6
                </p>
            </div>

            <div className="greeting-avatar" style={{
                width: '48px', height: '48px',
                borderRadius: '50%',
                backgroundImage: avatarUrl ? `url(${avatarUrl})` : 'none',
                backgroundColor: avatarUrl ? 'transparent' : 'var(--primary)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--bg-color)',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                boxShadow: '0 0 15px rgba(34, 193, 230, 0.4)',
                textTransform: 'uppercase',
                overflow: 'hidden',
                border: avatarUrl ? '2px solid var(--primary)' : 'none',
                flexShrink: 0
            }}>
                {!avatarUrl && initial}
            </div>

            <style>{`
                @media (max-width: 640px) {
                    .greeting-card {
                        flex-direction: row !important;
                        align-items: center !important;
                        justify-content: space-between !important;
                        gap: 0.5rem !important;
                        margin-bottom: 0.75rem !important;
                    }
                    .greeting-avatar {
                        width: 32px !important;
                        height: 32px !important;
                        font-size: 0.9rem !important;
                    }
                    h1 {
                        font-size: 1.2rem !important;
                    }
                    p {
                        font-size: 0.7rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default GreetingCard;
