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

    const firstName = user?.firstname || user?.first_name || 'Member';
    const initial = firstName.charAt(0).toUpperCase();

    return (
        <div style={{
            background: 'transparent', // Blends with background
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <div>
                <h1 style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: 'var(--text-color)',
                    marginBottom: '0.25rem'
                }}>
                    {getGreeting()}, <span style={{ color: 'var(--primary)' }}>{firstName}</span>
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                    {user?.roles?.length > 0 ? user.roles[0].name : 'Member'} • Let everything that has breath praise the Lord. – Psalm 150:6
                </p>
            </div>

            <div style={{
                width: '48px', height: '48px',
                borderRadius: '50%',
                background: 'var(--primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--bg-color)',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                boxShadow: '0 0 15px rgba(34, 193, 230, 0.4)'
            }}>
                {initial}
            </div>
        </div>
    );
};

export default GreetingCard;
