import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://jesusenthroned_net.local/api/';

const PastEventCard = ({ name, date_formatted, image, attendee_count }) => (
    <div style={{
        background: '#f8fafc',
        borderRadius: '1rem',
        overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.05)'
    }}>
        <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
            <img
                src={image || "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1000&auto=format&fit=crop"}
                alt={name}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(100%)',
                    transition: 'filter 0.3s'
                }}
                onMouseOver={(e) => e.target.style.filter = 'grayscale(0%)'}
                onMouseOut={(e) => e.target.style.filter = 'grayscale(100%)'}
            />
            {attendee_count > 0 && (
                <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '500'
                }}>
                    {attendee_count} attendees
                </div>
            )}
        </div>
        <div style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                {name}
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.85rem' }}>
                <span>📅</span> {date_formatted}
            </div>
        </div>
    </div>
);

const PastEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    const fetchEvents = async (pageNum = 1) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}get_past_events.php?limit=6&page=${pageNum}`);
            const data = await response.json();
            if (data.success) {
                if (pageNum === 1) {
                    setEvents(data.events || []);
                } else {
                    setEvents(prev => [...prev, ...(data.events || [])]);
                }
                setHasMore(data.pagination?.has_more || false);
            }
        } catch (error) {
            console.error('Failed to fetch past events:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents(1);
    }, []);

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchEvents(nextPage);
    };

    if (loading && events.length === 0) {
        return (
            <section style={{ padding: '2rem 0 6rem' }}>
                <div className="container" style={{ maxWidth: '1000px', textAlign: 'center' }}>
                    <p style={{ color: '#64748b' }}>Loading past events...</p>
                </div>
            </section>
        );
    }

    if (events.length === 0) {
        return null; // Don't show section if no past events
    }

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
                    {events.map((event) => (
                        <PastEventCard key={event.id} {...event} />
                    ))}
                </div>

                {hasMore && (
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <button
                            onClick={loadMore}
                            disabled={loading}
                            style={{
                                background: 'transparent',
                                border: '1px solid #120D20',
                                padding: '0.6rem 2rem',
                                borderRadius: '9999px',
                                fontWeight: '600',
                                color: '#120D20',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.6 : 1,
                                transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => { if (!loading) { e.target.style.background = '#120D20'; e.target.style.color = 'white'; } }}
                            onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#120D20'; }}
                        >
                            {loading ? 'Loading...' : 'Load More Events'}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default PastEvents;
