import React from 'react';

const StatsSection = () => {
    const stats = [
        { label: 'Members', value: '232', icon: '👥', color: '#22c1e6' },
        { label: 'Resources', value: '521', icon: '📚', color: '#ee6c20' },
        { label: 'Hours of Teachings', value: '1,463', icon: '🎧', color: '#15be56' },
        { label: 'Ministries', value: '15', icon: '⛪', color: '#bb0852' }
    ];

    return (
        <section style={{ 
            padding: '60px 0', 
            background: 'linear-gradient(to right, #1A1625, #120D20)',
            borderY: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
            <div className="container">
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '2rem' 
                }}>
                    {stats.map((stat, index) => (
                        <div key={index} style={{ textAlign: 'center', padding: '20px' }}>
                            <div style={{ 
                                fontSize: '2.5rem', 
                                marginBottom: '10px',
                                display: 'block'
                            }}>
                                {stat.icon}
                            </div>
                            <div style={{ 
                                fontSize: '2.5rem', 
                                fontWeight: '800', 
                                color: 'white',
                                marginBottom: '5px'
                            }}>
                                {stat.value}
                            </div>
                            <div style={{ 
                                color: 'rgba(255, 255, 255, 0.6)', 
                                fontSize: '0.9rem',
                                fontWeight: '500',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em'
                            }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
