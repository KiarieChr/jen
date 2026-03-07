import React from 'react';

const SermonsHero = () => {
    return (
        <section style={{
            background: '#120D20',
            paddingTop: '80px', // Navbar height
            position: 'relative',
            color: 'white',
            textAlign: 'center',
            overflow: 'hidden'
        }}>
            <div className="container" style={{ padding: '6rem 1rem 8rem', position: 'relative', zIndex: 1 }}>
                <span style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#22c1e6',
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    display: 'inline-block',
                    marginBottom: '1.5rem'
                }}>
                    Sermons & Media
                </span>
                <h1 style={{
                    fontSize: '4.5rem',
                    fontWeight: '800',
                    marginBottom: '1.5rem',
                    lineHeight: 1.1
                }}>
                    Feed Your Spirit
                </h1>
                <p style={{
                    fontSize: '1.25rem',
                    color: '#94a3b8',
                    maxWidth: '600px',
                    margin: '0 auto',
                    lineHeight: 1.6
                }}>
                    Watch or listen to powerful teachings that will transform your life and deepen your walk with God.
                </p>
            </div>

            {/* Cyan Banner */}
            <div className="live-banner" style={{
                background: '#22c1e6',
                padding: '1.5rem 0',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2rem',
                flexWrap: 'wrap'
            }}>
                <div className="container live-banner-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <div className="live-banner-text" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '700' }}>
                        <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%', opacity: 0.6 }}></div>
                        Watch our services live every Sunday at 10:00 AM EAT
                    </div>
                    <a className="live-banner-btn" href="https://www.youtube.com/@JesusEnthronedNetwork" target="_blank" rel="noopener noreferrer" style={{
                        border: '1px solid white',
                        padding: '0.5rem 1.5rem',
                        borderRadius: '9999px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.2s',
                        textDecoration: 'none',
                        color: 'white'
                    }}>
                        <span>▶</span> Join Live Stream
                    </a>
                </div>
            </div>

            <style>{`
                @media (max-width: 968px) {
                    .live-banner {
                        padding: 1rem 0 !important;
                    }
                    .live-banner-container {
                        flex-direction: column !important;
                        justify-content: center !important;
                        gap: 1rem !important;
                        text-align: center !important;
                    }
                    .live-banner-text {
                        font-size: 0.9rem !important;
                        line-height: 1.4 !important;
                        justify-content: center !important;
                    }
                    .live-banner-btn {
                        font-size: 0.85rem !important;
                        padding: 0.5rem 1.25rem !important;
                    }
                }
                @media (max-width: 480px) {
                    .live-banner-text {
                        font-size: 0.85rem !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default SermonsHero;
