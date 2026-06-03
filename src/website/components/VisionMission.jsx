import React from 'react';

const VisionMission = () => {
    const cards = [
        {
            title: 'Our Vision',
            icon: '👁️',
            content: 'To nurture and raise a generation grounded in the gospel of the kingdom, guided by kingdom principles, and empowered to fulfill their divine purpose in Christ.',
            gradient: 'linear-gradient(135deg, #22c1e6 0%, #1aa3c4 100%)'
        },
        {
            title: 'Our Mission',
            icon: '🚀',
            content: 'To influence the seven mountains of societal influence—Spirituality, Education, Politics & Governance, Business & Economics, Media & Communication, Family, Arts and Entertainment—aligning them with the values of the Kingdom.',
            gradient: 'linear-gradient(135deg, #A855F7 0%, #7E22CE 100%)'
        },
        {
            title: 'Our Values',
            icon: '💎',
            content: 'We are built upon the pillars of Godliness, Absolute Truth, and the transformative power of Love and Grace in everything we do.',
            gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
        }
    ];

    return (
        <section style={{ 
            padding: '80px 0', 
            background: 'var(--bg-color, #0a0a0a)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Glows */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '-10%',
                width: '400px',
                height: '400px',
                background: 'rgba(34, 193, 230, 0.05)',
                filter: 'blur(100px)',
                borderRadius: '50%',
                zIndex: 0
            }}></div>
            
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 style={{ 
                        fontSize: '3rem', 
                        fontWeight: '800', 
                        color: 'white',
                        marginBottom: '1rem',
                        letterSpacing: '-0.02em'
                    }}>
                        Our <span style={{ color: 'var(--primary)' }}>Purpose</span> & Calling
                    </h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
                        Empowering purpose and matching up God's call through strategic influence across all spheres of life.
                    </p>
                </div>

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                    gap: '2.5rem' 
                }}>
                    {cards.map((card, index) => (
                        <div 
                            key={index}
                            className="vm-card"
                            style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '24px',
                                padding: '40px',
                                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                position: 'relative',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.5rem'
                            }}
                        >
                            {/* Card Icon/Header */}
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '16px',
                                background: card.gradient,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2rem',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                            }}>
                                {card.icon}
                            </div>

                            <h3 style={{ 
                                fontSize: '1.75rem', 
                                fontWeight: '700', 
                                color: 'white',
                                margin: 0
                            }}>
                                {card.title}
                            </h3>

                            <p style={{ 
                                color: 'rgba(255, 255, 255, 0.7)', 
                                lineHeight: 1.7, 
                                fontSize: '1.05rem',
                                margin: 0
                            }}>
                                {card.content}
                            </p>

                            {/* Decorative Element */}
                            <div style={{
                                position: 'absolute',
                                bottom: '-20px',
                                right: '-20px',
                                width: '100px',
                                height: '100px',
                                background: card.gradient,
                                opacity: 0.05,
                                borderRadius: '50%',
                                filter: 'blur(20px)'
                            }}></div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .vm-card:hover {
                    transform: translateY(-10px);
                    background: rgba(255, 255, 255, 0.06);
                    border-color: rgba(34, 193, 230, 0.3);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                }
                
                @media (max-width: 768px) {
                    .container {
                        padding: 0 1.5rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default VisionMission;
