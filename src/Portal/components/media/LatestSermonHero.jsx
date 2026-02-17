import React from 'react';

const LatestSermonHero = () => {
    return (
        <div style={{
            background: 'linear-gradient(90deg, #d97706 0%, #1e1b4b 100%)', // Orange to Dark Blue gradient
            borderRadius: '1.5rem',
            padding: '3rem',
            marginBottom: '2rem',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            minHeight: '280px'
        }}>
            {/* Background Image Overlay */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'url("https://images.unsplash.com/photo-1549488497-6577382be704?q=80&w=2070&auto=format&fit=crop") center/cover', // Raising hands image
                opacity: 0.4,
                mixBlendMode: 'overlay'
            }}></div>

            <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px' }}>
                <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.2rem' }}>
                    <span style={{
                        background: '#22c1e6',
                        color: '#120D20',
                        padding: '0.3rem 0.8rem',
                        borderRadius: '0.4rem',
                        fontSize: '0.75rem',
                        fontWeight: '800',
                        letterSpacing: '0.5px'
                    }}>
                        LATEST MESSAGE
                    </span>
                    <span style={{
                        background: 'rgba(0,0,0,0.4)',
                        color: 'white',
                        padding: '0.3rem 0.8rem',
                        borderRadius: '0.4rem',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        letterSpacing: '0.5px'
                    }}>
                        VIDEO
                    </span>
                </div>

                <h2 style={{ fontSize: '3rem', fontWeight: '800', color: 'white', margin: '0 0 0.5rem 0', lineHeight: 1.1 }}>
                    The Power of Faith
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', marginBottom: '2rem', fontWeight: '500' }}>
                    Preached by Pst. Timothy • Feb 02, 2026
                </p>

                <button style={{
                    background: '#22c1e6',
                    color: '#120D20',
                    border: 'none',
                    borderRadius: '0.5rem',
                    padding: '0.8rem 2rem',
                    fontSize: '1rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
                }}>
                    <span>▶</span> Watch Now
                </button>
            </div>
        </div>
    );
};

export default LatestSermonHero;
