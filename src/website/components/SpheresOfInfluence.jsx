import React from 'react';

const SpheresOfInfluence = () => {
    const spheres = [
        {
            title: 'Spirituality',
            icon: '✨',
            description: 'We purpose to influence in the spirituality field through the provision and delivery of sound and timely messages.',
            color: '#22c1e6'
        },
        {
            title: 'Education',
            icon: '🎓',
            description: 'Reaching out and influencing the education sector by raising a kingdom-aligned education system in the world.',
            color: '#ee6c20'
        },
        {
            title: 'Politics & Governance',
            icon: '🏛️',
            description: 'Raising sound political systems and leaders guided by integrity and kingdom principles.',
            color: '#15be56'
        },
        {
            title: 'Business & Economics',
            icon: '📈',
            description: 'Defining effective business models and economic systems that reflect kingdom values.',
            color: '#ef4444'
        },
        {
            title: 'Media & Communication',
            icon: '🎙️',
            description: 'Passing the right information and influencing culture through strategic media platforms.',
            color: '#6366f1'
        },
        {
            title: 'Family',
            icon: '🏠',
            description: 'Strengthening the basic unit of society by influencing and empowering families.',
            color: '#ec4899'
        }
    ];

    return (
        <section style={{ padding: '100px 0', background: '#0d0d0d' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '70px' }}>
                    <span style={{ 
                        color: 'var(--primary)', 
                        fontWeight: '600', 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.2em',
                        fontSize: '0.9rem'
                    }}>
                        Seven Mountains
                    </span>
                    <h2 style={{ 
                        fontSize: '3.5rem', 
                        fontWeight: '800', 
                        color: 'white', 
                        marginTop: '15px' 
                    }}>
                        Spheres of <span style={{ color: 'var(--primary)' }}>Influence</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '20px auto 0', fontSize: '1.1rem' }}>
                        Our purpose is to bring Kingdom transformation across the key pillars that shape our society.
                    </p>
                </div>

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
                    gap: '2rem' 
                }}>
                    {spheres.map((sphere, index) => (
                        <div key={index} className="sphere-card">
                            <div style={{ 
                                background: 'rgba(255, 255, 255, 0.03)',
                                borderRadius: '24px',
                                padding: '40px',
                                height: '100%',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div style={{ 
                                    fontSize: '3rem', 
                                    marginBottom: '20px',
                                    display: 'inline-block',
                                    padding: '15px',
                                    background: `rgba(${parseInt(sphere.color.slice(1,3), 16)}, ${parseInt(sphere.color.slice(3,5), 16)}, ${parseInt(sphere.color.slice(5,7), 16)}, 0.1)`,
                                    borderRadius: '20px'
                                }}>
                                    {sphere.icon}
                                </div>
                                <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '700', marginBottom: '15px' }}>
                                    {sphere.title}
                                </h3>
                                <p style={{ color: 'rgba(255, 255, 255, 0.6)', lineHeight: 1.7 }}>
                                    {sphere.description}
                                </p>
                                
                                {/* Hover Glow */}
                                <div className="card-glow" style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: `radial-gradient(circle at top right, ${sphere.color}22, transparent 70%)`,
                                    opacity: 0,
                                    transition: 'opacity 0.3s ease'
                                }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .sphere-card:hover > div {
                    transform: translateY(-5px);
                    border-color: rgba(255, 255, 255, 0.1);
                    background: rgba(255, 255, 255, 0.05);
                }
                .sphere-card:hover .card-glow {
                    opacity: 1;
                }
            `}</style>
        </section>
    );
};

export default SpheresOfInfluence;
