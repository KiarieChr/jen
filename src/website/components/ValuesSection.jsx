import React from 'react';

const ValuesSection = () => {
    const values = [
        {
            title: 'Godliness',
            description: 'We aim at building and sustaining upon the value of godliness in every aspect of our ministry and personal lives.',
            image: 'https://images.unsplash.com/photo-1544427928-202cd2226824?q=80&w=1000&auto=format&fit=crop',
            icon: '🙏'
        },
        {
            title: 'Truth',
            description: 'Truth for us is absolute, and we intend to live, grow, and be guided by it in an ever-changing world.',
            image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1000&auto=format&fit=crop',
            icon: '📖'
        },
        {
            title: 'Love and Grace',
            description: 'As we have been loved and shown mercy, we intend to live by and in love and grace towards all.',
            image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=1000&auto=format&fit=crop',
            icon: '🕊️'
        }
    ];

    return (
        <section style={{ padding: '100px 0', background: 'var(--bg-color)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: '800', color: 'white' }}>Our <span style={{ color: 'var(--primary)' }}>Values</span></h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginTop: '10px' }}>What we Treasure</p>
                </div>

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                    gap: '30px' 
                }}>
                    {values.map((val, index) => (
                        <div key={index} className="value-card" style={{
                            background: 'var(--surface-1)',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            transition: 'all 0.3s ease'
                        }}>
                            <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                                <img src={val.image} alt={val.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ 
                                    position: 'absolute', 
                                    top: '20px', 
                                    left: '20px', 
                                    background: 'rgba(0,0,0,0.5)', 
                                    backdropFilter: 'blur(10px)',
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.5rem'
                                }}>
                                    {val.icon}
                                </div>
                            </div>
                            <div style={{ padding: '30px' }}>
                                <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '700', marginBottom: '15px' }}>{val.title}</h3>
                                <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>{val.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
                .value-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                    border-color: var(--primary);
                }
            `}</style>
        </section>
    );
};

export default ValuesSection;
