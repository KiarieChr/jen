import React from 'react';

const EventsHero = () => {
    return (
        <section style={{
            background: '#120D20',
            padding: '10rem 0 6rem', // Adjusted for navbar
            textAlign: 'center',
            color: 'white'
        }}>
            <div className="container">
                <span style={{
                    background: 'rgba(34, 193, 230, 0.1)',
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
                    Upcoming Events
                </span>
                <h1 style={{
                    fontSize: '4rem',
                    fontWeight: '800',
                    marginBottom: '1.5rem',
                    lineHeight: 1.1
                }}>
                    Join the Gathering
                </h1>
                <p style={{
                    fontSize: '1.125rem',
                    color: '#94a3b8',
                    maxWidth: '600px',
                    margin: '0 auto',
                    lineHeight: 1.6
                }}>
                    Experience the presence of God with us. Register for our upcoming events and be part of something powerful.
                </p>
            </div>
        </section>
    );
};

export default EventsHero;
