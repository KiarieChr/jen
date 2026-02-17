import React from 'react';

const GreetingCard = () => {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

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
                    color: '#eff3c1',
                    marginBottom: '0.25rem'
                }}>
                    {getGreeting()}, <span style={{ color: '#22c1e6' }}>Timothy</span>
                </h1>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', fontStyle: 'italic' }}>
                    Cell Leader • Let everything that has breath praise the Lord. – Psalm 150:6
                </p>
            </div>

            <div style={{
                width: '48px', height: '48px',
                borderRadius: '50%',
                background: '#22c1e6',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#120D20',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                boxShadow: '0 0 15px rgba(34, 193, 230, 0.4)'
            }}>
                T
            </div>
        </div>
    );
};

export default GreetingCard;
