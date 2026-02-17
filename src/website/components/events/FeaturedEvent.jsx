import React from 'react';

const FeaturedEvent = () => {
    return (
        <section style={{ padding: '4rem 0 2rem' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#120D20' }}>
                        More Events
                    </h2>
                    <p style={{ color: '#64748b', marginTop: '0.5rem' }}>
                        Don't miss these upcoming gatherings and programs.
                    </p>
                </div>

                <div style={{
                    background: 'white',
                    borderRadius: '1.5rem',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'row',
                    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.05)',
                    flexWrap: 'wrap' // Make responsive
                }}>
                    {/* Image Side */}
                    <div style={{ flex: '1 1 300px', minHeight: '300px' }}>
                        <img
                            src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1000&auto=format&fit=crop"
                            alt="Marriage Enrichment Seminar"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>

                    {/* Content Side */}
                    <div style={{ flex: '1 1 300px', padding: '3rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#120D20', marginBottom: '1rem', lineHeight: 1.3 }}>
                            Marriage Enrichment Seminar
                        </h3>
                        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                            Strengthen your marriage with biblical principles. Open to couples...
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#22c1e6', fontSize: '0.9rem', fontWeight: '500' }}>
                                <span>📅</span> Feb 14, 2026
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.9rem' }}>
                                <span>🕒</span> 10:00 AM - 4:00 PM
                            </div>
                        </div>

                        <button style={{
                            background: 'transparent',
                            border: '1px solid #120D20',
                            padding: '0.6rem 2rem',
                            borderRadius: '9999px',
                            fontWeight: '600',
                            color: '#120D20',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                            onMouseOver={(e) => { e.target.style.background = '#120D20'; e.target.style.color = 'white'; }}
                            onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#120D20'; }}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedEvent;
