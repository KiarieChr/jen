import React from 'react';
import { Link } from 'react-router-dom';

const PartnerSection = () => {
    return (
        <section className="section-padding" style={{ background: 'var(--secondary)' }}>
            <div className="container">
                <div style={{
                    background: 'linear-gradient(135deg, var(--background), var(--surface))',
                    borderRadius: '2rem',
                    padding: '4rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3rem',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Decorative glow */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '0',
                        width: '300px',
                        height: '300px',
                        background: 'radial-gradient(circle, rgba(14, 165, 233, 0.4) 0%, transparent 70%)',
                        transform: 'translate(-30%, -50%)',
                        pointerEvents: 'none'
                    }}></div>

                    <div style={{
                        width: '100px',
                        height: '100px',
                        background: 'var(--primary)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '3rem',
                        flexShrink: 0,
                        boxShadow: '0 0 20px rgba(14, 165, 233, 0.5)'
                    }}>
                        ♥
                    </div>

                    <div style={{ flex: 1 }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>
                            Partner With Us
                        </h2>
                        <p style={{ fontSize: '1.125rem', color: '#94a3b8', maxWidth: '600px' }}>
                            Your generous giving enables us to spread the Gospel, support missions, and transform lives across the globe. Together, we are building the Kingdom.
                        </p>
                    </div>



                    <div>
                        <Link to="/give" className="btn btn-primary btn-hover-scale" style={{ fontSize: '1.125rem', padding: '1rem 2.5rem', textDecoration: 'none' }}>
                            Give Now →
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PartnerSection;
