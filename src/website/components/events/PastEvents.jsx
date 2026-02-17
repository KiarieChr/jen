import React from 'react';

const PastEventCard = ({ title, date, image }) => (
    <div style={{
        background: '#f8fafc', // Very light background for card to blend or stand out slightly
        borderRadius: '1rem',
        overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.05)'
    }}>
        <div style={{ height: '200px', overflow: 'hidden' }}>
            <img
                src={image}
                alt={title}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(100%)', // Grayscale effect
                    transition: 'filter 0.3s'
                }}
                onMouseOver={(e) => e.target.style.filter = 'grayscale(0%)'} // Hover to color
                onMouseOut={(e) => e.target.style.filter = 'grayscale(100%)'}
            />
        </div>
        <div style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                {title}
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.85rem' }}>
                <span>📅</span> {date}
            </div>
        </div>
    </div>
);

const PastEvents = () => {
    const events = [
        {
            title: "New Year's Eve Prayer Vigil",
            date: "Jan 5, 2026",
            image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1000&auto=format&fit=crop"
        },
        {
            title: "Tuesday Fellowship",
            date: "Jan 13, 2026",
            image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000&auto=format&fit=crop"
        },
        {
            title: "Kingdom Business Summit",
            date: "Jan 15, 2026",
            image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1000&auto=format&fit=crop"
        }
    ];

    return (
        <section style={{ padding: '2rem 0 6rem' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#120D20', marginBottom: '1.5rem' }}>
                    Past Events
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {events.map((event, index) => (
                        <PastEventCard key={index} {...event} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PastEvents;
