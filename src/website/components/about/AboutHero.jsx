import React from 'react';

const AboutHero = () => {
    return (
        <section style={{
            padding: '8rem 0 6rem',
            background: 'var(--background)',
            color: 'white',
            textAlign: 'center'
        }}>
            <div className="container">
                <span style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'var(--primary)',
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    display: 'inline-block',
                    marginBottom: '1.5rem'
                }}>
                    About Us
                </span>
                <h1 style={{
                    fontSize: '4rem',
                    fontWeight: '800',
                    marginBottom: '1.5rem',
                    lineHeight: 1.1
                }}>
                    Our Story & Vision
                </h1>
                <p style={{
                    fontSize: '1.25rem',
                    color: '#94a3b8',
                    maxWidth: '700px',
                    margin: '0 auto',
                    lineHeight: 1.6
                }}>
                    Jesus Enthroned Network is a global ministry committed to raising a generation that knows God intimately and walks in Kingdom authority.
                </p>
            </div>
        </section>
    );
};

export default AboutHero;
